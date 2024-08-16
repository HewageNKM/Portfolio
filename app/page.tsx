"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/ui/Footer";
import {motion} from "framer-motion";
export default function Home() {
    return (
        <motion.main initial={{opacity:0}} animate={{opacity:1}} className="relative border rounded-lg border-gray-900 min-h-[97vh] m-2">
            <Header/>
            <Hero/>
            <Footer/>
        </motion.main>
    );
}
