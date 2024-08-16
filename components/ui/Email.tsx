"use client"
import React, {useState} from "react";
import {motion} from "framer-motion";
import {BiCheck, BiCopy} from "react-icons/bi";
import {useGlobalContext} from "@/context/GlobalProvider";

const Email = () => {
    const {setPlayPartyAnimation, emailCopied, setEmailCopied} = useGlobalContext();
    const copyEmail = async () => {
        setPlayPartyAnimation(true)
        // @ts-ignore
        await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL)
        setEmailCopied(true)
    }
    return (
        <motion.button onClick={() => copyEmail()} initial={{opacity: 0, y: '1vh'}}
                       transition={{duration: .5, delay: .5, type: "spring", damping: 10, stiffness: 100}}
                       animate={{opacity: 1, y: 0}}
                       className="border cursor-pointer absolute right-5 top-5 border-gray-900 rounded-lg gap-1 flex justify-center items-center transition-all w-fit p-1 md:p-2 ">
            {emailCopied ? (<BiCheck className="md:w-8 w-5 h-5 md:h-8"/>) : (<BiCopy className="md:w-8 w-5 h-5 md:h-8"/>)}
            <p className="font-bold text-sm md:text-lg">{emailCopied ? "Email Copied" : "Copy Email?"}</p>
        </motion.button>
    )
};

export default Email;