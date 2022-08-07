class ApiUrls {
    get BASE_URL() {
        return window.AppConfig.API_BASE_URL
    }
    get requestLoginCode() {
        return `${this.BASE_URL}/login/request-code/`
    }
    get submitLoginCode() {
        return `${this.BASE_URL}/login/submit-code/`
    }
    get selfUser() {
        return `${this.BASE_URL}/self-user/`
    }
    get usersList() {
        return `${this.BASE_URL}/users/`
    }
    user(id) {
        return `${this.usersList}${id}`
    }
    get friendRequestList(){
        return `${this.BASE_URL}/friend-request/`
    }
    friendRequest(id){
        return `${this.friendRequestList}${id}`
    }
    hasPendingRequest(targetUserId){
        return `${this.friendRequestList}has-pending-request/${targetUserId}/`
    }
}

const apiURLs = new ApiUrls()

export default apiURLs
