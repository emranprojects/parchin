import Col from "react-bootstrap/Col"
import UserCard from "./UserCard"

export default function ({
                             users,
                             btnText = "", onBtnClicked = (e) => undefined,
                             btn2Text = "", onBtn2Clicked = (e) => undefined,
                         }) {
    return users.map(u =>
        <Col xl={2} lg={3} md={4} xs={6} key={u.id}>
            <UserCard user={u}
                      btnText={btnText} onBtnClicked={onBtnClicked}
                      btn2Text={btn2Text} onBtn2Clicked={onBtn2Clicked}
            />
        </Col>,
    )
}