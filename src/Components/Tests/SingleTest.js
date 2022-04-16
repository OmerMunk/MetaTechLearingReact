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
        event.preventDefault()
        let finalAns = {}
        answers.map(value => finalAns[value[0]] = value[1])
        axios.post('http://127.0.0.1:8000/api/test/'+props.singleTest.id,finalAns)
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
                                    return <Form.Group key={value.id}>
                                        <Form.Label id={index + 1}>
                                            <h3>{value.question}</h3>
                                        </Form.Label>
                                        <Form.Check name={'answer' + value.id} value={value.option1} type={"radio"}
                                                    label={value.option1}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                        <Form.Check name={'answer' + value.id} value={value.option2} type={"radio"}
                                                    label={value.option2}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                        <Form.Check name={'answer' + value.id} value={value.option3} type={"radio"}
                                                    label={value.option3}
                                                    onChange={(event) => onValueChange(value.id, event)}/>

                                        <Form.Check name={'answer' + value.id} value={value.option4} type={"radio"}
                                                    label={value.option4}
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