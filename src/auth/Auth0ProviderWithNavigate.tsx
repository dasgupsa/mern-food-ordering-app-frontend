import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({children}:Props) => {
    const navigate = useNavigate();
    
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if(!domain || !clientId || !redirectUri || !audience){
        throw new Error("unable to initialize Auth")
    }

    // this is what gets called when user is redirected back to our app
    // User has auth0 and email which is what is needed to create user in database
    const onRedirectCallback = () => {
        navigate("/auth-callback")
    }

//     Using `authorizationParams.redirectUri` has been deprecated, 
// please use `authorizationParams.redirect_uri` instead as `authorizationParams.redirectUri` will be removed in a future version

    return (
        <Auth0Provider 
        domain= {domain} 
        clientId={clientId} 
        authorizationParams={{
            redirect_uri: redirectUri,
            audience,
        }} 
        onRedirectCallback={onRedirectCallback} 
        >
            {children}
        </Auth0Provider>
    )
}


export default Auth0ProviderWithNavigate;