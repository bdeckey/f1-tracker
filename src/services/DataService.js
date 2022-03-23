import http from "../http-common.js"

class DataService {


    // getHeaders(token) {
    //     const headers = {
    //         Authorization: `Bearer ${token}`,
    //     }
    //     return {headers: headers}
    // }
    // post request to post and get the user data on sign in
    // data - {email: <email returned by auth>}
    fetchUser(data) {
        // const headers = this.getHeaders(token)
        return http.post("/user", data, headers);
    }

    // updateUser(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.put("/user", data, headers);
    // }

    // postAppointment(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post("/schedule", data, headers)
    // }

    // getAppointments() {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.get('/schedule', headers);
    // }

    // getBookingScheduleByRegion(region) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.get(`/bookingschedule/${region}`, headers);
    // }

    // pushSession(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post('/createcustomerportalsession', data, headers)
    // }

    // getBillingHistory(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post('/billinghistory', data, headers)
    // }

    // putAppointment(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.put('/schedule', data, headers)
    // }

    // cancelAppointment(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post('/cancel', data, headers)
    // }

    // getAppointmentsById(id) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.get(`/schedule/${id}`, headers);
    // }

    // getEmployeeInfo() {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.get("/employee", headers);
    // }

    // editProperty(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.put("/editProperty", data, headers)
    // }

    // addProperty(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.put("/addproperty", data, headers)
    // }

    // setupProperty(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post("/setupproperty", data, headers)
    // }

    // propertyCheck(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post("/propertycheck", data, headers)
    // }

    // addPayment(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post("/addpayment", data, headers)
    // }

    // markView(data) {
    //     const token = localStorage.getItem('accessToken')
    //     const headers = this.getHeaders(token)
    //     return http.post("/view", data, headers)
    // }

}

export default new DataService();