
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";

const EditDetailsFormModal = (props) => {

    const token = props.token
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const addressChangeHandler = (event) => {
        setAddress(event.target.value)
    }
    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value)
    }
    const birthDateChangeHandler = (event) => {
        setBirthDate(event.target.value)
    }
    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value)
    }
    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value)
    }

    // const toggleModal = () => {
    //     props.loginClicked()
    //     setAddress('')
    //     setPhoneNumber('')
    //     setBirthDate('')
    //     setFirstName('')
    //     setLastName('')
    // }

    const handleSubmit = (event) => {
        console.log(props.token)
        event.preventDefault();
        axios.patch('http://127.0.0.1:8000/api/user/profile', {
            first_name : firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address: address,
            birth_date: birthDate

        },{headers: {Authorization: 'Token ' + token}}, )
            .then(response =>{
                console.log(response);
                props.toggle()
            })
    }

    return(
        <Modal show={props.show}>
            <Form>
                <Modal.Header>
                    <h1>Edit Profile Details</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={firstNameChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={lastNameChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Address
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={addressChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Phone Number
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={phoneNumberChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Birth Date
                        </Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="BirthDate"
                            value={birthDate}
                            onChange={birthDateChangeHandler}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleSubmit} variant='primary'> Save</Button>
                    <Button onClick={props.toggle} variant='danger'>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
export default EditDetailsFormModal