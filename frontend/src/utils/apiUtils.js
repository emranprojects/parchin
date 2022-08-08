import loginUtils from "./loginUtils"
import requestUtils from "./requestUtils"
import apiURLs from "../apiURLs"

export default {
    async getIncomingFriendRequestsCount() {
        if (!loginUtils.isLoggedIn())
            return 0
        const resp = await requestUtils.get(apiURLs.friendRequestPreviewList)
        if (resp.ok) {
            const allReqs = await resp.json()
            const incomingReqs = allReqs.filter(r => r.target === loginUtils.getID())
            return incomingReqs.length
        }
        return 0
    },
}
