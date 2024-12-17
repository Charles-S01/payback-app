import { useContext, useState } from "react"
import { Modal } from "../components"
import { ActiveModalContext } from "../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function DebtModal() {
    const navigate = useNavigate()

    const { activeModal, data, handleCloseModal, refetch, isOweToUserModal, debtData, headers } =
        useContext(ActiveModalContext)

    // console.log("DebtModal debtData: " + JSON.stringify(debtData))

    const [otherPartyName, setOtherPartyName] = useState(() => {
        return debtData?.otherPartyName || null
    })
    const [dollars, setDollars] = useState(() => {
        return debtData?.oweAmount.toString().includes(".")
            ? parseInt(debtData?.oweAmount.toString().split(".")[0])
            : debtData?.oweAmount
    })
    const [cents, setCents] = useState(() => {
        return debtData?.oweAmount.toString().includes(".")
            ? parseInt(debtData?.oweAmount.toString().split(".")[1])
            : undefined
    })
    const [debtDescription, setDebtDescription] = useState(() => {
        return debtData?.description
    })

    const isActive = activeModal === 1

    const formatCents = cents < 10 && cents > 0 ? ["0", cents].join("") : cents >= 10 ? [cents, "0"].join("") : null
    const oweAmount = parseFloat(parseFloat([dollars, formatCents || 0].join(".")).toFixed(2))

    let body = {
        id: debtData?.id,
        otherPartyName,
        oweAmount,
        description: debtDescription,
        isOwedToUser: isOweToUserModal,
        // isPaid: false,
    }
    async function handleSubmit(e) {
        e.preventDefault()

        // if (debtData) {
        //     debtPut(body, e)
        // } else {
        await debtPost(body)
        // }

        refetch()
        handleCloseModal()
    }

    async function debtPost() {
        console.log("post request ran")
        axios
            .post(`http://localhost:3000/debts/${data.user.id}`, body, { headers })
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        refetch()
        handleCloseModal()
    }
    async function debtPut(e) {
        // console.log("put request ran")
        console.log(`Hit resolved button: ${e.target.id === "resolved-btn"}`)
        const newBody = { ...body, isPaid: e.target.id === "resolved-btn" }
        axios
            .put(`http://localhost:3000/debts/${data.user.id}`, newBody, { headers })
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        refetch()
        handleCloseModal()
    }

    return (
        <>
            {isActive && (
                <Modal>
                    <div className="modal-box-content-wrapper flex flex-col gap-4">
                        <div className="modal-title">
                            <p className="text-2xl">
                                <strong>{debtData ? "Edit" : "Add"}</strong>
                            </p>
                        </div>
                        <form className="flex flex-col gap-4">
                            <label>
                                {isOweToUserModal ? "Who owes you?" : "Who do you owe?"}
                                <input
                                    type="text"
                                    value={otherPartyName}
                                    name="otherPartyName"
                                    placeholder="Enter their name"
                                    required
                                    onChange={(e) => setOtherPartyName(e.target.value)}
                                />
                            </label>
                            <label>
                                How much is owed?
                                <div className="flex gap-1">
                                    <p>$</p>
                                    <input
                                        value={dollars}
                                        name="dollars"
                                        type="number"
                                        placeholder="(dollars)"
                                        className="w-16"
                                        required
                                        onChange={(e) => setDollars(e.target.value)}
                                    />
                                    c
                                    <input
                                        value={cents}
                                        type="number"
                                        name="cents"
                                        placeholder="(cents)"
                                        // maxLength={2}
                                        max={99}
                                        className="max-w-14"
                                        onChange={(e) => setCents(e.target.value)}
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col">
                                <p>Description</p>
                                <textarea
                                    value={debtDescription}
                                    type="text"
                                    name="debtDescription"
                                    placeholder="Add details (optional)"
                                    maxLength={100}
                                    className="h-20 resize-none"
                                    onChange={(e) => setDebtDescription(e.target.value)}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={(e) => {
                                    debtData ? debtPut(e) : debtPost()
                                }}
                                className="rounded-lg bg-blue-500 p-2 text-white"
                            >
                                {debtData ? (
                                    <>
                                        <div className="flex justify-center gap-2">
                                            Update
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
                                                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                                                />
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    "Add"
                                )}
                            </button>
                            {debtData && (
                                <>
                                    <button
                                        type="button"
                                        onClick={debtPut}
                                        id="resolved-btn"
                                        className="resolved-btn flex justify-center gap-2 rounded-lg bg-green-600 p-2 text-white"
                                    >
                                        Resolve
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
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
