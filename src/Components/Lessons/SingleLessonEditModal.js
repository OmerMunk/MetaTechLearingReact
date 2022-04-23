import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

import axios from "axios";


const SingleLessonEditModal = (props) =>{


    const [date,setDate] = useState(props.date)
    const [studentEmail,setStudentEmail] = useState('')
    const [subject,setSubject] = useState(props.subject)
    const [recordingUrl,setRecordingUrl] = useState(props.embedId)
    const [materialUrl,setMaterialUrl] = useState(props.materialUrl)
    const [length, setLength] = useState(props.length)

    const dateChangeHandler = (event) => {
        setDate(event.target.value)
    }

    const studentEmailChangeHandler = (event) => {
        setStudentEmail(event.target.value)
    }
    const subjectChangeHandler = (event) => {
        setSubject(event.target.value)
    }
    const recordingUrlChangeHandler = (event) => {
        setRecordingUrl(event.target.value)
    }
    const materialUrlChangeHandler = (event) => {
        setMaterialUrl(event.target.value)
    }

    const lengthChangeHandler = (event) => {
        setLength(event.target.value)
    }

    const handleSubmit = (event) => {
        console.log(props.token)
        event.preventDefault();
        axios.patch('http://127.0.0.1:8000/api/lessons', {
            id: props.id,
            student: studentEmail,
            subject: subject,
            recording_url: recordingUrl,
            lesson_date: date,
            lesson_material_url: materialUrl,
            length: length
            // lesson_material: lessonMaterial,
            // length: length
        },{headers: {Authorization: 'Token ' + props.token}}, )
            .then(response =>{
                console.log(response)
                props.toggle()
                window.location.href=('lessons_history')
            })
    }

    return(
        <Modal show={props.show}>
            <Form>
            <Modal.Header>
                <h1>Lesson Details</h1>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>
                        <h4>Date:  </h4>
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
                        <h4>Student: {props.student} </h4> <br/>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="**ENTER JUST TO CHANGE**"
                        value={studentEmail}
                        onChange={studentEmailChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <h4>Subject:</h4>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Lesson Subject"
                        value={subject}
                        onChange={subjectChangeHandler}
                    />
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
                <Button type="submit" onClick={handleSubmit} variant='primary'> Update</Button>
                <Button onClick={props.toggle} variant='danger'>Close</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

//todo: IMPORTANT!!!!
//TODO: We need to make sure to update credits if something is edited, it means: remove old credits and add new ones.

// SingleLessonExpendedModal.propTypes = {
//     embedId: PropTypes.string.isRequired
// };

export default SingleLessonEditModal