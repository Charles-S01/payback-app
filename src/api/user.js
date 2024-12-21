import axios from "axios"

const token = localStorage.getItem("token")
const headers = {
    Authorization: "Bearer " + token,
}

// get logged in user
export async function getUser({ userId }) {
    console.log("getUser ran")
    const response = await axios.get(`http://localhost:3000/users/${userId || ""}`, { headers })

    return response.data
}

export async function updateUser({ firstName, lastName }) {
    const body = {
        firstName,
        lastName,
    }
    const response = await axios.put(`http://localhost:3000/users`, body, { headers })
    return response.data
}

export async function getUsers({ userId, firstName, lastName }) {
    const params = {
        firstName,
        lastName,
    }
    const response = await axios.get(`http://localhost:3000/users/search/${userId || ""}`, {
        params,
        headers,
    })
    console.log("getUsers response: " + response)
    return response.data
}
