import {Card, Col, Row} from "react-bootstrap";
import generalUtils from "../utils/generalUtils";
import appPaths from "../appPaths";

export default function ({id = "", imageUrl = "", title = "", price = 0, tags = [], dealerId = "", dealerName = "", dealerImageUrl = ""}) {
    return <Card className="p-3 pb-0 pt-0">
        <Card.Body>
            <Row className="mb-3">
                <a href={"/posts/" + id} className="text-center">
                    <img style={{width: "100%", height: "auto"}}
                         className="rounded-1"
                         src={imageUrl}/>
                </a>
            </Row>
            <Row>
                <h5>{title}</h5>
            </Row>
            <Row>
                <Col md={8}>
                    <Row>
                        <b>{generalUtils.convertNumberToCommaSeparatedStr(price)} تومان</b>
                    </Row>
                    <Row className="mt-4">
                        <div>
                            {tags.map(tag => <span className="m-1 p-1 rounded text-muted"
                                                   style={{background: "#cccccc"}}>{tag} </span>)
                            }
                        </div>
                    </Row>
                </Col>
                <Col md={4} className="p-0 d-flex align-items-end justify-content-end">
                    <a href={appPaths.userProfile(dealerId)}>
                        <abbr title={dealerName}>
                            <img width="60pt" className="rounded-5"
                                 src={dealerImageUrl}/>
                        </abbr>
                    </a>
                </Col>
            </Row>
        </Card.Body>
    </Card>
}