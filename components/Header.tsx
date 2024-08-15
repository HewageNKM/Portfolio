"use client";
import React from 'react';
import Logo from "@/components/ui/Logo";
import Email from "@/components/ui/Email";

const Header = () => {
    return (
        <div className="w-full bg-primary pb-20 px-8 relative flex justify-between items-center">
            <Logo/>
            <Email/>
        </div>
    );
};

export default Header;