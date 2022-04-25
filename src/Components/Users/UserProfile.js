import React, {useEffect, useState} from "react";
import axios from "axios";
import AddLesson from "./addLesson";
import EditDetailsFormModal from "./EditDetailsFormModal";
import UserTest from "../Tests/UserTest";
import AddSubject from "./AddSubject";
import {ListGroup} from "react-bootstrap";

const UserProfile = () => {

    const [userProfile, setUserProfile] = useState("");
    const [credits, setCredits] = useState(0);
    const [token, setToken] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [studentTeachers, setStudentTeahers] = useState([]);
    const [teacherStudents, setTeacherStudents] = useState([]);
    const [subjects, setSubjects] = useState([])
    const getProfile = () => {
        const token = window.localStorage.getItem("token");
        setToken(token);
        axios
            .get("/api/user/profile", {
                headers: {Authorization: "Token " + token},
            })
            .then((response) => {
                setUserProfile(response.data.profile);
                setCredits(response.data.credits);

            });
        // console.log(userProfile);
    };

    const getTeachers = () => {
        if (token) {
            if (userProfile.type && userProfile.type.type === "student") {
                axios
                    .get("/api/get_teachers", {
                        headers: {
                            Authorization: "Token " + token,
                        },
                    })
                    .then((response) => {
                        setStudentTeahers(response.data);
                    });
            }
        }
    };

    const getStudents = () => {
        if (token) {
            if (userProfile.type && userProfile.type.type === "teacher") {
                axios
                    .get("/api/get_students", {
                        headers: {
                            Authorization: "Token " + token,
                        },
                    })
                    .then((response) => {
                        setTeacherStudents(response.data);
                    });
            }
        }
    };

    const getSubjects = () => {
        if (token) {
            axios
                .get("/api/subject", {
                    headers: {
                        Authorization: "Token " + token,
                    },
                })
                .then((response) => {
                    setSubjects(response.data)
                    console.log(response.data)
                })
        }
    }

    const subjectDeleteHandler = (value) => {
        if (token) {
            const headers = {Authorization: "Token " + token}
            axios.delete(`/api/subject/${value}`, {headers})
                .then((response) => {
                    console.log(response)
                    getSubjects()
                })
        }
    }


    const ShowAddLessonModalHandler = () => {
        setShowAddModal(!showAddModal);
    };

    const ShowEditModalHandler = () => {
        setShowEditModal(!showEditModal);
    };

    useEffect(() => {
        getProfile();

    }, []);

    useEffect(() => {
        getTeachers();
        getStudents();
        getSubjects()
    }, [token, userProfile]);

    return (
        <>
        <div
            className="text-center card grid"
            style={{backgroundColor: "rgba(86, 182, 255, 0.4)", left:'10%', width:'80%', top:'120px'}}
        >
            {userProfile === "" && <h1>didnt load</h1>}
            {userProfile !== "" && (
                <section className="card" style={{height: "100%"}}>
                    <h1>{userProfile.user.first_name} Profile Page</h1>
                    <hr style={{
                        height: '2px',
                        color: 'rgb(24,0,255)',
                        backgroundColor: 'rgb(24,0,255)',
                        borderWidth: '0'
                    }}/>
                    <p>
                        <strong>Email</strong>: {userProfile.user.email}
                    </p>
                    <p>
                        <strong>First Name:</strong> {userProfile.user.first_name}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {userProfile.user.last_name}
                    </p>
                    <p>
                        <strong>Address:</strong> {userProfile.address}
                    </p>
                    <p>
                        <strong>Phone Number:</strong> {userProfile.phone_number}
                    </p>
                    <p>
                        <strong>Birth Date:</strong>{" "}
                        {userProfile.birth_date.toString().substring(0, 10)}
                    </p>
                    <p>
                        <strong>Credits:</strong> {credits}
                    </p>
                    <center>
                        <button className="benBtn" onClick={ShowEditModalHandler}>
                            Edit Profile
                        </button>
                    </center>
                    {/* <a className="benBtn benCloseBtn">Lessons History</a> */}
                    <br/>
                    <EditDetailsFormModal
                        profile={userProfile}
                        token={token}
                        show={showEditModal}
                        toggle={ShowEditModalHandler}
                        firstName={userProfile.user.first_name}
                        lastName={userProfile.user.last_name}
                        address={userProfile.address}
                        phoneNumber={userProfile.phone_number}
                        birthDate={userProfile.birth_date.toString().substring(0, 10)}
                    />

                    {userProfile.type.type === "teacher" && (
                        <div>
                            <button className="benBtn" onClick={ShowAddLessonModalHandler}>
                                Add Lesson
                            </button>

                            <AddLesson
                                showAdd={showAddModal}
                                token={token}
                                addClicked={ShowAddLessonModalHandler}
                            />
                        </div>
                    )}
                </section>
            )}
            <section className="grid-3">
                <div className="card">
                    <a
                        href="/lessons_history"
                        style={{width: "90%", margin: "auto"}}
                        className="benBtn"
                    >
                        Lessons History
                    </a>
                </div>
                {userProfile.type && userProfile.type.type === "student" && (
                    <UserTest/>
                )}
                {userProfile.type && userProfile.type.type === "student" && (
                    <>

                        <div className="card">
                            <h2>My Subjects</h2>
                            <hr style={{
                                height: '2px',
                                color: 'rgb(24,0,255)',
                                backgroundColor: 'rgb(24,0,255)',
                                borderWidth: '0'
                            }}/>
                            <ListGroup horizontal>
                                {subjects.map((subject) => <ListGroup.Item
                                    onClick={() => subjectDeleteHandler(subject.subject_name)} action variant='info'
                                    style={{fontSize: '120%'}}>{subject.subject_name}</ListGroup.Item>)}
                            </ListGroup>
                            <AddSubject renderSubjects={getSubjects}/>
                        </div>
                        <div className="card">
                            <h3>My Teachers</h3>
                            <hr style={{
                                height: '2px',
                                color: 'rgb(24,0,255)',
                                backgroundColor: 'rgb(24,0,255)',
                                borderWidth: '0'
                            }}/>
                            {studentTeachers.map((value, index) => {
                                return (
                                    <span key={index}>
                  {value.profile.user.first_name} {value.profile.user.last_name}{" "}
                                        - {value.profile.phone_number}
                </span>
                                );
                            })}
                        </div>


                    </>
                )}

                {userProfile.type && userProfile.type.type === "teacher" && (
                    <>

                        <div className="card">
                            <h2>My Subjects</h2>
                            <hr style={{
                                height: '2px',
                                color: 'rgb(24,0,255)',
                                backgroundColor: 'rgb(24,0,255)',
                                borderWidth: '0'
                            }}/>
                            <ListGroup horizontal>
                                {subjects.map((subject) => <ListGroup.Item
                                    onClick={() => subjectDeleteHandler(subject.subject_name)} action variant='info'
                                    style={{fontSize: '120%'}}>{subject.subject_name}</ListGroup.Item>)}
                            </ListGroup>

                            <AddSubject renderSubjects={getSubjects}/>

                        </div>

                        <div className="card">
                            <h2>My Students</h2>
                            <hr style={{
                                height: '2px',
                                color: 'rgb(24,0,255)',
                                backgroundColor: 'rgb(24,0,255)',
                                borderWidth: '0'
                            }}/>
                            {teacherStudents.map((value, index) => {
                                return (
                                    <span style={{fontSize: '1.4rem'}} key={index}>

                  {value.profile.user.first_name} {value.profile.user.last_name}{" "}
                                        - {value.profile.phone_number}

                </span>
                                );
                            })}
                        </div>
                    </>
                )}
            </section>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </>
    );
};

export default UserProfile;
