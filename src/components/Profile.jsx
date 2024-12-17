import { useContext } from "react"
import { AppContext } from "../App"

export default function Profile() {
    const { data, setActiveModal } = useContext(AppContext)
    return (
        <>
            <div className="MAIN-content-wrapper flex min-w-[290px] max-w-[52rem] flex-1 flex-col gap-4 px-4">
                <div className="profile-box relative mt-4 flex flex-col gap-4 rounded-xl bg-white p-4">
                    <button
                        onClick={() => setActiveModal(2)}
                        className="absolute right-2 top-2 flex gap-1 rounded-lg p-2 opacity-70 lg:hover:bg-slate-100 lg:hover:opacity-100"
                    >
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
                    <div>
                        <p className="text-3xl">
                            <strong>Profile</strong>
                        </p>
                    </div>
                    <div className="name flex flex-col">
                        <p className="opacity-70">Full name</p>
                        <p className="text-2xl">
                            <strong>
                                {data.user.firstName} {data.user.lastName}
                            </strong>
                        </p>
                    </div>
                    <div className="username flex flex-col">
                        <p className="opacity-70">Username</p>
                        <p className="text-xl">{data.user.username}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
