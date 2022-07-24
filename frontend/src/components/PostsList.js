import {Col} from "react-bootstrap";
import PostCard from "./PostCard";

export default function ({posts}) {
    return posts.map(p =>
        <Col lg={4} md={6} sm={12}>
            <PostCard
                imageUrl={p.imageUrl}
                title={p.title}
                price={p.price}
                tags={p.tags}
                dealerId={p.dealerId}
                dealerName={p.dealerName}
                dealerImageUrl={p.dealerImageUrl}
            />
        </Col>
    )
}