import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
    return (
        // specifies a group of routes. and there is a catch all page taking us back to home
        //http://localhost:5173/user-profile
        <Routes>
             <Route path="/" element = {<Layout showHero> <HomePage /> </Layout>} /> 
             <Route path="/auth-callback" element={<AuthCallbackPage />} />
             {/* we need to protect user-profile route */}
             <Route element={<ProtectedRoute /> }>
                <Route path="/user-profile" element = {<Layout> <UserProfilePage /> </Layout>} />
             </Route>
             
             <Route path="*" element = {<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;