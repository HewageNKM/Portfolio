import {useState} from "react";
import {icons} from "../constants/index.js";


const Nav = () => {
    let [isDarkMode, setIsDarkMode] = useState(false);
    let [mode, setMode] = useState('Light');
    let [color, setColor] = useState('orange-400');

    function toggleDarkMode() {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            setMode(mode = 'Light')
            setIsDarkMode(isDarkMode = false)

        } else {
            document.documentElement.classList.add('dark');
            setMode(mode = 'Dark')
            setIsDarkMode(isDarkMode = true)
        }
    }

    return (
        <header className="relative">
            <nav className="h-1.5 lg:w-full lg:grid gap-10 justify-center items-center lg:pt-20">
                <div>
                    <ul className="space-x-20 text-slate-500 text-2xl dark:text-slate-400 pr-10 hidden lg:flex box-content h-[2rem]">
                        <li className="hover:border-b-4"><a href="#home">Home</a></li>
                        <li className="hover:border-b-4"><a href="#service">Services</a></li>
                        <li className="hover:border-b-4"><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="flex justify-end p-2 lg:hidden">
                        <img src={icons.hamburger} alt="hamburger" className="w-12 h-12 cursor-pointer"/>
                    </div>
                </div>
                <label className="lg:relative lg:mx-auto lg:inline-flex cursor-pointer absolute top-0 m-3">
                    <input type="checkbox" value="" className="sr-only peer" onChange={toggleDarkMode}/>
                    <div
                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-400 dark:peer-focus:ring-orange-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-400"></div>
                    <span
                        className="ms-3 text-sm font-medium dark:text-gray-300 box-content w-0 h-0 text-slate-500">{mode}</span>
                </label>
            </nav>
        </header>
    )
}
export default Nav;