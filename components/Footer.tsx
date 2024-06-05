import React from 'react';
import MagicButton from "./ui/MagicButton";
import {FaLocationArrow} from "react-icons/fa6";
import {FlipWords} from "./ui/FlipWords";
import {socialMedia} from "../data";

const Footer = () => {
    return (
        <footer id="contact" className="w-full h-full pt-20 pb-5">
            <div className='w-full absolute left-0 bottom-0 md:-bottom-96 min-h-96'>
                <img src="/footer-grid.svg" alt="grid" className='opacity-50'/>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[40vw] my-5">
                    Wanna Reach <span className="text-purple">Out?</span>
                </h1>
                <div className="mb-3 text-base md:text-xl font-light lg:text-xl">
                    Let&apos;s Build Your
                    <FlipWords words={["Beautiful","Modern","PowerFull","Cute"]} duration={2000}/>
                    Idea Together
                </div>
                <a href="mailto:kawishikam@gmail.com">
                    <MagicButton title="Let's hit" icon={<FaLocationArrow/>} position="right"/>
                </a>
            </div>
            <div className="flex my-5 md:flex-row flex-col justify-center gap-3 md:justify-between items-center">
                <p className="font-light md:font-normal font-base">Copyright © {new Date().getFullYear()} Nadun</p>
                <div className="flex items-center md:gap-3 gap-6">
                    {socialMedia.map(({img,id,link})=>(
                        <a href={link} key={id} className="flex border justify-center items-center md:gap-3 gap-6 backdrop-filter backdrop-blur-lg saturate-180 w-10 h-10 bg-black-200 rounded-lg border-black-300 cursor-pointer">
                            <img src={img} width={20} height={20} alt="social_img"/>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;