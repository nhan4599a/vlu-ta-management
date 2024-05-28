import { Worksheet } from "excel4node";
import readXlsxFile from "read-excel-file/node";
import { ColumnMapping } from "../types/integration.types";

export const readExcelFile = async (file: Express.Multer.File) => {
  const data = await readXlsxFile(file.buffer);
  return data.slice(1);
};

export const getFileExtension = (fileName: string) => {
  return fileName.split(".").at(-1) ?? "";
};

export const writeExcelData = <TData extends object>(
  ws: Worksheet,
  data: TData[],
  mapping?: ColumnMapping<TData>
) => {
  if (data.length === 0) {
    return;
  }

  mapping ??= Object.keys(data[0]).map((propName, index) => ({
    column: index + 1,
    headerName: propName,
  })) as ColumnMapping<TData>;

  for (const propName in mapping) {
    const mappingDetail = mapping[propName]!;

    ws.cell(1, mappingDetail.column).string(
      mappingDetail.headerName ?? propName
    );

    let rowCount = 1;

    for (const item of data) {
      ws.cell(++rowCount, mappingDetail.column).string(
        item[propName]?.toString() ?? ""
      );
    }
  }
};
