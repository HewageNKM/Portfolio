import ServiceCard from "../components/ServiceCard.jsx";
import {icons, services} from "../constants/index.js";

const Services = () => {
    return (
        <div className="grid gap-2">
            <h1 className="flex justify-center items-center md:text-5xl text-3xl font-medium lg:text-7xl dark:text-white transition-all duration-700">My
                Services</h1>
            <p className="text-slate-500 m-3 p-3 lg:text-[1.5rem] text-[.8rem] dark:text-slate-400 text-transform: capitalize flex items-center justify-center mx-auto">
                Craftsman-built mobile and web apps with Jetpack Compose! I bring your vision to life with stunning UIs,
                intuitive flow, and efficient code. Less boilerplate, more magic. ✨ Let's build the future of your
                brand, together</p>
            <ul className="md:gap-[10rem] gap-[5rem] items-center justify-center flex lg:flex-row flex-col">
                <li><ServiceCard label={services[0].label} imgURL={services[0].imgURL}
                                 description={services[0].description} icon={icons.orange_arrow}/></li>
                <li><ServiceCard label={services[1].label} imgURL={services[1].imgURL}
                                 description={services[1].description} icon={icons.orange_arrow}/></li>
            </ul>
        </div>
    )
}
export default Services