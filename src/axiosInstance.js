import axios from "axios"
import { useMutation } from "react-query"
import { refreshToken } from "./api/auth"
import useRefreshToken from "./hooks/useRefreshToken"

const axiosInstance = axios.create({
    baseURL: "https://payback-api-production.up.railway.app",
    timeout: 30000,
    // withCredentials: true,
    headers: { "Content-Type": "application/json" },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log("request config: ", config)
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("axiosInstance response: ", response)
        return response
    },
    async (error) => {
        // const { data, refreshTokenMutation } = useRefreshToken()
        console.log(error)
        if (error.response.status === 401 && error.response.data.message === "Unauthorized") {
            console.log("Access token expired")

            const data = await refreshToken()
            console.log("newToken:", data.token)
            localStorage.setItem("token", data.token)
        }
        error.response.data.message = "Unauthorized. Try logging back in or refresh the page"
        return Promise.reject(error)
    },
)

export default axiosInstance
