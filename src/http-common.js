import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:5000/api/v1",
    baseURL: "https://fortune1-backend.herokuapp.com/api/v1",
    headers: {
        "Content-type": "application/json",
    }
})
