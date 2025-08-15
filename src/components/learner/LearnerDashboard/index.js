import { useState, useEffect, useCallback } from "react"

import { ClipLoader } from "react-spinners"

import { v4 as uuidV4 } from "uuid";

import { FaSearch } from "react-icons/fa";

import SKillItem from "../SkillItem"

import toast from "react-hot-toast"

import ToastComponent from "../../ToasterComponent"

import EmptyView from "../../EmptyView"

import LearnerHeader from "../LearnerHeader"

import api from "../../../utils/api"

import "./index.css"

const LearnerDashBoard = () => {
    const [skillsList, setSkillsList] = useState([])
    const [isLoading, setLoadingStatus] = useState(false)
    const [error, setError] = useState(false)
    const [searchInput, setSearchInput] = useState("")


    const errorFunction = () => (
        <div className="skills-failure-div">
            <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1752745267/Computer_troubleshooting-rafiki_l2gi0k.png" alt="errorImg" />
            <h1> Error Try Again... </h1>
            <button type="button" className="btn btn-light" onClick={getSKills}> Retry </button>
        </div>
    )

    const onChangeSearchInput = event => {
        setSearchInput(event.target.value)
    }

    const loaderFunction = () => (
        <div className="loader-container">
            <ClipLoader color="green" loading={true} size={100} />
        </div>

    )

    const renderSkills = () => {
        const filteredList = skillsList.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()))
        return filteredList.length === 0 ? <EmptyView /> : (<ul className="skills-ul">
            {filteredList.map(eachSkill => (
                <SKillItem key={eachSkill.uid} userDetails={eachSkill} />
            ))}
        </ul>)
    }

    const renderFunction = () => {
        return error ? (errorFunction()) : renderSkills()
    }


    const getSKills = useCallback(async () => {
        try {
            setLoadingStatus(true)
            const response = await api.get("api/skills/")
            const updatedData = response.data.map(eachItem => ({
                uid: uuidV4(),
                createdAt: eachItem.created_at,
                description: eachItem.description,
                id: eachItem.id,
                mentorEmail: eachItem.mentor_email,
                mentorId: eachItem.mentor_id,
                mentorName: eachItem.mentor_name,
                tags: eachItem.tags,
                title: eachItem.title,
                imageUrl: eachItem.image_url,
            }))
            setLoadingStatus(false)
            toast.success("Fetched Skills Successfully")
            setSkillsList(updatedData)
        } catch (err) {
            let message = "Unable Fetch Skills at the Momemt!"
            if (err.response && err.response.data) message = err.response.data
            else if (err.message) message = err.message
            setError(true)
            setLoadingStatus(false)
            toast.error(message)
        }
    }, [setError])


    useEffect(() => {
        getSKills()
    }, [getSKills])


    return (
        <div className="learner-dashboard p-2">
            <LearnerHeader />
            <div className="learner-skills-container mt-2">
                <ToastComponent />
                <div className="learner-search-div">
                    <h1>
                        Skills
                    </h1>
                    <div>
                        <input type="search" className="search-input" placeholder="Search skills" onChange={onChangeSearchInput} value={searchInput} id="searchInput" />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
                {isLoading ? (loaderFunction()) : (renderFunction())}
            </div>
        </div>
    )
}

export default LearnerDashBoard