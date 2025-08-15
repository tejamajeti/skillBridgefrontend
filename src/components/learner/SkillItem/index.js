import api from "../../../utils/api"

import "./index.css"

import toast from "react-hot-toast"

import ToastComponent from "../../ToasterComponent"

import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';

import ConfirmBookingModal from "../ConfirmBookingModal"

const SkillItem = (props) => {

    const { userDetails } = props
    const { title, description, mentorName, mentorEmail, tags, imageUrl, id } = userDetails

    const bookSkill = async (msg) => {
        try {
            const payload = { "skill_id": id, "message": msg }
            const promise = await api.post("/api/bookings/", payload)
            if (promise.status === 201) toast.success("Request Sent Successfully")
        } catch (err) {
            if (err.status === 403) toast.error(err.response.data)
            else toast.error(`Failed to send Request!!!`)
        }
    }

    const handleClick = () => {
        confirmAlert({
            customUI: ({ onClose }) => <ConfirmBookingModal onClose={onClose} onConfirm={bookSkill} > <h1>Confirm Booking</h1>
                <p>Would you like to book the skill titled '{title}'?</p></ConfirmBookingModal>
        });
    };



    return (
        <li className="skill-item">
            <aside>
                <h1> {title} </h1>
                <p> {description} </p>
                <h3> Tags: <span> {tags} </span> </h3>
                <h2> Mentor: <span> {mentorName} </span></h2>
                <h2>  Email: <a href={`mailto:${mentorEmail}`}>{mentorEmail}</a></h2>
                <button className="btn btn-light" style={{ marginTop: "10px", opacity: 0.8 }} onClick={handleClick}> Book skill </button>
            </aside>
            <img src={imageUrl} alt="LOGO" />
            <ToastComponent />
        </li>
    )
}

export default SkillItem