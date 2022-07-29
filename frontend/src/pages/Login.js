import React, {useMemo, useState} from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import apiURLs from "../apiURLs"
import {Navigate} from "react-router-dom"
import "./Login.css"
import appPaths from "../appPaths"
import {toast} from 'react-toastify'
import LoginContext from "../components/LoginContext"
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha,
} from 'react-google-recaptcha-v3'
import generalUtils from "../utils/generalUtils"
import requestUtils from "../utils/requestUtils"
import {Col} from "react-bootstrap"
import loginUtils from "../utils/loginUtils"
import MultiStageComponent from "../components/MultiStageComponent"
import constants from "../utils/constants"

export default function () {
    const isLoggedIn = useMemo(() => loginUtils.isLoggedIn(), []);

    const components = isLoggedIn ? [
        <UserRequiredInfoStage/>,
        <Navigate to={appPaths.timeline}/>,
    ] : [
        <PhoneNumberStage/>,
        <CodeSubmitStage/>,
        <UserRequiredInfoStage/>,
        <Navigate to={appPaths.timeline}/>,
    ]
    return (
        <GoogleReCaptchaProvider reCaptchaKey={constants.GOOGLE_RECAPTCHA_KEY}>
            <MultiStageComponent components={components}/>
        </GoogleReCaptchaProvider>
    )
}

function PhoneNumberStage({sharedData, goNextStage}) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [recaptcha, setRecaptcha] = useState("")

    async function requestCode(event) {
        event.preventDefault()

        if (phoneNumber === "") {
            toast.error("شماره همراه را وارد کنید!")
            return
        }
        const [isPhoneNumberOk, normalizedPhoneNumber] = generalUtils.normalizePhoneNumber(phoneNumber)
        if (!isPhoneNumberOk) {
            toast.error("شماره همراه اشتباه است!")
            return
        }
        const resp = await requestUtils.post(apiURLs.requestLoginCode, {
            phone_number: normalizedPhoneNumber,
            recaptcha: recaptcha,
        }, () => undefined, false)
        // const resp = {status: 202}
        if (resp.status === 202) {
            toast.success("کد تایید ارسال شد!")
            goNextStage(normalizedPhoneNumber)
        }
    }

    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <Col lg={4} md={6} sm={12} className="m-auto">
                    <Card>
                        <Card.Header className="text-center">ورود به پرچین</Card.Header>
                        <Card.Body>
                            <Form onSubmit={requestCode}>
                                <Form.Control type="number"
                                              className="mb-3"
                                              dir="ltr"
                                              placeholder="تلفن همراه"
                                              value={phoneNumber}
                                              onChange={e => setPhoneNumber(e.target.value)}
                                />
                                <GoogleReCaptcha action="auth-code" onVerify={setRecaptcha}
                                                 refreshReCaptcha="1"/>
                                <Button type="submit" variant="primary">دریافت کد تایید</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

function CodeSubmitStage({sharedData: phoneNumber, goNextStage}) {
    const [recaptcha, setRecaptcha] = useState("")
    const [authCode, setAuthCode] = useState("")

    async function verifyCode(event, loginContext) {
        event.preventDefault()

        const [isPhoneNumberOk, normalizedPhoneNumber] = generalUtils.normalizePhoneNumber(phoneNumber)
        const resp = await requestUtils.post(apiURLs.submitLoginCode, {
            phone_number: normalizedPhoneNumber,
            recaptcha: recaptcha,
            auth_code: authCode,
        }, () => undefined, false)
        // const resp = {status: 200, json: async () => ({token: "ABC"})}
        switch (resp.status) {
            case 400:
                toast.error("کد تایید اشتباه است!")
                return
            case 200:
            case 201:
                toast.success("خوش آمدید!")
                loginUtils.setLoggedIn((await resp.json()).token)
                loginContext.setIsLoggedIn(true)
                goNextStage(phoneNumber)
                break
            default:
                toast.error("خطای غیرمنتظره! کد: " + resp.status)
                return
        }
    }

    return (
        <LoginContext.Consumer>
            {loginContext =>
                <Container>
                    <Row className="mb-5"/>
                    <Row>
                        <Col lg={4} md={6} sm={12} className="m-auto">
                            <Card>
                                <Card.Header className="text-center">ورود به پرچین</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={(e) => verifyCode(e, loginContext)}>
                                        <span>کد تایید به شماره‌ی {phoneNumber} پیامک شد. لطفا آن را در کادر زیر وارد کنید.</span>
                                        <Form.Control type="number"
                                                      className="mb-3"
                                                      dir="ltr"
                                                      placeholder="کد تایید"
                                                      value={authCode}
                                                      onChange={e => setAuthCode(e.target.value)}
                                        />
                                        <GoogleReCaptcha action="auth-code" onVerify={setRecaptcha}
                                                         refreshReCaptcha="2"/>
                                        <Button type="submit" variant="primary"
                                                disabled={authCode.length !== 5}>ورود</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            }
        </LoginContext.Consumer>
    )
}

function UserRequiredInfoStage({sharedData, goNextStage}) {
    const [user, setUser] = useState({
        id: "",
        first_name: "",
        last_name: "",
        phone_number: "",
    })
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const isUserFetched = user.id !== ""

    generalUtils.useEffectAsync(async () => {
        const resp = await requestUtils.get(apiURLs.selfUser)
        setUser(await resp.json())
    }, [])

    if (!isUserFetched)
        return <span>لطفا منتظر بمانید...</span>

    if (user.first_name && user.last_name) {
        goNextStage()
        return
    }

    async function updateUserInfo(event) {
        event.preventDefault()

        const resp = await requestUtils.put(apiURLs.selfUser, {
            id: user.id,
            phone_number: user.phone_number,
            first_name: newFirstName,
            last_name: newLastName,
        })
        if (resp.status === 200)
            goNextStage()
        else
            toast.error(`خطا در ارسال اطلاعات! (کد: ${resp.status} )`)
    }

    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <Col lg={4} md={6} sm={12} className="m-auto">
                    <Card>
                        <Card.Header className="text-center">ورود به پرچین</Card.Header>
                        <Card.Body>
                            <Form onSubmit={updateUserInfo}>
                                <Form.Control type="text"
                                              className="mb-3"
                                              placeholder="نام"
                                              value={newFirstName}
                                              onChange={e => setNewFirstName(e.target.value)}
                                />
                                <Form.Control type="text"
                                              className="mb-3"
                                              placeholder="نام خانوادگی"
                                              value={newLastName}
                                              onChange={e => setNewLastName(e.target.value)}
                                />
                                <Button type="submit" variant="primary"
                                        disabled={!newFirstName || !newLastName}>ذخیره</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
