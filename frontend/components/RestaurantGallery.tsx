"use client"

import React, {useEffect, useState} from 'react';
import SearchContent from "@/components/SearchContent";
import RestaurantCard from "@/components/RestaurantCard";
import {Restaurant} from "@/types";
import axios from "axios";

const RestaurantGallery = () => {

    const [data, setData] = useState<Restaurant[]>([]);
    console.log(data, "data")
    // @GetMapping
    // api/restaurants
    // http://localhost:8080/api/restaurants
    const handleGetAll = (url: string) => {
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching:', error));
    }

    useEffect(() => {
        handleGetAll('/api/restaurants')
    }, []);

    return (
        <div className="p-4 sm:ml-72">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <SearchContent />
                <div className="grid grid-cols-1 gap-4 mb-4">
                    {data.map( (restaurant) => {

                        return  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    } )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantGallery;