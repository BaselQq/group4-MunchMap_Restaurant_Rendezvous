import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Restaurant} from "@/types";
import {useRouter} from "next/navigation";
import { HeartIcon } from '@heroicons/react/24/solid'

// app/restaurant/[id].tsx
const RestaurantDetails = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const {id } = params
    // Local State
    const [data, setData] = useState<Restaurant | undefined>(undefined);
    const { name, description, type, rating, location, favourite, heroImage, detailImagesUrls } = data || { name: '', description: '', rating: 1, location: '', favourite: false, heroImage: "", detailImagesUrls: [] };
    const [fav, setFav] = useState<boolean>(false)
    // TODO: Add zustand: react state management lib, so that user doesnt lose changes
    const [isEditing, setIsEditing] = useState(false);
    // Edit Form States
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    const [newLocation, setNewLocation] = useState(location);
    const [newType, setNewType] = useState(type);

    // Validation states
    console.log(data, "data")
    const restaurantImage = detailImagesUrls.length > 0 ? detailImagesUrls[0] : heroImage

    // Handlers
    const handleEdit = () => {
        setIsEditing(!isEditing);
    };
    const handleCancel = () => {
        setIsEditing(false);
    }
    const handleSave = async () => {
            try {
                await axios.put(`/api/updaterestaurantname/${id}/${newName ? newName : name}`);
                await axios.put(`/api/updaterestaurantdescription/${id}/${newDescription ? newDescription : description}`);
                await axios.put(`/api/updaterestauranttype/${id}/${newType ? newType : type}`);
                await axios.put(`/api/updaterestaurantlocation/${id}/${newLocation ? newLocation : location}`);

                setIsEditing(false);
            } catch (error) {
                console.error('Error updating restaurant data:', error);
                // Handle error
            } finally {
                handleGetRestaurantById(`/api/restaurant/${id}`)
            }
    };
    const handleFavClick = () => {
        setFav(!fav)
        handleUpdateFavRestaurantById(id, !fav)
    }

    // http://localhost:8080/api/updaterestaurantfavourite/{id}
    const handleUpdateFavRestaurantById = (id: string, isFavourite: boolean) => {
        axios.put(`/api/updaterestaurantfavourite/${id}`, {favourite: isFavourite})
            .then(response => console.log(response, "response.data from handleUpdateFavRestaurantById"))
            .catch(error => console.error('Error updating favourite rest:', error));
    }
    const navigateBack = () => {
        router.back();
    };
    // TODO: move all useEffects for getEndpoints to custom hook and
    // TODO: const { restaurant || restaurant[] } = useGetRestaurantData("api/endpoints")
    // @GetMapping
    // api/restaurant/id
    // http://localhost:8080/api/restaurant/1
    const handleGetRestaurantById = (url: string) => {
        axios.get(url)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching:', error));
    }
    useEffect(() => {
        if (id) handleGetRestaurantById(`/api/restaurant/${id}`)
    }, [id]);

    // updateFav
    // useEffect(() => {
    //     if (data) setFav(favourite)
    //
    // }, []);

    // useEffect(() => {
    //     if (data?.name !== newName)
    //         setNewName(name)
    //
    // }, [data?.name, name, newName])

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-[50px] dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src={restaurantImage} alt="Restaurant Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button
                                    onClick={navigateBack}
                                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Back</button>
                            </div>
                            <div onClick={handleEdit}
                                 className="w-1/2 px-2">
                                <button className="w-full bg-teal-300 dark:bg-gray-700 text-white dark:text-white py-2 px-4 rounded-full font-bold hover:bg-teal-400 dark:hover:bg-gray-600">Edit Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="relative md:flex-1 px-4">
                        <button onClick={handleFavClick} className="absolute top-0 right-10">
                            {fav ? <HeartIcon className="h-7 w-7 text-red-400" aria-hidden="true"/> :
                            <HeartIcon className="h-7 w-7 text-gray-400" aria-hidden="true"/>
                            }
                        </button>
                        {!isEditing ? <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{name}</h2> :
                            (
                                <>
                                    <div className="mb-1 flex flex-col">
                                        <input
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder={name}
                                            className="block w-[300px] rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </>
                            )}
                        {!isEditing ? <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p> :
                            (
                                <>
                                    <div className="mb-1 flex flex-col">
                                        <input
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                            type="text"
                                            name="description"
                                            id="description"
                                            placeholder={description}
                                            className="block w-[300px] rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </>
                            )}
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
                                {!isEditing ? <span className="text-gray-600 dark:text-gray-300">{type}</span> :
                                    (
                                        <>
                                            <div className="mb-1 flex flex-col">
                                                <input
                                                    value={newType}
                                                    onChange={(e) => setNewType(e.target.value)}
                                                    type="text"
                                                    name="type"
                                                    id="type"
                                                    placeholder={type}
                                                    className="block w-[150px] rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Location:</span>
                            <div className="flex items-center mt-2">
                                {!isEditing ? <span className="text-gray-600 dark:text-gray-300">{location}</span> :
                                    (
                                        <>
                                            <div className="mb-1 flex flex-col">
                                                <input
                                                    value={newLocation}
                                                    onChange={(e) => setNewLocation(e.target.value)}
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    placeholder={location}
                                                    className="block w-[300px] rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                                                />
                                                <div className="flex ">
                                                    <div className="mr-2">
                                                        <button
                                                            onClick={handleCancel}
                                                            className="w-[120px] bg-gray-900 dark:bg-gray-600 text-white text-sm py-1 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Cancel
                                                        </button>
                                                    </div>
                                                    <div onClick={handleSave}
                                                         className="">
                                                        <button
                                                            className="w-[120px] bg-teal-300 dark:bg-gray-700 text-white dark:text-white text-sm py-1 px-4 rounded-full font-bold hover:bg-teal-400 dark:hover:bg-gray-600">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Restaurant Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo
                                nulla ut
                                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit.
                                Quisque
                                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum
                                lacinia, non
                                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi
                                consectetur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RestaurantDetails;