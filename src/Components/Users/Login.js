import React, {useState} from "react";
import {Form, Button, Modal} from "react-bootstrap";
import axios from "axios";
import {Redirect} from "react-router";

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/token/',
            {
                username: email,
                password: password,
            }
        )
            .then(response => {
                window.localStorage.setItem("token", response.data.token)
                // console.log(response)
                props.loginClicked()
                setEmail('')
                setPassword('')
                props.logged();
                Window.location.href='/'
            })
            .catch(error => {
                console.log(error.response.status)
                alert("Details Incorrect")
            })

    }

    const toggleModal = () => {
        props.loginClicked()
        setEmail('')
        setPassword('')
    }

    return (
        <Modal show={props.showLogin}>
            <Form>


                <Modal.Header>
                   <h1>Sign In</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={emailChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={passwordChangeHandler}
                        />
                    </Form.Group>
                    <a href='/'>Forgot Your Password?</a>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleSubmit} variant='primary'> Sign In</Button>
                    <Button onClick={toggleModal} variant='danger'>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default Login;