"use client";
import React, {useState} from 'react';
import {BiCopy} from "react-icons/bi";
import {GoCopy} from "react-icons/go";

const EmailButton = () => {
    const [copied, setCopied] = useState(false);

    const handleClick =  () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL)
        setCopied(true)
    }
    return (
        <button onClick={handleClick} className="absolute hidden lg:block right-5 top-5">
                <div className="flex flex-row justify-center hover:border-[2px] hover:border-gray-900 items-center border-2 p-2 rounded-lg gap-1">
                    <GoCopy  size={25} color="#111827"/>
                    <p className="font-medium text-gray-900 h-7 text-xl">{copied ? "Email Copied":"Copy Email?"}</p>
                </div>
        </button>
);
};

export default EmailButton;