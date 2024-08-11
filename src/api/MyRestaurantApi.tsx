import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// useQuery is used when you want to fetch or read data from a server, 
// while useMutation is used when you want to create, update, or delete data.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyRestaurant = () => {
//     const {getAccessTokenSilently} = useAuth0();
//     const getMyRestaurantRequest = async () :Promise<Restaurant> => {
//         const accessToken = getAccessTokenSilently();

//         const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//             method: "GET",
//             headers:{
//                 Authorization: `Bearer ${accessToken}`
//             },
//         });
//         if (!response.ok){
//             throw new Error("Failed to get restaurant")
//         }
//         return response.json();
//     };
//     // useQuery needs a name
//     const {data: restaurant, isLoading} = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
//     return {restaurant, isLoading};
// };

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    };
  
    const { data: restaurant, isLoading } = useQuery(
      "fetchMyRestaurant",
      getMyRestaurantRequest
    );
  
    return { restaurant, isLoading };
  };


export const useCreateMyRestaurant = () => {
    // get access token from auth0
    const {getAccessTokenSilently} = useAuth0();

    // this is linked to Restaurant in types.ts
    const createMyRestaurantRequest = async(restaurantFormData: FormData):Promise<Restaurant> => {
         const accessToken = await getAccessTokenSilently();
         // where api is on backend
         const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            // accessToken gets checked by middleware in backend
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData,
         });
         if(!response.ok){
            throw new Error("Failed to create restaurant")
         }
         // restaurant has been created
         return response.json();
    };
    const {mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);
    // Toast work
    if (isSuccess){
        toast.success("Restaurant created!");
    }
    if (error){
        toast.error("Unable to create restaurant");
    }
    // this is what gets exposed to anyone calling our hook
    return {createRestaurant, isLoading};
};  

// hook for update
export const useUpdateMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateRestaurantRequest = async(restaurantFormData: FormData):Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch (`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers : {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData,
        });
        if(!response){
            throw new Error("Failed to update restaurant")
        }
        return response.json();
    };

    const {mutate: updateRestaurant, isLoading, error, isSuccess} = useMutation(updateRestaurantRequest)

    if(isSuccess) {
        toast.success("Restaurant updated");
    }
    if (error){
        toast.error("Unable to update restaurant")
    }
    // return stuff we want to expose from the hook
    return { updateRestaurant, isLoading };
}