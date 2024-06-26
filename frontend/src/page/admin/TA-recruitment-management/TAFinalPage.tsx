import { FinalApplicationsList } from "@main/components/lists/FinalApplicationsList";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getApplicationsFinalData,
  selectApplicationsFinalData,
} from "@redux/slices/application.slice";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

const TAFinalPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectApplicationsFinalData);

  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    dispatch(getApplicationsFinalData());
  }, [dispatch]);

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Danh sách sinh viên đủ điều kiện</h2>
      <Accordion
        activeKey={activeKey}
        onSelect={(e) => setActiveKey(e as string)}
        alwaysOpen
      >
        {data.map((item, index) => (
          <Accordion.Item eventKey={item._id} key={index} className="mb-2">
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100">
                <p className="mb-0">
                  {item.name} - {item.day} tiết {item.lesson}
                </p>
                <div className="mb-0">
                  ứng viên:{" "}
                  <span>
                    {item.count ?? 0} / {item.maxAllowedCandidates ?? 0}
                  </span>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <FinalApplicationsList applications={item.applications} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default TAFinalPage;
