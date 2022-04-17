import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
import TestResult from "../UI/TestResult";


const SingleTest = (props) => {
    const singleTest = props.singleTest;
    const [result,setResult] = useState('')
    const [showResult,setShowResult] = useState(false)
    let answers = [];

    const handleSubmit = (event) => {
        let token = window.localStorage.getItem('token')
        if (!token) {
            token = '4ffd578e3f01888c7791bad6d78c439e7da40940'
        }
        event.preventDefault()
        let finalAns = {}
        answers.map(value => finalAns[value[0]] = value[1])
        axios.post('http://127.0.0.1:8000/api/test/'+props.singleTest.id,finalAns,{headers: {Authorization: 'Token ' + token}})
            .then(response => {
                setResult(response.data)
                setShowResult(true)
                props.close()
            })
            .catch(error => console.log(error))
    }


    const onValueChange = (q_id, event) => {
        let newElem = [q_id, event.target.value]
        answers.push(newElem)

    }
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

        return (<>
                {!singleTest.questions && <h1></h1>}
                {singleTest.questions &&
                    <Modal show={props.show}>
                        <Form>
                            <Modal.Header>
                                <h1>{singleTest.name}</h1>
                            </Modal.Header>
                            <Modal.Body>
                                {singleTest.questions.map((value, index) => {
                                    let ansList = [value.option1,value.option2,value.option3,value.option4]
                                    ansList = shuffle(ansList)
                                    return <Form.Group key={value.id}>
                                        <Form.Label id={index + 1}>
                                            <h3>{value.question}</h3>
                                        </Form.Label>
                                        <Form.Check required={true}  name={'answer' + value.id} value={ansList[0]} type={"radio"}
                                                    label={ansList[0]}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                        <Form.Check required={true} name={'answer' + value.id} value={ansList[1]} type={"radio"}
                                                    label={ansList[1]}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                        <Form.Check required={true} name={'answer' + value.id} value={ansList[2]} type={"radio"}
                                                    label={ansList[2]}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                        <Form.Check required={true} name={'answer' + value.id} value={ansList[3]} type={"radio"}
                                                    label={ansList[3]}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                    </Form.Group>
                                })}


                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleSubmit} type='submit'>Submit Test</Button>
                                <Button onClick={props.close} variant={"danger"}>Close</Button>
                            </Modal.Footer>


                        </Form>
                    </Modal>
                }
            {result && showResult && <TestResult show={showResult} message={result} />}
            </>

        )
    }

export default SingleTest;