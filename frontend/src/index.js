import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/scss/bootstrap.scss' // Bootstrap should be imported before index.scss to not rollback overrides
import './index.scss'

import 'react-toastify/dist/ReactToastify.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import Timeline from "./pages/Timeline"
import Navbar from "./components/Navbar"
import LoginContext from "./components/LoginContext"
import loginUtils from "./utils/loginUtils"
import {ToastContainer} from 'react-toastify'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login"
import appPaths from "./appPaths"
import LandingPage from "./pages/LandingPage"
import UserProfile from "./pages/UserProfile"
import UserSearch from "./pages/UserSearch"
import Drawer from "./components/Drawer"
import FriendRequests from "./pages/FriendRequests"
import Post from "./pages/Post"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Root/>
        <ToastContainer rtl={true} position="bottom-left"/>
    </React.StrictMode>,
)

function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(loginUtils.isLoggedIn())
    const [drawerVisible, setDrawerVisible] = useState(false)

    return <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <Navbar setDrawerVisibleFunc={setDrawerVisible}/>
        <Drawer visible={drawerVisible} onHide={() => setDrawerVisible(false)}/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path={appPaths.login} element={<Login/>}/>
                <Route path={appPaths.timeline} element={<Timeline/>}/>
                <Route path={appPaths.userProfile(":userId")} element={<UserProfile/>}/>
                <Route path={appPaths.userSearch} element={<UserSearch/>}/>
                <Route path={appPaths.friendRequests} element={<FriendRequests/>}/>
                <Route path={appPaths.newPost} element={<Post/>}/>
            </Routes>
        </BrowserRouter>
    </LoginContext.Provider>
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
