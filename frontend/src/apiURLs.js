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
        return `${this.BASE_URL}/users/self/`
    }
    get friendRequestList(){
        return `${this.BASE_URL}/friend-request/`
    }
    friendRequest(id){
        return `${this.friendRequestList}${id}`
    }
}

const apiURLs = new ApiUrls()

export default apiURLs
