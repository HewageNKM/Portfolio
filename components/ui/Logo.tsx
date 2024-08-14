import React from 'react';
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="bg-gray-900 hover:bg-gray-700 transition-all  w-fit p-2 absolute top-5 left-5">
            <h1 className="text-2xl font-bold text-white tracking-wider">NAD</h1>
            <h1 className="text-2xl font-bold text-white tracking-wider">MAL</h1>
        </Link>
    );
};

export default Logo;