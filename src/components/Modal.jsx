import { useContext } from "react"
import { ActiveModalContext } from "../App"

export default function Modal({ children }) {
    const { handleCloseModal } = useContext(ActiveModalContext)
    return (
        <>
            <div
                // onClick={handleCloseModal}
                className="modal-view fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center backdrop-blur-md backdrop-brightness-75"
            >
                <div className="modal-box relative basis-72 rounded-xl bg-white p-4">
                    <button
                        onClick={handleCloseModal}
                        className="close-btn absolute right-3 top-3 rounded-lg opacity-70 lg:hover:bg-gray-500 lg:hover:bg-opacity-10 lg:hover:opacity-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </>
    )
}
