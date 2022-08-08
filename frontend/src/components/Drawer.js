import Offcanvas from "react-bootstrap/Offcanvas"
import React, {useEffect, useState} from "react"
import appPaths from "../appPaths"
import Container from "react-bootstrap/Container"
import CenteredRow from "./CenteredRow"
import generalUtils from "../utils/generalUtils"
import requestUtils from "../utils/requestUtils"
import apiURLs from "../apiURLs"
import loginUtils from "../utils/loginUtils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
import LoginContext from "./LoginContext"
import githubIcon from "../static-media/github-logo-32.png"
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch"
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers"
import Row from "react-bootstrap/Row"
import apiUtils from "../utils/apiUtils"

export default function ({visible: visibleProp, onHide = () => undefined}) {
    const [visible, setVisible] = useState(visibleProp)
    const [isLoggedIn, setIsLoggedIn] = useState(loginUtils.isLoggedIn())
    const [user, setUser] = useState({first_name: "", last_name: ""})
    const [incomingFriendRequestsCount, setIncomingFriendRequestsCount] = useState(0)

    function logout(loginContext) {
        loginUtils.logout()
        loginContext.setIsLoggedIn(false)
    }

    useEffect(() => {
        setVisible(visibleProp)
    }, [visibleProp])

    generalUtils.useEffectAsync(async () => {
        if (!isLoggedIn)
            return
        const resp = await requestUtils.get(apiURLs.selfUser, () => setIsLoggedIn(false))
        if (resp.ok)
            setUser(await resp.json())
    })

    generalUtils.useEffectAsync(async () => {
        setIncomingFriendRequestsCount(await apiUtils.getIncomingFriendRequestsCount())
    })


    return (
        <LoginContext.Consumer>
            {loginContext =>
                <Offcanvas show={visible} onHide={onHide} placement="end">
                    <Offcanvas.Header closeButton={true}>
                        <Offcanvas.Title><h4>پرچین</h4></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Container className="g-2">
                            {isLoggedIn ? <>
                                    <CenteredRow>
                                        <a href={appPaths.userProfile("self")}>
                                            <img style={{maxHeight: "100px"}}
                                                 className="rounded-circle"
                                                 src="https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg"/>
                                        </a>
                                    </CenteredRow>
                                    <CenteredRow className="mt-3 mb-4">
                                        <h4>{user.first_name} {user.last_name}</h4>
                                    </CenteredRow>
                                    <Row className="mb-2">
                                        <a href={appPaths.friendRequests}
                                           className="btn btn-outline-primary w-100 text-end">
                                            <FontAwesomeIcon icon={faUsers}/> درخواست‌های دوستی
                                            &nbsp;
                                            <sup className="bg-primary ps-1 pe-1 rounded-1 text-white">
                                                {incomingFriendRequestsCount}
                                            </sup>
                                        </a>
                                    </Row>
                                    <Row>
                                        <a href={appPaths.userSearch} className="btn btn-outline-primary  w-100 text-end">
                                            <FontAwesomeIcon icon={faSearch}/> جستجوی کاربران
                                        </a>
                                    </Row>
                                    <CenteredRow className="mt-4">
                                        <a href="/" className="btn btn-outline-secondary"
                                           onClick={() => logout(loginContext)}>
                                            <FontAwesomeIcon icon={faSignOutAlt}/> خروج
                                        </a>
                                    </CenteredRow>
                                </>
                                :
                                <CenteredRow className="mt-4">
                                    <a href={appPaths.login} className="btn btn-outline-primary">ورود به پرچین</a>
                                </CenteredRow>
                            }
                        </Container>
                        <Container style={{position: "absolute", bottom: 0}} className="pb-2">
                            <CenteredRow>
                                <abbr title="GitHub repo">
                                    <a href="https://github.com/emranprojects/parchin" target="_blank"
                                       className="btn"><img src={githubIcon}/></a>
                                </abbr>
                            </CenteredRow>
                        </Container>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </LoginContext.Consumer>
    )
}