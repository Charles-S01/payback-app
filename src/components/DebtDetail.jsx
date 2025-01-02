import { useContext, useEffect, useState } from "react"
import { BackButton, Loading, Modal } from "../components"
// import { ActiveModalContext } from "../App"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { QueryClient, useMutation, useQuery } from "react-query"
import { createDebt, updateDebt, getDebt } from "../api/debts"
import { useQueryClient } from "react-query"
// import { queryClient } from "../App"
import useUser from "../hooks/useUser"

export default function DebtDetail() {
    const navigate = useNavigate()
    const { debtId, isOwedToUser } = useParams()
    const queryClient = useQueryClient()
    const { data } = useUser()

    const { data: debtData, isLoading } = useQuery({
        queryKey: ["debtData"],
        queryFn: () => getDebt({ debtId }),
        cacheTime: 0,
    })

    const isEditMode = debtId ? true : false

    const isOweToUser = isEditMode ? debtData?.debt.isOwedToUser : isOwedToUser === "true"

    const [otherPartyName, setOtherPartyName] = useState("")
    const [oweAmount, setOweAmount] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (debtData) {
            setOtherPartyName(debtData.debt.otherPartyName)
            setOweAmount(debtData.debt.oweAmount)
            setDescription(debtData.debt.description)
        }
    }, [debtData])

    const { mutateAsync: createDebtMutation } = useMutation({
        mutationFn: createDebt,
        onSuccess: () => {
            console.log("addDebtMutation success")
        },
    })

    const { mutateAsync: updateDebtMutation } = useMutation({
        mutationFn: updateDebt,
        onSuccess: () => {
            console.log("updateDebt success")
        },
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (isEditMode) {
            await updateDebtMutation({ debtId, otherPartyName, oweAmount, description })
        } else {
            await createDebtMutation({
                otherPartyName,
                oweAmount: parseFloat((Math.round(oweAmount * 100) / 100).toFixed(2)),
                description,
                isOwedToUser: isOweToUser,
            })
        }
        navigate("/")
    }

    async function handleResolve(e) {
        await updateDebtMutation({ debtId, otherPartyName, oweAmount, description, isPaid: true })
        navigate(history.back())
    }

    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    return (
        <>
            <>
                {!isLoading && (
                    <div className="MAIN-content-wrapper relative flex min-w-[290px] max-w-[52rem] flex-1 flex-col items-center justify-center gap-4 px-4">
                        <BackButton />

                        <div className="box flex flex-col gap-4 rounded-xl bg-white p-4">
                            <div className="modal-title">
                                <p className="text-2xl">
                                    <strong>{isEditMode ? "Edit" : "Add"}</strong>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <label className="flex flex-col">
                                    {isOweToUser ? "Who owes you?" : "Who do you owe?"}
                                    <input
                                        type="text"
                                        value={otherPartyName}
                                        name="otherPartyName"
                                        placeholder="Enter their name"
                                        required
                                        maxLength={21}
                                        onChange={(e) => setOtherPartyName(e.target.value)}
                                        className="rounded-lg bg-gray-100 p-2"
                                    />
                                </label>
                                <label className="">
                                    <p>{`How much is owed? ($)`}</p>
                                    <input
                                        value={parseFloat(oweAmount)}
                                        name="oweAmount"
                                        type="number"
                                        placeholder="$"
                                        required
                                        // min={0}
                                        max={999999}
                                        onChange={(e) => setOweAmount(e.target.value)}
                                        className="w-24 rounded-lg bg-gray-100 p-2"
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <p>Description</p>
                                    <textarea
                                        value={description}
                                        type="text"
                                        name="debtDescription"
                                        placeholder="Add details (optional)"
                                        maxLength={100}
                                        className="h-20 resize-none rounded-lg bg-gray-100 p-2"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </label>
                                <div className="buttons flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-blue-500 p-2 text-white"
                                    >
                                        Done
                                    </button>
                                    {isEditMode && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleResolve()}
                                                id="resolved-btn"
                                                className="resolved-btn flex justify-center gap-2 rounded-lg bg-green-600 p-2 text-white"
                                            >
                                                <p>Resolve</p>
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
                                                        d="m4.5 12.75 6 6 9-13.5"
                                                    />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        </>
    )
}
