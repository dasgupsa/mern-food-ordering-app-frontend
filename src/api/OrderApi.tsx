import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type CheckoutSessionRequest = {
    // we will receive cartItems to be an array
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails : {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;

}
export const useCreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0();

    //make fetch request to endpoint
    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch (
            `${API_BASE_URL}/api/order/checkout/create-checkout-session`, 
            {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // tells server what type of data to expect --> json
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest),
        });
        if (!response.ok){
            throw new Error("Unable to create checkout session");
        }
        // url with checkout page
        return response.json();
    };

    // pass it to usemutation hook, so react query will work on it
    const {mutateAsync: createCheckoutSession, isLoading, error, reset} = useMutation(createCheckoutSessionRequest);

    if(error){
        toast.error(error.toString());
        reset();
    }
    return {
        createCheckoutSession,
        isLoading,
    }
};