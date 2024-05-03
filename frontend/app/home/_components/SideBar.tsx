import React from 'react';
import Toggle from "@/app/home/_components/Toggle";
import RadioButton from "@/app/home/_components/RadioButton";

//
const SideBar = () => {
    return (
        <aside id="logo-sidebar"
               className="fixed top-0 left-0 z-20 w-72 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
               aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <div
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                            <span className="ms-3">36 Restaurants</span>
                        </div>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="flex-1 ms-3 whitespace-nowrap">Favourite</span>
                            <Toggle />
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="flex-1 ms-3 whitespace-nowrap">Currently Open</span>
                            <Toggle/>
                        </a>
                    </li>
                    <li>
                        <div
                           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                            <span className="flex-1 ms-3 whitespace-nowrap">Other Options</span>
                        </div>
                        <div className="ml-7">
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;