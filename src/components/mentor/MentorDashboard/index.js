import { useState, useEffect, useCallback } from "react"

import { ClipLoader } from "react-spinners"

import { v4 as uuidV4 } from "uuid";

import { FaSearch } from "react-icons/fa";

import { GoPlus } from "react-icons/go";

import MenotrSKillItem from "../MentorSkillItem"

import toast from "react-hot-toast"

import EmptyView from "../../EmptyView"

import ToastComponent from "../../ToasterComponent"

import MentorHeader from "../MentorHeader"

import SkillPopup from "../SkillPopup";

import api from "../../../utils/api"

import "./index.css"

const MentorDashBoard = () => {
    const [skillsList, setSkillsList] = useState([])
    const [isLoading, setLoadingStatus] = useState(false)
    const [error, setError] = useState(false)
    const [searchInput, setSearchInput] = useState("")


    const getSkills = useCallback(async () => {
        try {
            setLoadingStatus(true)
            const response = await api.get("api/skills/my-skills")
            const updatedData = response.data.map(eachItem => ({
                uid: uuidV4(),
                createdAt: eachItem.created_at,
                description: eachItem.description,
                id: eachItem.id,
                tags: eachItem.tags,
                title: eachItem.title,
                imageUrl: eachItem.image_url,
            }))
            setLoadingStatus(false)
            toast.success("Fetched all your Skills Successfully")
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

    const errorFunction = () => (
        <div className="skills-failure-div">
            <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1752745267/Computer_troubleshooting-rafiki_l2gi0k.png" alt="errorImg" />
            <h1> Error Try Again... </h1>
            <button type="button" className="btn btn-light" onClick={getSkills}> Retry </button>
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

    const createSkill = (formData) => {
        const skillPromise = api.post("api/skills/", formData)
        toast.promise(skillPromise, {
            success: "Created Skill successfully!!!",
            error: "Failed to create skill!!!",
            loading: "Creating Skill..."
        })
        getSkills()
    }

    const renderSkills = () => {
        const filteredList = skillsList.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()))
        return filteredList.length === 0 ? <EmptyView /> : (<ul className="skills-ul">
            {filteredList.map(eachSkill => (
                <MenotrSKillItem key={eachSkill.uid} userDetails={eachSkill} />
            ))}
        </ul>)
    }

    const renderFunction = () => {
        return error ? (errorFunction()) : renderSkills()
    }



    useEffect(() => {
        getSkills()
    }, [getSkills])


    return (
        <div className="mentor-dashboard p-2">
            <MentorHeader />
            <div className="mentor-skills-container mt-2">
                <ToastComponent />
                <SkillPopup createSkill={createSkill}> <button className="btn btn-primary btn-sm" id="createSkill" type="button"> <span> <GoPlus /></span>Create Skill </button> </SkillPopup>
                <div className="mentor-search-div">
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

export default MentorDashBoard