import React from "react";
import { Modal } from "react-bootstrap";

const UserDetailsModal = (props) => {
  const closeModal = () => {
    props.close();
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        {props.userProfile.profile.user.first_name} User Profile Page
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Email</strong>: {props.userProfile.profile.user.email}
        </p>
        <p>
          <strong>First Name:</strong>{" "}
          {props.userProfile.profile.user.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {props.userProfile.profile.user.last_name}
        </p>
        <p>
          <strong>Address:</strong> {props.userProfile.profile.address}
        </p>
        <p>
          <strong>Phone Number:</strong>{" "}
          {props.userProfile.profile.phone_number}
        </p>

        <p>
          <strong>Birth Date:</strong>{" "}
          {props.userProfile.profile.birth_date.toString().substring(0, 10)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="benBtn benCloseBtn" onClick={closeModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
