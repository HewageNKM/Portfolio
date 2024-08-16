"use client";
import React, {useEffect, useState} from 'react';
import {getFilterMenuItems, getProjects} from "@/firebase/Config";
import FilterCard from "@/components/ui/FilterCard";
import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import {motion} from "framer-motion";

const Page = () => {
    const [selectedFilter, setSelectedFilter] = useState("All")
    const [filters, setFilters] = useState([])
    const [projects, setProjects] = useState([] as Project[])
    const fetchFilterItems = async () => {
        const filters = await getFilterMenuItems();
        setFilters(filters)
    }
    const fetchProjects = async () => {
        const projects = await getProjects(selectedFilter)
        setProjects(projects)
    }
    useEffect(() => {
        fetchFilterItems()
        fetchProjects()
    }, [selectedFilter])
    return (
        <div className="w-full overflow-hidden relative min-h-screen">
            <Header/>
            <motion.div initial={{opacity: 0, y: '1vh'}}
                        transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}}
                        animate={{opacity: 1, y: 0}}
                        className="w-full flex-wrap pt-10 md:pt-20 justify-center gap-5 items-center flex flex-row">
                {filters.map((name, index) => (
                    <FilterCard handleClick={() => {
                        setSelectedFilter(name)
                    }} key={index} name={name} selectedFilter={selectedFilter}/>
                ))}
            </motion.div>
            <motion.div initial={{opacity: 0, y: '1vh'}}
                        transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}}
                        animate={{opacity: 1, y: 0}} className="w-full flex-wrap md:pt-20 pt-10 justify-center gap-5 items-center flex flex-row">
                {projects ? (<div>
                    Projects
                </div>) : (<div>
                    No Projects Found
                </div>)}
            </motion.div>
            <Footer/>
        </div>
    );
};

export default Page;