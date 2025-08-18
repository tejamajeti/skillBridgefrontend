import { Component } from "react"

import toast from "react-hot-toast"

import ToastComponent from "../ToasterComponent"

import api from "../../utils/api"

import { setToken, setUserRole, getUserRole, getToken, setUserDetails } from "../../utils/auth"

import { Navigate } from "react-router-dom"

import withNavigation from "../withNavigation"

import "./index.css"


class Login extends Component {
    state = { email: "", password: "", msg: "", attemptCount: 0 }

    onChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const { email, password } = this.state
        const { navigate, location } = this.props
        const userDetails = { email, password }

        try {
            const loginPromise = api.post("/api/auth/login", userDetails)

            toast.promise(loginPromise, {
                loading: "Verifying Credentials...."
            })

            const response = await loginPromise

            setToken(response.data.jwt_token)
            setUserRole(response.data.user.role)
            setUserDetails(response.data.user)
            toast.success("Login Successful")
            if (response.status === 200 && location.pathname === "/login") navigate(`/${getUserRole}`, { replace: true })

        } catch (err) {
            let message = "Login Failed!!!";

            if (err.response && err.response.data) {
                message = err?.response?.data;
                if (err.response.data === 'Invalid Credentials') this.setState((prevState) => ({ attemptCount: prevState.attemptCount + 1 }))
            } else if (err.message) {
                message = err.message;
            }

            this.setState({ msg: message });
            toast.error(message)
        }

    }

    render() {
        const { email, password, msg, attemptCount } = this.state

        const jwtToken = getToken()

        if (jwtToken) return <Navigate to={`/${getUserRole()}`} />

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-dark p-3 h-100 login-container">
                        <div className="box"></div>
                        <form id="loginForm" onSubmit={this.onSubmitForm}>
                            <h1> LOGIN </h1>
                            <div>
                                <label htmlFor="loginEmail"> email </label>
                                <input id="loginEmail" type="email" className="form-control mb-2" required onChange={this.onChangeEmail} value={email} placeholder="Email" />
                            </div>
                            <div>
                                <label htmlFor="loginPassword"> Password </label>
                                <input id="loginPassword" type="password" className="form-control input" required onChange={this.onChangePassword} value={password} placeholder="Password" />
                            </div>
                            {attemptCount >= 1 ? <a href="/reset-password" className="forgot-password"> Forgot Password? </a> : null}
                            <div>
                                <button className="login-submit-btn" type="submit"> Login</button>
                            </div>
                            <p className="signup"> Don't have an account <a href="/signup"> register </a> here </p>
                            <p> {msg} </p>
                        </form>
                        <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1752488578/Ebook-pana_dfmqay.png" alt="loginImg" id="loginImg" />
                    </div>
                    <ToastComponent />
                </div >
            </div >
        )
    }
}

export default withNavigation(Login)