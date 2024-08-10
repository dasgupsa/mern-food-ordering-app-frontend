import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// this page will be inside Auth0Callback
const AuthCallbackPage = () => {
    const navigate = useNavigate();
    // give access to current logged in user
    const {user} = useAuth0();
    // createUser is the mutate function from MyUserApi
    const {createUser } = useCreateMyUser();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        console.log("USER", user);
        if (user?.sub && user?.email && !hasCreatedUser.current){
            createUser({auth0Id: user.sub, email: user.email});
            hasCreatedUser.current = true;
        }
        // will take us back to home page
        navigate("/");
    }, [createUser, navigate, user]);
    return <>Loading....</>
}

export default AuthCallbackPage;