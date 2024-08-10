import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    // function that handles fetch request
    const getMyUserRequest = async():Promise<User> => {
        const accessToken = await getAccessTokenSilently();

        // now we have access token, we can do fetch request
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            // options for fetch request
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        if(!response.ok){
            throw new Error("Failed to fetch user");
        }
        return response.json();
    };

    // destructure all the stuff from React Query Hook
    const {data: currentUser, isLoading, error} = useQuery("fetchCurrentUser",getMyUserRequest );

    if(error){
        toast.error(error.toString());
    }
    return {currentUser, isLoading}
};

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

// create a hook to call our endpoint
export const useCreateMyUser = () => {

    const {getAccessTokenSilently} = useAuth0();


    const createMyUserRequest = async(user:CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            // post as we are creating a user
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });

        if(!response.ok){
            throw new Error("Failed to create user");
        }
    };

    // mutation hook, passing our fetch request to it, renamed mutateAsync to createUser
    // custom hook
    const {mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest)

    return {
        createUser, 
        isLoading,
        isError,
        isSuccess,
    };
};

 type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
 }

// another hook
export const useUpdateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const updateMyUserRequest = async(formData:UpdateMyUserRequest) =>{
        // get access token from auth0 service getAccessTokenSilently
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
    if(!response.ok){
        throw new Error("Failed to update user")
    }
    return response.json();
    
    };

    // pass updateMyUserRequest to use mutation hook so that React Query can handle the query for us
    // pass in fetch function
    const {mutateAsync: updateUser, isLoading, isSuccess, error, reset} = useMutation(updateMyUserRequest);
    if(isSuccess){
        toast.success("User profile updated");
    }
    if(error){
        toast.error(error.toString());
        // clears error state from request
        reset();
    }

    return{updateUser, isLoading};
};

