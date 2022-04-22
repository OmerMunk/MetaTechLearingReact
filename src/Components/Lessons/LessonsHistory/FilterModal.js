import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";


const FilterModal = (props) => {

    const [choice, setChoice] = useState(false)
    const [byStudent, setByStudent] = useState(false)
    const [byDate, setByDate] = useState(false)
    const [bySubject, setBySubject] = useState(false)
    const [type, setType] = useState(null)
    const [details, setDetails] = useState(null)

    const clickedByDate = () => {
        setChoice(!choice)
        setByDate(!byDate)
        setType('date')
        setDetails({from: '', to: ''})

    }

    const clickedByStudent = () => {
        setChoice(!choice)
        setByStudent(!byStudent)
        setType('student')

    }

    const clickedBySubject = () => {
        setChoice(!choice)
        setBySubject(!bySubject)
        setType('subject')

    }

    const handleSubmit = () => {
        props.setFilterType(type)
        props.setFilterDetails(details)
        closeModal()
    }

    const changeFromDateHandler = (event) =>{
        const from = event.target.value
        const to = details.to
        setDetails({from: from, to: to})
    }

    const changeToDateHandler = (event) =>{
        const from = details.from
        const to = event.target.value
        setDetails({from: from, to: to})
    }

    const closeModal = () => {
        setChoice(false)
        setByDate(false)
        setByStudent(false)
        setBySubject(false)
        setType(null)
        setDetails(null)
        props.toggle()
    }


    return (
        <Modal show={props.show}>
            <Modal.Header>
                {!choice && <h1>Filter Lessons</h1>}
                {byDate && <h1>Filter Lessons By Date</h1>}
                {bySubject && <h1>Filter Lessons By Subject</h1>}
                {byStudent && <h1>Filter Lessons By Student</h1>}

            </Modal.Header>
            <Modal.Body>
                {!choice && <div><Button onClick={clickedByDate} >By Date</Button>
                    <Button onClick={clickedByStudent}>By Student</Button>
                    <Button onClick={clickedBySubject}>By Subject</Button></div>}

                {byDate && <div>
                    <label>From:</label>
                    <input onChange={changeFromDateHandler} value={details.from} type='date'/>

                    <label>To:</label>
                    <input onChange={changeToDateHandler} value={details.to} type='date'/>
                </div>}


                {byStudent && <Button onClick={clickedByStudent} >Choose Other Filter Type</Button>}
                {byDate && <Button onClick={clickedByDate} >Choose Other Filter Type</Button>}
                {bySubject && <Button onClick={clickedBySubject} >Choose Other Filter Type</Button>}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant='warning'>Filter</Button>
                <Button onClick={closeModal} variant='danger'>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterModal