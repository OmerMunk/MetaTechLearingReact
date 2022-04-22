import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

const Navigation = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [logged, setLogged] = useState(props.logged);

  const token = window.localStorage.getItem("token");
  // const token = '17fb022bf3fcd7896553c7c36f64db1771d60148';

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/current_user", {
          headers: { Authorization: "Token " + token },
        })
        .then((response) => {
          if (response.status === 200) {
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
          } else if (response.status === 401) {
            console.log("401");
          }
        })
        .catch((error) => {
          console.log("error");
        });
    }
  }, [firstName, lastName, token]);

  const toggleModal = () => {
    props.loginClicked();
  };

  const signOutToggle = () => {
    window.localStorage.removeItem("token");
    props.logged();
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="navBar">
        <ul>
          <div className="flex sm-font">
            <a href="/" className="Logo">
              <img className="Logo" src="MetaIconColor.png" />
            </a>
            <a className="links" href="/users_list">
              Our Teachers
            </a>
            <a href="/tests" className="links">
              Test Yourself
            </a>
            <a className="links" href="#">
              Contact Us
            </a>
            {token ? (
              <span>
                <a className="links signArea " href="/user_profile">
                  Hello {firstName} {lastName}
                </a>{" "}
                <span className="signArea"> | </span>
                <a className="links signArea" onClick={signOutToggle}>
                  Sign Out
                </a>
              </span>
            ) : (
              <span>
                <a className="links signArea" href="/sign_up">
                  Sign Up{" "}
                </a>
                <span className="signArea"> | </span>
                <a className="links signArea" onClick={toggleModal}>
                  {" "}
                  Sign In
                </a>
              </span>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
