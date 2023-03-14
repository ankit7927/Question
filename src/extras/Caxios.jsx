import axios from "axios";

const api_url = "https://question-api-u69e.onrender.com"
const local_url = "http://localhost:4000"

const Caxios = (token) => {
    return axios.create({
        baseURL: local_url,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default Caxios;
