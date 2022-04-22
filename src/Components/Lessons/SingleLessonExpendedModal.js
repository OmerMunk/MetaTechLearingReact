import React, {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const SingleLessonExpendedModal = (props) =>{


    return(
        <Modal show={props.show}>
            <Modal.Header>
                <h1>Lesson Details</h1>
            </Modal.Header>
            <Modal.Body>
                <h4>Date:  </h4>{props.date}<br/>
                <h4>Student: </h4> {props.student}<br/>
                <h4>Subject:  </h4>{props.subject}<br/>
                <h4>Recording:</h4>
                <div>
                    <iframe
                        width="50%"
                        height="50%"
                        src={`https://www.youtube.com/embed/${props.embedId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.switch}>Edit</Button>
                <Button onClick={props.toggle} variant='danger'>Close</Button>

            </Modal.Footer>
        </Modal>
    )


}

// SingleLessonExpendedModal.propTypes = {
//     embedId: PropTypes.string.isRequired
// };

export default SingleLessonExpendedModal