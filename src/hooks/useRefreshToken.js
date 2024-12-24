import axios from "axios"
import { useMutation } from "react-query"
import { refreshToken } from "../api/auth"

export default function useRefreshToken() {
    const { data, mutateAsync: refreshTokenMutation } = useMutation({
        mutationFn: () => refreshToken(),
        onSuccess: () => localStorage.setItem("token", data.token),
    })

    return { data, refreshTokenMutation }
}
