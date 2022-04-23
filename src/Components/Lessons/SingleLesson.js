import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./SingleLesson.css";
import SingleLessonExpendedModal from "./SingleLessonExpendedModal";
import SingleLessonEditModal from "./SingleLessonEditModal";
import axios from "axios";


const SingleLesson = (props) => {
  // const navigate = useNavigate();
  const approveLessonHandler = (event) => {
    event.preventDefault();
    axios
      .patch(
        "http://127.0.0.1:8000/api/admin/approve",
        {
          id: props.id,
          approved: true,
        },
        { headers: { Authorization: "Token " + props.token } }
      )
      .then((response) => {
        console.log(response);
        // props.toggle();
        props.renderList((prev) => !prev);

        // navigate("/");
      });
  };

  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);

  const showModalHandler = () => {
    setShowLessonModal(!showLessonModal);
  };

  const showEditModalHandler = () => {
    setShowEditLessonModal(!showEditLessonModal);
  };

  const switchModals = () => {
    setShowLessonModal(!showLessonModal);
    setShowEditLessonModal(!showEditLessonModal);
  };

  return (
    <div>
      <Container className="black_border">
        <p>Lesson Date: {props.date} </p>
        <p>Subject: {props.subject} </p>
        <p>Student: {props.student} </p>
        <button className="benBtn" onClick={showModalHandler}>
          View
        </button>
        {props.userType === "teacher" || props.admin ? (
          props.approved ? (
            <button
              className="benBtn benGreenBtn"
              style={{ margin: "0.3rem 0.5rem", cursor: "not-allowed" }}
            >
              APPROVED
            </button>
          ) : (
            <>
              {props.admin && (
                <button
                  className="benBtn benGreenBtn"
                  onClick={approveLessonHandler}
                >
                  APPROVE
                </button>
              )}
              <button
                style={{ cursor: "not-allowed" }}
                className="benBtn benOrangeBtn"
              >
                Pending Approval
              </button>
              <button className="benBtn" onClick={showEditModalHandler}>
                Edit
              </button>
            </>
          )
        ) : (
          <></>
        )}
      </Container>
      <SingleLessonExpendedModal
        switch={switchModals}
        id={props.id}
        date={props.date}
        student={props.student}
        subject={props.subject}
        show={showLessonModal}
        toggle={showModalHandler}
        recordingUrl={props.recordingUrl}
        userType={props.userType}
        materialUrl={props.materialUrl}
        length={props.length}
        approved={props.approved}
      />
      <SingleLessonEditModal
        id={props.id}
        date={props.date}
        student={props.student}
        subject={props.subject}
        show={showEditLessonModal}
        toggle={showEditModalHandler}
        recordingUrl={props.recordingUrl}
        materialUrl={props.materialUrl}
        length={props.length}
      />
    </div>
  );
};

export default SingleLesson;
