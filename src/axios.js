import axios from "axios";

const instance = axios.create({
    baseURL: "http://156.67.221.40:8080",
});

export default instance;
