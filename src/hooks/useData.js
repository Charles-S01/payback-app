import { useEffect, useState } from "react"
import axios from "axios"

export default function useData(token) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    console.log("useData hook ran")

    useEffect(() => {
        const headers = {
            Authorization: "Bearer " + token,
        }
        axios
            .get("http://localhost:3000/owes", { headers })
            .then(function (response) {
                // handle success
                console.log(response.data)
                setData(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
                setError(error.response.data.errorMessage)
            })
            .finally(function () {
                setLoading(false)
            })
        console.log("useData axios ran")
    }, [])

    return { data, loading, error }
}
