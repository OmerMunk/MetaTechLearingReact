import React, {useState, useEffect} from "react";
import {Container} from "react-bootstrap";
import './SingleLesson.css'
import SingleLessonExpendedModal from "./SingleLessonExpendedModal";




const SingleLesson = (props) => {

    const [showLessonModal, setShowLessonModal] = useState(false)

    const showModalHandler = () => {
        setShowLessonModal(!showLessonModal)
    }

    return(
        <div>
        <Container onClick={showModalHandler} className="black_border">
            <p>Lesson Date: {props.date} </p>
            <p>Subject: {props.subject}  </p>
            <p>Student: {props.student}  </p>
        </Container>
            <SingleLessonExpendedModal
                date = {props.date}
                student ={props.student}
                subject = {props.subject}
                show={showLessonModal}
                toggle={showModalHandler}
                embedId = {props.recordingUrl}
            />
        </div>
    )
}

export default SingleLesson