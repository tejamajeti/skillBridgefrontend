import { v4 as uuidv4 } from "uuid"

import { useState, useEffect, useCallback } from "react"

import toast from "react-hot-toast"

import ToastComponent from "../../ToasterComponent"

import LearnerHeader from "../LearnerHeader"

import { ClipLoader } from "react-spinners"

import BookingItem from "../BookingItem"

import EmptyView from "../../EmptyView"

import api from "../../../utils/api"

import "./index.css"

const apiConstraints = { initial: "INITIAL", loading: "LOADING", failure: "FAILURE", success: "SUCCESS" }

const LearnerBookings = () => {

    const [activeFilter, setActiveFilter] = useState("")

    const [apiStatus, setApiStatus] = useState(apiConstraints.initial)

    const [bookingsList, setBookingsList] = useState([])

    const onClickingAccepted = () => setActiveFilter("accepted")

    const onChangeSelect = event => setActiveFilter(event.target.value)

    const onClickingAll = () => setActiveFilter("")

    const onClickingRejected = () => setActiveFilter("rejected")

    const onClickingPending = () => setActiveFilter("pending")

    const filteredList = bookingsList.filter(eachItem => eachItem.status.toLowerCase().includes(activeFilter.toLowerCase()))

    const getBookings = useCallback(async () => {
        try {
            setApiStatus(apiConstraints.loading)
            const response = await api.get("api/bookings/my-requests")
            const updatedData = response.data.map(eachItem => ({
                createdAt: eachItem.created_at,
                description: eachItem.description,
                bookingId: eachItem.id,
                learnerId: eachItem.learner_id,
                mentorName: eachItem.mentor_name,
                message: eachItem.message,
                status: eachItem.status,
                title: eachItem.title,
                skillId: eachItem.skill_id,
                uid: uuidv4(),
                imageUrl: eachItem.image_url
            }))

            // console.log(updatedData)

            setBookingsList(updatedData)
            setApiStatus(apiConstraints.success)
            toast.success("Fetched Booking Successfully!!!")

        } catch (err) {
            setApiStatus(apiConstraints.failure)
            toast.error("Failed to fetch Bookings!!!")
        }
    }, [])

    useEffect(() => {
        getBookings()
    }, [getBookings])

    const successFunction = () => {
        return (
            filteredList.length !== 0 ? (<ul className="bookings-list-ul">
                {filteredList.map(eachBooking => (
                    <BookingItem key={eachBooking.uid} bookingDetails={eachBooking} apiFunction={getBookings} />
                ))}
            </ul>) : <EmptyView />
        )
    }

    const errorFunction = () => (
        <div className="skills-failure-div">
            <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1752745267/Computer_troubleshooting-rafiki_l2gi0k.png" alt="errorImg" />
            <h1> Error Try Again... </h1>
            <button type="button" className="btn btn-light" onClick={getBookings}> Retry </button>
        </div>
    )

    const failureFunction = () => {
        return errorFunction()
    }

    const loaderFunction = () => (
        <div className="loader-container">
            <ClipLoader color="green" loading={true} size={100} />
        </div>
    )

    const renderFunction = () => {
        switch (apiStatus) {
            case apiConstraints.success:
                return successFunction()
            case apiConstraints.failure:
                return failureFunction()
            case apiConstraints.loading:
                return loaderFunction()
            default:
                return null
        }
    }

    return (
        <div className="learner-bookings-container p-2">
            <LearnerHeader />
            <ToastComponent />
            <div className="learner-bookings mt-2 p-3">
                <div className="filter-container">
                    <h1> Bookings </h1>
                    <ul>
                        <li> <button onClick={onClickingAll} className={activeFilter === "" ? "active-filter" : null} type="button"> All </button> </li>
                        <li> <button onClick={onClickingPending} className={activeFilter === "pending" ? "active-filter" : null} type="button"> Pending </button> </li>
                        <li> <button onClick={onClickingAccepted} className={activeFilter === "accepted" ? "active-filter" : null} type="button">  Accepted </button> </li>
                        <li> <button onClick={onClickingRejected} className={activeFilter === "rejected" ? "active-filter" : null} type="button"> Rejected </button> </li>
                    </ul>
                    <select onChange={onChangeSelect} value={activeFilter} id="selectFilter">
                        <option value=""> All </option>
                        <option value="accepted"> Accepted </option>
                        <option value="rejected"> Rejected </option>
                        <option value="pending"> Pending </option>
                    </select>
                </div>
                {renderFunction()}
            </div>
        </div>
    )
}

export default LearnerBookings

