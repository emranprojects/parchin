import React, {useState} from "react"
import {Button, Nav, Navbar as BootstrapNavbar} from "react-bootstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Container from "react-bootstrap/Container"
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars"
import generalUtils from "../utils/generalUtils"
import apiUtils from "../utils/apiUtils"

export default function Navbar({setDrawerVisibleFunc}) {
    const [incomingFriendRequestsCount, setIncomingFriendRequestsCount] = useState(0)

    generalUtils.useEffectAsync(async () => {
        setIncomingFriendRequestsCount(await apiUtils.getIncomingFriendRequestsCount())
    })

    return (
        <BootstrapNavbar className="navbar ml-auto p-2" bg="dark" expand="lg">
            <Container fluid={true}>
                <Nav className="container-fluid justify-content-start">
                    <Nav.Item>
                        <Button className="bg-transparent border-0 shadow-none"
                                onClick={() => setDrawerVisibleFunc(v => !v)}>
                            <FontAwesomeIcon icon={faBars}/>
                            {incomingFriendRequestsCount > 0 &&
                            <sup className="bg-light ps-1 pe-1 rounded-1 text-dark">
                                {incomingFriendRequestsCount}
                            </sup>
                            }
                        </Button>
                    </Nav.Item>
                </Nav>
            </Container>
        </BootstrapNavbar>
    )
}