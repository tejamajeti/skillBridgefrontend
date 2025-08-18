import { useState } from "react"

import { Link } from "react-router-dom"

import api from "../../utils/api"

import "./index.css"

import toast from "react-hot-toast"

import ToasterComponent from "../ToasterComponent"

const ResetPassword = () => {
    const [isEmailVerified, setVerifyStatus] = useState(false)
    const [msg, setMsg] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [reset, setReset] = useState(false)

    const onsubmitForm = async (event) => {
        event.preventDefault()

        if (password1 !== password2) {
            setMsg("Passwords Didn't Match")
            return
        }

        try {
            const response = await api.patch("api/users/reset", { new_password: password1, email })

            if (response.status === 201) {
                toast.success("Password updated successfully")
                setReset(true)
            }
        } catch (err) {
            let message = err.message
            if (err.response && err.response.data) message = err.response.data
            toast.error(message)
        }
    }

    const verifyEmail = async () => {
        try {

            if (!email.includes("@") || !email.includes(".")) {
                setMsg("Please enter a valid email address")
                return
            }

            const isValidEmail = await api.post("/api/auth/validate", { email })

            if (isValidEmail.status === 200) {
                setVerifyStatus(true)
                setMsg("")
                setPassword1("")
                setPassword2("")
            }
        } catch (err) {
            let message = err.message
            if (err.response && err.response.data) message = err.response.data
            setMsg(message)
        }
    }

    return (
        <div className="reset-container">
            <ToasterComponent />
            <form id="resetForm" className="p-3 m-4" onSubmit={onsubmitForm}>
                <h1> Reset Password </h1>
                {!isEmailVerified && <input type="email" id="resetEmail" placeholder="Enter your email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />}
                <div className="w-100 d-flex flex-row justify-content-around align-items-center m-3" style={{ maxWidth: '250px' }}>
                    {!isEmailVerified && <button className="btn btn-light btn-sm m-2" type="button" onClick={verifyEmail}> Verify email </button>}
                    {!isEmailVerified && <Link to="/login"><button type="button" className="btn btn-light btn-sm" > Go Back to Login </button></Link>}
                </div>
                {isEmailVerified && <input type="text" id="resetPassword1" placeholder="Enter your new password" className="form-control" value={password1} onChange={e => setPassword1(e.target.value)} required />}
                {isEmailVerified && <input type="password" id="resetPassword2" placeholder="Re-enter your new password" className="form-control" value={password2} onChange={e => setPassword2(e.target.value)} required />}
                <div className="m-2 d-flex flex-row justify-content-around w-100" style={{ maxWidth: "250px" }}>
                    {isEmailVerified && <button type="submit" className="btn btn-light btn-sm" disabled={reset}> Reset </button>}
                    {isEmailVerified && <Link to="/login"><button type="button" className="btn btn-light btn-sm" > Go Back to Login </button></Link>}
                </div>
                <p className="m-2"> {msg} </p>
            </form>
        </div>
    )
}

export default ResetPassword