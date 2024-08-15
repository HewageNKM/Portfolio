"use client";
import React, {useEffect, useState} from 'react';
import {getFilterMenuItems} from "@/firebase/Config";
import FilterCard from "@/components/ui/FilterCard";
import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";

const Page = () => {
    const [selectedFilter, setSelectedFilter] = useState("All")
    const [filters, setFilters] = useState([])
    const fetchFilterItems = async () => {
        const filters = await getFilterMenuItems();
        setFilters(filters)
    }
    useEffect(() => {
        fetchFilterItems()
    }, [])
    const onClick = (name) => {
        setSelectedFilter(name)
        console.log(name)
    }
    return (
        <div className="w-full relative min-h-screen">
            <Header/>
            <div className="w-full flex-wrap mt-20 justify-center gap-5 items-center flex flex-row ">
                {filters.map((name, index) => (
                    <FilterCard onClick={()=>onClick(name)} key={index} name={name} selectedFilter={selectedFilter}/>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Page;