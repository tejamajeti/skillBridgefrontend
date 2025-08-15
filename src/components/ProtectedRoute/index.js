import { Navigate } from "react-router-dom"

import { getToken, getUserRole } from "../../utils/auth"

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = getToken()
    const currentUserRole = getUserRole()

    if (!token || !currentUserRole) return <Navigate to="/login" replace />

    if (requiredRole && requiredRole !== currentUserRole) return <Navigate to={`/login`} replace/>

    return children
}

export default ProtectedRoute