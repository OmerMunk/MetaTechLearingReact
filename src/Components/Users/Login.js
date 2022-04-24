import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://ec2-3-80-102-89.compute-1.amazonaws.com/api/token/", {
        username: email,
        password: password,
      })
      .then((response) => {
        props.tokenHandler(response.data.token);
        // console.log(response)
        props.loginClicked();
        setEmail("");
        setPassword("");
        props.logged();
        Window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.status);
        alert("Details Incorrect");
      });
  };

  const toggleModal = () => {
    props.loginClicked();
    setEmail("");
    setPassword("");
  };

  return (
    <Modal show={props.showLogin}>
      <Form>
        <Modal.Header>
          <img
            style={{ width: "200px", margin: "auto" }}
            src="MTLlogo.png"
            alt="metalogo"
          />
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={emailChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={passwordChangeHandler}
            />
          </Form.Group>
          {/* <a href='/'>Forgot Your Password?</a> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{ width: "100px" }}
            type="submit"
            onClick={handleSubmit}
            className="benBtn benGreenBtn"
          >
            {" "}
            Sign In
          </button>
          <button
            style={{ width: "70px" }}
            onClick={toggleModal}
            className="benBtn benCloseBtn"
          >
            Close
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Login;
