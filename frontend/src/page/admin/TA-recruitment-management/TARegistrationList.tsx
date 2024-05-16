import { TeacherAssistantsList } from "@main/components/lists/TeacherAssistantsList";
import { useAppDispatch } from "@main/features/hooks";
import { getApplicationsOverview } from "@main/features/slices/application.slice";
import { OverviewApplicationFormResponse } from "@main/types/application-form.type";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

const TARegistrationList = () => {
  const dispatch = useAppDispatch();

  const [activeKey, setActiveKey] = useState<string>();
  const [data, setData] = useState<OverviewApplicationFormResponse[]>([]);

  useEffect(() => {
    dispatch(getApplicationsOverview()).then(unwrapResult).then(setData);
  }, [dispatch]);

  return (
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
              <a href="#" target="_blank">
                View more
              </a>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default TARegistrationList;
