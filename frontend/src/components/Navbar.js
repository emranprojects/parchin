import React from "react";
import appPaths from "../appPaths";
import {Nav, Navbar as BootstrapNavbar} from "react-bootstrap";
import loginUtils from "../utils/loginUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt,} from '@fortawesome/free-solid-svg-icons'
import LoginContext from "./LoginContext";
import githubIcon from "../static-media/github-logo-32.png"
import Container from "react-bootstrap/Container";

export default function Navbar() {

    function logout(loginContext) {
        loginUtils.logout()
        loginContext.setIsLoggedIn(false)
    }

    return (
        <LoginContext.Consumer>
            {loginContext =>
                <BootstrapNavbar className="navbar ml-auto p-2" bg="dark" expand="lg">
                    <Container fluid={true}>
                        <BootstrapNavbar.Brand href="/" className="navbar-dark">پرچین</BootstrapNavbar.Brand>
                        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark"/>
                        <BootstrapNavbar.Collapse id="basic-navbar-nav">
                            <Nav className="container-fluid justify-content-start">
                                {loginContext.isLoggedIn ? <>
                                        <Nav.Item>
                                            <a href="/" className="btn btn-dark" onClick={() => logout(loginContext)}>
                                                <abbr title="خروج"><FontAwesomeIcon icon={faSignOutAlt}/></abbr>
                                            </a>
                                        </Nav.Item>
                                    </> :
                                    <Nav.Item>
                                        <a href={appPaths.login} className="btn btn-dark">ورود</a>
                                    </Nav.Item>
                                }
                            </Nav>
                        </BootstrapNavbar.Collapse>
                    </Container>
                    <abbr title="GitHub repo">
                        <a href="https://github.com/emranprojects/parchin" target="_blank"
                           className="btn"><img src={githubIcon}/></a>
                    </abbr>
                </BootstrapNavbar>
            }
        </LoginContext.Consumer>
    )
}