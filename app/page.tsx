import Hero from "../components/Hero";
import Logo from "../components/ui/Logo";
import Footer from "../components/ui/Footer";
import React from "react";
import EmailButton from "../components/ui/EmailButton";

export default function Home() {
    return (
        <main className="h-full w-full">
            <Logo />
            <EmailButton />
            <Hero/>
            <Footer/>
        </main>
    );
}
