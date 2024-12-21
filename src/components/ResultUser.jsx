import { useContext } from "react"
import { AppContext } from "../App"

export default function ResultUser({ username, firstName, lastName }) {
    return (
        <>
            <div className="relative flex flex-col rounded-xl bg-blue-200 bg-opacity-50 p-2 hover:cursor-pointer">
                <p>
                    {firstName} {lastName}
                </p>

                <p>
                    <strong>{`@${username}`}</strong>
                </p>
                <button className="absolute right-2 top-2 rounded-lg bg-green-700 p-1 text-white">
                    Request
                </button>
            </div>
        </>
    )
}
