import Hero from "../../components/Hero";
import {NavBar} from "../../components/ui/NavBar";
import {FaHome} from "react-icons/fa";
import {Grid} from "../../components/Grid";

export default function Home() {
    return (
        <main
            className="relative bg-black-100 flex flex-col justify-center items-center sm:px-10 px-5 mx-auto overflow-hidden">
            <div className="max-w-7xl w-full">
                <NavBar navItems={[{name: 'Home', link: '/', icon: <FaHome/>}]}/>
                <Hero/>
                <Grid />
            </div>
        </main>
    );
}
