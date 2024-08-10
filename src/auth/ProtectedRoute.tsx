import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth0()
    // if user is logged in allow them to protected route
    return isAuthenticated ? (
        // render all the child routes if user is authenticated
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    )
};  

export default ProtectedRoute;