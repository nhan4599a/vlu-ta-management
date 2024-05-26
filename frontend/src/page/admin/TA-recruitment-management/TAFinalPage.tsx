import { FinalApplicationsList } from "@main/components/lists/FinalApplicationsList";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getApplicationsFinalData,
  selectApplicationsFinalData,
} from "@redux/slices/application.slice";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

export const TAFinalPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectApplicationsFinalData);

  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    dispatch(getApplicationsFinalData());
  }, [dispatch]);

  return (
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
            <FinalApplicationsList applications={item.applications} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
