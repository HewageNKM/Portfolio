"use client";
import React, {useEffect, useState} from 'react';
import {getFilterMenuItems, getProjects} from "@/firebase/Config";
import FilterCard from "@/components/ui/FilterCard";
import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import {motion} from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import {Project} from "@/interfaces";

const Page = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("All")
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
    }, []);

    useEffect(() => {
        fetchProjects()
    }, [selectedFilter])

    return (
        <main className="w-full relative min-h-[100vh]">
            <Header/>
            <motion.div initial={{opacity: 0, y: '1vh'}}
                        transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}}
                        animate={{opacity: 1, y: 0}}
                        className="w-full flex-wrap pt-10 md:pt-20 justify-center h-full gap-5 items-center flex flex-row">
                {filters.map((name, index) => (
                    <FilterCard handleClick={() => {
                        setSelectedFilter(name)
                    }} key={index} name={name} selectedFilter={selectedFilter}/>
                ))}
            </motion.div>
            <motion.div initial={{opacity: 0, y: '1vh'}}
                        transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}}
                        animate={{opacity: 1, y: 0}} className="w-full flex-wrap md:pt-20 pt-10 justify-center gap-5 items-start flex flex-row">
                {projects.length > 0 ? (projects.map((project,index)=>(
                    <ProjectCard project={project} key={index}/>
                ))) : (<EmptyState subTitle="Still in Development" title="Opps, No Projects!"/>)}
            </motion.div>
            <Footer/>
        </main>
    );
};

export default Page;