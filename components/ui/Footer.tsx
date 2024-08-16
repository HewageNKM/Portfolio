"use client";
import React from 'react';
import {socialMedia} from "@/data";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";
import {useGlobalContext} from "@/context/GlobalProvider";

const Footer = () => {
    return (
        <motion.footer  initial={{opacity:0,y:'1vh'}}  transition={{ duration:.5,delay: .5,type:"spring", damping:10, stiffness:100}} animate={{opacity:1,y:0}} className="w-full pt-5 flex flex-col px-4 gap-5 md:flex-row justify-between items-center pb-4 absolute bottom-0 md:px-10">
            <p className="font-light text-gray-900 text-base md:text-xl">Copyright © {new Date().getFullYear()} HewageNKM</p>
            <div className="flex items-center md:gap-3 gap-6">
                {socialMedia.map(({img, id, link}) => (
                    <Link href={link} key={id} target="_blank"
                          className="bg-gray-900 hover:bg-gray-700 transition-all  p-3 rounded-[4px]">
                        <Image src={img} width="auto" height="auto" alt="social_img" className="w-4 h-4 md:w-7 md:h-7"/>
                    </Link>
                ))}
            </div>
        </motion.footer>
    );
};

export default Footer;