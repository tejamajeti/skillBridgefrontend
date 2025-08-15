import { CgProfile } from "react-icons/cg";

import MentorHeader from "../MentorHeader"

import toast from "react-hot-toast"

import { useState, useEffect, useCallback } from "react"

import ToastComponent from "../../ToasterComponent"

import api from "../../../utils/api"

import "./index.css"


const MentorProfile = () => {

    const [profileDetails, setProfile] = useState([])

    const [name, setName] = useState(profileDetails.name)

    const [bio, setBio] = useState(profileDetails.bio)

    const [edit, setEdit] = useState(false)

    const onChangeName = (event) => setName(event.target.value)

    const onChangeBio = event => setBio(event.target.value)

    const updateDetails = useCallback(async () => {
        const payload = { "name": name, "bio": bio }
        const updatePromise = api.put("/api/users/", payload)
        setEdit(false)
        toast.promise(updatePromise, {
            success: "updated Details Successfully!!!",
            error: "Failed to update Details!!!",
            loading: "Updating user Profile...."
        })
    }, [name, bio])

    const getProfile = useCallback(async () => {
        const profilePromise = api.get("/api/users/")
        toast.promise(profilePromise, {
            success: "Fetched your Profile Successfully!!!",
            loading: "Fetching your Profile Details.....",
            error: "Failed to fetch your Profile!!!"
        })
        const response = await profilePromise

        if (response.status === 200) {
            setProfile(response.data)
            setBio(response.data.bio)
            setName(response.data.name)
        }

    }, [])



    useEffect(() => {
        getProfile()
    }, [getProfile])

    return (
        <section className="mentor-profile-container p-2">
            <ToastComponent />
            <MentorHeader />
            <div className="mentor-profile p-2 mt-2">
                <CgProfile className="profile-img" />
                <div className="profile-details">
                    <div>
                        <h1> Profile </h1>
                        <button type="button" id="mentorEditBtn" onClick={() => setEdit(true)}> edit info </button>
                    </div>
                    <div>
                        <label htmlFor="profileName"> Name </label>
                        <input id="profileName" value={name || " "} disabled={!edit} onChange={onChangeName} style={edit ? { border: "1px solid lightBlue", borderRadius: "5px" } : {}} />
                    </div>
                    <div>
                        <label htmlFor="profileEmail"> Email </label>
                        <input disabled={true} id="profileEmail" value={profileDetails.email || " "} />
                    </div>
                    <div>
                        <label htmlFor="profileRole"> Role </label>
                        <input id="profileRole" disabled={true} value={profileDetails.role || " "} />
                    </div>
                    <div>
                        <label htmlFor="profileBio"> Bio </label>
                        <textarea id="profileBio" value={bio || " "} disabled={!edit} onChange={onChangeBio} style={edit ? { border: "1px solid lightBlue", borderRadius: "5px" } : {}}>
                        </textarea>
                    </div>
                    <div>
                        <button className="btn btn-primary" style={!edit ? { display: "none" } : {}} type="submit" onClick={updateDetails}> Update </button>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default MentorProfile 