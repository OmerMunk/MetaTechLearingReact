import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SingleLesson from "../Lessons/SingleLesson";

const AdminPanel = () => {
  const token = window.localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState();
  const [lessons, setLessons] = useState([]);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    isAdminHandler();
    getUnApproved();
  }, [rendered]);

  const isAdminHandler = () => {
    axios
      .get("http://127.0.0.1:8000/api/current_user", {
        headers: { Authorization: "Token " + token },
      })
      .then((response) => {
        setIsAdmin(response.data.is_superuser);
      });
  };

  const getUnApproved = () => {
    axios
      .get("http://127.0.0.1:8000/api/admin/get_un_approved", {
        headers: { Authorization: "Token " + token },
      })
      .then((response) => {
        setLessons(response.data);
      });
  };

  const renderLesson = (lesson) => {
    return (
      <Container>
        <SingleLesson
          token={token}
          id={lesson.id}
          date={lesson.lesson_date}
          subject={lesson.subject.subject_name}
          student={lesson.student_full_name}
          teacher={lesson.teacher_full_name}
          recordingUrl={lesson.record_url}
          materialUrl={lesson.lesson_material}
          length={lesson.length}
          approved={lesson.approved}
          admin={true}
          renderList={setRendered}
        />
      </Container>
    );
  };

  let unapproved_list = lessons.map(renderLesson);

  return (
    <>
      {isAdmin ? (
        <>
          <h1>Admin Panel</h1>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="card"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ borderBottom: "solid 2px black" }}>
                Pending Approval -{" "}
              </h3>
              {unapproved_list}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10%",
              }}
            >
              {/* <h3 style={{borderBottom:'solid 2px black'}}>Last Lessons - </h3> */}
            </div>
          </div>
        </>
      ) : (
        <h1>Cant access admin page</h1>
      )}
    </>
  );
};

export default AdminPanel;
