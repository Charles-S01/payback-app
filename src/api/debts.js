import { useQuery, QueryClientProvider, QueryClient } from "react-query"
import axios from "axios"
import axiosInstance from "../axiosInstance"

// const token = localStorage.getItem("token")
// const headers = {
//     Authorization: "Bearer " + token,
// }

export async function getDebts({ userId, isOwedToUser, isPaid, debtId }) {
    try {
        const response = await axiosInstance.get(`/debts/search/${userId}`, {
            params: { isOwedToUser, isPaid },
        })
        return response.data
    } catch (err) {
        throw err
    }
}

export async function getDebt({ debtId }) {
    if (debtId) {
        console.log("getDebt ran")
        try {
            const response = await axiosInstance.get(`/debts/single/${debtId}`)
            return response.data
        } catch (err) {
            throw err
        }
    }
}

export async function getTotalOwe(userId) {
    try {
        console.log("getTotalOwe ran")
        const response = await axiosInstance.get(`/debts/totalDebt`)
        return response.data
    } catch (err) {
        throw err
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
        const response = await axiosInstance.post(`/debts`, body)
        return response.data
    } catch (err) {
        throw err
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
        const response = await axiosInstance.put(`/debts/${debtId}`, body)
        return response.data
    } catch (err) {
        throw err
    }
}

export async function deleteDebts({ isPaid, debtId }) {
    try {
        const params = {
            isPaid,
        }
        const response = await axiosInstance.delete(`/debts/${debtId || ""}`, {
            params,
        })
        return response.data
    } catch (error) {
        throw error
    }
}
