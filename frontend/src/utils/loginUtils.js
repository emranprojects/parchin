export default {
    setLoggedIn(token) {
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
    setPhoneNumber(phoneNumber){
        localStorage.setItem('phoneNumber', phoneNumber)
    },
    getPhoneNumber() {
        return localStorage.getItem('phoneNumber')
    },
}
