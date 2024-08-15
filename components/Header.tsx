import React from 'react';
import Logo from "@/components/ui/Logo";
import EmailButton from "@/components/ui/EmailButton";

const Header = () => {
    return (
        <div className="w-full bg-primary pb-20 px-8 relative flex justify-between items-center">
            <Logo/>
            <EmailButton/>
        </div>
    );
};

export default Header;