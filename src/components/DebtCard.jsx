export default function DebtCard({ debt, setDebtDataEdit, handleAddClick }) {
    const isOwedToUser = debt.isOwedToUser

    function handleCardClick() {
        handleAddClick()
        setDebtDataEdit(debt)
    }
    return (
        <>
            <div
                className={`debt-card relative flex flex-col gap-4 rounded-xl border-2 border-slate-300 bg-white p-2 shadow-lg transition-all hover:cursor-pointer lg:hover:scale-105`}
                onClick={handleCardClick}
            >
                <div className="top-half flex justify-between">
                    <div className="flex flex-col">
                        <p>
                            <strong className="text-xl">{debt.otherPartyName}</strong>{" "}
                            {isOwedToUser ? "owes me" : "is owed"}
                        </p>
                        <p className={`text-3xl ${isOwedToUser ? "text-green-600" : "text-red-500"}`}>
                            <strong>{`$${debt.oweAmount}`}</strong>
                        </p>
                    </div>
                    <div className="left-side">
                        <p>Date created:</p>
                        {/* <p>{debt.createdAt}</p> */}
                    </div>
                </div>
                <div className="description">
                    <p>Description:</p>
                    <p>{debt.description}</p>
                </div>
                <button className="absolute bottom-1 right-1 rounded-lg p-1 lg:hover:bg-gray-600 lg:hover:bg-opacity-10">
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
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                    </svg>
                </button>
            </div>
        </>
    )
}
