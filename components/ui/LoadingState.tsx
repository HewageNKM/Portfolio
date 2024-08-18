"use client"
import React from 'react';
import {motion} from "framer-motion";
import Lottie from "lottie-react";
import {Loader} from "@/data";

const LoadingState = () => {
    return (
        <motion.div initial={{opacity:0,y:'1vh'}} exit={{opacity:0,y:'1vh'}} animate={{opacity:1,y:0}} className="w-full h-full flex justify-center items-center">
            <div className="w-32 h-32">
                <Lottie animationData={Loader} loop={true}/>
            </div>
        </motion.div>
    );
};

export default LoadingState;