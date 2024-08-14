"use client";
import React from 'react';
import {socialMedia} from "@/data";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

const Footer = () => {
    return (
        <motion.footer initial={{opacity:0,y:'2vh'}}  transition={{ delay: .5,type:"spring", damping:10, stiffness:200}} animate={{opacity:1,y:0}} className="w-full pt-5 flex flex-col px-4 gap-5 md:flex-row justify-between items-center py-4 fixed bottom-0 left-0 md:px-10">
            <p className="font-light text-gray-900 text-base md:text-xl">Copyright © {new Date().getFullYear()} HEWAGENKM</p>
            <div className="flex items-center md:gap-3 gap-6">
                {socialMedia.map(({img, id, link}) => (
                    <Link href={link} key={id} target="_blank"
                          className="bg-gray-900 hover:bg-gray-700 transition-all  p-3 rounded-[4px]">
                        <Image src={img} width={20} height={20} alt="social_img"/>
                    </Link>
                ))}
            </div>
        </motion.footer>
    );
};

export default Footer;