import {Col, Container, Row} from "react-bootstrap";
import ProductsList from "../components/PostsList";
import {useParams} from "react-router-dom";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import UsersList from "../components/UsersList";

export default function () {
    const {userId} = useParams()
    const isSelf = userId === "self"
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
    const [friends, setFriends] = useState([
        {
            id: "1",
            name: "محمد معصومی‌اصل",
            imageUrl: "https://imagefa.ir/wp-content/uploads/2020/05/%D8%B9%DA%A9%D8%B3-%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-%D9%BE%D8%B3%D8%B1%D9%88%D9%86%D9%87-%D8%A8%D8%AF%D9%88%D9%86-%D9%85%D8%AA%D9%86-%D8%B9%DA%A9%D8%B3-%D9%BE%D8%B3%D8%B1%D9%88%D9%86%D9%87-%D8%AE%D8%A7%D8%B5-39.jpg",
        },
        {
            id: "2",
            name: "رضا طهورایی",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpF8Q9z6WXEfk5i1EISZSKm5GDFtsgu6ya-Q&usqp=CAU",
        }]);

    return (
        <Container>
            <Row className="mb-5"/>
            <Row className="mb-5">
                <Col lg={2} xs={6}>
                    <img style={{width: "100%", height: "auto"}}
                         className="rounded-1"
                         src="https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg"/>
                </Col>
                <Col>
                    <Row><h4>{name}</h4></Row>
                    <Row><span>{friends.length} دوست</span></Row>
                    <Row><span>{posts.length} پست</span></Row>
                    {isSelf ? "" :
                        <Row className="mt-3">
                            <Col>
                                <Button className="btn">درخواست دوستی</Button>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
            <h3>دوستان</h3>
            <Row className="mb-5">
                <UsersList users={friends}/>
            </Row>
            <h3>پست‌ها</h3>
            <Row>
                <ProductsList posts={posts}/>
            </Row>
        </Container>
    )
}