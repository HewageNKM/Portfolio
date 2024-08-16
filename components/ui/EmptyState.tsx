import React from 'react';
import {BiSearch} from "react-icons/bi";

const EmptyState = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <BiSearch className="w-10 h-10"/>
            </div>
            <h2 className="text-lg font-bold md:text-xl">
                Opps, No Projects Found!
            </h2>
            <h3 className="md:text-sm text-base text-gray-500">
                Try a different filter
            </h3>
        </div>
    );
};

export default EmptyState;