import React from 'react';

const FilterCard = ({name,selectedFilter,onClick}:{name:string,selectedFilter:string}) => {
    return (
        <button onClick={onClick} className={`p-2 hover:scale-110 transition-all duration-500 rounded-xl ${selectedFilter == name ? "bg-gray-900" : "bg-gray-600"}`}>
            <h1 className="line-clamp-1 tracking-wide font-medium text-base md:text-lg text-white">{name}</h1>
        </button>
    );
};

export default FilterCard;