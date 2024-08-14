"use client"
import React from 'react';
import Link from "next/link";
import {motion} from "framer-motion";
const Logo = () => {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6}}>
            <Link href="/" className="bg-gray-900 hover:bg-gray-700 transition-all  w-fit p-2 absolute top-5 left-5">
                <h1 className="text-2xl font-bold text-white tracking-wider">NAD</h1>
                <h1 className="text-2xl font-bold text-white tracking-wider">MAL</h1>
            </Link>
        </motion.div>
    );
};

export default Logo;