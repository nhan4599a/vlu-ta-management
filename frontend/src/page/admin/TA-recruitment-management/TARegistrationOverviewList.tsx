import { TeacherAssistantsList } from "@main/components/lists/TeacherAssistantsList";
import TARegisterApprovalPrompt from "@main/components/prompts/TARegisterApprovalPrompt";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getApplicationsOverview,
  selectApplicationsOverview,
} from "@redux/slices/application.slice";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

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
          <Accordion.Item eventKey={item.scheduleId}>
            <Accordion.Header>
              {index} {item.name} - {item.lesson}
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
