export default function ResolvedDebtCard({ debt }) {
    const isOwedToUser = debt.isOwedToUser

    return (
        <>
            <div
                className={`debt-card relative flex flex-col gap-4 rounded-lg bg-blue-200 bg-opacity-50 p-2 transition-all`}
            >
                <div className="top-half flex justify-between">
                    <div className="flex flex-col">
                        <p>
                            <strong className="text-xl">{debt.otherPartyName}</strong>{" "}
                            {isOwedToUser}
                        </p>
                        <p
                            className={`text-xl ${isOwedToUser ? "text-green-700" : "text-red-500"}`}
                        >
                            <strong>{`$${(Math.round(debt.oweAmount * 100) / 100).toFixed(2)}`}</strong>
                        </p>
                    </div>
                    <div className="">
                        <p>Date created:</p>
                        <p>{new Date(debt.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="bottom-part flex justify-end text-green-700">
                    <div className="flex gap-1">
                        <p>
                            <strong>Resolved</strong>
                        </p>
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
                </div>
            </div>
        </>
    )
}
