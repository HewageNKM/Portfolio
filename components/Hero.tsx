import React from "react";
import Spotlight from "./ui/Spotlight";
import {TextGenerateEffect} from "./ui/TextGenarateEffect";
import MagicButton from "./ui/MagicButton";
import {FaLocationArrow} from "react-icons/fa6";

const Hero = () => {
    return (
        <div className="pb-20 pt-36" id="hero">
            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white"/>
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple"/>
                <Spotlight className="-top-28 left-80 h-[80vh] w-[50vw]" fill="blue"/>
            </div>
            <div className="h-screen absolute top-0 left-0 w-full dark:bg-black-100 bg-white  dark:bg-dot-white/[0.3] bg-dot-black/[0.3] flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
            </div>
            <div className="flex justify-center relative my-20 z-10">
                <div
                    className="max-w-[89vw] md:max-w-screen-2xl flex items-center flex-col justify-center lg:max-w-[60vw]">
                    <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                        Web Magic
                    </h2>
                    <TextGenerateEffect words="🛠️Build Your Ideas Into Seamless User Experience" className="text-center text-[40px] md:text-5xl lg:text-6xl"/>
                    <p className="md:tracking-wider text-center mb-4 text-sm md:text-lg lg:text-2xl">Hi, I&apos;m Nadun, a Software Engineer base in Sri Lanka</p>
                    <a href="#about">
                        <MagicButton title="Show My Work"  icon={<FaLocationArrow />} position="right"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Hero