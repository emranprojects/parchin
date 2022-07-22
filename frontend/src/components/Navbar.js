import React from "react";
import appPaths from "../appPaths";
import {Nav, Navbar as BootstrapNavbar} from "react-bootstrap";
import loginUtils from "../utils/loginUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt,} from '@fortawesome/free-solid-svg-icons'
import LoginContext from "./LoginContext";
import githubIcon from "../static-media/github-logo-32.png"

export default function Navbar() {

    function logout(loginContext) {
        loginUtils.logout()
        loginContext.setIsLoggedIn(false)
    }

    return (
        <LoginContext.Consumer>
            {loginContext =>
                <BootstrapNavbar className="navbar ml-auto p-2" bg="dark" expand="lg">
                    <Nav className="container-fluid">
                        <Nav.Item>
                            <BootstrapNavbar.Brand href="/" className="text-white">پرچین</BootstrapNavbar.Brand>
                        </Nav.Item>
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
                        <Nav.Item className="ml-auto">
                            <abbr title="GitHub repo">
                                <a href="https://github.com/emranprojects/parchin" target="_blank"
                                   className="btn btn-dark"><img src={githubIcon}/></a>
                            </abbr>
                        </Nav.Item>
                    </Nav>
                </BootstrapNavbar>
            }
        </LoginContext.Consumer>
    )
}