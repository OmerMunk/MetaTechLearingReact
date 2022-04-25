import React, {useState} from "react";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./Components/General/Navigation";
import HomePage from "./Components/HomePage/HomePage";
import SignUp from "./Components/Users/SignUp";
import Login from "./Components/Users/Login";
import UserProfile from "./Components/Users/UserProfile";
import LessonHistory from "./Components/Lessons/LessonsHistory/LessonHistory";
import Tests from "./Components/Tests/Tests";
import UsersList from "./Components/Users/UsersList";
import AdminPanel from "./Components/Users/AdminPanel"

import "./Components/Styles/style.css";
import Footer from "./Components/HomePage/Footer";
import SideBar from "./Components/HomePage/SideBar";
import ContactUs from "./Components/General/ContactUs";

function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState();
    const [isLogged, setLogged] = useState(false);

    const LoginModalHandler = () => {
        setShowLoginModal(!showLoginModal);
    };

    const ContactModalHandler = () => {
        setShowContactModal(!showContactModal);
    };

    const tokenHandler = (value) => {
        window.localStorage.setItem("token", value)
    }


    const toggleLogged = () => {
        setLogged(!isLogged);
    };

    return (
        <>
        {/*<Container>*/}
            <Navigation loginClicked={LoginModalHandler} logged={toggleLogged} contactClicked={ContactModalHandler}/>
            <SideBar/>

            <Routes>
                {/*<Route path="/" element={<HomePage/>}/>*/}
                <Route path="/sign_up" element={<SignUp logged={toggleLogged}/>}/>
                <Route path="/user_profile/*" element={<UserProfile/>}/>
                <Route path="/users_list" element={<UsersList/>}/>
                <Route path="/lessons_history" element={<LessonHistory/>}/>
                <Route path="/tests" element={<Tests/>}/>
                <Route path='/admin_panel' element={<AdminPanel/>}/>
            </Routes>
            <Footer contactClicked={ContactModalHandler} />
            <ContactUs showLogin={showContactModal} Clicked={ContactModalHandler} />
            <Login showLogin={showLoginModal} loginClicked={LoginModalHandler} logged={toggleLogged}
                   tokenHandler={tokenHandler}/>
        {/*</Container>*/}
        </>

    );
}

export default App;
