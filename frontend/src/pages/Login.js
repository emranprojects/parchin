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
import loginUtils from "../utils/loginUtils";

export default function () {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [recaptcha, setRecaptcha] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [loggedIn, setLoggedIn] = useState(loginUtils.isLoggedIn())

    if (loggedIn)
        return <Navigate to={appPaths.timeline}/>

    async function requestCode() {
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
            setIsCodeSent(true)
        }
    }

    async function verifyCode(loginContext) {
        const [isPhoneNumberOk, normalizedPhoneNumber] = generalUtils.normalizePhoneNumber(phoneNumber)
        const resp = await requestUtils.post(apiURLs.submitLoginCode, {
            phone_number: normalizedPhoneNumber,
            recaptcha: recaptcha,
            auth_code: authCode,
        }, () => undefined, false)
        switch (resp.status) {
            case 400:
                toast.error("کد تایید اشتباه است!")
                return
            case 200:
            case 201:
                toast.success("خوش آمدید!")
                loginUtils.setLoggedIn(normalizedPhoneNumber, (await resp.json()).token)
                setLoggedIn(true)
                loginContext.setIsLoggedIn(true)
                break
            default:
                toast.error("خطای غیرمنتظره! کد: " + resp.status)
                return
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
                                            if (isCodeSent)
                                                await verifyCode(loginContext)
                                            else
                                                await requestCode(loginContext)
                                        }}>
                                            {isCodeSent ?
                                                <span>کد تایید به شماره‌ی {phoneNumber} پیامک شد. لطفا آن را در کادر زیر وارد کنید.</span>
                                                : ""
                                            }
                                            <Form.Control type="number"
                                                          className="mb-3"
                                                          dir="ltr"
                                                          placeholder={isCodeSent ? "کد تایید" : "تلفن همراه"}
                                                          value={isCodeSent ? authCode : phoneNumber}
                                                          onChange={e => isCodeSent ? setAuthCode(e.target.value) : setPhoneNumber(e.target.value)}
                                            />
                                            <GoogleReCaptcha action="auth-code" onVerify={setRecaptcha}/>
                                            <Button type="submit" variant="primary"
                                                    disabled={isCodeSent && authCode.length !== 5}>
                                                {isCodeSent ? "ورود" : "دریافت کد تایید"}
                                            </Button>
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
