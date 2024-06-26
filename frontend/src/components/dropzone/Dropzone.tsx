import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Dropzone, { DropzoneFile } from "dropzone";
import { v4 as uuidv4 } from "uuid";
import { Attachment } from "@main/types/application-form.type";
import { downloadAttachment } from "@main/api";
import { showMessageDialog } from "@main/features/slices/messages.slice";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import "@main/index.css";
import { selectCurrentUser } from "@main/features/slices/authentication.slice";

export interface DropzoneComponentMethodsRef {
  getFiles: () => File[];
}

type DropzoneProps = {
  acceptedFiles?: string;
  maxFiles?: number;
  files?: Attachment[] | File[];
  allowDownload?: boolean;
  allowEdit: boolean;
};

const images_file_ext = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".svg"];

const getFileExt = (fileName: string) => {
  return fileName.split(".").at(-1) ?? "";
};

const fileIcons = {
  doc: "/images/microsoft-word-icon.svg",
  docx: "/images/microsoft-word-icon.svg",
  xls: "/images/microsoft-excel-icon.svg",
  xlsx: "/images/microsoft-excel-icon.svg",
  txt: "/images/txt-svgrepo-com.svg",
  pptx: "/images/microsoft-powerpoint-icon.svg",
  ppt: "/images/microsoft-powerpoint-icon.svg",
  pdf: "/images/pdf.png",
  default: "/images/blank-svgrepo-com.svg",
};

const getFileIcon = (fileName: string) => {
  const ext = getFileExt(fileName) as keyof typeof fileIcons;
  return fileIcons[ext] || fileIcons.default;
};

const DropzoneComponent = forwardRef<
  DropzoneComponentMethodsRef,
  DropzoneProps
