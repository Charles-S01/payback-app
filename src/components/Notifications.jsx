import { useQuery, useQueryClient } from "react-query"
import useUser from "../hooks/useUser"
import { getReceivedRequests } from "../api/moneyRequests"
import NotificationCard from "./NotificationCard"
import BackButton from "./BackButton"

export default function Notifications(params) {
    const queryClient = useQueryClient()
    const { data: userData } = useUser()

    const { data } = useQuery({
        queryKey: ["receivedRequests"],
        queryFn: getReceivedRequests,
    })

    return (
        <>
            <div className="MAIN-content-wrapper relative mt-4 flex min-w-[290px] max-w-[52rem] flex-1 flex-col items-stretch gap-8 px-4">
                <BackButton />
                <div className="title flex items-center justify-center gap-2 text-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p>
                        <strong>Notifications</strong>
                    </p>
                </div>

                <div className="requests flex flex-col gap-2">
                    {data && (
                        <>
                            {data.requestsReceived.map((request) => {
                                return (
                                    <NotificationCard
                                        key={request.id}
                                        creatorFirstName={request.creator.firstName}
                                        creatorLastName={request.creator.lastName}
                                        creatorUsername={request.creator.username}
                                        amount={request.amount}
                                        message={request.message}
                                        createdAt={request.createdAt}
                                    />
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
