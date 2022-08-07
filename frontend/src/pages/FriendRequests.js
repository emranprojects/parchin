import {Row} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import UsersList from "../components/UsersList"
import {useState} from "react"
import generalUtils from "../utils/generalUtils"
import requestUtils from "../utils/requestUtils"
import apiURLs from "../apiURLs"
import loginUtils from "../utils/loginUtils"
import CenteredRow from "../components/CenteredRow"

export default function () {
    const [incomingFriendRequests, setIncomingFriendRequests] = useState([])

    generalUtils.useEffectAsync(async () => {
        const resp = await requestUtils.get(apiURLs.friendRequestList)
        const allReqs = await resp.json()
        setIncomingFriendRequests(allReqs
            .filter(r => r.target.id === loginUtils.getID())
            .map(r => r.requester))
    })

    return (
        <Container>
            <Row className="mb-5"/>
            <Row className="mb-2">
                <h3>درخواست‌های دوستی</h3>
            </Row>
            {incomingFriendRequests.length > 0 ? (
                    <Row>
                        <UsersList users={incomingFriendRequests}
                                   btnText="پذیرش"
                                   btn2Text="رد"
                        />
                    </Row>
                ) :
                <CenteredRow>
                    <h5 className="text-muted">درخواست جدیدی نیامده است :(</h5>
                </CenteredRow>
            }
        </Container>
    )
}