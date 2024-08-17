"use client";
import React from "react";
import {motion} from "framer-motion";
import Link from "next/link";

const Hero = () => {

    return (
        <motion.div initial={{opacity: 0, y: '1vh'}} transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}} animate={{opacity: 1, y: 0}}
                    className="px-10 md:full mb-10 mt-8 md:mt-16 w-full flex-col flex h-[50vh] justify-center items-center">
            <div className="flex flex-col transition-all flex-wrap justify-center items-center">
                <h1 className="lg:text-[7rem] xl:text-[8rem] transition-all duration-500 text-[2.5rem] md:text-[5rem] text-center tracking-wider font-extrabold text-gray-900">Hello,
                    I&apos;m Nadun</h1>
                <p className="lg:text-2xl pt-3 text-[.8rem] md:text-[1.5rem] duration-500 xl:text-3xl transition-all text-center capitalize font-medium text-gray-500">A
                    Passionate Mobile and Web Developer base in Sri Lanka.</p>
            </div>
            <div className="md:mt-10 mt-5 flex justify-center items-center gap-10 md:gap-20">
                <div>
                    <Link
                          href="https://registry.jsonresume.org/HewageNKM"
                          className="flex hover:translate-x-2 transition-all duration-500 justify-center items-center">
                        <h2 className="border-b-[1.5px] text-gray-700 font-bold uppercase text-lg md:text-xl xl:text-3xl border-b-gray-900">
                            résumé
                        </h2>
                    </Link>
                </div>
                <div>
                    <Link
                          href="/projects"
                          className="flex hover:translate-x-2 transition-all duration-500 justify-center items-center">
                        <h2 className="border-b-[1.5px] xl:text-3xl uppercase text-gray-700 font-bold text-lg md:text-xl border-b-gray-900">
                            Projécts
                        </h2>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default Hero