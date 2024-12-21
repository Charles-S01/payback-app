import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <>
            <div className="flex h-full w-full items-center justify-center bg-blue-100">
                <div className="error-box flex-col gap-4 text-2xl">
                    <p>Something went wrong...</p>
                    <Link to={"/"}>
                        <p className="text-blue-600 hover:underline">Go to home page</p>
                    </Link>
                    <Link to={"/log-in"}>
                        <p className="text-blue-600 hover:underline">Go to log-in page</p>
                    </Link>
                    <p>Or refresh the page</p>
                </div>
            </div>
        </>
    )
}
