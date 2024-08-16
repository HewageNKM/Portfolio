"use client"
import React from 'react';
import Link from "next/link";
import {motion} from "framer-motion";
const Logo = () => {
    return (
        <motion.div initial={{opacity:0,y:'1vh'}}  transition={{ duration:.5,delay: .5,type:"spring", damping:10, stiffness:100}} animate={{opacity:1,y:0}} className="bg-gray-900 transition-all w-fit p-2 absolute top-5 left-5">
            <Link href="/" >
                <h1 className="md:text-2xl text-lg font-bold text-white tracking-wider">NAD</h1>
                <h1 className="md:text-2xl text-lg font-bold text-white tracking-wider">MAL</h1>
            </Link>
        </motion.div>
    );
};

export default Logo;