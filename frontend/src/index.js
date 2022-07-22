import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Timeline from "./pages/Timeline";
import Navbar from "./components/Navbar";
import LoginContext from "./components/LoginContext";
import loginUtils from "./utils/loginUtils";
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import appPaths from "./appPaths";
import LandingPage from "./pages/LandingPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root/>
        <ToastContainer rtl={true}/>
    </React.StrictMode>
);

function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(loginUtils.isLoggedIn())

    return <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path={appPaths.login} element={<Login/>} />
                <Route path={appPaths.timeline} element={<Timeline/>}/>
            </Routes>
        </BrowserRouter>
    </LoginContext.Provider>
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
