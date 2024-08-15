"use client";
import React from "react";
import {motion} from "framer-motion";

const Hero = () => {
    return (
        <div className="px-10 mt-10 md:mt-20 pb-10 w-full flex justify-center items-center">
            <motion.div>

            </motion.div>
            <motion.div initial={{opacity:0,y:'2vh'}} transition={{ delay:.9}} animate={{opacity:1,y:0}} className="flex flex-col transition-all flex-wrap justify-center items-center">
                <h1 className="lg:text-[7rem] xl:text-[10rem] transition-all duration-500 text-[3rem] md:text-[5rem] text-center xl:line-clamp-1 tracking-wider font-bold text-gray-900">Hello, I&apos;m Nadun</h1>
                <p className="lg:text-xl mt-3 text-[1.1rem] md:text-[1.5rem] duration-500 xl:text-2xl transition-all text-center capitalize font-medium text-gray-500">A Passionate Mobile and Web Developer base in Sri Lanka.</p>
            </motion.div>
        </div>
    );
}

export default Hero