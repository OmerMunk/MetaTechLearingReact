import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const AddLesson = (props) => {
  const token = props.token;
  const [studentEmail, setStudentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [recordUrl, setRecordUrl] = useState("");
  const [lessonMaterial, setLessonMaterial] = useState("");
  const [length, setLength] = useState(0);

  const studentEmailChangeHandler = (event) => {
    setStudentEmail(event.target.value);
  };
  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const recordUrlChangeHandler = (event) => {
    setRecordUrl(event.target.value);
  };
  const lengthChangeHandler = (event) => {
    setLength(event.target.value);
  };

  const lessonMaterialChangeHandler = (event) => {
    setLessonMaterial(event.target.value);
  };

  const toggleModal = () => {
    props.loginClicked();
    setStudentEmail("");
    setSubject("");
    setDate("");
    setRecordUrl("");
    setLength(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/lessons",
        {
          student: studentEmail,
          subject: subject,
          record_url: recordUrl,
          lesson_date: date,
          lesson_material: lessonMaterial,
          length: length,
        },
        { headers: { Authorization: "Token " + props.token } }
      )
      .then((response) => {
        props.addClicked();
        setLessonMaterial(null);
        setLength(null);
        setDate(null);
        setSubject(null);
        setRecordUrl(null);
        setStudentEmail(null);
      })
      .catch((error) =>
        alert("One of the inputs are incorrect, check student email.")
      );
  };

  return (
    <Modal show={props.showAdd}>
      <Form>
        <Modal.Header>
          <h1>Add Lesson</h1>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Student Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Student Email"
              value={studentEmail}
              onChange={studentEmailChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={subjectChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Record URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL"
              value={recordUrl}
              onChange={recordUrlChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lesson Material</Form.Label>
            <Form.Control
              type="text"
              placeholder="Material URL"
              value={lessonMaterial}
              onChange={lessonMaterialChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lesson Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              value={date}
              onChange={dateChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lesson Length (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Length"
              value={length}
              onChange={lengthChangeHandler}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={handleSubmit}
            className="benBtn benGreenBtn"
          >
            {" "}
            Add
          </button>
          <button onClick={props.addClicked} className="benBtn benCloseBtn">
            Close
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddLesson;
