"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/ui/Footer";

export default function Home() {
    return (
        <main className="relative border rounded-lg border-gray-900 min-h-[97vh] m-2">
            <Header/>
            <Hero/>
            <Footer/>
        </main>
    );
}
