"use client"
import React from 'react';
import Link from "next/link";

const Logo = () => {
    return (
        <div className="bg-gray-900 lg:hover:scale-110 transition-all duration-500 w-fit p-1 md:p-2 absolute top-5 left-5">
            <Link href="/">
                <h1 className="md:text-xl text-lg text-center font-bold text-white tracking-wider">H</h1>
                <h1 className="md:text-xl text-lg text-center font-bold text-white tracking-wider">N</h1>
                <h1 className="md:text-xl text-lg text-center font-bold text-white tracking-wider">K</h1>
                <h1 className="md:text-xl text-lg text-center font-bold text-white tracking-wider">M</h1>
            </Link>
        </div>
    );
};

export default Logo;