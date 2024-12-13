import { useState } from "react"
import "./App.css"
import { Link, useNavigate } from "react-router-dom"
import useData from "./hooks/useData"

function App() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { data, loading, error } = useData(token)

    // console.log(data)

    function handleLogOut() {
        localStorage.removeItem("token")
        navigate("/log-in")
    }
    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    }
    // if (error) {
    //     return (
    //         <>
    //             <p>{error}</p>
    //         </>
    //     )
    // }
    return (
        <>
            <div className="whole-page m-0 flex h-full w-full flex-col bg-white p-0">
                <header className="header flex basis-20 items-center justify-between bg-green-600 p-4 text-white">
                    <p className="text-3xl">PayBack App</p>
                    {token ? (
                        <>
                            <button
                                onClick={handleLogOut}
                                className="rounded-lg bg-red-500 p-2 text-white"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link to={"/log-in"}>
                            <button className="rounded-lg bg-green-500 p-2 text-white">
                                Log in
                            </button>
                        </Link>
                    )}
                </header>
                {data && (
                    <>
                        <p>Welcome back {data.userData.username}</p>
                    </>
                )}
            </div>
        </>
    )
}

export default App
