import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import AddLesson from "./addLesson";
import { Link } from "react-router-dom";
import EditDetailsFormModal from "./EditDetailsFormModal";
import UserTest from "../Tests/UserTest";
import LessonHistory from "../Lessons/LessonsHistory/LessonHistory";
import { isCompositeComponent } from "react-dom/test-utils";

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState("");
  const [credits, setCredits] = useState(0);
  const [token, setToken] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentTeachers, setStudentTeahers] = useState([]);

  const getProfile = () => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    axios
      .get("http://127.0.0.1:8000/api/user/profile", {
        headers: { Authorization: "Token " + token },
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
          .get("http://127.0.0.1:8000/api/get_teachers", {
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
  }, [token, userProfile]);

  return (
    <div
      className="text-center card grid"
      style={{ backgroundColor: "rgba(86, 182, 255, 0.4)" }}
    >
      {userProfile === "" && <h1>didnt load</h1>}
      {userProfile !== "" && (
        <section className="card" style={{ height: "100%" }}>
          <h1>{userProfile.user.first_name} Profile Page</h1>
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
          <br />
          <EditDetailsFormModal
            profile={userProfile}
            token={token}
            show={showEditModal}
            toggle={ShowEditModalHandler}
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
            style={{ width: "90%", margin: "auto" }}
            className="benBtn"
          >
            Lessons History
          </a>
        </div>
        {userProfile.type && userProfile.type.type === "student" && (
          <UserTest />
        )}
        {userProfile.type && userProfile.type.type === "student" && (
          <div className="card">
            <h3>My Teachers</h3>
            <hr />
            {studentTeachers.map((value, index) => {
              return (
                <span key={index}>
                  {value.profile.user.first_name} {value.profile.user.last_name}{" "}
                  - {value.profile.phone_number}
                </span>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
