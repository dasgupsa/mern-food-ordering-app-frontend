import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

// dont need props as its a top level component
const UserProfilePage = () => {
    // 2 variables which are same name and therefore we rename them
    // when page loads, first go get my current Logged in User details
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();
    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();
    
    if (isGetLoading){
        return <span>Loading....</span>
    }

    if(!currentUser){
        return <span>Unable to load User Profile</span>
    }

    return (
         <UserProfileForm 
         currentUser = {currentUser}
         onSave={updateUser} 
         isLoading={isUpdateLoading} />
    )
}

export default UserProfilePage;