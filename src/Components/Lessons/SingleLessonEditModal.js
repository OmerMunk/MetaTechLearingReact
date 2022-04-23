import React, {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";

import axios from "axios";

const SingleLessonEditModal = (props) => {
    const [date, setDate] = useState(props.date);
    const [studentEmail, setStudentEmail] = useState("");
    const [subject, setSubject] = useState(props.subject);
    const [recordingUrl, setRecordingUrl] = useState(props.recordingUrl);
    const [materialUrl, setMaterialUrl] = useState(props.materialUrl);
    const [length, setLength] = useState(props.length);
    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        getSubjects()
    }, [])


    const getSubjects = () => {
        const token = window.localStorage.getItem('token')
        if (token) {
            axios.get("http://127.0.0.1:8000/api/get_subjects", {
                headers: {
                    Authorization: "Token " + token,
                },
            })
                .then((response => {
                    const subject_names = response.data.map((value) => {
                        return (
                            value.subject_name
                        )
                    })
                    setSubjects(subject_names)
                }))
        }
    }

    const dateChangeHandler = (event) => {
        setDate(event.target.value);
    };

    const studentEmailChangeHandler = (event) => {
        setStudentEmail(event.target.value);
    };
    const subjectChangeHandler = (event) => {
        setSubject(event.target.value);
    };
    const recordingUrlChangeHandler = (event) => {
        setRecordingUrl(event.target.value);
    };
    const materialUrlChangeHandler = (event) => {
        setMaterialUrl(event.target.value);
    };

    const lengthChangeHandler = (event) => {
        setLength(event.target.value);
    };

    const handleSubmit = (event) => {
        const token = window.localStorage.getItem("token");
        console.log(props.token);
        event.preventDefault();
        axios
            .patch(
                "http://127.0.0.1:8000/api/lessons",
                {
                    id: props.id,
                    student: studentEmail,
                    subject: subject,
                    recording_url: recordingUrl,
                    lesson_date: date,
                    lesson_material_url: materialUrl,
                    length: length,
                    // lesson_material: lessonMaterial,
                    // length: length
                },
                {headers: {Authorization: "Token " + token}}
            )
            .then((response) => {
                console.log(response);
                props.toggle();
                window.location.href = "lessons_history";
            });
    };

    return (
        <Modal show={props.show}>
            <Form>
                <Modal.Header>
                    <h1>Lesson Details</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            <h4>Date: </h4>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="date"
                            value={date}
                            onChange={dateChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h4>Student: {props.student} </h4>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email if you want to change"
                            value={studentEmail}
                            onChange={studentEmailChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h4>Subject:</h4>
                        </Form.Label>
                        <Form.Select
                            value={subject}
                            onChange={subjectChangeHandler}
                        >
                            <option>Choose Subject</option>
                            {subjects.map((value, index) => {
                                return (
                                    <option>{value}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h4>Recording:</h4>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Recording"
                            value={recordingUrl}
                            onChange={recordingUrlChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h4>Material:</h4>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Material"
                            value={materialUrl}
                            onChange={materialUrlChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h4>Length:</h4>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Lesson Length"
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
                        Update
                    </button>
                    <button onClick={props.toggle} className="benBtn benCloseBtn">
                        Close
                    </button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

//todo: IMPORTANT!!!!
//TODO: We need to make sure to update credits if something is edited, it means: remove old credits and add new ones.

// SingleLessonExpendedModal.propTypes = {
//     embedId: PropTypes.string.isRequired
// };

export default SingleLessonEditModal;
