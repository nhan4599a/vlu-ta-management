import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { TeacherAssistantsList } from "@main/components/lists/TeacherAssistantsList";
import TARegisterApprovalPrompt from "@main/components/prompts/TARegisterApprovalPrompt";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getApplicationsOverview,
  selectApplicationsOverview,
} from "@redux/slices/application.slice";

const TARegistrationOverviewList = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectApplicationsOverview);

  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    dispatch(getApplicationsOverview());
  }, [dispatch]);

  return (
    <>
      <Accordion
        activeKey={activeKey}
        onSelect={(e) => setActiveKey(e as string)}
        alwaysOpen
      >
        {data.map((item, index) => (
          <Accordion.Item eventKey={item.scheduleId} key={index} className="mb-2">
            <Accordion.Header>
              {item.name} - {item.day} tiết {item.lesson}
            </Accordion.Header>
            <Accordion.Body>
              <TeacherAssistantsList applications={item.applications} />
              {item.hasMore && (
                <a href={`/ta-information-management/assistant/${item.scheduleId}`} target="_blank">
                  View more
                </a>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <TARegisterApprovalPrompt dataFetcherThunk={getApplicationsOverview} />
    </>
  );
};

export default TARegistrationOverviewList;
