"use client";
import React from "react";
import {motion} from "framer-motion";
import Link from "next/link";

const Hero = () => {
    const [projectAnimation, setProjectAnimation] = React.useState(false);
    const [resumeAnimation, setResumeAnimation] = React.useState(false);

    return (
        <motion.div initial={{opacity: 0, y: '1vh'}} transition={{delay: .6, type: 'spring', stiffness: 100, damping: 10}} animate={{opacity: 1, y: 0}}
                    className="px-10 mt-10 md:mt-20 pb-10 w-full flex-col flex justify-center items-center">
            <div className="flex flex-col transition-all flex-wrap justify-center items-center">
                <h1 className="lg:text-[7rem] xl:text-[10rem] transition-all duration-500 text-[3rem] md:text-[5rem] text-center tracking-wider font-bold text-gray-900">Hello,
                    I&apos;m Nadun</h1>
                <p className="lg:text-xl mt-3 text-[1.1rem] md:text-[1.5rem] duration-500 xl:text-2xl transition-all text-center capitalize font-medium text-gray-500">A
                    Passionate Mobile and Web Developer base in Sri Lanka.</p>
            </div>
            <div className="mt-8 flex justify-center items-center gap-20">
                <div>
                    <Link onMouseLeave={() => setResumeAnimation(false)} onMouseEnter={() => setResumeAnimation(true)}
                          href="/contact"
                          className="flex hover:translate-x-2 transition-all duration-500 justify-center items-center">
                        <h2 className="border-b-[1.5px] text-gray-700 font-bold uppercase w-[5rem] text-lg md:text-xl border-b-gray-900">
                            résumé
                        </h2>
                    </Link>
                </div>
                <div>
                    <Link onMouseEnter={() => setProjectAnimation(true)} onMouseLeave={() => setProjectAnimation(false)}
                          href="/projects"
                          className="flex hover:translate-x-2 transition-all duration-500 justify-center items-center">
                        <h2 className="border-b-[1.5px] uppercase text-gray-700 font-bold text-lg md:text-xl border-b-gray-900">
                            Projécts
                        </h2>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default Hero