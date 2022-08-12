import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faImage} from "@fortawesome/free-solid-svg-icons/faImage"

export default function () {
    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <Card>
                    <Card.Header><h4>ایجاد پست جدید</h4></Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>عنوان</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>توضیحات</Form.Label>
                                <Form.Control type="text" as="textarea" rows={3}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant="outline-primary"><FontAwesomeIcon icon={faImage}/> افزودن عکس</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Button>ذخیره</Button>
                        </Row>
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    )
}