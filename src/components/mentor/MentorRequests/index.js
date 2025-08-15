import { useState, useEffect, useCallback } from "react"

import { v4 as uuidv4 } from "uuid"

import MentorHeader from "../MentorHeader"

import api from "../../../utils/api"

import toast from "react-hot-toast"

import ToastComponent from "../../ToasterComponent"

import RequestItem from "../RequestItem"

import EmptyView from "../../EmptyView"

import "./index.css"

const MentorRequests = () => {
    const [activeFilter, setActiveFilter] = useState("")

    const [requestData, setData] = useState([])

    const onClickingAccepted = () => setActiveFilter("accepted")

    const onChangeSelect = event => setActiveFilter(event.target.value)

    const onClickingAll = () => setActiveFilter("")

    const onClickingRejected = () => setActiveFilter("rejected")

    const onClickingPending = () => setActiveFilter("pending")

    const filteredRequests = requestData.filter(eachItem => eachItem.status.toLowerCase().includes(activeFilter.toLowerCase()))

    const getRequests = useCallback(async () => {
        const requestPromise = api.get("/api/bookings/received")
        toast.promise(requestPromise, {
            success: "Fetched your Requests successfully!!!",
            loading: "Fetching your Requests",
            error: "Failed to fetch your Requests"
        })
        const response = await requestPromise
        const updatedData = await response.data.map(eachRequest => ({
            createdAt: eachRequest.created_at,
            id: eachRequest.id,
            uid: uuidv4(),
            learnerId: eachRequest.learner_id,
            learnerName: eachRequest.learner_name,
            message: eachRequest.message,
            skillId: eachRequest.skill_id,
            skillTitle: eachRequest.skill_title,
            status: eachRequest.status
        }))
        setData(updatedData)
    }, [])

    useEffect(() => {
        getRequests()
    }, [getRequests])

    return (
        <section className="mentor-requests p-2">
            <ToastComponent />
            <MentorHeader />
            <div className="mentor-requests-container mt-2 p-2">
                <div className="filter-container">
                    <h1> Requests  </h1>
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
                {filteredRequests.length === 0 ? <EmptyView /> : (<ul className="request-list p-2 m-1 mt-3">
                    {filteredRequests.map(eachItem => (
                        <RequestItem key={eachItem.uid} requestDetails={eachItem} getRequests={getRequests} />
                    ))}
                </ul>)}
            </div>
        </section>
    )
}

export default MentorRequests