import React, {useState} from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import {Container} from "react-bootstrap";
import Navigation from "./Components/General/Navigation";
import HomePage from "./Components/HomePage/HomePage";
import SignUp from "./Components/Users/SignUp";
import Login from "./Components/Users/Login";
import UserProfile from "./Components/Users/UserProfile";
import LessonHistory from "./Components/Lessons/LessonsHistory/LessonHistory";
import Tests from "./Components/Tests/Tests";
import UsersList from "./Components/Users/UsersList";
import AdminPanel from "./Components/Users/AdminPanel"


function App() {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLogged, setLogged] = useState(false);


    const tokenHandler = (value) => {
        window.localStorage.setItem("token", value)
    }

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
                <Route path="/" element={<HomePage />}/>
                <Route path="/sign_up" element={<SignUp logged={toggleLogged} />}/>
                <Route path="/user_profile/*" element={<UserProfile />}/>
                <Route path="/users_list" element={<UsersList />}/>
                <Route path='/lessons_history' element={<LessonHistory />}/>
                <Route path='/tests' element={<Tests/>}/>
                <Route path='/admin_panel' element={<AdminPanel />} />

            </Routes>
            <Login showLogin={showLoginModal} loginClicked={showModal} logged={toggleLogged}
                   tokenHandler={tokenHandler}/>
        </Container>
    );
}

export default App;
