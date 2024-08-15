"use client"
import React, {useState} from "react";
import {motion} from "framer-motion";
import {BiCopy} from "react-icons/bi";

const Email = () => {
    const [copied, setCopied] = useState(false)

    const copyEmail = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL)
        setCopied(true)
    }
    return (
        <motion.button onClick={()=>copyEmail()} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: .6}}
                       className="border cursor-pointer absolute right-5 top-5 border-gray-900 rounded-lg gap-1 flex justify-center items-center transition-all w-fit p-2 ">
            <BiCopy className="w-8 h-8"/>
            <p className="font-medium text-lg">{copied ? "Email Copied" : "Copy Email?"}</p>
        </motion.button>
    )
};

export default Email;