
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";


// Ensures we have validation of form on frontend side
const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

// actual form component
type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?:string;
    buttonText?:string;
}

const UserProfileForm = ({ 
    onSave, 
    isLoading, 
    currentUser, 
    title ="User Profile", 
    buttonText="Submit", 
}: Props) => {
    // useform hook with our UserFormData. zodResolver to resolve validation
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser)
    }, [currentUser, form])

    return (
        <Form {...form}>
            {/* form is useForm hook above */}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold"> {title} </h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField 
                    control = {form.control} 
                    name="email" 
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                {/* spreading field data into Input */}
                                <Input {...field} disabled className="bg-white" />
                            </FormControl>
                        </FormItem>
                )}
                />

                <FormField 
                    control = {form.control} 
                    name="name" 
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                {/* spreading field data into Input */}
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                )}
                />
                {/* Address, city and country on same line, therefore a div */}
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField 
                        control = {form.control} 
                        name="addressLine1" 
                        render = {({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    {/* spreading field data into Input */}
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                {/* FormMessage shows the errors we have */}
                                <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField 
                        control = {form.control} 
                        name="city" 
                        render = {({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    {/* spreading field data into Input */}
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField 
                        control = {form.control} 
                        name="country" 
                        render = {({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    {/* spreading field data into Input */}
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />  
                </div>
                    {isLoading ? (
                        <LoadingButton />
                        ) : (
                        <Button type= "submit" className="bg-orange-500" >
                            {buttonText}
                        </Button> 
                        )}
            </form>
        </Form>
    )
}

export default UserProfileForm;