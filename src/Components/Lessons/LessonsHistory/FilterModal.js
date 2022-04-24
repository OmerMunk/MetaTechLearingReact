import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const FilterModal = (props) => {
  const [choice, setChoice] = useState(false);
  const [byStudent, setByStudent] = useState(false);
  const [byDate, setByDate] = useState(false);
  const [bySubject, setBySubject] = useState(false);
  const [type, setType] = useState(null);
  const [details, setDetails] = useState(null);

  const clickedByDate = () => {
    setChoice(!choice);
    setByDate(!byDate);
    setType("date");
    setDetails({ from: "", to: "" });
  };

  const clickedByStudent = () => {
    setChoice(!choice);
    setByStudent(!byStudent);
    setType("student");
  };

  const clickedBySubject = () => {
    setChoice(!choice);
    setBySubject(!bySubject);
    setType("subject");
  };

  const handleSubmit = () => {
    props.setFilterType(type);
    props.setFilterDetails(details);
    closeModal();
  };

  const changeFromDateHandler = (event) => {
    const from = event.target.value;
    const to = details.to;
    setDetails({ from: from, to: to });
  };

  const changeToDateHandler = (event) => {
    const from = details.from;
    const to = event.target.value;
    setDetails({ from: from, to: to });
  };

  const closeModal = () => {
    setChoice(false);
    setByDate(false);
    setByStudent(false);
    setBySubject(false);
    setType(null);
    setDetails(null);
    props.toggle();
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        {!choice && <h1>Filter Lessons</h1>}
        {byDate && <h1>Filter Lessons By Date</h1>}
        {bySubject && <h1>Filter Lessons By Subject</h1>}
        {byStudent && <h1>Filter Lessons By Student</h1>}
      </Modal.Header>
      <Modal.Body>
        {!choice && (
          <div>
            <a className="modalLink" onClick={clickedByDate}>
              By Date
            </a>
            <br />
            <a className="modalLink" onClick={clickedByStudent}>
              By Student
            </a>
            <br />
            <a className="modalLink" onClick={clickedBySubject}>
              By Subject
            </a>
          </div>
        )}

        {byDate && (
          <div className="my-4">
            <span>
              <label>From:</label>
              <input
                onChange={changeFromDateHandler}
                value={details.from}
                type="date"
              />
            </span>
            <span className="m-3">
              <label> To:</label>
              <input
                onChange={changeToDateHandler}
                value={details.to}
                type="date"
              />
            </span>
          </div>
        )}

        {byStudent && (
          <a onClick={clickedByStudent} className="modalLink">
            Choose Other Filter Type
          </a>
        )}
        {byDate && (
          <a className="modalLink" onClick={clickedByDate}>
            Choose Other Filter Type
          </a>
        )}
        {bySubject && (
          <a className="modalLink" onClick={clickedBySubject}>
            Choose Other Filter Type
          </a>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSubmit} className="benBtn benBlackBtn w-80">
          Filter
        </button>
        <button onClick={closeModal} className="benBtn benCloseBtn w-80">
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
