import Button from "../components/Button.jsx";
import {icons} from "../constants/index.js";

const About = () => {
    return (
        <div className="flex mx-auto">
            <div className="flex-row lg:space-y-[2rem] space-y-1">
                <div
                    className=" md:text-5xl text-3xl font-medium lg:text-8xl m-2 p-4 dark:text-white transition-all duration-700">Hey <span
                    className="hover:animate-pulse">👋🏾</span>, I am Nadun Kawishika <br/>Full-Stack And Android
                    Developer.
                </div>
                <p className="lg:text-[2rem] text-[.8rem] text-slate-500 m-2 p-4 dark:text-slate-400"> I am Passionate
                    About Crafting Engaging And Innovative Digital Experiences, And I Leverage
                    Cutting-Edge Technologies To Bring Them To Life. In My Work, I Blend The Power Of MERN For Web
                    Development And Jetpack Compose For Native Android App creation.</p>
                <div className="flex space-x-20 justify-start items-center m-2 p-4">
                    <Button name="Hire me" imgURL={icons.right_arrow}/>
                </div>
            </div>
        </div>
    )
}
export default About