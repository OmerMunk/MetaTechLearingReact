import {useEffect, useState} from "react";
import axios from "axios";


const UserTest = (props) => {
    const [token, setToken] = useState('')
    const [test,setTests] = useState([])

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        setToken(token)
        axios.get('http://127.0.0.1:8000/api/test_by_student',{headers: {Authorization: 'Token ' + token}})
            .then(res => setTests(res.data))
    },[])


    return (<div>
        <h4>Your tests:</h4>
        {!test && ''}
        {test && test.map((value,index) => {
            return <span className='testDiv' key={index}><h5>{value.test_id.name} - {value.grade}</h5> {value.grade < 90 ? <a href='/tests'>Try again!</a> : <p>Good Job!</p>} </span>
        })}
    </div>)
}

export default UserTest