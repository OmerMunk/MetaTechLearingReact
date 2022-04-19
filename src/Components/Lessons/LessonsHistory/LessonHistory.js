import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import SingleLesson from "../SingleLesson";
import FilterModal from "./FilterModal";


const LessonHistory = () => {


    const [lessons, setLessons] = useState([])
    const [filterType, setFilterType] = useState(null)
    const [filterDetails, setFilterDetails] = useState(null)
    const [showFilterModal, setShowFilterModal] = useState(false)

    const filterModalHandler = () => {
        setShowFilterModal(!showFilterModal)
    }

    const unfilter = () => {
        setFilterType(null)
    }

    const token = window.localStorage.getItem('token')

    const getLessons = () => {
        console.log("getlessons")
        axios.get('http://127.0.0.1:8000/api/lessons', {headers: {Authorization: 'Token ' + token}})
            .then(response => {
                setLessons(response.data)
                if (filterType === 'date'){
                    const filteredLessons = lessons.filter(lesson => {
                        console.log(lesson.lesson_date)
                        const date = new Date(lesson.lesson_date)
                        const start = new Date(filterDetails.from)
                        const end = new Date(filterDetails.to)
                        console.log("date", date)
                        console.log("start", start)
                        console.log("end", end)
                        return date >= start && date <= end
                    })
                    setLessons(filteredLessons)
                }


            })

    }

    const renderLesson = (lesson) => {
        return (
            <Container>
                <SingleLesson
                    token={token}
                    id={lesson.id}
                    date={lesson.lesson_date}
                    subject={lesson.subject.subject_name}
                    student={lesson.student_full_name}
                    recordingUrl={lesson.record_url}
                />
            </Container>
        )

    }

    let lessons_list = lessons.map(renderLesson)

    useEffect(() => {
        getLessons();
    }, [filterType])

    return (
        <Container>
            <h1>Lesson History</h1>
            <Link to='/user_profile'>Back To Profile</Link>
            <Button onClick={filterModalHandler} variant='warning'>Filter</Button>
            {filterType && <Button onClick={unfilter} >UnFilter </Button>}
            <FilterModal show={showFilterModal} toggle={filterModalHandler} setFilterType={setFilterType}
                         setFilterDetails={setFilterDetails}/>
            <div>{lessons_list}</div>
        </Container>
    )
}

export default LessonHistory