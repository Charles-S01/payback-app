import { useContext } from "react"
import { AppContext } from "../App"
import { useQuery, QueryClientProvider, QueryClient, useMutation } from "react-query"
import axios from "axios"
import { ResolvedDebtCard, Loading } from "../components.js"
import useUser from "../hooks/useUser.js"
import { useQueryClient } from "react-query"
import { deleteDebts, getDebts } from "../api/debts.js"
import { Link } from "react-router-dom"

export default function Profile() {
    const queryClient = useQueryClient()
    const { data } = useUser()

    const { data: resolvedDebts, isLoading: resolvedDebtsLoading } = useQuery({
        queryKey: ["resolvedDebts"],
        queryFn: () => getDebts({ userId: data.user.id, isPaid: true }),
    })

    // console.log("Resolved debts " + JSON.stringify(resolvedDebts, null, 2))

    const { mutateAsync: deleteDebtMutation } = useMutation({
        mutationFn: () => deleteDebts({ isPaid: true }),
        onSuccess: () => {
            queryClient.invalidateQueries(["resolvedDebts"])
        },
    })

    async function handleClear() {
        await deleteDebtMutation()
    }

    return (
        <>
            <div className="MAIN-content-wrapper flex min-w-[290px] max-w-[52rem] flex-1 flex-col gap-4 px-4">
                <div className="profile-box relative mt-4 flex flex-col gap-4 rounded-xl bg-blue-200 bg-opacity-50 p-4">
                    <Link to={`/profile/edit`} className="absolute right-2 top-2">
                        <button className="flex gap-1 rounded-lg p-2 opacity-60 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100">
                            <p>Edit</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        </button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-3xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                            <p>
                                <strong>Profile</strong>
                            </p>
                        </div>
                    </div>
                    <div className="name flex flex-col">
                        <p className="opacity-60">Full name</p>
                        <p className="text-2xl">
                            <strong>
                                {data.user.firstName} {data.user.lastName}
                            </strong>
                        </p>
                    </div>
                    <div className="username flex flex-col">
                        <p className="opacity-60">Username</p>
                        <p className="text-xl">
                            <strong>{data.user.username}</strong>
                        </p>
                    </div>
                </div>

                <div className="resolved-debts gap-2">
                    <div className="flex border-b-4 border-b-gray-300 p-2">
                        <p className="mr-auto text-2xl">
                            <strong>Resolved</strong>
                        </p>
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-1 rounded-lg p-2 opacity-60 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100"
                        >
                            <p>Clear</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                    {resolvedDebtsLoading && (
                        <>
                            <Loading />
                        </>
                    )}

                    <div className="resolved-list mt-4 flex flex-col gap-2">
                        {resolvedDebts && (
                            <>
                                {resolvedDebts.debts.map((debt) => {
                                    return (
                                        <>
                                            <ResolvedDebtCard key={debt.id} debt={debt} />
                                        </>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
