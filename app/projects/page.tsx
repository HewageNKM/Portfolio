"use client";
import React, {useEffect, useState} from 'react';
import {getFilterMenuItems, getProjects} from "@/firebase/Config";
import {AnimatePresence, motion} from "framer-motion";
import {Project} from "@/interfaces";
import dynamic from "next/dynamic";

const FilterCard = dynamic(() => import("@/components/ui/FilterCard"), {ssr: false});
const ProjectCard = dynamic(() => import("@/components/ui/ProjectCard"), {ssr: false});
const EmptyState = dynamic(() => import("@/components/ui/EmptyState"), {ssr: false});
const LoadingState = dynamic(() => import("@/components/ui/LoadingState"), {ssr: false});
const Header = dynamic(() => import("@/components/Header"), {ssr: false});
const Footer = dynamic(() => import("@/components/ui/Footer"), {ssr: false});

const Page = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("All")
    const [filters, setFilters] = useState([])
    const [projects, setProjects] = useState([] as Project[])

    const [isFiltersLoading, setIsFiltersLoading] = useState<boolean>(true)
    const [isProjectsLoading, setIsProjectsLoading] = useState<boolean>(true)

    const fetchFilterItems = async () => {
        const filters = await getFilterMenuItems();
        setFilters(filters)
    }
    const fetchProjects = async () => {
        const projects = await getProjects(selectedFilter)
        // @ts-ignore
        setProjects(projects)
    }
    useEffect(() => {
        fetchFilterItems().then(() => setIsFiltersLoading(false))
    }, []);

    useEffect(() => {
        setIsProjectsLoading(true)
        fetchProjects().then(() => setIsProjectsLoading(false))
    }, [selectedFilter]);

    return (
        <main className="relative flex flex-col justify-between rounded-lg min-h-screen px-8 py-4">
            <Header/>
            <AnimatePresence>
                {isFiltersLoading ? (<LoadingState/>) : (
                    <motion.div initial={{opacity: 0, y: '1vh'}}
                                transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}}
                                animate={{opacity: 1, y: 0}}
                                className="w-full flex-wrap pt-10 md:pt-20 justify-center h-full gap-5 items-center flex flex-row">
                        {filters?.map((name, index) => (
                            <FilterCard handleClick={() => {
                                setSelectedFilter(name)
                            }} key={index} name={name} selectedFilter={selectedFilter}/>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isProjectsLoading ? (<LoadingState/>) : (
                    <motion.div initial={{opacity: 0, y: '1vh'}}
                                transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}}
                                animate={{opacity: 1, y: 0}}
                                className="w-full flex-wrap md:pt-20 pt-10 justify-center pb-20 gap-5 items-start flex flex-row">
                        {projects?.length > 0 ? (projects.map((project, index) => (
                            <ProjectCard project={project} key={index}/>
                        ))) : (<EmptyState subTitle="Still in Development" title="Opps, No Projects!"/>)}
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer/>

        </main>
    );
};

export default Page;