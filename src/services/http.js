import axios from "axios";

const http =  axios.create({
    baseURL: "http://192.168.0.128:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
})

export default http