import { useEffect, useState } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { getUser } from "../apiCalls"

export default function useUser(token) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["userData"],
        queryFn: () => getUser({ userId: null }),
    })

    return { data, isLoading, error, refetch }
}
