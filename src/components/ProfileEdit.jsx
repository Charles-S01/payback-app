import { useMutation, useQueries, useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import useUser from "../hooks/useUser"
import { useState } from "react"
import { updateUser } from "../api/user"
import BackButton from "./BackButton"

export default function ProfileEdit() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data } = useUser()

    const [firstName, setFirstName] = useState(data.user.firstName)
    const [lastName, setLastName] = useState(data.user.lastName)

    const { mutateAsync: updateUserMutation } = useMutation({
        mutationFn: () => updateUser({ firstName, lastName }),
        onSuccess: () => {
            queryClient.invalidateQueries(["userData"])
            navigate(history.back())
        },
    })

    async function handleSubmit(e) {
        e.preventDefault()
        updateUserMutation()
    }

    return (
        <>
            <div className="MAIN-content-wrapper relative flex min-w-[290px] max-w-[52rem] flex-1 flex-col items-center justify-center gap-4 px-4">
                <BackButton />

                <div className="box flex flex-col gap-4 rounded-xl bg-white p-4">
                    <p className="text-2xl">
                        <strong>Edit profile</strong>
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1">
                            <p>Name</p>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                placeholder="First name"
                                required
                                maxLength={10}
                                className="rounded-lg bg-gray-100 p-2"
                            />
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                                placeholder="Last name"
                                required
                                maxLength={10}
                                className="rounded-lg bg-gray-100 p-2"
                            />
                        </label>
                        <button className="rounded-lg bg-blue-500 p-2 text-white">Done</button>
                    </form>
                </div>
            </div>
        </>
    )
}
