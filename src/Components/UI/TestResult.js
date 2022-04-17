import {Button, Modal, ModalBody} from "react-bootstrap";


const TestResult =(props) => {
    return <Modal show={props.show}>
        <Modal.Header>
            <h1>Test Result</h1>
        </Modal.Header>
        <Modal.Body>
            <strong>{props.message}</strong>
        </Modal.Body>
        <Modal.Footer>
            <a href='/'>Home</a> <a href='/tests'>Take another one!</a>
        </Modal.Footer>
    </Modal>
}

export default TestResult