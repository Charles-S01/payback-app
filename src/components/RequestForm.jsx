import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { getUsers } from "../api/user"
import { useState } from "react"
import { createRequest } from "../api/moneyRequests"
import useUser from "../hooks/useUser"
import BackButton from "./BackButton"

export default function RequestForm(params) {
    const { receiverId } = useParams()
    const queryClient = useQueryClient()
    const { data: userData } = useUser()
    const navigate = useNavigate()

    const [amount, setAmount] = useState()
    const [message, setMessage] = useState()
    const [isSent, setIsSent] = useState()

    const { data } = useQuery({
        queryKey: ["receiver"],
        queryFn: () => getUsers({ userId: receiverId }),
    })
    const receiver = data?.users[0]

    const { mutateAsync: createRequestMutation } = useMutation({
        mutationFn: () => createRequest({ receiverId, amount, message }),
        onSuccess: () => setIsSent(true),
    })

    async function handleSubmit(e) {
        e.preventDefault()
        await createRequestMutation()
    }

    return (
        <>
            {data && (
                <div className="MAIN-content-wrapper relative flex min-w-[290px] max-w-[52rem] flex-1 flex-col items-center justify-center gap-4 px-4">
                    <BackButton />
                    {isSent ? (
                        <>
                            <div className="flex items-center gap-2 text-2xl text-green-700">
                                <p className="">Sent</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <div className="box flex flex-col gap-4 rounded-lg bg-white p-4">
                            <div className="">
                                <p>
                                    Request <strong>{receiver.firstName}</strong>
                                </p>
                                <p>{`@${receiver.username}`}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                <label>
                                    <p>Amount</p>
                                    <input
                                        value={parseFloat(amount)}
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="number"
                                        placeholder="Enter amount $"
                                        max={999999}
                                        className="rounded-lg bg-gray-100 p-2"
                                        required
                                    />
                                </label>
                                <label>
                                    <p>Message</p>
                                    <textarea
                                        onChange={(e) => setMessage(e.target.value)}
                                        type="text"
                                        placeholder={`Enter your message to ${receiver.firstName}`}
                                        maxLength={50}
                                        className="h-20 resize-none rounded-lg bg-gray-100 p-2"
                                        required
                                    />
                                </label>
                                <button className="flex justify-center gap-2 rounded-lg bg-blue-500 p-2 text-white">
                                    <p>Send</p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
