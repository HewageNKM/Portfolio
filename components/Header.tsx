"use client";
import React from 'react';
import Logo from "@/components/ui/Logo";
import Email from "@/components/ui/Email";
import Lottie from "lottie-react";
import {party} from "@/data";
import {useGlobalContext} from "@/context/GlobalProvider";

const Header = () => {
    const {playPartyAnimation} = useGlobalContext();
    return (
        <div className="w-full bg-primary pb-20 px-8 relative flex justify-between items-center">
            <Logo/>
            <Email/>
            {playPartyAnimation && ( <Lottie animationData={party} loop={false} className="w-24 absolute right-8 -top-6"/>)}
        </div>
    );
};

export default Header;