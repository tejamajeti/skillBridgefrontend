import { useState } from "react"

import toast from "react-hot-toast"

import ToastComponent from "../ToasterComponent"

import { Link, Navigate } from "react-router-dom"

import axios from "axios"

import "./index.css"

import { getUserRole, getToken } from "../../utils/auth"

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("learner")
    const [bio, setBio] = useState("")

    const onChangeName = event => setName(event.target.value)

    const onChangeEmail = event => setEmail(event.target.value)

    const onChangePassword = event => setPassword(event.target.value)

    const onChangeRole = event => setRole(event.target.value)

    const onChangeBio = event => setBio(event.target.value)

    const signupSubmission = async event => {
        event.preventDefault();
        try {
            const apiUrl = "http://localhost:5000/api/auth/register"
            const userDetails = { name, email, password, role, bio }
            const signupPromise = axios.post(apiUrl, userDetails)

            toast.promise(signupPromise, {
                loading: "Loading...",
                success: "Signedup Successfully!!! Go back to Login",
                error: "Signup Failed Retry"
            })

            const response = await signupPromise

            if (response.status === 201) {
                toast.success("Registration Successful. Go back to Login")
            }

        } catch (err) {
            let mess = "Registration Failed!!!"
            if (err.response && err.response.data) mess = err.response.data
            else if (err.meesage) mess = err.message
            toast.error(mess)
        }
    }

    if (getUserRole() && getToken()) return <Navigate to="/login" replace />

    return (
        < div className="container-fluid" >
            <div className="row">
                <div className="col-12 p-3 bg-dark signup-container">
                    <h1> Welcome to Skill bridge Registration</h1>
                    <form id="signupForm" onSubmit={signupSubmission}>
                        <div>
                            <label htmlFor="signupName"> Name </label>
                            <input id="signupName" type="text" placeholder="Name" className="form-control" required value={name} onChange={onChangeName} />
                        </div>
                        <div>
                            <label htmlFor="signupEmail"> Email </label>
                            <input id="signupEmail" type="email" placeholder="Email" className="form-control" required value={email} onChange={onChangeEmail} />
                        </div>
                        <div>
                            <label htmlFor="signupPassword"> Password </label>
                            <input id="signupPassword" type="password" placeholder="Password" className="form-control" required value={password} onChange={onChangePassword} />
                        </div>
                        <div>
                            <label htmlFor="sigupRole">
                                Role
                            </label>
                            <select className="form-control" placeholder="Choose role" required value={role} onChange={onChangeRole} >
                                <option value="learner" style={{ color: "whitesmoke", background: "black" }}>
                                    Learner
                                </option>
                                <option value="mentor" style={{ color: "whitesmoke", background: "black" }}>
                                    Mentor
                                </option>
                            </select>
                        </div>
                        <label htmlFor="bio"> Bio </label>
                        <textarea id="bio" placeholder="Write something about yourself" className="form-control" value={bio} onChange={onChangeBio}></textarea>
                        <div className="d-flex flex-row justify-content-evenly">
                            <button className="btn btn-outline-light mt-3" type="submit"> Register </button>
                            <Link to="/login" style={{ fontFamily: "Roboto", fontSize: "16px" }}> <button className="btn btn-outline-light mt-3"> back to login </button></Link>
                        </div>
                    </form>
                    <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1752516701/Sign_up-amico_apm1w6.png" alt="signupImg" id="signupImg" />
                </div>
                <ToastComponent />
            </div>
        </div >
    )
}

export default Signup