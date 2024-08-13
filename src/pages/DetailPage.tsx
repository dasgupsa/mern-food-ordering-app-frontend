import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "@/types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

const DetailPage = () => {
    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurant(restaurantId);
    const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    // example
    // [{
    //     _id: Item_1;
    //     name: cheese pizza;
    //     price: 10;
    //     quantity: 1;
    // }]

    const addToCart = (menuItem: MenuItemType) => {
        // lets us update the state
        setCartItems((prevCartItems) => {
            // check if item is already in cart
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id 
            );
            let updatedCartItems;
            
            // if item in cart, update quantity
            if(existingCartItem){
                updatedCartItems = prevCartItems.map(
                    (cartItem) => cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} 
                    : cartItem
                );
            } else {
                // if item not in cart, add it as new item
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }
            // save items according to the key
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            return updatedCartItems;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item)=> cartItem._id !== item._id);
            
            // save items according to the key: `cartItems-${restaurantId}`
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            // returning array which gets stored in cartItems
            return updatedCartItems;
        })
    }   

    const onCheckout = async (userFormData: UserFormData) => {
        if(!restaurant){
            return;
        }
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString()
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string,
            }
        };
        const data = await createCheckoutSession(checkoutData);
        // sending user to this url
        window.location.href = data.url;
    }

    if(isLoading || !restaurant){
        return "Loading ....";
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio= {16/5}>
                <img 
                src={restaurant.imageUrl} 
                className="rounded-md object-cover h-full w-full" 
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} /> 
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary 
                        restaurant ={restaurant} 
                        cartItems = {cartItems} 
                        removeFromCart = {removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} 
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default DetailPage;