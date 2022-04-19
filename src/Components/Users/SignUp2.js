import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {Button, Form, ListGroup, Modal, ModalHeader, ModalTitle,} from "react-bootstrap";
import axios from "axios";
import useInput from "../../hooks/useInput";
import './SignUp.css'

const SignUp2 = (props) => {
    const type = 'student'
    const {
        value:email,
        isValid: emailIsValid,
        hadError:emailInputHasError,
        valueChangeHandler:emailChangeHandler,
        inputBlurHandler:emailBlurHandler,
        reset:resetEmailInput
    } = useInput((value) => value.trim() !== '' && value.includes('@') && value.includes('.'))

    console.log(emailInputHasError)

    const [password, setPassword] = useState();
    const [secondPassword, setSecondPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birthDate, setBirthDate] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    // const emailChangeHandler = (event) => {
    //     setEmail(event.target.value)
    // }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    const secondPasswordChangeHandler = (event) => {
        setSecondPassword(event.target.value)
    }
    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value)
    }
    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value)
    }
    const birthDateChangeHandler = (event) => {
        setBirthDate(event.target.value)
    }
    const addressChangeHandler = (event) => {
        setAddress(event.target.value)
    }
    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("inside handle submit")
        if (password && password === secondPassword) {
            axios.post('http://127.0.0.1:8000/api/register',
                {
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    birth_date: birthDate,
                    phone_number: phoneNumber,
                    address: address,
                    type: type
                }
            )
                .then(() => {
                    axios.post('http://127.0.0.1:8000/api/token/',
                        {
                            username: email,
                            password: password,
                        }
                    )
                        .then(response => {
                            window.localStorage.setItem("token", response.data.token)
                            props.logged();
                            window.location.href = '/'
                        })
                        .catch((error) => {
                            console.log(error)
                            alert("Details Incorrect")
                        })

                })
                .catch(error => {
                    if (error.response.status === 405) {
                        alert("This Email is already taken")
                    }
                })
        } else {
            alert("Passwords aren't matching")
        }
    }

    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'from-control'



    return (
        <Container>


            <Form>
                <Form.Group className={emailInputClasses}>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control
                        type="text"
                        id='email'
                        onBlur={emailBlurHandler}
                        placeholder="Email"
                        value={email}
                        onChange={emailChangeHandler}
                    />
                    {emailInputHasError && <p className='error-text'>Email must include @ and .</p> }
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUp2