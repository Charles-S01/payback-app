import { useQuery, QueryClientProvider, QueryClient } from "react-query"
import axios from "axios"
import axiosInstance from "../axiosInstance"

// const token = localStorage.getItem("token")
// const headers = {
//     Authorization: "Bearer " + token,
// }

export async function createRequest({ receiverId, amount, message }) {
    try {
        console.log("createRequest ran")

        const body = {
            receiverId,
            amount,
            message,
        }
        const response = await axiosInstance.post(`/money-request`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getReceivedRequests({ userId }) {
    try {
        console.log("getReceivedRequests ran")
        const response = await axiosInstance.get(`/money-request/received`)
        return response.data
    } catch (error) {
        throw error
    }
}
