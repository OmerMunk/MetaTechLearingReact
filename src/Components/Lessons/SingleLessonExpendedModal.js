import React from "react";
import { Modal } from "react-bootstrap";

const SingleLessonExpendedModal = (props) => {
  return (
    <Modal show={props.show} className="text-center">
      <Modal.Header>
        <h1>Lesson Details</h1>
      </Modal.Header>
      <Modal.Body>
        <h4>Date: </h4>
        {props.date}
        <br />
        <h4>Student: </h4> {props.student}
        <br />
        <h4>Subject: </h4>
        {props.subject}
        <br />
        <h4>length: </h4>
        {props.length}
        <br />
        <h4>Recording:</h4>
        <div>
          <iframe
            width="50%"
            height="50%"
            src={`https://www.youtube.com/embed/${props.recordingUrl}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.userType === "teacher" && !props.approved && (
          <button className="benBtn" onClick={props.switch}>
            Edit
          </button>
        )}
        <button className="benBtn benCloseBtn" onClick={props.toggle}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

// SingleLessonExpendedModal.propTypes = {
//     embedId: PropTypes.string.isRequired
// };

export default SingleLessonExpendedModal;
