import { useQuery, QueryClientProvider, QueryClient } from "react-query"
import axios from "axios"

const token = localStorage.getItem("token")
const headers = {
    Authorization: "Bearer " + token,
}

export async function createRequest({ receiverId, amount, message }) {
    try {
        console.log("createRequest ran")
        // console.log(creatorId)

        const body = {
            receiverId,
            amount,
            message,
        }
        const response = await axios.post(`http://localhost:3000/money-request`, body, {
            headers,
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getReceivedRequests({ userId }) {
    try {
        console.log("getReceivedRequests ran")
        const response = await axios.get(`http://localhost:3000/money-request/received`, {
            headers,
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
