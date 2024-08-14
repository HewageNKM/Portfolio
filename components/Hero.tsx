import React from "react";
import {TextGenerateEffect} from "./ui/TextGenarateEffect";
import MagicButton from "./ui/MagicButton";
import {FaLocationArrow} from "react-icons/fa6";
import Footer from "./Footer";

const Hero = () => {
    return (
        <div className="px-10 mt-20" id="hero">
            <div className="flex justify-center h-full flex-col items-center relative z-10">
                <div
                    className="max-w-[89vw] md:max-w-screen-2xl flex items-center flex-col justify-center lg:max-w-[60vw]">
                    <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                        Web Magic
                    </h2>
                    <TextGenerateEffect words="🛠️Build Your Ideas Into Seamless User Experience"
                                        className="text-center text-[40px] md:text-5xl lg:text-6xl"/>
                    <p className="md:tracking-wider text-center mb-4 text-sm md:text-lg lg:text-2xl">Hi, I&apos;m Nadun,
                        a Web and Mobile App Engineer base in Sri Lanka</p>
                    <a href="#projects">
                        <MagicButton title="Show My Work" icon={<FaLocationArrow/>} position="right"/>
                    </a>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Hero