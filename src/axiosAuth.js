import axios from "axios"

const axiosAuth = axios.create({
    baseURL: "https://payback-api-production.up.railway.app/auth",
    timeout: 30000,
    // withCredentials: true,
    headers: { "Content-Type": "application/json" },
})

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
