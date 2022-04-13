import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import axios from "axios";
import AddLesson from "./addLesson";
import {Link} from "react-router-dom";

const UserProfile = (props) =>{

    const [userProfile, setUserProfile] = useState('')
    const [teachers, setTeachers] = useState()
    const [students, setStudents] = useState()
    const [token, setToken] = useState('')
    const [showAddModal, setShowAddModal] = useState(false);


    const getProfile = () => {
        const token = window.localStorage.getItem('token')
        setToken(token)
        axios.get('http://127.0.0.1:8000/api/user/profile',{headers: {Authorization: 'Token ' + token}})
            .then(response =>{
                console.log(response.data.profile.type.type)
                console.log(response.data.profile)
                setUserProfile(response.data.profile)
            })
        console.log(userProfile)
    }



    const getTeachers = () => {
        axios.get('http://127.0.0.1:8000/api/get_teachers', {headers: {Authorization: 'Token ' + token}} )
            .then(response =>{
                console.log(response.data)
            })
    }

    const showModal = () => {
        setShowAddModal(!showAddModal);
    }


    useEffect(() => {
        getProfile();
    },[])

    if (userProfile === ''){
        return (
            <h1>didnt load</h1>
        )
    }
    else if (userProfile.type.type === 'student') {
        return(
            <Container>
                <h1>User Profile Page</h1>
                <p>{userProfile.user.email}</p>
                <p>{userProfile.user.first_name}</p>
                <p>{userProfile.user.last_name}</p>
                <p>{userProfile.address}</p>
                <p>{userProfile.phone_number}</p>
                <p>{userProfile.birth_date.toString().substring(0,10)}</p>
            </Container>

        )
    }
    else if (userProfile.type.type === 'teacher') {
        return(
            <Container>
                <h1>User Profile Page</h1>
                <AddLesson showAdd={showAddModal} token={token} addClicked={showModal}  />
                <p>{userProfile.user.email}</p>
                <p>{userProfile.user.first_name}</p>
                <p>{userProfile.user.last_name}</p>
                <p>{userProfile.address}</p>
                <p>{userProfile.phone_number}</p>
                <p>{userProfile.birth_date.toString().substring(0,10)}</p>
                <Button onClick={showModal} >Add Lesson</Button>
                <Link to='/lessons_history'>Lessons History</Link>
            </Container>

        )
    }
}

export default UserProfile