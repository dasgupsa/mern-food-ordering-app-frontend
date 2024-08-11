import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    // if user is logged in allow them to protected route
        // render all the child routes if user is authenticated

    const {isAuthenticated, isLoading} = useAuth0()

    if(isLoading){
        return null;
    }
    if (isAuthenticated){
        return <Outlet />
    }
    return <Navigate to="/" replace />;
};  

export default ProtectedRoute;