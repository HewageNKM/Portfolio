"use client";
import React, {useEffect, useState} from 'react';
import {getFilterMenuItems} from "@/firebase/Config";
import FilterCard from "@/components/ui/FilterCard";
import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";

const Page = () => {
    const [filters, setFilters] = useState([])
    const fetchFilterItems = async () => {
        const filters = await getFilterMenuItems();
        console.log(filters)
        setFilters(filters)
    }
    useEffect(() => {
        fetchFilterItems()
    }, [])
    return (
        <div className="w-full relative min-h-screen">
            <Header/>
            <div className="w-full mt-20 justify-center gap-16 items-center flex flex-row ">
                {filters.map((name, index) => (
                    <FilterCard key={index} name={name}/>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Page;