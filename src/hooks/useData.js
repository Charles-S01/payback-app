import { useEffect, useState } from "react"
import axios from "axios"

export default function useData(token) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    console.log("useData hook ran")

    const headers = {
        Authorization: "Bearer " + token,
    }
    function fetch() {
        console.log("useData fetch ran")
        axios
            .get("http://localhost:3000/userData", { headers })
            .then(function (response) {
                // handle success
                console.log(response.data)
                setData(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error.response.data.errorMessage)
                setError(error.response.data.errorMessage)
            })
            .finally(function () {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetch()
    }, [])

    return { data, isLoading: loading, error, refetch: fetch }
}
