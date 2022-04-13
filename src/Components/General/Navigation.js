import React, {useState} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import {useEffect} from "react";

const Navigation = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [logged, setLogged] = useState(props.logged)

    const token = window.localStorage.getItem('token');
    // const token = '17fb022bf3fcd7896553c7c36f64db1771d60148';

    useEffect(() => {
        if (token) {
            axios.get('http://127.0.0.1:8000/api/current_user', {headers: {Authorization: 'Token ' + token}})
                .then(response => {
                    if (response.status === 200) {
                        setFirstName(response.data.first_name);
                        setLastName(response.data.last_name)
                    } else if (response.status === 401) {
                        console.log("401")
                    }
                })
                .catch(error => {
                    console.log("error")
                })
        }
    }, [firstName,lastName,token])

    const toggleModal = () => {
        props.loginClicked()
    }

    const signOutToggle = () => {
        window.localStorage.removeItem('token')
        props.logged();
        window.location.href = '/'
    }


    return (
        <Navbar>
            <Container>
                <Navbar.Brand href='/'>
                    click1
                </Navbar.Brand>
                <Nav.Link>
                    click2
                </Nav.Link>
                <Nav.Link>
                    click3
                </Nav.Link>
                <Nav.Link>
                    click4
                </Nav.Link>
                <Navbar.Collapse className="justify-content-end">
                    {/*<Navbar.Text>*/}
                    <span>
                    {token ? (
                        <span style={{display: "flex"}}><Nav.Link href='/user_profile'>Hello {firstName} {lastName}</Nav.Link><Nav.Link onClick={signOutToggle}> Sign Out</Nav.Link></span>) : (<div style={{display: 'flex'}}>
                        <Nav.Link href='/sign_up'>Sign Up </Nav.Link>
                        <Nav.Link onClick={toggleModal}> Sign In</Nav.Link>
                    </div>)}
                    </span>
                    {/*</Navbar.Text>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;