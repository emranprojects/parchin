import "./LandingPage.css"
import appPaths from "../appPaths";

export default function () {
    return <>
        <div className="main-wrapper">
            <div className="section bg col-xs-9">
                <img src="/logo192.png"/>
                <h1 className="text-white">پرچین</h1>
                <h5 className="font-italic text-white">حس یک معامله‌ی خوب!</h5>
                <a href={appPaths.login} className="btn btn-primary mt-5">ورود به پرچین</a>
            </div>
        </div>
    </>
}