import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import './SingleLesson.css'
import SingleLessonExpendedModal from "./SingleLessonExpendedModal";
import SingleLessonEditModal from "./SingleLessonEditModal";
import axios from "axios";


const SingleLesson = (props) => {

    const approveLessonHandler = (event) => {
            event.preventDefault();
            axios.patch('http://127.0.0.1:8000/api/admin/approve', {
                id: props.id,
                approved: true
            },{headers: {Authorization: 'Token ' + props.token}}, )
                .then(response =>{
                    console.log(response)
                    props.toggle()
                    window.location.href=('admin_panel')
                })

    }


    const [showLessonModal, setShowLessonModal] = useState(false)
    const [showEditLessonModal, setShowEditLessonModal] = useState(false)

    const showModalHandler = () => {
        setShowLessonModal(!showLessonModal)
    }

    const showEditModalHandler = () => {
        setShowEditLessonModal(!showEditLessonModal)
    }

    const switchModals = () => {
        setShowLessonModal(!showLessonModal)
        setShowEditLessonModal(!showEditLessonModal)
    }

    return (
        <div>
                <Container  className="black_border">
                    <p>Lesson Date: {props.date} </p>
                    <p>Subject: {props.subject} </p>
                    <p>Student: {props.student} </p>
                    <Button style={{margin: '0.3rem 0.5rem'}} onClick={showModalHandler} variant='outline-primary'>View</Button>
                    {props.userType === 'teacher' &&
                        props.approved?
                        (<Button style={{margin: '0.3rem 0.5rem'}}  variant='success'>APPROVED</Button> )
                        :
                        (<>
                            {props.admin && <Button style={{margin: '0.3rem 0.5rem'}} onClick={approveLessonHandler}  variant='success'>APPROVE</Button> }

                            <Button style={{margin: '0.3rem 0.5rem'}} onClick={approveLessonHandler}  variant='secondary'>Pending Approval</Button>
                            <Button style={{margin: '0.3rem 0.5rem'}} onClick={showEditModalHandler} variant='outline-danger'>Edit</Button>
                        </>)

                    }


                </Container>
            <SingleLessonExpendedModal
                switch={switchModals}
                id={props.id}
                date={props.date}
                student={props.student}
                subject={props.subject}
                show={showLessonModal}
                toggle={showModalHandler}
                recordingUrl={props.recordingUrl}
                userType={props.userType}
                materialUrl={props.materialUrl}
                length={props.length}
                approved={props.approved}
            />
            <SingleLessonEditModal
                token={props.token}
                id={props.id}
                date={props.date}
                student={props.student}
                subject={props.subject}
                show={showEditLessonModal}
                toggle={showEditModalHandler}
                recordingUrl={props.recordingUrl}
                materialUrl={props.materialUrl}
                length={props.length}


            />
        </div>
    )
}

export default SingleLesson