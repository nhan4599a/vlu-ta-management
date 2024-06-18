import { useEffect, useState } from "react";
import { useAppDispatch } from "@redux/hooks";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { getUserInfo, updateUser } from "@redux/slices/users.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { IUser, Role } from "@main/types/user.type";
import { surveyData } from "@main/store/survey-data";
import { useParams } from "react-router-dom";
import { average } from "@main/helper/array.helper";

const progressBarBackgrounds = [
  "#E32222",
  "#FF6500",
  "#FFC100",
  "#6FC42D",
  "#0BE33A",
];

type ScoringProgressBarProps = {
  score: number;
};

type ScoringLineProps = ScoringProgressBarProps & {
  title: string;
};

const ScoringLine = ({ title, score }: ScoringLineProps) => {
  return (
    <Form.Group
      as={Row}
      className="mb-3 lead d-flex align-items-center"
      controlId="mobile"
    >
      <Form.Label column sm="3">
        {title}
      </Form.Label>
      <Col sm="5">
        <div className="row">
          <div
            className="col-10"
            style={{
              margin: "auto",
            }}
          >
            <ScoringProgressBar score={score} />
          </div>
          <div
            className="col-2"
            style={{
              fontSize: "1rem",
            }}
          >
            {score.toFixed(2)} / 5
          </div>
        </div>
      </Col>
    </Form.Group>
  );
};

const ScoringProgressBar = ({ score }: { score: number }) => {
  return (
    <div className="progress">
      {progressBarBackgrounds.map((backgroundColor) => {
        const currentScore = Math.min(score, 1);

        score -= currentScore;

        return (
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${Math.max((currentScore / 1) * 20, 0)}%`,
              backgroundColor,
            }}
          />
        );
      })}
    </div>
  );
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState<IUser>();

  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUserInfo(userId!))
      .then(unwrapResult)
      .then((user) => {
        setPhoneNumber(user.phoneNumber ?? "");
        return user;
      })
      .then(setUser);
  }, [dispatch, userId]);

  const updateButtonClick = () => {
    dispatch(updateUser(phoneNumber))
      .then(unwrapResult)
      .then(() => {
        dispatch(showMessageDialog("Cập nhật thông tin user thành công"));
      });
  };

  return (
    <div className="d-flex flex-column bd-highlight mt-2">
      <div className="d-flex gap-4 align-items-center mb-5">
        <Image
          src={"/images/user-avatar.png"}
          roundedCircle
          style={{ width: "150px" }}
        />
        <h3 className="px-2 text-uppercase">Username</h3>
      </div>
      <Form>
        <Form.Group as={Row} className="mb-3 lead" controlId="fullName">
          <Form.Label column sm="2">
            Họ và tên
          </Form.Label>
          <Col sm="10">
            <Form.Control
              size="lg"
              plaintext
              readOnly
              defaultValue={user?.name}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 lead" controlId="Email">
          <Form.Label column sm="2">
            Email VLU
          </Form.Label>
          <Col sm="10">
            <Form.Control
              size="lg"
              plaintext
              readOnly
              defaultValue={user?.email}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 lead" controlId="mobile">
          <Form.Label column sm="2">
            Số điện thoại
          </Form.Label>
          <Col sm="4">
            <Form.Control
              size="lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 lead" controlId="action">
          <Form.Label column sm="2"></Form.Label>
          <Col sm="10">
            <Button variant="primary" onClick={updateButtonClick}>
              Lưu
            </Button>
          </Col>
        </Form.Group>
        {user?.role === Role.Student && (
          <>
            {surveyData.map(({ title }, index) => (
              <ScoringLine key={index} title={`${index + 1}. ${title}`} score={user!.votingScores[index]} />
            ))}
            <ScoringLine title="Tổng quát" score={average(user!.votingScores)} />
          </>
        )}
      </Form>
    </div>
  );
};

export default Profile;
