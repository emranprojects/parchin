import React from "react"
import appPaths from "../appPaths"
import {Button, Nav, Navbar as BootstrapNavbar} from "react-bootstrap"
import loginUtils from "../utils/loginUtils"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import LoginContext from "./LoginContext"
import githubIcon from "../static-media/github-logo-32.png"
import Container from "react-bootstrap/Container"
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch"
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars"

export default function Navbar({setDrawerVisibleFunc}) {

    function logout(loginContext) {
        loginUtils.logout()
        loginContext.setIsLoggedIn(false)
    }

    return (
        <LoginContext.Consumer>
            {loginContext =>
                <BootstrapNavbar className="navbar ml-auto p-2" bg="dark" expand="lg">
                    <Container fluid={true}>
                        <Nav className="container-fluid justify-content-start">
                                    <Nav.Item>
                                        <Button className="bg-transparent border-0 shadow-none"
                                                onClick={() => setDrawerVisibleFunc(v => !v)}>
                                            <FontAwesomeIcon icon={faBars}/>
                                        </Button>
                                    </Nav.Item>
                        </Nav>
                    </Container>
                </BootstrapNavbar>
            }
        </LoginContext.Consumer>
    )
}