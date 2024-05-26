import { TeacherAssistantsList } from "@main/components/lists/TeacherAssistantsList";
import TARegisterApprovalPrompt from "@main/components/prompts/TARegisterApprovalPrompt";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  setPage as setPageAction,
  getApplicationsOfClass,
  selectApplicationsData,
  setScheduleId,
} from "@redux/slices/application.slice";
import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useParams } from "react-router-dom";

const TARegistrationList = () => {
  const dispatch = useAppDispatch();
  const applicationsResponse = useAppSelector(selectApplicationsData);

  const { scheduleId } = useParams();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setPageAction(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(setScheduleId(scheduleId));
  }, [dispatch, scheduleId]);

  useEffect(() => {
    if (scheduleId) {
      dispatch(getApplicationsOfClass());
    }
  }, [dispatch, scheduleId, page]);

  return (
    <>
      <h2>Danh sách trợ giảng môn</h2>
      <TeacherAssistantsList applications={applicationsResponse.data} />
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={applicationsResponse.count}
          limit={10}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={2}
        />
      </div>
      <TARegisterApprovalPrompt dataFetcherThunk={getApplicationsOfClass} />
    </>
  );
};

export default TARegistrationList