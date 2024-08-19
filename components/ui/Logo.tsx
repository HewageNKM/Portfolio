"use client"
import React from 'react';
import Link from "next/link";

const Logo = () => {
    return (
        <div className="bg-gray-900 lg:hover:scale-110 transition-all duration-500 w-fit p-1 md:p-2 absolute top-5 left-5">
            <Link href="/">
                <h1 className="md:text-6xl text-4xl text-center font-bold text-white tracking-wider">M</h1>
            </Link>
        </div>
    );
};

export default Logo;