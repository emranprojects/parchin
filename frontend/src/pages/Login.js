import React, {useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import apiURLs from "../apiURLs"
import {Navigate} from "react-router-dom";
import "./Login.css";
import appPaths from "../appPaths";
import {toast} from 'react-toastify';
import LoginContext from "../components/LoginContext";
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
} from 'react-google-recaptcha-v3'
import generalUtils from "../utils/generalUtils";
import requestUtils from "../utils/requestUtils";
import {Col} from "react-bootstrap";

export default function () {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [recaptcha, setRecaptcha] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    if (loggedIn)
        return <Navigate to={appPaths.timeline}/>

    async function requestCode(loginContext) {
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
        if (resp.status === 202) {
            toast.success("کد تایید ارسال شد!")
            // loginUtils.setLoggedIn(username, (await resp.json()).token)
            // setLoggedIn(true)
            // loginContext.setIsLoggedIn(true)
        }
    }

    return (
        <LoginContext.Consumer>
            {loginContext =>
                <GoogleReCaptchaProvider reCaptchaKey="6LcH0A8hAAAAALFIqHB2ifzqH4EPUw3CMX5BgGoK">
                    <Container>
                        <Row className="mb-5"/>
                        <Row>
                            <Col lg={4} md={6} sm={12} className="m-auto">
                                <Card>
                                    <Card.Header className="text-center">ورود به پرچین</Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={async e => {
                                            e.preventDefault();
                                            await requestCode(loginContext)
                                        }}>
                                            <Form.Control type="number"
                                                          className="mb-3"
                                                          dir="ltr"
                                                          placeholder="تلفن همراه"
                                                          value={phoneNumber}
                                                          onChange={e => setPhoneNumber(e.target.value)}
                                            />
                                            <GoogleReCaptcha action="auth-code" onVerify={setRecaptcha}/>
                                            <Button type="submit" variant="primary">دریافت کد تایید</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </GoogleReCaptchaProvider>
            }
        </LoginContext.Consumer>
    );
}
