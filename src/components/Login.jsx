import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    }, [])

    function handleLoginSubmit(e) {
        e.preventDefault()
        const body = {
            username,
            password,
        }
        axios
            .post("http://localhost:3000/log-in", body)
            .then(function (response) {
                console.log(response.data.message)
                localStorage.setItem("token", response.data.token)
                navigate("/")
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.errorMessage)
            })
    }

    return (
        <>
            <div className="whole-page m-0 flex h-full w-full min-w-64 items-center justify-center p-0">
                <div className="login-box flex min-h-52 basis-96 flex-col gap-2 rounded-xl border-2 border-green-500 p-4 shadow-xl">
                    <p className="self-center text-3xl">
                        <strong>Log in</strong>
                    </p>
                    {errorMessage && (
                        <>
                            <p className="self-center text-red-600">
                                {errorMessage}
                            </p>
                        </>
                    )}
                    <form
                        onSubmit={handleLoginSubmit}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                id="username"
                                className="rounded-lg border-2 border-gray-300 p-1"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                className="rounded-lg border-2 border-gray-300 p-1"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-lg bg-green-500 p-2 text-white"
                        >
                            <p>
                                <strong>Log in</strong>
                            </p>
                        </button>
                    </form>
                    <div className="sign-up flex flex-col">
                        <p>Dont have an account?</p>
                        <div>
                            <Link to={"/sign-up"}>
                                <button className="rounded-lg bg-blue-500 p-2 text-white">
                                    <p>
                                        <strong>Sign up</strong>
                                    </p>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Link to={"/"} className="ml-auto">
                        <p className="underline hover:text-blue-600 hover:underline">
                            Return to home
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}
