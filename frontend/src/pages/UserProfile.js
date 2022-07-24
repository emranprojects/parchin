import {Col, Container, Row} from "react-bootstrap";
import ProductsList from "../components/PostsList";
import {useParams} from "react-router-dom";
import {useState} from "react";
import Button from "react-bootstrap/Button";

export default function () {
    const {userId} = useParams()
    const [name, setName] = useState("عمران باتمان‌غلیچ");
    const [posts, setPosts] = useState([{
        imageUrl: "https://www.tedyshop.com/wp-content/uploads/2019/07/%D8%AE%D8%B1%DB%8C%D8%AF-%D8%AE%D8%B1%D8%B3-%D8%B9%D8%B1%D9%88%D8%B3%DA%A9%DB%8C-1.jpg",
        title: "خرس گوگولی",
        price: 45000,
        tags: ["اسباب بازی"],
        dealerId: 1,
        dealerName: "عمران",
        dealerImageUrl: "https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg",
    }]);

    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <Col lg={2} xs={6}>
                    <img style={{width: "100%", height: "auto"}}
                         className="rounded-1"
                         src="https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg"/>
                </Col>
                <Col>
                    <Row><h4>{name}</h4></Row>
                    <Row><span>{posts.length} پست</span></Row>
                    <Row className="mt-3"><Col><Button className="btn">درخواست دوستی</Button></Col></Row>
                </Col>
            </Row>
            <Row className="mt-5">
                <ProductsList posts={posts}/>
            </Row>
        </Container>
    )
}