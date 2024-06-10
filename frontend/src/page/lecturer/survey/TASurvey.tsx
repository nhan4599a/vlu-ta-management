import React from "react";
import { Col, Form, Row, Table } from "react-bootstrap";

const TASurvey = () => {
  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Khảo sát trợ giảng</h2>
      <h4>
        Chọn câu trả lời mức độ đồng ý từ 1 đến 5 theo ý kiến cá nhân về hoạt
        động trợ giảng
      </h4>
      <Row className="my-4 text-success">
        <Col sm={2}>
          <h6>1. Hoàn toàn không đồng ý</h6>
        </Col>
        <Col sm={2}>
          <h6>2. Không đồng ý</h6>
        </Col>
        <Col sm={2}>
          <h6>3. Tương đối đồng ý</h6>
        </Col>
        <Col sm={2}>
          <h6>4. Đồng ý</h6>
        </Col>
        <Col sm={2}>
          <h6>5. Hoàn toàn đồng ý</h6>
        </Col>
      </Row>
      <div>
        <Table responsive>
          <thead>
            <tr className="table-header text-center">
              <th>TT</th>
              <th>Nội dung</th>
              <th style={{width: "20%"}}>Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan={4}> 
              <p className="fw-bold mb-0">1. Công tác chuẩn bị trước giờ học</p>
            </td>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <td colSpan={4}> 
              <p className="fw-bold mb-0">2. Nội dung giảng dạy</p>
            </td>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <td colSpan={4}> 
              <p className="fw-bold mb-0">3. Phương pháp giảng dạy</p>
            </td>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <td colSpan={4}> 
              <p className="fw-bold mb-0">4. Công tác chuẩn bị trước giờ học</p>
            </td>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <td colSpan={4}> 
              <p className="fw-bold mb-0">5. Công tác chuẩn bị trước giờ học</p>
            </td>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum voluptas facere iure dignissimos ad nesciunt numquam, cupiditate illum! Aspernatur ullam fugiat tempore rem culpa dignissimos vero eligendi dolor suscipit?</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="1"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="group1"
                        type={type as "radio"}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="3"
                        type={type as "radio"}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="4"
                        type={type as "radio"}
                        id={`inline-${type}-4`}
                      />
                      <Form.Check
                        inline
                        label="5"
                        type={type as "radio"}
                        id={`inline-${type}-5`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TASurvey;
