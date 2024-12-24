import axios from "axios"
import axiosInstance from "../axiosInstance"
import axiosAuth from "../axiosAuth"

export async function createUser({ firstName, lastName, username, password }) {
    try {
        const body = {
            firstName,
            lastName,
            username,
            password,
        }
        const response = await axiosAuth.post("/sign-up", body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function loginUser({ username, password }) {
    try {
        const body = {
            username,
            password,
        }
        const response = await axiosAuth.post("/log-in", body, { withCredentials: true })
        console.log("loginUser() response:", response)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function refreshToken() {
    try {
        console.log("refreshToken()")
        const response = await axiosAuth.post("/refresh", {}, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error
    }
}
