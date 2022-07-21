import {Card, Col, Container, Row} from "react-bootstrap";

export default function Timeline() {
    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <Col lg={4} md={6} sm={12}>
                    <Card className="p-3 pb-0 pt-0">
                        <Card.Body>
                            <Row className="mb-3">
                                <a href="#" className="text-center">
                                    <img style={{maxHeight: "150pt", width: "auto"}}
                                         className="rounded-1"
                                         src="https://www.tedyshop.com/wp-content/uploads/2019/07/%D8%AE%D8%B1%DB%8C%D8%AF-%D8%AE%D8%B1%D8%B3-%D8%B9%D8%B1%D9%88%D8%B3%DA%A9%DB%8C-1.jpg"/>
                                </a>
                            </Row>
                            <Row>
                                <h5>خرس گوگولی</h5>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <Row>
                                        <b> ۴۵,۰۰۰ تومان</b>
                                    </Row>
                                    <Row className="mt-4">
                                        <div>
                                    <span className="p-1 rounded text-muted"
                                          style={{background: "#cccccc"}}>اسباب بازی</span>
                                        </div>
                                    </Row>
                                </Col>
                                <Col md={4} className="p-0 d-flex align-items-end justify-content-end">
                                    <a href="#">
                                        <img width="60pt" className="rounded-5"
                                             src="https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg"/>
                                    </a>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
