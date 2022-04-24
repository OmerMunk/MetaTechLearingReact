import { Modal} from "react-bootstrap";
import React from "react";

const ContactUs = (props) => {

    return (
        <Modal show={props.showLogin}>
            <Modal.Header>
                <img
                    style={{width: "200px",fontWeight:'bolder', margin: "auto"}}
                    src="MTLlogo.png"
                    alt="metalogo"
                />
            </Modal.Header>
            <Modal.Body>

                <div style={{fontSize:'30px'}}>
                    <p>
Omer: &nbsp; +972 53-473-2232
                        <a
                            style={{
                                borderRadius:'45px',
                                marginLeft:'25px',
                                backgroundColor:'rgb(0,190,53)',
                                fontSize:'35px',
                                width:'45px',
                                height:'35px',
                                padding:'10px 15px'
                        }}
                            href="https://wa.me/+972534732242"
                            className="whatsapp"
                            target="_blank"
                        ><i className="fa fa-whatsapp"/></a>
                    </p>
                    <br/>
                    <p style={{width:'100%',justifyContent:'space-between'}}>
                        Ben: &emsp; +972 50-231-7575
                        <a

                            style={{
                                borderRadius:'45px',
                                marginLeft:'25px',
                                backgroundColor:'rgb(0,190,53)',
                                fontSize:'35px',
                                width:'45px',
                                height:'35px',
                                padding:'10px 15px'
                            }}
                            href="https://wa.me/+972502317575"
                            className="whatsapp"
                            target="_blank"
                        ><i className="fa fa-whatsapp"/></a>
                    </p>
                    <br/>

                    <p onClick={() => {
                        document.location = 'mailto:MetaTechLearning@gmail.com'
                    }}
                       onMouseOver="this.style.cursor='pointer'">
                        <a>
                        MetaTechLearning @gmail.com <i className="fa fa-envelope"
                                                       aria-hidden="true"/></a></p>

                </div>
            </Modal.Body>
            <Modal.Footer>

                <button
                    style={{width: "70px"}}
                    onClick={props.Clicked}
                    className="benBtn benCloseBtn"
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ContactUs