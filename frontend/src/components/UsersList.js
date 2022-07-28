import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";

export default function ({users}) {
    return users.map(u =>
        <Col xl={2} lg={3} md={4} xs={6}>
            <UserCard name={u.name} id={u.id}
                      imageUrl={u.imageUrl}/>
        </Col>
    )
}