import axios from "axios"
import { useContext, useState } from "react"
import { useQuery, QueryClientProvider, QueryClient, useQueryClient } from "react-query"
import { AppContext } from "../App"
import { getUsers } from "../api/user"
import useUser from "../hooks/useUser"
import { Loading, ResultUser } from "../components"
import { Link } from "react-router-dom"

export default function Requests({}) {
    const queryClient = useQueryClient()
    const { data } = useUser()

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const { data: results, isLoading: resultsLoading } = useQuery({
        queryKey: ["searchResults", { firstName, lastName }],
        queryFn: () => getUsers({ userId: undefined, firstName, lastName }),
        enabled: !!firstName || !!lastName,
    })

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <div className="MAIN-content-wrapper flex min-w-[290px] max-w-[52rem] flex-1 flex-col gap-8 px-4">
                <div className="search-part mt-4 flex flex-col items-center gap-4">
                    <p className="text-nowrap text-2xl">
                        <strong>Notify a user</strong>
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-2">
                        <div className="flex flex-wrap justify-center gap-2">
                            <label>
                                <p>First name</p>
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    placeholder="Enter their first name"
                                    name="fName"
                                    id="firstName"
                                    required
                                    // autoComplete="off"
                                    className="rounded-lg p-2"
                                />
                            </label>
                            <label>
                                <p>Last name</p>
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    placeholder="Enter their last name"
                                    name="lName"
                                    id="lastName"
                                    // autoComplete="off"
                                    className="rounded-lg p-2"
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="self-end rounded-lg bg-blue-500 p-2 text-white"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {resultsLoading && <Loading />}
                {results?.users && (
                    <>
                        <div className="results-stuff flex flex-col gap-4">
                            {results.users.length > 0 ? (
                                <>
                                    <p className="">
                                        <strong>Results</strong>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>No results</strong>
                                    </p>
                                </>
                            )}
                            <div className="results flex flex-col gap-2">
                                {results.users.map((user) => {
                                    // console.log();
                                    return (
                                        <>
                                            <Link to={`/request/form/${user.id}`}>
                                                <ResultUser
                                                    key={user.id}
                                                    username={user.username}
                                                    firstName={user.firstName}
                                                    lastName={user.lastName}
                                                />
                                            </Link>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
