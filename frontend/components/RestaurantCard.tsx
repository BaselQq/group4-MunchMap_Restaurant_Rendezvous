import React from 'react';
import Image from "next/image";

type CardProps = {
    name?: string;
}

const RestaurantCard = ({name}: CardProps) => {
    return (
        <a href="#" className="flex flex-col rounded-lg text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:flex-row h-36 mb-2 bg-gray-50 dark:bg-gray-800">
                <img
                    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-60 md:!rounded-none md:!rounded-s-lg"
                    src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
                    alt=""/>
                <div className="flex flex-col justify-start p-6">
                    <h5 className="mb-2 text-xl font-medium">{name ?? "Restaruant Name"}</h5>
                    <p className="mb-4 text-base">
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </p>
                </div>
        </a>
    );
};

export default RestaurantCard;