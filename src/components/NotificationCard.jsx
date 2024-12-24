export default function NotificationCard({
    creatorFirstName,
    creatorLastName,
    creatorUsername,
    amount,
    message,
    createdAt,
}) {
    return (
        <>
            <div className="card flex justify-between overflow-hidden text-nowrap rounded-xl bg-blue-200 bg-opacity-50 p-2">
                <div className="left-side flex flex-col">
                    <div className="creator-name">
                        <p>
                            <span className="opacity-60">{`@${creatorUsername}`} </span>{" "}
                            <strong>
                                {creatorFirstName} {creatorLastName}
                            </strong>
                        </p>
                    </div>

                    <div className="amount">
                        <p className="opacity-60">Requested:</p>
                        <p className="text-green-700">
                            <strong>{`$${(Math.round(amount * 100) / 100).toFixed(2)}`}</strong>
                        </p>
                    </div>

                    {message && (
                        <div className="message">
                            <p className="opacity-60">Message:</p>
                            <p>{message}</p>
                        </div>
                    )}
                </div>

                <div className="right-side flex flex-col">
                    <p>{new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </>
    )
}
