import React from 'react';
import SearchContent from "@/components/SearchContent";
import RestaurantCard from "@/components/RestaurantCard";

const RestaurantGallery = () => {
    return (
        <div className="p-4 sm:ml-72">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <SearchContent />
                <div className="grid grid-cols-1 gap-4 mb-4">
                   <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                </div>
            </div>
        </div>
    );
};

export default RestaurantGallery;