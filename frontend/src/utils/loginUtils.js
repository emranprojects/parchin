export default {
    setLoggedIn(token, selfID) {
        localStorage.setItem('token', token)
        localStorage.setItem('selfID', selfID)
    },
    isLoggedIn() {
        const token = this.getToken()
        return !!token
    },
    logout() {
        localStorage.removeItem('phoneNumber')
        localStorage.removeItem('token')
        localStorage.removeItem('selfID')
    },
    getToken() {
        return localStorage.getItem('token')
    },
    setPhoneNumber(phoneNumber) {
        localStorage.setItem('phoneNumber', phoneNumber)
    },
    getPhoneNumber() {
        return localStorage.getItem('phoneNumber')
    },
    getID() {
        return Number(localStorage.getItem('selfID'))
    },
}
