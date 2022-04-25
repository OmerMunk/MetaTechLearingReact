import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Navigation = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("/api/current_user", {
          headers: { Authorization: "Token " + token },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.is_superuser) {
              setIsAdmin(true);
              setFirstName(response.data.username);
            } else {
              // console.log('not super')
              setFirstName(response.data.first_name);
              setLastName(response.data.last_name);
            }
          } else if (response.status === 401) {
            console.log("401");
          }
        })
        .catch((error) => {
          console.log(error);
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
    <div style={{ width: "100%", zIndex: "100" }}>
      <nav className="navBar">
        {/*<ul >*/}
        <div
          style={{
            zIndex: "100",
            display: "flex",
            position: "fixed",
            justifyContent: "space-evenly",
            left: "10%",
            flexDirection: "row",
            width: "80%",
            top: "15px",
          }}
        >
          {/*<div style={{display:'flex',position:'fixed',justifyContent:'space-evenly',flexDirection:'row',width:'100%' ,top:'0'}} className="flex sm-font">*/}
          <a href="/" className="links">
            <img
              style={{ width: "45px", transform: "translateY(-10px)" }}
              className="Logo"
              src="MetaIconColor.png"
              alt="MetaTechLogo"
            />
          </a>
          <a className="links" href="/users_list">
            Our Teachers
          </a>
          <a href="/tests" className="links">
            Test Yourself
          </a>
          <a
            className="links"
            onClick={() => {
              window.location.href = "/#about";
            }}
          >
            About Us
          </a>
          <a className="links" onClick={props.contactClicked}>
            Contact Us
          </a>
          {token ? (
            isAdmin ? (
              <span>
                <a className="links signArea" href="/admin_panel">
                  Admin Panel {firstName}
                </a>
                <span className="signArea"> | </span>{" "}
                <a className="links signArea" onClick={signOutToggle}>
                  {" "}
                  Sign Out
                </a>
              </span>
            ) : (
              <span>
                <a className="links signArea " href="/user_profile">
                  Hello {firstName} {lastName}
                </a>{" "}
                <span className="signArea"> | </span>
                <a className="links signArea" onClick={signOutToggle}>
                  Sign Out
                </a>
              </span>
            )
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
        {/*</ul>*/}
      </nav>
    </div>
  );
};

export default Navigation;
