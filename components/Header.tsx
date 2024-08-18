"use client";
import React from 'react';
import Logo from "@/components/ui/Logo";
import Email from "@/components/ui/Email";
import Lottie from "lottie-react";
import {party} from "@/data";
import {useGlobalContext} from "@/context/GlobalProvider";
import {motion} from "framer-motion";

const Header = () => {
    const {playPartyAnimation} = useGlobalContext();
    return (
        <motion.div initial={{opacity: 0,y: '1vh'}} transition={{delay:.3,type: 'spring',stiffness: 100,damping: 10}}
                    animate={{opacity: 1,y:0}}
                    className="w-full bg-primary pb-20 px-8 relative flex justify-between items-center">
            <Logo/>
            <Email/>
            {playPartyAnimation && (
                <Lottie animationData={party} loop={false} className="w-24 absolute right-8 -top-6"/>)}
        </motion.div>
    );
};

export default Header;