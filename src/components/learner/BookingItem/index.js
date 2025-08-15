import api from "../../../utils/api"

import { timeAgo } from "calculate-time-date"

import toast from "react-hot-toast"

import ToastComponent from "../../ToasterComponent"

import ConfirmBookingModal from "../ConfirmBookingModal"

import "./index.css"

import { confirmAlert } from "react-confirm-alert"

const BookingItem = (props) => {
    const { bookingDetails, apiFunction } = props
    const { title, description, mentorName, createdAt, imageUrl, status, bookingId, skillId } = bookingDetails
    const time = timeAgo(createdAt)
    let color = status === "accepted" ? "#0DFF00" : "red"
    if (status === "pending") color = "#FE9900"
    const style = status === 'accepted' ? { cursor: "not-allowed" } : null

    const delteBooking = async () => {
        try {
            const response = await api.delete(`api/bookings/remove/${bookingId}`)

            if (response.status === 200) apiFunction(); toast.success("Dleted Booking Successfully!!")
        } catch (err) {
            if (err.status === 404) toast.error("Booking Doesn't Exist!!!")
            else toast.error("Failed to delete Booking")
        }

    }

    const onClickDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => (<ConfirmBookingModal onClose={onClose} onConfirm={delteBooking}> <h1> Confirm Deletion </h1> <p> {`Would you like delete booking of ${title}`} </p></ConfirmBookingModal>)
        })
    }


    return (
        <li className="booking-item">
            <aside>
                <h1> {title} </h1>
                <p className="desc"> {description} </p>
                <p className="skill-id"> Skill Id: {skillId}</p>
                <h3> mentor: {mentorName} </h3>
                <p> Booked: {time} </p>
                <p> status: <span style={{ color: color }}> {status} </span></p>
                <button style={style} className="delete-btn" disabled={status !== 'pending'} onClick={onClickDelete} title={status !== 'pending' ? "You cannot delete this booking now" : ""}> Delete </button>
            </aside>
            <img src={imageUrl} alt={title} />
            <ToastComponent />
        </li>
    )
}

export default BookingItem