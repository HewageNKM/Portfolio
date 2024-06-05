import Hero from "../../components/Hero";
import {NavBar} from "../../components/ui/NavBar";
import {Grid} from "../../components/Grid";
import RecentProjects from "../../components/RecentProjects";
import {navItems} from "../../data";
import Footer from "../../components/Footer";

export default function Home() {
    return (
        <main
            className="relative bg-black-100 flex flex-col justify-center items-center sm:px-10 px-5 mx-auto overflow-clip">
            <div className="max-w-7xl w-full">
                <NavBar navItems={navItems}/>
                <Hero/>
                <Grid/>
                <RecentProjects/>
                <Footer/>
            </div>
        </main>
    );
}
