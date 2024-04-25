import React from 'react';
import SearchBar from "@/components/SearchBar";

const SearchContent = () => {
    return (
        <div className="my-auto h-28 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div>
               <SearchBar />
            </div>
        </div>
    );
};

export default SearchContent;