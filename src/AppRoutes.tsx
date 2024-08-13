import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const AppRoutes = () => {
    return (
        // specifies a group of routes. and there is a catch all page taking us back to home
        //http://localhost:5173/user-profile
        <Routes>
             <Route path="/" element = {<Layout showHero> <HomePage /> </Layout>} /> 
             <Route path="/auth-callback" element={<AuthCallbackPage />} />
             {/* city is dynamic and will be obtained via useParams */}
             <Route path="/search/:city" element={<Layout showHero={false}>
                <SearchPage />
             </Layout>} />
             <Route path="/detail/:restaurantId" element={<Layout showHero={false}>
                <DetailPage />
             </Layout>} />
             {/* we need to protect user-profile route */}
             <Route element={<ProtectedRoute /> }>
                <Route path="/user-profile" element = {<Layout> <UserProfilePage /> </Layout>} />
                <Route path="/manage-restaurant" element = {<Layout> <ManageRestaurantPage /> </Layout>} />
             </Route>
             
             <Route path="*" element = {<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;