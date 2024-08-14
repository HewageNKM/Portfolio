import React from 'react';
import {socialMedia} from "../../data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full pt-5 fixed bottom-0 left-0 px-20">
            <div className="flex my-5 md:flex-row flex-col justify-center gap-3 md:justify-between items-center">
                <p className="font-medium text-gray-900 text-xl">Copyright © {new Date().getFullYear()} Nadun Malwenna</p>
                <div className="flex items-center md:gap-3 gap-6">
                    {socialMedia.map(({img, id, link}) => (
                        <Link href={link} key={id} target="_blank"
                              className="bg-gray-900 hover:bg-gray-700 transition-all  p-3 rounded-[4px]">
                            <Image src={img} width={20} height={20} alt="social_img"/>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;