import api from "../../../utils/api"

import toast from "react-hot-toast"

import ToasterComponent from "../../ToasterComponent"

import "./index.css"

const RequestItem = (props) => {

    const { requestDetails, getRequests } = props

    const { skillTitle, learnerName, createdAt, skillId, status, id } = requestDetails

    const handleClick = async status => {
        try {
            const response = await api.patch(`/api/bookings/${id}`, { status })
            if (response.status === 200) toast.success("Updated Booking Successfully!!!")
            getRequests()
        } catch (err) {
            toast.error(`Failed to update Booking due to ${err.message}`)
        }
    }

    let colour
    if (status === 'pending') colour = "orange"
    else if (status === 'accepted') colour = "green"
    else colour = "red"

    const disable = status !== 'pending'

    const disabledStyles = status !== 'pending' ? { cursor: "not-allowed", display: "inline-block" } : {}

    return (
        <>
            <ToasterComponent />
            <li className="request-item p-3 m-2">
                <div>
                    <h1> {skillTitle} </h1>
                    <p> Booked by: <span> {learnerName} </span> </p>
                    <p> Booked on: <span> {createdAt.split("T")[0]} </span></p>
                    <p> skill id: <span> {skillId} </span></p>
                    <p> Status: <span style={{ color: colour }}> {status} </span></p>
                </div>
                <div title={disable === true ? "You cannot change status once after accepting or rejecting Booking!!!" : ""}>
                    <button className="btn btn-sm btn-success m-auto" disabled={disable} style={{ pointerEvents: "auto", ...disabledStyles }} onClick={() => handleClick('accepted')}>
                        Accept
                    </button>
                    <button className="btn btn-sm btn-danger" style={{ marginLeft: '15px', pointerEvents: "auto", ...disabledStyles }} disabled={disable} onClick={() => handleClick('rejected')}>
                        Decline
                    </button>
                </div>
            </li >
        </>
    )
}

export default RequestItem