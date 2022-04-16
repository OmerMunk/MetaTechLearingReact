import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import SingleLesson from "../SingleLesson";





const LessonHistory = () => {

    const [lessons, setLessons] = useState([])

    const token = window.localStorage.getItem('token')

    const getLessons = () =>{
        axios.get('http://127.0.0.1:8000/api/lessons', {headers: {Authorization: 'Token ' + token}})
            .then(response =>{
                console.log(response)
                setLessons(response.data)

            })

    }

    const renderLesson = (lesson) => {
        return(
            <Container>
                <SingleLesson
                    date={lesson.lesson_date}
                    subject={lesson.subject.subject_name}
                    student={lesson.student_full_name}
                    recordingUrl = {lesson.record_url}
                />
            </Container>
        )

    }

    let lessons_list = lessons.map(renderLesson)

    useEffect(() => {
        getLessons();
    },[])

    return(
        <Container>
            <h1>Lesson History</h1>
            <Link to='/user_profile'>Back To Profile</Link>
            <div>{lessons_list}</div>
        </Container>
    )
}

export default LessonHistory