import React from 'react';
import {BiSearch} from "react-icons/bi";
import {motion} from "framer-motion";
const EmptyState = ({title, subTitle}:{title:string, subTitle:string}) => {
    return (
        <motion.div initial={{opacity:0,y:'1vh'}}  transition={{delay: .2,type:"spring", damping:10, stiffness:100}} animate={{opacity:1,y:0}} className="flex w-full min-h-[50vh] flex-col justify-center items-center">
            <div>
                <BiSearch className="w-10 h-10"/>
            </div>
            <h2 className="text-lg mt-2 font-bold md:text-2xl">
                {title}
            </h2>
            <h3 className="md:text-lg text-sm text-gray-500">
                {subTitle}
            </h3>
        </motion.div>
    );
};

export default EmptyState;