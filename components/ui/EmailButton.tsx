"use client";
import React, {useState} from 'react';
import {GoCopy} from "react-icons/go";
import {motion} from "framer-motion";

const EmailButton = () => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        // @ts-ignore
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL)
        setCopied(true)
    }
    return (
        <button onClick={handleClick} className="absolute hidden lg:block right-5 top-5">
            <motion.div initial={{opacity:0}} animate={{opacity:1}}       transition={{ delay: .6 }} className="flex flex-row justify-center hover:border-[2px] hover:border-gray-900 items-center border-2 p-2 rounded-lg gap-1">
                <GoCopy size={25} color="#111827"/>
                <p className="font-medium text-gray-900 h-7 text-xl">{copied ? "Email Copied" : "Copy Email?"}</p>
            </motion.div>
        </button>
    );
};

export default EmailButton;