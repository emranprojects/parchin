class ApiUrls {
    get BASE_URL() {
        return window.AppConfig.API_BASE_URL
    }
    get requestLoginCode() {
        return `${this.BASE_URL}/users/request-code/`
    }
    get submitLoginCode() {
        return `${this.BASE_URL}/users/submit-code/`
    }
}

const apiURLs = new ApiUrls()

export default apiURLs
