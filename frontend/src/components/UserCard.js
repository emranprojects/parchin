import {Card, Col, Row} from "react-bootstrap";
import generalUtils from "../utils/generalUtils";
import appPaths from "../appPaths";
import Button from "react-bootstrap/Button";

export default function ({id = "", imageUrl = "", name = ""}) {
    return (
        <Card>
            <Card.Body>
                <Row className="mb-3">
                    <a href={"/u/" + id} className="text-center">
                        <img style={{width: "100%", height: "auto"}}
                             className="rounded-1"
                             src={imageUrl}/>
                    </a>
                </Row>
                <Row>
                    <span>{name}</span>
                </Row>
                <Row className="mt-2">
                    <Button className="btn">درخواست دوستی</Button>
                </Row>
            </Card.Body>
        </Card>
    )
}