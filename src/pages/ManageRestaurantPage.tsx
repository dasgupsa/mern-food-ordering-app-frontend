import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

// all data fetching and requests

const ManageRestaurantPage = () => {
    // 2 isLoading, so we rename them
    const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
    const {restaurant} = useGetMyRestaurant();
    const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateMyRestaurant();

    // the double exclamation is true if it exists otherwise False
    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm 
        restaurant = {restaurant}
        onSave={isEditing ? updateRestaurant: createRestaurant} 
        isLoading={isCreateLoading || isUpdateLoading } />
    )
}

export default ManageRestaurantPage;