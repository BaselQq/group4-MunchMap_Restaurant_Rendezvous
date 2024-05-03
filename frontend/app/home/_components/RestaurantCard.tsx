import React, {useState} from 'react';
import Image from "next/image";
import {Restaurant} from "@/types";
import { HeartIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from "next/link";

type CardProps = {
    restaurant: Restaurant;
    onSetIdToRemove: (id: string | undefined) => void
}

const RestaurantCard = ({restaurant, onSetIdToRemove}: CardProps) => {

    const {id, name, type, description, favourite, rating, location, heroImage, detailImagesUrls} = restaurant
    const [fav, setFav] = useState<boolean>(favourite ?? false)
    const heroImageHref = heroImage ? heroImage : "https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
    const handleFavClick = () => {
       setFav(!fav)
    }

    return (
        <div
            className="relative flex flex-col rounded-lg text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:flex-row h-36 mb-2 bg-gray-50 dark:bg-gray-800">
            <button onClick={handleFavClick} className="absolute top-5 right-10">{fav ?
                <HeartIcon className="h-7 w-7 text-red-400" aria-hidden="true"/> :
                <HeartIcon className="h-7 w-7 text-gray-300 hover:text-gray-400" aria-hidden="true"/>}</button>
            <button
                className="absolute top-5 right-20"
                onClick={() => onSetIdToRemove(id)}><TrashIcon className="h-7 w-7 text-gray-400 hover:text-gray-500" /></button>
            <Link href={`/restaurant/${id}`} className="flex flex-col rounded-lg text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:flex-row h-36 mb-2 bg-gray-50 dark:bg-gray-800">
            <img
                className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-60 md:!rounded-none md:!rounded-s-lg"
                src={heroImageHref}
                alt=""/>
            <div className="flex flex-col justify-start p-4 w-full">
                <h5 className="mb-2 text-xl font-medium">{name ?? "Rest Name"}</h5>
                <p className="mb-4 text-base">
                    {description ?? "Missing Description"}
                </p>
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <p className="ml-2"> {rating + "/5" ?? "No rating for this restaurant yet! Be the first one"}</p>
                </div>
                <div className="flex justify-between">
                    <p>{location}</p>
                    <p>Type of Restaurant: {type}</p>
                </div>
            </div>
            </Link>
        </div>
    );
};

export default RestaurantCard;