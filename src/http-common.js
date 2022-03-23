import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api/v1",
    // baseURL: "https://propertywatchers.herokuapp.com/api/v1/property",
    headers: {
        "Content-type": "application/json",
    }
})
