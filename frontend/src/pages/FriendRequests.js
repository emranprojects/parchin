import {Row} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import UsersList from "../components/UsersList"
import {useState} from "react"
import generalUtils from "../utils/generalUtils"
import requestUtils from "../utils/requestUtils"
import apiURLs from "../apiURLs"
import loginUtils from "../utils/loginUtils"
import CenteredRow from "../components/CenteredRow"
import {toast} from "react-toastify"

export default function () {
    const [incomingFriendRequests, setIncomingFriendRequests] = useState([])

    generalUtils.useEffectAsync(async () => {
        const resp = await requestUtils.get(apiURLs.friendRequestList)
        const allReqs = await resp.json()
        setIncomingFriendRequests(allReqs
            .filter(r => r.target.id === loginUtils.getID())
            .map(r => ({friendRequestId: r.id, ...r.requester})))
    })

    async function onAcceptFriendRequest(user) {
        const resp = await requestUtils.post(apiURLs.friendRequestAccept(user.friendRequestId), {})
        if (resp.ok) {
            toast.success("دوستی پذیرفته شد!")
            setIncomingFriendRequests(reqs => reqs.filter(r => r.friendRequestId !== user.friendRequestId))
        }
    }

    async function onRejectFriendRequest(user) {
        const resp = await requestUtils.post(apiURLs.friendRequestReject(user.friendRequestId), {})
        if (resp.ok) {
            toast.success("درخواست حذف شد.")
            setIncomingFriendRequests(reqs => reqs.filter(r => r.friendRequestId !== user.friendRequestId))
        }
    }

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
                                   onBtnClicked={onAcceptFriendRequest}
                                   btn2Text="رد"
                                   onBtn2Clicked={onRejectFriendRequest}
                        />
                    </Row>
                ) :
                <CenteredRow>
                    <h5 className="text-muted">درخواستی یافت نشد :(</h5>
                </CenteredRow>
            }
        </Container>
    )
}