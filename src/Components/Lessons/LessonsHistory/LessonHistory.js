import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import SingleLesson from "../SingleLesson";
import FilterModal from "./FilterModal";

const LessonHistory = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [lessons, setLessons] = useState([]);
    const [filterType, setFilterType] = useState(null);
    const [filterDetails, setFilterDetails] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [userProfile, setUserProfile] = useState("");
    const [userType, setUserType] = useState("");

    useEffect(() => {
        getUserType();
        getProfile();
    }, []);

    const filterModalHandler = () => {
        setShowFilterModal(!showFilterModal);
    };

    const unfilter = () => {
        setFilterType(null);
    };

    const getUserType = () => {
        axios
            .get("http://127.0.0.1:8000/api/user/getusertype", {
                headers: {Authorization: "Token " + token},
            })
            .then((response) => {
                setUserType(response.data);
            });
    };

    const getProfile = () => {
        axios
            .get("http://127.0.0.1:8000/api/user/profile", {
                headers: {Authorization: "Token " + token},
            })
            .then((response) => {
                setUserProfile(response.data.profile);
            });
    };

    const getLessons = () => {
        axios
            .get("http://127.0.0.1:8000/api/lessons", {
                headers: {Authorization: "Token " + token},
            })
            .then((response) => {
                setLessons(response.data);
                if (filterType === "date") {
                    const filteredLessons = lessons.filter((lesson) => {
                        // console.log(lesson.lesson_date);
                        const date = new Date(lesson.lesson_date);
                        const start = new Date(filterDetails.from);
                        const end = new Date(filterDetails.to);
                        console.log("date", date);
                        console.log("start", start);
                        console.log("end", end);
                        return date >= start && date <= end;
                    });
                    setLessons(filteredLessons);
                }
            });
    };

    const renderLesson = (lesson) => {
        return (
            <div className="card text-center">
                {userProfile !== "" && (
                    <SingleLesson
                        id={lesson.id}
                        date={lesson.lesson_date}
                        subject={lesson.subject.subject_name}
                        student={lesson.student_full_name}
                        recordingUrl={lesson.record_url}
                        materialUrl={lesson.lesson_material}
                        length={lesson.length}
                        userType={userType}
                        approved={lesson.approved}
                    />
                )}
            </div>
        );
    };

    let lessons_list = lessons.map(renderLesson);

    useEffect(() => {
        getLessons();
        getProfile();
    }, [filterType]);

    return (
        <>
            <div style={{marginTop:'5%'}}>
        <Container className="text-center ">
            <h1 style={{color: "white"}}>Lesson History</h1>
            <hr/>
            <div className="card">
        <span>
          <a
              className="benBtn benBlackBtn w-80 autoMarg p-1 m-2"
              onClick={filterModalHandler}
          >
            Filter
          </a>

          <a className="benBtn benBlackBtn autoMarg p-1" href="/user_profile">
            Back To Profile
          </a>
        </span>

                {filterType && (
                    <button
                        className="benBtn benOrangeBtn my-2"
                        style={{margin: "auto"}}
                        onClick={unfilter}
                    >
                        Unfilter{" "}
                    </button>
                )}
                <FilterModal
                    show={showFilterModal}
                    toggle={filterModalHandler}
                    setFilterType={setFilterType}
                    setFilterDetails={setFilterDetails}
                />
                <div>{lessons_list}</div>
            </div>
        </Container>
            </div>
        </>

    );
};

export default LessonHistory;