>((props, ref) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const elementIdRef = useRef(`d-${uuidv4()}`);
  const dropzoneRef = useRef<Dropzone>();
  const downloadUrlsRef = useRef<Map<File | string, string>>(
    new Map<File | string, string>()
  );

  const createDownloadButton = useCallback((attachment: Attachment | File) => {
    const button = document.createElement("a");

    button.href = "#";
    button.style.display = "block";

    const originalOnclick = button.onclick;

    button.onclick = async () => {
      let isFirstTimeClick = false;

      if (attachment instanceof File) {
        isFirstTimeClick = !downloadUrlsRef.current.has(attachment);

        if (isFirstTimeClick) {
          const url = URL.createObjectURL(attachment);
          downloadUrlsRef.current.set(attachment, url);
          button.href = url;
          button.download = attachment.name;
        }
      } else {
        isFirstTimeClick = !downloadUrlsRef.current.has(
          attachment.savedFileName
        );

        if (isFirstTimeClick) {
          const blob = await downloadAttachment(attachment.savedFileName);

          const url = URL.createObjectURL(blob);
          downloadUrlsRef.current.set(attachment.savedFileName, url);
          button.href = url;
          button.download = attachment.originalFileName;
        }
      }

      button.onclick = originalOnclick;

      if (isFirstTimeClick && !(attachment instanceof File)) {
        button.click();
      }
    };
    button.text = "Tải xuống";
    return button;
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getFiles() {
        return dropzoneRef?.current?.files ?? [];
      },
    };
  });

  useEffect(() => {
    const downloadButtonUrls = downloadUrlsRef.current;

    const dropzone = new Dropzone(`#${elementIdRef.current}`, {
      acceptedFiles: props.acceptedFiles,
      maxFiles: props.maxFiles,
      autoQueue: false,
      autoProcessQueue: false,
      url: "/file/post",
      createImageThumbnails: true,
      maxThumbnailFilesize: 10,
      addRemoveLinks: props.allowEdit,
      clickable: props.allowEdit,
    });

    dropzone.on("addedfile", (file: DropzoneFile & { owner?: string }) => {
      if (!props.allowEdit && file.size) {
        return;
      }

      if (props.maxFiles && dropzone.files.length > props.maxFiles) {
        dropzone.removeFile(file);
        return;
      }

      const fileExt = getFileExt(file.name);

      if (
        props.acceptedFiles &&
        !props.acceptedFiles.split(",").includes(`.${fileExt}`)
      ) {
        dropzone.removeFile(file);
        dispatch(
          showMessageDialog("File không đúng định dạng. Vui lòng thử lại")
        );
        setIsPreviewVisible(false);
        return;
      }

      setIsPreviewVisible(true);

      const fileIconSrc = getFileIcon(file.name);
      const dzImageElement = file.previewElement.querySelector(
        ".dz-image"
      ) as HTMLElement;
      if (dzImageElement) {
        dzImageElement.style.backgroundImage = `url(${fileIconSrc})`;
        dzImageElement.style.backgroundRepeat = "no-repeat";
        dzImageElement.style.backgroundPosition = "center";
        dzImageElement.style.backgroundSize = "contain";
      }

      if (props.allowDownload) {
        if (!file.dataURL) {
          file.previewElement.appendChild(createDownloadButton(file));
        } else {
          const attachment: Attachment = {
            originalFileName: file.name,
            savedFileName: file.dataURL!,
          };

          file.previewElement.appendChild(createDownloadButton(attachment));
        }
      }

      if (file.owner && currentUser?.code && file.owner !== currentUser.code) {
        const dzRemoveBtn = file.previewElement.querySelector('.dz-remove')
        dzRemoveBtn?.remove()
      }
    });

    dropzone.on("removedfile", () => {
      setIsPreviewVisible(dropzone.files.length !== 0);
    });

    if (props.files) {
      for (const file of props.files) {
        if (file instanceof File) {
          dropzone.emit("addedfile", file);
          dropzone.emit("success", file);
          dropzone.emit("complete", file);
          dropzone.files.push(file as DropzoneFile);
        } else {
          const dropzoneFile = {
            ...file,
            name: file.originalFileName,
            dataURL: file.savedFileName,
            type: images_file_ext.includes(getFileExt(file.originalFileName))
              ? "images/*"
              : "unknown",
            owner: file.owner,
          };
          dropzone.emit("addedfile", dropzoneFile);
          dropzone.emit("success", dropzoneFile);
          dropzone.emit("complete", dropzoneFile);
          dropzone.files.push(dropzoneFile as unknown as DropzoneFile);
        }
      }
    }

    dropzoneRef.current = dropzone;

    return () => {
      for (const url of downloadButtonUrls.values()) {
        URL.revokeObjectURL(url);
      }
      downloadButtonUrls.clear();
      dropzone.destroy();
    };
  }, [
    props.acceptedFiles,
    props.allowDownload,
    props.allowEdit,
    props.files,
    props.maxFiles,
    currentUser?.code,
    dispatch,
    createDownloadButton,
  ]);

  return (
    <div
      id={elementIdRef.current}
      className="dropzone d-flex flex-wrap justify-content-center w-100"
      style={{
        gap: "1rem",
      }}
    >
      <div
        className="dz-message text-center p-4"
        style={{ display: isPreviewVisible ? "none" : "block" }}
      >
        <p className="display-6">Kéo thả hoặc nhấn chọn để upload</p>
        <div>
          <svg
            width="137"
            height="122"
            viewBox="0 0 137 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M105.49 44.8727C104.114 43.8494 102.248 43.2747 100.304 43.2747C98.3587 43.2747 96.4933 43.8494 95.1171 44.8727L75.8393 59.2256V5.46429C75.8393 4.01507 75.066 2.6252 73.6897 1.60045C72.3133 0.5757 70.4465 0 68.5 0C66.5535 0 64.6867 0.5757 63.3103 1.60045C61.934 2.6252 61.1607 4.01507 61.1607 5.46429V59.2256L41.8829 44.8727C40.4916 43.9075 38.6514 43.382 36.75 43.407C34.8487 43.432 33.0345 44.0055 31.6898 45.0066C30.3452 46.0078 29.5749 47.3584 29.5414 48.7741C29.5078 50.1897 30.2136 51.5597 31.51 52.5956L63.3136 76.2741L68.5 80.1429L73.6864 76.2814L105.49 52.6029C106.172 52.0954 106.713 51.4929 107.082 50.8297C107.451 50.1665 107.641 49.4557 107.641 48.7378C107.641 48.0199 107.451 47.3091 107.082 46.6459C106.713 45.9827 106.172 45.3802 105.49 44.8727ZM14.6786 63.75C14.6786 63.0324 14.4887 62.3219 14.1199 61.6589C13.7511 60.9959 13.2105 60.3936 12.5289 59.8862C11.8474 59.3788 11.0384 58.9763 10.1479 58.7017C9.25747 58.4271 8.30309 58.2857 7.33929 58.2857C6.37548 58.2857 5.42111 58.4271 4.53066 58.7017C3.64022 58.9763 2.83114 59.3788 2.14963 59.8862C1.46811 60.3936 0.927504 60.9959 0.55867 61.6589C0.189837 62.3219 -1.43619e-08 63.0324 0 63.75V87.4286C0 91.2932 2.06198 94.9995 5.73234 97.7321C9.40269 100.465 14.3808 102 19.5714 102H117.429C122.619 102 127.597 100.465 131.268 97.7321C134.938 94.9995 137 91.2932 137 87.4286V63.75C137 62.3008 136.227 60.9109 134.85 59.8862C133.474 58.8614 131.607 58.2857 129.661 58.2857C127.714 58.2857 125.847 58.8614 124.471 59.8862C123.095 60.9109 122.321 62.3008 122.321 63.75V87.4286C122.321 88.3947 121.806 89.3213 120.888 90.0045C119.971 90.6876 118.726 91.0714 117.429 91.0714H19.5714C18.2738 91.0714 17.0292 90.6876 16.1117 90.0045C15.1941 89.3213 14.6786 88.3947 14.6786 87.4286V63.75Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

export default DropzoneComponent;
