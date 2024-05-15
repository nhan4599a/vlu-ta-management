import React, { useState } from "react";
import { Accordion, Button, Table } from "react-bootstrap";

const TARegistrationList = () => {
  const [index, setIndex] = useState<string>("0");
  const [className1, setClassName] = useState<string>("Math");
  const [className2, setClassName2] = useState<string>("abc");
  const [session1, setSession1] = useState<string>("t2 tiet 1-2");
  const [session2, setSession2] = useState<string>("t4 tiet 1-2");

  return (
    <Accordion defaultActiveKey={className1} alwaysOpen>
      <Accordion.Item eventKey={className1}>
        <Accordion.Header>
          {index} {className1} - {session1}
        </Accordion.Header>
        <Accordion.Body>
          <Table responsive>
            <thead>
              <tr className="table-header ">
                <th>TT</th>
                <th>Tên sinh viên</th>
                <th>MSSV</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {student.map((student, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <th>{student.name}</th>
                  <th>{student.code}</th>
                  <th>{student.email}</th>
                  <th>
                    <Button variant="primary">Xem</Button>
                  </th>
                </tr>
              ))} */}
              <tr>
                <th>1</th>
                <th>abv</th>
                <th>avb</th>
                <th>acac</th>
                <th>
                  <Button variant="primary">Xem</Button>
                </th>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey={className2}>
        <Accordion.Header>
          {index + 1} {className2} - {session2}
        </Accordion.Header>
        <Accordion.Body>
          <Table responsive>
            <thead>
              <tr className="table-header ">
                <th>TT</th>
                <th>Tên sinh viên</th>
                <th>MSSV</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <th>abv</th>
                <th>avb</th>
                <th>acac</th>
                <th>
                  <Button variant="primary">Xem</Button>
                </th>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default TARegistrationList;
