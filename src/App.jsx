import { createContext, useEffect, useMemo, useState } from "react"
import "./App.css"
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom"
import useData from "./hooks/useUser"
import { DebtCard, Loading } from "./components"
import axios from "axios"
import { useQuery, QueryClientProvider, QueryClient } from "react-query"
import { getUser } from "./apiCalls"
import useUser from "./hooks/useUser"

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Appp />
        </QueryClientProvider>
    )
}

export const AppContext = createContext({})

function Appp() {
    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const isLoggedIn = token ? true : false
    // if (!isLoggedIn) {
    //     navigate("/log-in")
    // }

    const { data, isLoading, error } = useUser()

    const [sidebarShow, setSidebarShow] = useState(() => {
        const sideBarSetting = localStorage.getItem("sidebarShow")
        console.log(sideBarSetting)
        return sideBarSetting === null ? true : sideBarSetting === "true"
    })
    useEffect(() => {
        localStorage.setItem("sidebarShow", sidebarShow)
    }, [sidebarShow])

    // if (isLoading) {
    //     return (
    //         <>
    //             <p>Loading...</p>
    //         </>
    //     )
    // }
    // if (error) {
    //     return (
    //         <>
    //             <p>{error}</p>
    //         </>
    //     )
    // }

    function handleLogOut() {
        localStorage.removeItem("token")
        queryClient.invalidateQueries(["userData"])
        navigate("/log-in")
    }

    return (
        <>
            <div className="whole-page flex h-full w-full">
                <div
                    className={`sidebar-view ${sidebarShow ? "block lg:static lg:z-0 lg:h-full lg:w-auto" : "hidden"} fixed z-10 flex h-full w-screen backdrop-blur-md backdrop-brightness-50`}
                >
                    <div
                        className={`sidebar-itself w-60 bg-green-950 text-white shadow-2xl ${sidebarShow && "lg:z-0 lg:h-full"} z-10 flex h-full flex-col gap-4 bg-white p-4 lg:static lg:z-0`}
                    >
                        <button
                            onClick={() => setSidebarShow(!sidebarShow)}
                            className={`self-start`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                        <div className="routes mb-auto flex flex-col items-center gap-2 overflow-auto p-6 px-1 text-2xl">
                            <Link
                                to={"/"}
                                className={`home ${location.pathname === "/" ? "bg-green-700 text-white" : "lg:hover:bg-gray-500 lg:hover:bg-opacity-20"} flex w-full items-center justify-center gap-2 rounded-xl p-2`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                </svg>
                                <p>Home</p>
                            </Link>
                            <Link
                                to={"/profile"}
                                className={`profile ${location.pathname.startsWith("/profile") ? "bg-green-700 text-white" : "lg:hover:bg-gray-500 lg:hover:bg-opacity-20"} flex w-full items-center justify-center gap-2 rounded-xl p-2`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p>Profile</p>
                            </Link>
                            <Link
                                to={"/request"}
                                className={`profile ${location.pathname.startsWith("/request") ? "bg-green-700 text-white" : "lg:hover:bg-gray-500 lg:hover:bg-opacity-20"} flex w-full items-center justify-center gap-2 rounded-xl p-2`}
                            >
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
                                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                    />
                                </svg>
                                <p>Request</p>
                            </Link>
                        </div>
                        {isLoggedIn && (
                            <button
                                onClick={handleLogOut}
                                className="flex w-full items-center justify-center gap-2 rounded-xl p-2 lg:hover:bg-gray-500 lg:hover:bg-opacity-20"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p>Log out</p>
                            </button>
                        )}
                    </div>
                </div>

                <div className={`CONTENT-section m-0 flex flex-1 flex-col overflow-auto p-0`}>
                    <header className="header basis-18 flex w-full shrink-0 items-center justify-between bg-green-700 p-4 text-white">
                        <button
                            onClick={() => setSidebarShow(!sidebarShow)}
                            className={`${sidebarShow && "opacity-0"}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                        <p className="text-3xl">
                            {" "}
                            <strong>PayBack</strong>
                        </p>

                        {isLoggedIn ? (
                            <>
                                <div className="flex gap-2">
                                    <Link to={`/notifications`}>
                                        <button>
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
                                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                                />
                                            </svg>
                                        </button>
                                    </Link>
                                    <Link to={`/profile`}>
                                        <button>
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
                                        </button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <Link to={"/log-in"}>
                                <button className="text-nowrap rounded-lg bg-green-800 p-2">
                                    Log in
                                </button>
                            </Link>
                        )}
                    </header>

                    <div className="MAIN-content-container flex flex-1 justify-center bg-blue-100 pb-8">
                        {error && (
                            <>
                                <div className="mt-4">
                                    <p className="text-2xl">
                                        {"Something went wrong. Please make sure you're logged in"}
                                    </p>
                                </div>
                            </>
                        )}
                        {isLoading && (
                            <>
                                <Loading />
                            </>
                        )}
                        {data && !error && (
                            <>
                                <AppContext.Provider
                                    value={
                                        {
                                            // data,
                                        }
                                    }
                                >
                                    <Outlet />
                                </AppContext.Provider>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
