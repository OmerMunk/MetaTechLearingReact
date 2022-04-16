import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Navbar} from "react-bootstrap";
import Navigation from "./Components/General/Navigation";
import HomePage from "./Components/HomePage/HomePage";
import SignUp from "./Components/Users/SignUp";
import Login from "./Components/Users/Login";
import UserProfile from "./Components/Users/UserProfile";
import LessonHistory from "./Components/Lessons/LessonsHistory/LessonHistory";
import Tests from "./Components/Tests/Tests";
import SingleTest from "./Components/Tests/SingleTest";


function App() {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLogged, setLogged] = useState(false);


    const showModal = () => {
        setShowLoginModal(!showLoginModal);
    }

    const toggleLogged = () => {
        setLogged(!isLogged)

    }


    return (
        <Container>
            <Navigation  loginClicked={showModal} logged={toggleLogged}/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/sign_up" element={<SignUp logged={toggleLogged} />}/>
                <Route path="/user_profile" element={<UserProfile/>}/>
                <Route path='/lessons_history' element={<LessonHistory/>} />
                <Route path='/tests' element={<Tests />} />


            </Routes>
            <Login showLogin={showLoginModal} loginClicked={showModal} logged={toggleLogged}/>
        </Container>
    );
}

export default App;
