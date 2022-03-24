import http from "../http-common.js"

class DataService {

    fetchUser(data) {
        return http.post("/user", data);
    }

    addRace(data) {
        return http.post("/race", data);
    }

    updateRace(data) {
        return http.post("/update", data);
    }

    getAllUsers() {
        return http.get("/user");
    }

}

export default new DataService();