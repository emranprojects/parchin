import {Container, Row} from "react-bootstrap";
import PostsList from "../components/PostsList";

export default function Timeline() {
    return (
        <Container>
            <Row className="mb-5"/>
            <Row>
                <PostsList posts={[{
                    imageUrl: "https://www.tedyshop.com/wp-content/uploads/2019/07/%D8%AE%D8%B1%DB%8C%D8%AF-%D8%AE%D8%B1%D8%B3-%D8%B9%D8%B1%D9%88%D8%B3%DA%A9%DB%8C-1.jpg",
                    title: "خرس گوگولی",
                    price: 45000,
                    tags: ["اسباب بازی"],
                    dealerId: 1,
                    dealerName: "عمران",
                    dealerImageUrl: "https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg",
                }]}/>
            </Row>
        </Container>
    )
}
