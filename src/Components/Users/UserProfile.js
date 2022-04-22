import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import AddLesson from "./addLesson";
import { Link } from "react-router-dom";
import EditDetailsFormModal from "./EditDetailsFormModal";
import UserTest from "../Tests/UserTest";
import LessonHistory from "../Lessons/LessonsHistory/LessonHistory";

const UserProfile = (props) => {
  const [userProfile, setUserProfile] = useState("");
  const [credits, setCredits] = useState(0);
  // const [teachers, setTeachers] = useState()
  // const [students, setStudents] = useState()
  const [token, setToken] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
    console.log(userProfile);
  };

  // const getTeachers = () => {
  //     axios.get('http://127.0.0.1:8000/api/get_teachers', {headers: {Authorization: 'Token ' + token}})
  //         .then(response => {
  //             console.log(response.data)
  //         })
  // }

  const ShowAddLessonModalHandler = () => {
    setShowAddModal(!showAddModal);
  };

  const ShowEditModalHandler = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div
      className="text-center card grid"
      style={{ backgroundColor: "rgba(86, 182, 255, 0.4)" }}
    >
      {userProfile === "" && <h1>didnt load</h1>}
      {userProfile !== "" && (
        <section className="card">
          <h1>User Profile Page</h1>
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
          <Button
            style={{ color: "blue", border: "1px solid blue" }}
            onClick={ShowEditModalHandler}
          >
            Edit
          </Button>
          <br />
          <EditDetailsFormModal
            profile={userProfile}
            token={token}
            show={showEditModal}
            toggle={ShowEditModalHandler}
          />
          <Link to="/lessons_history">Lessons History</Link>
          {userProfile.type.type === "teacher" && (
            <div>
              <button
                className="btnWithPrimary"
                onClick={ShowAddLessonModalHandler}
              >
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
      <section>
        <UserTest />
        <div></div>
      </section>
    </div>
  );
};
export default UserProfile;
