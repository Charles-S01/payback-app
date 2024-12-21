import { useContext } from "react"
import { AppContext } from "../App"
import { DebtCard, Loading } from "../components"
import { useQuery, QueryClientProvider, QueryClient } from "react-query"
import axios from "axios"
import { getUser } from "../apiCalls"
import useUser from "../hooks/useUser"
import { getDebts, getTotalOwe } from "../api/debts"
import { useQueryClient } from "react-query"
import { Link } from "react-router-dom"
// import Loading
// import { queryClient } from "../App"

export default function Home() {
    const queryClient = new useQueryClient()

    const { data, isLoading: dataLoading } = useUser()
    const { handleAddClick, setDebtDataEdit } = useContext(AppContext)

    const { data: debtsToUser, isLoading: debtsToUserLoading } = useQuery({
        queryKey: ["debtsToUser"],
        queryFn: () =>
            getDebts({
                userId: data.user.id,
                isOwedToUser: true,
                isPaid: false,
            }),
    })

    const { data: debtsToOthers, isLoading: debtsToOthersLoading } = useQuery({
        queryKey: ["debtsToOthers"],
        queryFn: () =>
            getDebts({
                userId: data.user.id,
                isOwedToUser: false,
                isPaid: false,
            }),
    })
    const { data: totalOwe, isLoading: totalOweLoading } = useQuery({
        queryKey: ["totalDebt"],
        queryFn: () => getTotalOwe(data?.user.id),
    })

    return (
        <>
            <div className="MAIN-content-wrapper flex min-w-[290px] max-w-[52rem] flex-1 flex-col gap-4 px-4">
                <div className="dashboard-box mt-4 flex w-full flex-col gap-4 rounded-xl bg-blue-200 bg-opacity-50 p-4 shadow-lg">
                    <p className="text-nowrap text-2xl">
                        <strong>Hello, {data.user.firstName}</strong>
                    </p>
                    <div className="flex w-full justify-center">
                        <div className="flex flex-1 flex-wrap gap-4 text-nowrap border-black">
                            <div className="owe-me-box flex-1 flex-col rounded-xl border-2 border-green-500 bg-green-700 p-2 text-white">
                                <div>
                                    <p>People owe you:</p>
                                </div>
                                <div>
                                    <p className="flex-1 text-3xl">
                                        <strong>{`$${(Math.round(totalOwe?.totalOweToUser * 100) / 100).toFixed(2) || 0}`}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="owe-others-box flex-1 flex-col rounded-xl border-2 border-red-500 bg-red-600 p-2 text-white">
                                <div>
                                    <p className="">You owe others:</p>
                                </div>
                                <div>
                                    <p className="flex-1 text-3xl">
                                        <strong>{`$${totalOwe?.totalOweToOthers || 0}`}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tabs-section mt-4 flex w-full flex-col gap-4">
                    <div className="columns flex flex-wrap gap-8">
                        <div className="owe-me-column flex min-w-[20rem] flex-1 flex-col gap-4">
                            <Link to={`/debt-detail/true`} className="self-center">
                                <button className="flex gap-1 rounded-lg p-2 opacity-70 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100">
                                    <p>Add</p>
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
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                </button>
                            </Link>

                            <p className="border-b-2 border-gray-300 pb-2 text-center">
                                <strong>Money owed to me</strong>
                            </p>
                            {debtsToUserLoading && (
                                <>
                                    <Loading />
                                </>
                            )}
                            {debtsToUser?.debts.map((debt) => {
                                return (
                                    <>
                                        <Link to={`/debt-detail/null/${debt.id}`}>
                                            <DebtCard key={debt.id} id={debt.id} debt={debt} />
                                        </Link>
                                    </>
                                )
                            })}
                        </div>
                        <div className="owe-other-column flex min-w-[20rem] flex-1 flex-col gap-4">
                            <Link to={`/debt-detail/false`} className="self-center">
                                <button className="flex gap-1 rounded-lg p-2 opacity-70 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100">
                                    <p>Add</p>
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
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                </button>
                            </Link>

                            <p className="border-b-2 border-gray-300 pb-2 text-center">
                                <strong>Money owed to others</strong>
                            </p>
                            {debtsToOthersLoading && (
                                <>
                                    <Loading />
                                </>
                            )}
                            {debtsToOthers?.debts.map((debt) => {
                                return (
                                    <>
                                        <Link to={`/debt-detail/null/${debt.id}`}>
                                            <DebtCard key={debt.id} id={debt.id} debt={debt} />
                                        </Link>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
