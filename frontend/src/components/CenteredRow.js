import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function ({children, ...props}) {
    return (
        <Row {...props} >
            <Col className="d-flex justify-content-center">
                {children}
            </Col>
        </Row>
    )
}