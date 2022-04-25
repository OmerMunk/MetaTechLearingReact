import React, { useState } from "react";
import {
  Form,
} from "react-bootstrap";
import axios from "axios";
const SignUp = (props) => {
  const type = "teacher";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const secondPasswordChangeHandler = (event) => {
    setSecondPassword(event.target.value);
  };
  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };
  const birthDateChangeHandler = (event) => {
    setBirthDate(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };
  const phoneNumberChangeHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inside handle submit");
    if (password && password === secondPassword) {
      axios
        .post("/api/register", {
          email: email,
          password: password,
          first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
          last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1),
          birth_date: birthDate,
          phone_number: phoneNumber,
          address: address,
          type: type,
        })
        .then(() => {
          axios
            .post("/api/token/", {
              username: email,
              password: password,
            })
            .then((response) => {
              window.localStorage.setItem("token", response.data.token);
              props.logged();
              window.location.href = "/";
            })
            .catch((error) => {
              console.log(error);
              alert("Details Incorrect");
            });
        })
        .catch((error) => {
          if (error.response.status === 405) {
            alert("This Email is already taken");
          }
        });
    } else {
      alert("Passwords aren't matching");
    }
  };

  return (
    <section className="formWidth" style={{marginTop:'5%'}}>
      <Form className="card sign-up-form ">
        <div>
          <img style={{ width: "150px" }} src="MTLlogo.png" alt='MetaTechLearningLogo' />
          {/* <h2>Sign Up</h2> */}
        </div>
        <hr />
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
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={firstNameChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={lastNameChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            // placeholder="Email"
            value={birthDate}
            onChange={birthDateChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            onChange={addressChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={phoneNumberChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-Enter Password"
            value={secondPassword}
            onChange={secondPasswordChangeHandler}
          />
        </Form.Group>
        <button
          className="benLoginBtn"
          type="submit"
          style={{fontSize:'30px', marginTop:'30px'}}
          onClick={handleSubmit}
          // style={{ backgroundColor: "white", color: "black" }}
        >
          Sign Up
        </button>
      </Form>
    </section>
  );
};

export default SignUp;
