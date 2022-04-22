import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import UserDetails from "./UserDetails";

const UsersList = (props) => {
  const token = window.localStorage.getItem("token");
  const baseURL = "http://127.0.0.1:8000/api/all_users";
  const [users, setUsers] = useState([]);
  const [enteredSearch, setEnteredSearch] = useState("");
  const [searchByName, setSearchByName] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [choseUser, setChoseUser] = useState();
  const [touched, setTouched] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const getAllUsers = () => {
    axios
      .get(baseURL, { headers: { Authorization: "Token " + token } })
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  };

  const userClickHandler = (user) => {
    setChoseUser(user);

    setShowModal(true);
  };

  const inputChangeHandler = (e) => {
    if (!touched) {
      setTouched(true);
    }
    setEnteredSearch(e.target.value);
    // console.log("start to search with: " + enteredSearch);
    axios
      .get(`${baseURL}?search_user=${enteredSearch}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
    // setUsers(users.find(value => value.last_name === enteredSearch))
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Fragment>
      <div className="text-center search ">
        <h3 className="md-font">Search Teacher: </h3>
        <hr />
        <input
          placeholder="   Name/Phone Number/Email"
          type="text"
          value={enteredSearch}
          onChange={inputChangeHandler}
        />
        {/* <button onClick={() => setSearchByName(true)}>Search</button> */}
        {users.length === 0 && !touched && (
          <div>
            <p className="m-1 p-1">Start typing to search for teacher!</p>or{" "}
            <br />
            <button className="searchBtn" onClick={getAllUsers}>
              View all teachers
            </button>
          </div>
        )}
        {users && ""}
        {users &&
          users.map((value, index) => {
            return (
              <div key={index}>
                <div className="card " onClick={() => userClickHandler(value)}>
                  <strong>Name:</strong> {value.user.first_name}{" "}
                  {value.user.last_name},<br /> <strong>Email:</strong>{" "}
                  {value.user.email}
                  <br />
                  <strong>Phone Number:</strong> {value.phone_number}
                </div>
                <br />
              </div>
            );
          })}
        {users.length === 0 && touched && (
          <div>
            No teachers found! <br />
            <button onClick={getAllUsers} className="searchBtn">
              View All
            </button>
          </div>
        )}
        {choseUser && ""}
        {choseUser && (
          <UserDetails
            show={showModal}
            userProfile={choseUser}
            close={closeModal}
          />
        )}
      </div>
    </Fragment>
  );
};
export default UsersList;
