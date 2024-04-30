import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Restaurant} from "@/types";
import {useRouter} from "next/navigation";

// app/restaurant/[id].tsx
const RestaurantDetails = ({ params }: { params: { id: string } }) => {

    const {id } = params
    const [data, setData] = useState<Restaurant | undefined>(undefined);
    // @GetMapping
    // api/restaurant/id
    // http://localhost:8080/api/restaurant/1
    const { name, description, type, rating, location, favourite, image } = data || { name: '', description: '', rating: 1, location: '', favourite: false, image: null };
    console.log(data, "data")

    const router = useRouter();

    const navigateBack = () => {
        router.back();
    };

    const handleGetRestaurantById = (url: string) => {
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching:', error));
    }
    useEffect(() => {
        if (id) handleGetRestaurantById(`/api/restaurant/${id}`)
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-[50px] bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src={image ? image[0]?.detailImageUrl : ""} alt="Restaurant Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button
                                    onClick={navigateBack}
                                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Back</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-teal-300 dark:bg-gray-700 text-white dark:text-white py-2 px-4 rounded-full font-bold hover:bg-teal-400 dark:hover:bg-gray-600">Add to Favs</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{name}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {description}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4 flex ">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Rating:</span>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <p className="ml-1"> {rating + "/5" ?? "No rating for this restaurant yet! Be the first one"}</p>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Type:</span> {" "}
                                <span className="text-gray-600 dark:text-gray-300">{type}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Location:</span>
                            <div className="flex items-center mt-2">
                                <span className="text-gray-600 dark:text-gray-300">{location}</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Restaurant Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RestaurantDetails;