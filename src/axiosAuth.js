import axios from "axios"

const axiosAuth = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 1000,
    // withCredentials: true,
    headers: { "Content-Type": "application/json" },
}) // Create the axios instance

axiosAuth.interceptors.response.use(
    (response) => {
        console.log("axiosAuth response:", response)
        return response
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    },
)

export default axiosAuth
