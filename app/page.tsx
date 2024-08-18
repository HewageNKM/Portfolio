"use client"
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
const Header = dynamic(()=>import("@/components/Header"),{ssr:false});
const Footer = dynamic(()=>import("@/components/ui/Footer"),{ssr:false});
const Hero = dynamic(()=>import("@/components/Hero"),{ssr:false});

export default function Home() {
    return (
        <motion.main initial={{opacity:0}} animate={{opacity:1}} className="relative flex flex-col justify-between rounded-lg min-h-screen px-8 py-4">
            <Header/>
            <Hero/>
            <Footer/>
        </motion.main>
    );
}
