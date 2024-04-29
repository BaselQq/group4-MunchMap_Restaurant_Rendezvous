"use client";

import NavBar from "@/components/NavBar";
import AddRestaurantForm from "@/app/addRestaurant/_components/AddRestaurantForm";

export default function AddRestaurantPage() {
    return (
        <main>
            <NavBar/>
            <div className="mx-auto max-w-8xl px-6 sm:px-6 lg:px-8">
               <AddRestaurantForm />
            </div>
        </main>
    )
}
