"use client"
import {motion} from "framer-motion";
import {useState} from "react";
import {GoCopy} from "react-icons/go";
import {arrow} from "@/data";
import Lottie from "lottie-react";
import {useGlobalContext} from "@/context/GlobalProvider";

const EmailButton = () => {
    const [copied, setCopied] = useState(false);
    const {play, setPlay} = useGlobalContext();
    const handleClick = () => {
        setCopied(true)
    }
    return (
        <button onClick={handleClick} onMouseEnter={() => setPlay(true)} onMouseLeave={() => setPlay(false)}
                className="absolute hidden lg:block right-5 top-5">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: .6}} className="relative">
                <div
                    className="flex flex-row justify-center hover:border-[2px] hover:border-gray-900 items-center border-2 p-2 rounded-lg gap-1">
                    <GoCopy size={25} color="#111827"/>
                    <p className="font-medium text-gray-900 h-7 text-xl">{copied ? "Email Copied" : "Copy Email?"}</p>
                </div>
                {play && <Lottie animationData={arrow} loop={false} className="absolute hidden md:block w-24 right-0"/>}
            </motion.div>
        </button>
    );
};

export default EmailButton;