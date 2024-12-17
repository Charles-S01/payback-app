import { createContext, useEffect, useMemo, useState } from "react"
import "./App.css"
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom"
import useData from "./hooks/useData"
import { DebtCard, DebtModal, EditProfileModal, Modal } from "./components"
import axios from "axios"
import { useQuery, QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Appp />
        </QueryClientProvider>
    )
}

export const ActiveModalContext = createContext({})
export const AppContext = createContext({})

function Appp() {
    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    // const { data, isLoading, error, refetch } = useData(token)
    const headers = {
        Authorization: "Bearer " + token,
    }
    const { data, isLoading, error, refetch } = useQuery("userData", async () => {
        const response = await axios.get("http://localhost:3000/userData", { headers })
        console.log(response)
        return response.data
    })
    const [activeModal, setActiveModal] = useState(0)
    const [isOweToUserModal, setIsOweToUserModal] = useState(true)
    const [debtDataEdit, setDebtDataEdit] = useState()

    const [sidebarShow, setSidebarShow] = useState(() => {
        const sideBarSetting = localStorage.getItem("sidebarShow")
        return sideBarSetting === "true"
    })
    const [activeTab, setActiveTab] = useState()

    useEffect(() => {
        localStorage.setItem("sidebarShow", sidebarShow)
    }, [sidebarShow])

    document.body.style.overflow = activeModal > 0 ? "hidden" : null

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
        navigate("/log-in")
    }

    function handleCloseModal(e) {
        // console.log(e.target)
        setActiveModal(0)
        setDebtDataEdit(null)
    }

    function handleAddClick(isOweToUser) {
        setIsOweToUserModal(isOweToUser)
        setActiveModal(1)
    }

    return (
        <>
            <div className="whole-page flex h-full w-full">
                <div
                    className={`sidebar-view ${sidebarShow ? "block lg:static lg:z-0 lg:h-full lg:w-auto" : "hidden"} fixed z-10 flex h-full w-screen backdrop-brightness-50`}
                >
                    <div
                        className={`sidebar-itself w-60 bg-blue-200 ${sidebarShow && "lg:z-0 lg:h-full"} z-10 flex h-full flex-col gap-4 border-r-0 border-slate-200 bg-white p-4 lg:static lg:z-0`}
                    >
                        <button onClick={() => setSidebarShow(!sidebarShow)} className="self-start">
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
                        <div className="routes flex flex-col items-center gap-2 overflow-auto p-6 px-1">
                            <Link
                                to={"/"}
                                className={`home ${location.pathname === "/" ? "bg-green-700 text-white" : "lg:hover:bg-gray-500 lg:hover:bg-opacity-20"} flex w-full items-center justify-center gap-2 rounded-xl p-2 text-2xl`}
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
                                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>
                                <p>Home</p>
                            </Link>
                            <Link
                                to={"/profile"}
                                className={`profile ${location.pathname === "/profile" ? "bg-green-700 text-white" : "lg:hover:bg-gray-500 lg:hover:bg-opacity-20"} flex w-full items-center justify-center gap-2 rounded-xl p-2 text-2xl`}
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
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                                <p>Profile</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`CONTENT-section m-0 flex flex-1 flex-col overflow-auto p-0`}>
                    <ActiveModalContext.Provider
                        value={{
                            activeModal,
                            data,
                            handleCloseModal,
                            refetch,
                            isOweToUserModal,
                            setIsOweToUserModal,
                            setActiveModal,
                            debtData: debtDataEdit,
                            headers,
                        }}
                    >
                        {activeModal > 0 && (
                            <>
                                <DebtModal />
                                <EditProfileModal />
                            </>
                        )}
                    </ActiveModalContext.Provider>

                    <header className="header basis-18 flex w-full shrink-0 items-center justify-between bg-green-600 p-4 text-white">
                        <button onClick={() => setSidebarShow(!sidebarShow)}>
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
                        {token ? (
                            <>
                                <button onClick={handleLogOut} className="rounded-lg bg-green-700 p-2">
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link to={"/log-in"}>
                                <button className="rounded-lg bg-green-700 p-2">Log in</button>
                            </Link>
                        )}
                    </header>

                    <div className="MAIN-content-container flex flex-1 justify-center bg-blue-100 pb-8">
                        {error && (
                            <>
                                <div className="mt-4">
                                    <p className="text-2xl">Please log in to get started</p>
                                </div>
                            </>
                        )}
                        {isLoading && (
                            <>
                                <div className="loading-box flex flex-col items-center gap-2">
                                    <p className="text-2xl">Loading...</p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-10 animate-spin"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>
                                </div>
                            </>
                        )}
                        {data && (
                            <>
                                <AppContext.Provider value={{ data, handleAddClick, setDebtDataEdit, setActiveModal }}>
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
