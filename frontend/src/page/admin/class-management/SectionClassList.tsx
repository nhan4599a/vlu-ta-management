import { lazy, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getTermsDataList,
  selectTermsData,
  setCurrentPage,
} from "@redux/slices/terms.slice";
import { useAdaptiveRoleComponent } from "@main/hooks/useAdaptiveRoleComponent";
const StudentSectionClassList = lazy(
  () => import("@main/page/student/StudentSectionClassList")
);
const TeacherSectionClassList = lazy(
  () => import("@main/page/lecturer/class-management/TeacherSectionClassList")
);
const AdminSectionClassList = lazy(() => import("./AdminSectionClassList"));
const RecruimentRegisterPrompt = lazy(
  () => import("@main/components/prompts/RecruimentRegisterPrompt")
);
const ApproveRecruimentPrompt = lazy(
  () => import("@main/components/prompts/ApproveRecruimentPrompt")
);
import "@main/index.css";

const SectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  const TableContentComponent = useAdaptiveRoleComponent({
    0: <StudentSectionClassList />,
    1: <TeacherSectionClassList />,
    2: <AdminSectionClassList />,
    3: <StudentSectionClassList />,
  });

  const PromptComponent = useAdaptiveRoleComponent({
    1: <RecruimentRegisterPrompt />,
    2: <ApproveRecruimentPrompt />
  });

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList({
      availableJobsOnly: true
    }));
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
