import React from "react";
import appPaths from "../appPaths";
import {Nav, Navbar as BootstrapNavbar} from "react-bootstrap";
import loginUtils from "../utils/loginUtils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt,} from '@fortawesome/free-solid-svg-icons'
import LoginContext from "./LoginContext";
import githubIcon from "../static-media/github-logo-32.png"
import Container from "react-bootstrap/Container";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

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
                        <BootstrapNavbar.Brand href="/" className="navbar-dark ms-3">پرچین</BootstrapNavbar.Brand>
                        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark"/>
                        <BootstrapNavbar.Collapse id="basic-navbar-nav">
                            <Nav className="container-fluid justify-content-start">
                                {loginContext.isLoggedIn ? <>
                                        <Nav.Item>
                                            <a href={appPaths.userProfile("self")}>
                                                <img style={{maxHeight: "40px"}}
                                                     className="rounded-5 ms-3 mt-1"
                                                     src="https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg"/>
                                            </a>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <a href={appPaths.userSearch} className="btn btn-dark">
                                                <abbr title="جستجوی کاربران">
                                                    <FontAwesomeIcon icon={faSearch}/>
                                                </abbr>
                                            </a>
                                        </Nav.Item>
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