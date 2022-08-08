import {Card, Row} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import defaultProfilePic from "../static-media/default-profile-pic.png"

export default function ({
                             user,
                             btnText = "", onBtnClicked = (user) => undefined,
                             btn2Text = "", onBtn2Clicked = (user) => undefined,
                         }) {
    return (
        <Card>
            <Card.Body>
                <Row className="mb-3">
                    <a href={"/u/" + user.id} className="text-center">
                        <img style={{width: "100%", height: "auto"}}
                             className="rounded-1"
                             src={user.imageUrl || defaultProfilePic}/>
                    </a>
                </Row>
                <Row>
                    <span>{user.first_name} {user.last_name}</span>
                </Row>
                {btnText !== "" && (
                    <Row className="mt-2">
                        <Button variant="outline-primary" className="shadow-none"
                                onClick={() => onBtnClicked(user)}>{btnText}</Button>
                    </Row>
                )}
                {btn2Text !== "" && (
                    <Row className="mt-2">
                        <Button variant="outline-danger" className="shadow-none"
                                onClick={() => onBtn2Clicked(user)}>{btn2Text}</Button>
                    </Row>
                )}
            </Card.Body>
        </Card>
    )
}