import {Col, Container, Row} from "react-bootstrap"
import ProductsList from "../components/PostsList"
import {Navigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
import UsersList from "../components/UsersList"
import generalUtils from "../utils/generalUtils"
import requestUtils from "../utils/requestUtils"
import apiURLs from "../apiURLs"
import {toast} from "react-toastify"
import loginUtils from "../utils/loginUtils"
import appPaths from "../appPaths"
import defaultProfilePic from "../static-media/default-profile-pic.png"

export default function () {
    const {userId} = useParams()
    const [isLoggedIn, setIsLoggedIn] = useState(loginUtils.isLoggedIn())
    const isSelf = ["self", loginUtils.getID().toString()].includes(userId)
    const [user, setUser] = useState({
        id: "",
        first_name: "",
        last_name: "",
        phone_number: "",
    })
    const [hasPendingFriendRequest, setHasPendingFriendRequest] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [posts, setPosts] = useState([{
        id: "1",
        imageUrl: "https://www.tedyshop.com/wp-content/uploads/2019/07/%D8%AE%D8%B1%DB%8C%D8%AF-%D8%AE%D8%B1%D8%B3-%D8%B9%D8%B1%D9%88%D8%B3%DA%A9%DB%8C-1.jpg",
        title: "خرس گوگولی",
        price: 45000,
        tags: ["اسباب بازی"],
        dealerId: 1,
        dealerName: "عمران",
        dealerImageUrl: "https://quera.org/media/CACHE/images/public/careers/quotes/narrator/a5bcbbf298624df4991db9334ed4f571/7c9bc808882105cb8cd3f1e11387eaff.jpg",
    }])
    const [friends, setFriends] = useState([])

    generalUtils.useEffectAsync(async () => {
        const resp = await requestUtils.get(isSelf ? apiURLs.selfUser : apiURLs.user(userId), () => setIsLoggedIn(false))
        setUser(await resp.json())
    })

    generalUtils.useEffectAsync(async () => {
        if (isSelf)
            return
        const resp = await requestUtils.get(apiURLs.friendRequestPreviewList, () => setIsLoggedIn(false))
        const friendReqs = await resp.json()
        setHasPendingFriendRequest(friendReqs.some(r => r.target.toString() === userId))
    })

    generalUtils.useEffectAsync(async () => {
        const resp = await requestUtils.get(apiURLs.friendsList(userId))
        const _friends = await resp.json()
        setFriends(_friends)
    })

    useEffect(() => {
        setIsFriend(friends.some(f => f.id === loginUtils.getID()))
    }, [friends])


    if (!isLoggedIn)
        return <Navigate to={appPaths.login}/>

    async function friendRequestBtnClicked(e) {
        const resp = await requestUtils.post(apiURLs.friendRequestList,
            {'target_id': userId},
            () => {
                loginUtils.logout()
                setIsLoggedIn(false)
            })
        if (resp.ok) {
            setHasPendingFriendRequest(true)
            toast.success("درخواست دوستی ارسال شد!")
        }
    }

    async function unfriendBtnClicked(e) {
        const confirmed = window.confirm("آیا از حذف دوستی اطمینان دارید؟")
        if (!confirmed)
            return
        const resp = await requestUtils.post(apiURLs.removeFriend(userId))
        if (resp.ok) {
            toast.success("دوستی حذف شد!")
            setFriends(friends => friends.filter(f => f.id !== loginUtils.getID()))
        }
    }

    return (
        <Container>
            <Row className="mb-5"/>
            <Row className="mb-5">
                <Col lg={2} xs={6}>
                    <img style={{width: "100%", height: "auto"}}
                         className="rounded-1"
                         src={defaultProfilePic}/>
                </Col>
                <Col>
                    <Row><h4>{user.first_name} {user.last_name}</h4></Row>
                    <Row><span>{friends.length} دوست</span></Row>
                    <Row><span>{posts.length} پست</span></Row>
                    {isSelf || isFriend ? "" :
                        <Row className="mt-3">
                            <Col>
                                <abbr title={hasPendingFriendRequest ? "درخواست قبلا ارسال شده است" : ""}>
                                    <Button onClick={friendRequestBtnClicked}
                                            disabled={hasPendingFriendRequest}>درخواست دوستی</Button>
                                </abbr>
                            </Col>
                        </Row>
                    }
                    {isFriend &&
                    <Row className="mt-3">
                        <Col>
                            <Button variant="outline-danger" className="shadow-none"
                                    onClick={unfriendBtnClicked}
                                    disabled={hasPendingFriendRequest}>حذف دوستی</Button>
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