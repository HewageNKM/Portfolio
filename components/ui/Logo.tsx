"use client"
import React from 'react';
import Link from "next/link";

const Logo = () => {
    return (
        <div className="bg-gray-900 transition-all w-fit p-1 md:p-2 absolute top-5 left-5">
            <Link href="/">
                <h1 className="md:text-2xl text-lg font-bold text-white tracking-wider">NAD</h1>
                <h1 className="md:text-2xl text-lg font-bold text-white tracking-wider">MAL</h1>
            </Link>
        </div>
    );
};

export default Logo;