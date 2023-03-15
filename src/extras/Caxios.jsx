import axios from "axios";

let api_url = ""
if (import.meta.env.VITE_ENV === "pro")
    api_url = import.meta.env.VITE_API_URL
else api_url = "http://localhost:4000"

const Caxios = (token) => {
    return axios.create({
        baseURL: api_url,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default Caxios;
