import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import UserDetails from "./UserDetails";


const UsersList = props => {
    const token = window.localStorage.getItem('token')
    const baseURL = 'http://127.0.0.1:8000/api/all_users'
    const [users,setUsers] = useState([])
    const [enteredSearch,setEnteredSearch] = useState('')
    const [searchByName,setSearchByName] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [choseUser,setChoseUser] = useState()

    const closeModal = () => {
        setShowModal(false)
    }

    const getAllUsers = () => {

        console.log('as')
        axios.get(baseURL,{headers: {Authorization: 'Token ' + token}})
            .then(res => setUsers(res.data))
            .catch(error => console.log(error))
    }

    const userClickHandler = (user) => {
        setChoseUser(user)
        console.log(choseUser)
        setShowModal(true)
    }

    const inputChangeHandler = (e) => {
        setEnteredSearch(e.target.value)
        console.log('start to search with: '+enteredSearch)
        axios.get(`${baseURL}?search_user=${enteredSearch}`,{headers: {Authorization: 'Token ' + token}})
            .then(res => setUsers(res.data))
            .catch(error => console.log(error))
        // setUsers(users.find(value => value.last_name === enteredSearch))
    }

    useEffect(() => {
        getAllUsers()
    },[])



    return (
        <Fragment>
            <label>Search By First Name: </label>
            <input type='text' value={enteredSearch} onChange={inputChangeHandler} />
            <button onClick={() => setSearchByName(true)}>Search</button>
            {users && ''}
            {users && users.map((value,index) => {
                return <div key={index}>
                    <button style={{backgroundColor:'transparent'}} onClick={() => userClickHandler(value)} >
                        {value.user.first_name} {value.user.last_name}
                    </button>
                    <br/>
                </div>
            })}
            {choseUser && ''}
            {choseUser && <UserDetails show={showModal} userProfile={choseUser} close={closeModal} />}
        </Fragment>
    )

}
export default UsersList