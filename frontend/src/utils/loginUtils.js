export default {
    setLoggedIn(phoneNumber, token) {
        localStorage.setItem('phoneNumber', phoneNumber)
        localStorage.setItem('token', token)
    },
    isLoggedIn() {
        const token = this.getToken()
        return !!token
    },
    logout() {
        localStorage.removeItem('phoneNumber')
        localStorage.removeItem('token')
    },
    getToken() {
        return localStorage.getItem('token')
    },
    getPhoneNumber() {
        return localStorage.getItem('phoneNumber')
    },
}
