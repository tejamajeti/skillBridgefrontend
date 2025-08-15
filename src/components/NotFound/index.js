import { Link } from "react-router-dom"

import "./index.css"

const NotFound = () => {
    return (
        <div className="not-found bg-dark">
            <img src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1747048024/Group_7484_viwnxt.png" alt="notFound" />
            <h1> The Page you are looking for Not Found..</h1>
            <Link to="/">
                <button className="btn btn-light btn-sm d-md-none">
                    Go Back Home
                </button>
            </Link>
            <Link to="/">
                <button className="btn btn-light d-none d-md-inline">
                    Go Back Home
                </button>
            </Link>
        </div>
    )
}

export default NotFound