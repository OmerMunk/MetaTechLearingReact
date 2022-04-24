import {Dropdown} from "react-bootstrap";
import CustomToggle from "../UI/CustomToggle";
import CustomMenu from "../UI/CustomMenu";
import React, {useEffect, useState} from "react";
import axios from "axios";

const AddSubject = (props) => {
    const [subjects, setSubjects] = useState([])


    const addSubjectHandler = (value) => {
        const token = window.localStorage.getItem('token')
        if (token) {
            axios
                .post("http://ec2-3-80-102-89.compute-1.amazonaws.com/api/subject", {subject:value}, {
                    headers: {
                        Authorization: "Token " + token,
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    props.renderSubjects()
                })
        }
    }

    useEffect(() => {
        getSubjects()

    }, [])

    const getSubjects = () => {
        const token = window.localStorage.getItem('token')
        axios.get("http://ec2-3-80-102-89.compute-1.amazonaws.com/api/get_subjects", {
            headers: {
                Authorization: "Token " + token,
            },
        })
            .then((response => {
                const subject_names = response.data.map((value) => {
                    return (
                        value.subject_name
                    )
                })
                setSubjects(subject_names)
                console.log("aa")
                console.log(subject_names)
                console.log("aa")
            }))
    }

    const subjectList = subjects.map((value) => {
        return (
            <Dropdown.Item onClick={()=> addSubjectHandler(value)} >{value}</Dropdown.Item>
        )
    })



    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <button className="benBtn">Add Subject</button>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{height:'300px',overflowY:'scroll'}} flip={false} as={CustomMenu}>
                {subjectList}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AddSubject