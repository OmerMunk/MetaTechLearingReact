import React, { useEffect, useState } from "react";
import {Button, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleLesson from "../SingleLesson";
import FilterModal from "./FilterModal";

const LessonHistory = () => {

    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [lessons, setLessons] = useState([])
    const [filterType, setFilterType] = useState(null)
    const [filterDetails, setFilterDetails] = useState(null)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [userProfile, setUserProfile] = useState('')

    useEffect(() =>{
        getProfile()
    },[])

    const filterModalHandler = () => {
        setShowFilterModal(!showFilterModal)
    }

    const unfilter = () => {
        setFilterType(null)
    }




    const getProfile = () => {
        const token = window.localStorage.getItem('token')
        setToken(token)
        axios.get('http://127.0.0.1:8000/api/user/profile', {headers: {Authorization: 'Token ' + token}})
            .then(response => {
                setUserProfile(response.data.profile)
            })
    }


  const getLessons = () => {
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
      <div className="card text-center">
        <SingleLesson
          date={lesson.lesson_date}
          subject={lesson.subject.subject_name}
          student={lesson.student_full_name}
          recordingUrl={lesson.record_url}
                    materialUrl={lesson.lesson_material}
                    length={lesson.length}
                    userType={userProfile.type.type}
                    approved = {lesson.approved}
        />
      </div>
    );
  };

  let lessons_list = lessons.map(renderLesson);

  useEffect(() => {
    getLessons();
        getProfile();
    }, [filterType])

  return (
    <Container className="text-center">
      <h1>Lesson History</h1>
      <hr />
      <Link to="/user_profile">Back To Profile</Link>
        <Button onClick={filterModalHandler} variant='warning'>Filter</Button>
        {filterType && <Button onClick={unfilter} >UnFilter </Button>}
        <FilterModal show={showFilterModal} toggle={filterModalHandler} setFilterType={setFilterType}
                     setFilterDetails={setFilterDetails}/>
      <div>{lessons_list}</div>
    </Container>
  );
};

export default LessonHistory;
