import axios from "axios";

const instance = axios.create({
    baseURL: "https://petshop-backend.onrender.com/",
});

export default instance;
