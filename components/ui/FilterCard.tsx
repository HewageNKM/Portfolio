import React from 'react';

const FilterCard = ({name,selectedFilter,handleClick}:{name:string,selectedFilter:string,handleClick:()=>void}) => {
    return (
        <button onClick={handleClick} className={`md:p-2 px-2 py-1 hover:scale-110 transition-all duration-500 rounded-xl ${selectedFilter == name ? "bg-gray-900" : "bg-gray-500"}`}>
            <h1 className="line-clamp-1 tracking-wide font-medium text-base md:text-lg text-white">{name}</h1>
        </button>
    );
};

export default FilterCard;