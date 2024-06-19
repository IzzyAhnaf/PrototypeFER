import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "http://192.168.0.142:5002",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});