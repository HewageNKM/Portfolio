import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {FaLocationArrow} from "react-icons/fa6";

const ProjectCard = ({des, iconLists, title, img, demoLink}:{des:string,iconLists:string[],title:string, img:string, demoLink:string }) => {
    return (
        <div className="rounded-lg flex-col flex border-2 border-gray-600 max-w-[70vh]">
            <div className="max-w-[80vh] max-h-[50vh]">
                <Image src={img} alt={img} width={5000} height={5000}
                       className="w-full bg-contain rounded-t-lg"/>
            </div>
            <div className="w-full px-4 py-4 flex flex-col justify-start">
                <h1 className="font-bold text-xl">{title}</h1>
                <p className="mt-2 text-gray-400">{des}</p>
                <div className="w-full flex-row items-center flex justify-between mt-3">
                    <div className="flex items-center justify-center">
                        {
                            iconLists.map((icon, index) => (
                                <div key={index}
                                     className="rounded-full flex items-center justify-center p-1 w-10 border-gray-600 h-10 border">
                                    <Image key={icon} src={icon} alt={icon} width={25} height={25}/>
                                </div>
                            ))
                        }
                    </div>
                    <Link href={demoLink} className="flex flex-row justify-center  items-center gap-1">
                        <p className="text-purple">View Project</p>
                        <FaLocationArrow color="#CBACF9"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;