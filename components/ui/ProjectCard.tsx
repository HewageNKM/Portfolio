import React from 'react';
import Link from "next/link";
import {motion} from "framer-motion";
import {Project} from "@/interfaces";
import Image from "next/image";

const ProjectCard = ({project}:{project:Project}) => {
    return (
        <motion.div initial={{opacity:0,y:'2vh'}} animate={{opacity:1,y:0}} transition={{delay:.3}} className="w-[90vw] md:w-[50vw] lg:w-[30vw]">
            <div className="bg-gray-900 h-full flex w-full flex-col rounded-xl p-2 md:p-4">
                <Image src={project.thumbnail} alt={project.name} className="object-cover w-[90vw] h-[40vh] rounded-xl"/>
                <div className="mt-2">
                    <h1 className="text-lg md:text-xl font-bold tracking-wide text-white line-clamp-1">{project.name}</h1>
                    <p className="text-sm md:text-base text-gray-400">{project.description}</p>
                    <h3 className="text-lg mt-2 font-semibold text-white">Stacks</h3>
                    <div className="mt-2 flex flex-row gap-2 flex-wrap">
                        {project.stack.map((tech, index) => (
                            <span key={index}
                                  className="bg-gray-800 font-medium text-white p-1 md:p-2 rounded-lg text-xs md:text-sm">{tech}</span>
                        ))}
                    </div>
                    <div className="w-full flex pb-1 justify-end">
                        <Link href={project.url} target="_blank"
                              className="mt-2 block text-sm md:text-lg text-blue-400 hover:underline">View
                            Project</Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;