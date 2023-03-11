import axios from "axios";

const api_url = "https://question-api-u69e.onrender.com"
const local_url = "http://localhost:4000"

const Caxios = (token) => {
    return axios.create({
        baseURL: api_url,
        headers: {
            Authorization: token
        }
    })
}

export default Caxios;
