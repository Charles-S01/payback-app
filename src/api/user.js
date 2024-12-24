import axios from "axios"
import axiosInstance from "../axiosInstance"
import axiosAuth from "../axiosAuth"

// get logged in user
export async function getUser({ userId }) {
    try {
        console.log("getUser ran")
        const response = await axiosInstance.get(`/users/${userId || ""}`)
        return response.data
    } catch (error) {
        throw error
    }
}

// export async function createUser({ firstName, lastName, username, password }) {
//     try {
//         const body = {
//             firstName,
//             lastName,
//             username,
//             password,
//         }
//         const response = await axiosAuth.post("/sign-up", body)
//         return response.data
//     } catch (error) {
//         return error
//     }
// }

// export async function loginUser({ username, password }) {
//     try {
//         const body = {
//             username,
//             password,
//         }
//         const response = await axiosAuth.post("/log-in", body)
//         return response.data
//     } catch (error) {
//         return error
//     }
// }

export async function updateUser({ firstName, lastName }) {
    try {
        const body = {
            firstName,
            lastName,
        }
        const response = await axiosInstance.put(`/users`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getUsers({ userId, firstName, lastName }) {
    try {
        const params = {
            firstName,
            lastName,
        }
        const response = await axiosInstance.get(`/users/search/${userId || ""}`, {
            params,
        })
        return response.data
    } catch (error) {
        throw error
    }
}
