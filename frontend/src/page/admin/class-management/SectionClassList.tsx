import { lazy, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getTermsDataList,
  // selectTermsData,
  setCurrentPage,
} from "@redux/slices/terms.slice";
import { useAdaptiveRoleComponent } from "@main/hooks/useAdaptiveRoleComponent";
const StudentSectionClassList = lazy(() => import("./StudentSectionClassList"));
const TeacherSectionClassList = lazy(() => import("./TeacherSectionClassList"));
const AdminSectionClassList = lazy(() => import("./AdminSectionClassList"));
const RecruimentRegisterPrompt = lazy(
  () => import("@main/components/prompts/RecruimentRegisterPrompt")
);
const TARegister = lazy(
  () => import("@main/components/prompts/TARegisterPrompt")
);
const ApproveRecruimentPrompt = lazy(
  () => import("@main/components/prompts/ApproveRecruimentPrompt")
);
import "@main/index.css";

const SectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector((state) => state.terms.termsResponse);

  const [page, setPage] = useState(1);

  const TableContentComponent = useAdaptiveRoleComponent({
    0: <StudentSectionClassList />,
    1: <TeacherSectionClassList />,
    2: <StudentSectionClassList />,
    3: <AdminSectionClassList />,
  });

  const PromptComponent = useAdaptiveRoleComponent({
    0: <TARegister />,
    1: <RecruimentRegisterPrompt />,
    2: <TARegister />,
    3: <ApproveRecruimentPrompt />,
  });

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList());
  }, [dispatch, page]);

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      {TableContentComponent}
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={termsResponse.count}
          limit={10}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={2}
        />
      </div>
      {PromptComponent}
    </div>
  );
};

export default SectionClassList;
