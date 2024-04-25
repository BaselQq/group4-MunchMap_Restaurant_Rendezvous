import React from 'react';

const RadioButton = () => {
    return (
        <div className="rounded-lg p-1 flex dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex items-center">
                <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label role="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Option</label>
            </div>
        </div>
    );
};

export default RadioButton;