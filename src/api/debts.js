import { useQuery, QueryClientProvider, QueryClient } from "react-query"
import axios from "axios"

const token = localStorage.getItem("token")
const headers = {
    Authorization: "Bearer " + token,
}

export async function getDebts({ userId, isOwedToUser, isPaid, debtId }) {
    try {
        const response = await axios.get(`http://localhost:3000/debts/search/${userId}`, {
            params: { isOwedToUser, isPaid },
        })
        // console.log("Debts: " + JSON.stringify(response.data, null, 2))
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export async function getDebt({ debtId }) {
    if (debtId) {
        console.log("getDebt ran")
        try {
            const response = await axios.get(`http://localhost:3000/debts/single/${debtId}`, {
                headers,
            })
            console.log(response)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
}

export async function getTotalOwe(userId) {
    try {
        console.log("getTotalOwe ran")
        const response = await axios.get(`http://localhost:3000/debts/totalDebt`, {
            headers,
        })
        // console.log("Total debt: " + JSON.stringify(response.data, null, 2))
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export async function createDebt({ otherPartyName, oweAmount, description, isOwedToUser }) {
    try {
        const body = {
            otherPartyName,
            oweAmount,
            description,
            isOwedToUser,
        }
        const response = await axios.post(`http://localhost:3000/debts`, body, {
            headers,
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export async function updateDebt({ debtId, otherPartyName, oweAmount, description, isPaid }) {
    console.log("updateDebt ran")
    try {
        const body = {
            otherPartyName,
            oweAmount,
            description,
            isPaid,
        }
        const response = await axios.put(`http://localhost:3000/debts/${debtId}`, body, { headers })
        console.log(response)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export async function deleteDebts({ isPaid, debtId }) {
    try {
        const params = {
            isPaid,
        }
        const response = await axios.delete(`http://localhost:3000/debts/${debtId || ""}`, {
            params,
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
