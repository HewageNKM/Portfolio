import React from 'react';
import {projects} from "../data";
import {PinContainer} from "./ui/3DPin";
import {FaLocationArrow} from "react-icons/fa6";

const RecentProjects = () => {
    return (
        <div className="py-20" id="projects">
            <h1 className="heading">
                Recent <span className="text-purple">Projects</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
                {
                    projects.map(({id,des,iconLists,link,title,img,demoLink})=>(
                        <div key={id} className="flex sm:h-[41rem] h-[32rem] justify-center items-center sm:w-[570px] w-[80vw] lg:min-h-[32rem]">
                            <PinContainer title={link} href={link}>
                             <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] sm:h-[40vh] h-[30vh] overflow-hidden mb-10">
                                 <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162D]">
                                     <img src="" alt=""/>
                                 </div>
                                 <img src={img} alt={title} className="absolute bottom-0"/>
                             </div>
                                <h1 className="font-bold lg:text-2xl md:text-xl line-clamp-1 text-base">{title}</h1>
                                <p className="lg:text-xl lg:font-normal text-sm font-light line-clamp-2">{des}</p>
                                <div className="flex justify-between mt-7 mb-3 items-center">
                                    <div className="flex items-center">
                                        {iconLists.map((icon,index)=>(
                                            <div key={icon} className="flex items-center justify-center border bg-black lg:w-10 w-8 h-8 lg:h-10 rounded-full border-white/[0.2]" style={{transform:`translateX(-${5 * index * 2}px)`}}>
                                                <img  src={icon} alt={icon} className="p-2"/>
                                            </div>
                                        ))}
                                    </div>
                                    <a href={demoLink} target="_blank" className="flex justify-center items-center">
                                       <p className="flex lg:text-xl md:text-xs text-purple">
                                           Check Live Site
                                       </p>
                                        <FaLocationArrow className="ms-3" color="#CBACF9"/>
                                    </a>
                                </div>
                            </PinContainer>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecentProjects;