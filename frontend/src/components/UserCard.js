import {Card, Row} from "react-bootstrap"
import Button from "react-bootstrap/Button"

export default function ({
                             user,
                             btnText = "", onBtnClicked = (e) => undefined,
                             btn2Text = "", onBtn2Clicked = (e) => undefined,
                         }) {
    return (
        <Card>
            <Card.Body>
                <Row className="mb-3">
                    <a href={"/u/" + user.id} className="text-center">
                        <img style={{width: "100%", height: "auto"}}
                             className="rounded-1"
                             src={user.imageUrl}/>
                    </a>
                </Row>
                <Row>
                    <span>{user.first_name} {user.last_name}</span>
                </Row>
                {btnText !== "" && (
                    <Row className="mt-2">
                        <Button variant="outline-primary" className="shadow-none"
                                onClick={onBtnClicked}>{btnText}</Button>
                    </Row>
                )}
                {btn2Text !== "" && (
                    <Row className="mt-2">
                        <Button variant="outline-danger" className="shadow-none"
                                onClick={onBtn2Clicked}>{btn2Text}</Button>
                    </Row>
                )}
            </Card.Body>
        </Card>
    )
}