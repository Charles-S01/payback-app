import { useContext } from "react"
import { AppContext } from "../App"
import { DebtCard } from "../components"

export default function Home() {
    const { data, handleAddClick, setDebtDataEdit } = useContext(AppContext)
    return (
        <>
            <div className="MAIN-content-wrapper flex min-w-[290px] max-w-[52rem] flex-1 flex-col gap-4 px-4">
                <div className="dashboard-box mt-4 flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
                    <p className="text-nowrap text-2xl">
                        <strong>Hello, {data.user.firstName}</strong>
                    </p>
                    <div className="flex w-full justify-center">
                        <div className="flex flex-1 flex-wrap gap-4 text-nowrap border-black">
                            <div className="owe-me-box flex-1 flex-col rounded-xl border-2 border-green-500 bg-green-600 p-2 text-white">
                                <div>
                                    <p>People owe you:</p>
                                </div>
                                <div>
                                    <p className="flex-1 text-3xl">
                                        <strong>{`$${data.totalOweToUser || 0}`}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="owe-others-box flex-1 flex-col rounded-xl border-2 border-red-500 bg-red-600 p-2 text-white">
                                <div>
                                    <p className="">You owe others:</p>
                                </div>
                                <div>
                                    <p className="flex-1 text-3xl">
                                        <strong>{`$${data.totalOweToOthers || 0}`}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tabs-section mt-4 flex w-full flex-col gap-4">
                    <div className="columns flex flex-wrap gap-8">
                        <div className="owe-me-column flex min-w-[20rem] flex-1 flex-col gap-4">
                            <button
                                onClick={() => handleAddClick(true)}
                                className="flex gap-1 self-center rounded-lg p-2 opacity-70 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100"
                            >
                                Add
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>

                            <p className="border-b-2 border-gray-300 pb-2 text-center">
                                <strong>Money owed to me</strong>
                            </p>
                            {data.moneyToUser.map((debt) => {
                                return (
                                    <>
                                        <DebtCard
                                            key={debt.id}
                                            id={debt.id}
                                            debt={debt}
                                            handleAddClick={() => handleAddClick(true)}
                                            setDebtDataEdit={setDebtDataEdit}
                                        />
                                    </>
                                )
                            })}
                        </div>
                        <div className="owe-other-column flex min-w-[20rem] flex-1 flex-col gap-4">
                            <button
                                onClick={() => handleAddClick(false)}
                                className="flex gap-1 self-center rounded-lg p-2 opacity-70 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100"
                            >
                                Add
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>

                            <p className="border-b-2 border-gray-300 pb-2 text-center">
                                <strong>Money owed to others</strong>
                            </p>
                            {data.moneyToOthers.map((debt) => {
                                return (
                                    <>
                                        <DebtCard
                                            key={debt.id}
                                            id={debt.id}
                                            debt={debt}
                                            handleAddClick={() => handleAddClick(false)}
                                            setDebtDataEdit={setDebtDataEdit}
                                        />
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
