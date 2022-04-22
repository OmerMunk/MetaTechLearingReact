import React, {useState, useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import './SingleLesson.css'
import SingleLessonExpendedModal from "./SingleLessonExpendedModal";
import SingleLessonEditModal from "./SingleLessonEditModal";


const SingleLesson = (props) => {
    const [showLessonModal, setShowLessonModal] = useState(false)
    const [showEditLessonModal, setShowEditLessonModal] = useState(false)

    const showModalHandler = () => {
        setShowLessonModal(!showLessonModal)
    }

    const showEditModalHandler = () => {
        setShowEditLessonModal(!showEditLessonModal)
    }

    const switchModals = () => {
        setShowLessonModal(!showLessonModal)
        setShowEditLessonModal(!showEditLessonModal)
    }

    return (
        <div>
                <Container  className="black_border">
                    <p>Lesson Date: {props.date} </p>
                    <p>Subject: {props.subject} </p>
                    <p>Student: {props.student} </p>
                    <Button style={{margin: '0.3rem 0.5rem'}} onClick={showModalHandler} variant='outline-primary'>View</Button>
                    <Button style={{margin: '0.3rem 0.5rem'}} onClick={showEditModalHandler} variant='outline-danger'>Edit</Button>

                </Container>
            <SingleLessonExpendedModal
                switch={switchModals}
                id={props.id}
                date={props.date}
                student={props.student}
                subject={props.subject}
                show={showLessonModal}
                toggle={showModalHandler}
                embedId={props.recordingUrl}
            />
            <SingleLessonEditModal
                token={props.token}
                id={props.id}
                date={props.date}
                student={props.student}
                subject={props.subject}
                show={showEditLessonModal}
                toggle={showEditModalHandler}
                embedId={props.recordingUrl}
            />
        </div>
    )
}

export default SingleLesson