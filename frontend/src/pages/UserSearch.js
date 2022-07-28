import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import UsersList from "../components/UsersList";

export default function () {
    function onSearch() {
        alert("TODO!")
    }

    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <Col lg={10} md={8} className="p-2">
                    <Form.Control type="text" placeholder="نام یا شماره تلفن..."
                                  onKeyPress={t => t.key === "Enter" ? onSearch() : null}/>
                </Col>
                <Col lg={2} md={4} className="d-grid p-2">
                    <Button onClick={onSearch} type="submit">جستجو</Button>
                </Col>
            </Row>
            <Row className="mb-5"/>
            <Row hidden={true}>
                <h4 className="text-center">نتیجه‌ای یافت نشد</h4>
            </Row>
            <Row>
                <UsersList users={[{
                    name: "عمران باتمان‌غلیچ",
                    id: "1",
                    imageUrl: "https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg",
                }]}/>
            </Row>
        </Container>
    )
}
