import React from 'react';

const FilterCard = ({name,selectedFilter}:{name:string,selectedFilter:string}) => {
    return (
        <button className={`p-2 rounded-xl ${selectedFilter ? "bg-gray-900 hover:bg-gray-600":"hover:bg-gray-900 bg-gray-600"}`}>
            <h1 className="line-clamp-1 tracking-wide font-medium text-lg text-white">{name}</h1>
        </button>
    );
};

export default FilterCard;