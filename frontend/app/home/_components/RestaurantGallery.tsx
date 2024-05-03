"use client"

import React, {useEffect, useState} from 'react';
import SearchContent from "@/app/home/_components/SearchContent";
import RestaurantCard from "@/app/home/_components/RestaurantCard";
import {Restaurant} from "@/types";
import axios from "axios";
import {useGlobalState} from "@/services/store/store";

const RestaurantGallery = () => {
    // Local State
    const [data, setData] = useState<Restaurant[]>([]);
    const [idToRemove, setIdToRemove] = useState<string | undefined>("")
    console.log(data, "data")
    const restaurantCount = data ? data.length : 0
    // Global State
    const { setRestaurantCount, isFavouriteToggled } = useGlobalState(state => (
        {
            setRestaurantCount:  state.setRestaurantCount,
            isFavouriteToggled: state.isFavouriteToggled
        }
    ));
    // Handlers

    // @GetMapping
    // api/restaurants
    // http://localhost:8080/api/restaurants
    const handleGetAll = (url: string) => {
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching:', error));
    }
    // @DeleteMapping
    // api/restaurants
    // http://localhost:8080/api/restaurants
    const handleRemoveById = (id: string | undefined)  => {
        axios.delete(`/api/removerestautant/${id}`)
            .then(response => console.log(response.data, "removed item", id))
            .catch(error => console.error('Error deleting:', error));
    }

    useEffect(() => {
        handleGetAll('/api/restaurants')
    }, []);

    useEffect(() => {
        setRestaurantCount(restaurantCount)
    }, [restaurantCount, setRestaurantCount]);

    const onSetIdToRemove = (id: string | undefined) => {
        if (id === "undefined") return
        setIdToRemove(id)
        handleRemoveById(id)
    }



    return (
        <div className="p-4 sm:ml-72">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <SearchContent />
                <div className="grid grid-cols-1 gap-4 mb-4">

                    {isFavouriteToggled ? (
                        data.filter((r: Restaurant) => r.favourite === isFavouriteToggled).map( (restaurant) => {
                            return  <RestaurantCard key={restaurant.id} restaurant={restaurant} onSetIdToRemove={onSetIdToRemove} />
                        })
                    ) : data.map( (restaurant) => {
                        return  <RestaurantCard key={restaurant.id} restaurant={restaurant} onSetIdToRemove={onSetIdToRemove} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default RestaurantGallery;