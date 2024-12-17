import { useContext, useState } from "react"
import { Modal } from "../components"
import { ActiveModalContext } from "../App"
import axios from "axios"

export default function EditProfileModal() {
    const { activeModal, data, refetch, handleCloseModal, headers } = useContext(ActiveModalContext)

    const [firstName, setFirstName] = useState(() => {
        return data.user.firstName
    })
    const [lastName, setLastName] = useState(() => {
        return data.user.lastName
    })

    const isActive = activeModal === 2

    function handleSubmit(e) {
        e.preventDefault()

        const body = {
            firstName,
            lastName,
        }

        axios
            .put(`http://localhost:3000/userData/${data.user.id}`, body, { headers })
            .then((response) => {
                // Handle the response
                console.log(response.data)
            })
            .catch((error) => {
                // Handle errors
                console.log(error)
            })

        refetch()
        handleCloseModal()
    }

    return (
        <>
            {isActive && (
                <Modal>
                    <div className="modal-box-content-wrapper flex flex-col gap-4">
                        <p className="text-2xl">
                            <strong>Edit Profile</strong>
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label>
                                <p>
                                    <strong>Name</strong>
                                </p>
                                <div className="inputs-fields flex flex-col gap-1">
                                    <input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        placeholder="First name"
                                        name="firstName"
                                        id="firstName"
                                        className="rounded-md border-2 border-gray-200 p-1"
                                    />
                                    <input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        placeholder="Last name"
                                        name="lastName"
                                        id="lastName"
                                        className="rounded-md border-2 border-gray-200 p-1"
                                    />
                                </div>
                            </label>
                            <button type="submit" className="rounded-lg bg-blue-500 p-2 text-white">
                                Finish edit
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
