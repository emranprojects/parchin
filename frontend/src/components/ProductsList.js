import {Col} from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ({products}) {
    return products.map(p =>
        <Col lg={4} md={6} sm={12}>
            <ProductCard
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