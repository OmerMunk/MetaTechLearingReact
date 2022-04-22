import React, {Fragment} from "react";
import {Button, Modal} from "react-bootstrap";


const UserDetailsModal = (props) => {

    const closeModal = () => {
        props.close()
    }

    return <Modal show={props.show}>
        <Modal.Header>
            {props.userProfile.first_name} User Profile Page
        </Modal.Header>
            <Modal.Body>
            <p><strong>Email</strong>: {props.userProfile.user.email}</p>
            <p><strong>First Name:</strong> {props.userProfile.user.first_name}</p>
            <p><strong>Last Name:</strong> {props.userProfile.user.last_name}</p>
            <p><strong>Address:</strong> {props.userProfile.address}</p>
            <p><strong>Phone Number:</strong> {props.userProfile.phone_number}</p>
            <p><strong>Birth Date:</strong> {props.userProfile.birth_date.toString().substring(0, 10)}</p>
            </Modal.Body>
        <Modal.Footer>
            <Button variant='danger' onClick={closeModal}>Close</Button>
        </Modal.Footer>
        </Modal>



}

export default UserDetailsModal