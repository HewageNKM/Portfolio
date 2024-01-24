import {icons} from "../constants/index.js";

const Footer = () => {
    let d = new Date();
    let getYear = d.getFullYear();
    return (
        <footer className="flex flex-col pt-10 md:flex-row md:justify-between gap-5">
            <section className="flex-col justify-center gap-4 sm:justify-start">
                <h2 className="text-xl lg:text-5xl font-medium text-white">©Nadun Kawishika</h2>
                <p className="text-sm lg:text-xl text-orange-200">Let's Create Something Beautiful Together.</p>
                <ul className="flex gap-5 mt-3 font-medium">
                    <li className="text-sm lg:text-xl text-orange-200"><a href="#home">Home</a></li>
                    <li className="text-sm lg:text-xl text-orange-200"><a href="#service"> Services</a></li>
                    <li className="text-sm lg:text-xl text-orange-200"><a href="#contact">Contact</a></li>
                </ul>
                <p className="mt-2 text-sm lg:text-xl text-orange-200"><a href="#" target="_blank">Terms & Conditions {getYear}</a></p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-xl lg:text-5xl font-medium text-white">About Me</h2>
                <p className="text-sm lg:text-xl text-orange-200">Full-Stack and Android Developer.</p>
                <ul className="flex gap-10">
                    <li><a href="https://github.com/HewageNKM" target="_blank"><img src={icons.github} alt="github" width="30px"/></a></li>
                    <li><a href="https://twitter.com/HewageNKM" target="_blank"><img src={icons.x} alt="github" width="30px"/></a></li>
                    <li><a href=""><img src={icons.linkedin} alt="github" width="30px"/></a></li>
                </ul>
            </section>
        </footer>
    );
}
export default Footer;