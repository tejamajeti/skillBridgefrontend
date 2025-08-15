import { Link } from "react-router-dom"

import withNavigation from "../../withNavigation"

import { CgProfile } from "react-icons/cg";

import { IoLogOutOutline } from "react-icons/io5";

import { BsFillBookmarkFill } from "react-icons/bs";

import { getUserDetails, removeUserDetails, removeUserRole, removeToken } from "../../../utils/auth"

import "./index.css"



const LearnerHeader = ({ navigate }) => {
    const user = getUserDetails()

    const onClickLogout = () => {
        removeToken()
        removeUserDetails()
        removeUserRole()
        navigate("/login", { replace: "true" })
    }


    return (
        <nav className="p-3">
            <h1 className="heading"> Hello <Link to="/" className="user-name">{user.name}  </Link></h1>
            <ul className="d-none d-md-flex">
                <li>
                    <Link to="/learner/bookings" className="header-link">
                        <button> Bookings</button>
                    </Link>
                </li>
                <li>
                    <Link to="/learner/profile" className="header-link">
                        <button> Profile </button>
                    </Link>
                </li>
                <li>
                    <button className="btn btn-light" onClick={onClickLogout}> Logout </button>
                </li>
            </ul>
            <ul className="d-md-none" id="smallUl">
                <li>
                    <Link to={"/learner/bookings"} className="header-link-sm"> <button> <BsFillBookmarkFill /></button> </Link>
                </li>
                <li>
                    <Link to="/learner/profile" className="header-link-sm">  <button> <CgProfile /></button> </Link>
                </li>
                <li className="header-link-sm">
                    <button onClick={onClickLogout}> <IoLogOutOutline /></button>
                </li>
            </ul>
        </nav>
    )
}

export default withNavigation(LearnerHeader)