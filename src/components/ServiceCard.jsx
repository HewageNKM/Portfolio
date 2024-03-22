import Button from "./Button.jsx";
import {useState} from "react";

const ServiceCard = (props) => {
    const [showDescription, setShowDescription] = useState(false);
    const [name,setName] = useState("More")
    const OnClick = () => {
        setShowDescription(!showDescription)
        showDescription?setName("More"):setName("Less")
    }
    return (<div
        className="grid gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[15rem] md:w-[25rem] transition-all duration-700 rounded-2xl m-3 p-4 dark:shadow-slate-600">
        <img src={props.imgURL} alt="img" className="bg-cover bg-center w-[15rem] md:w-[25rem] rounded-[1rem] "/>
        <h2 className="font-medium text-xl dark:text-white">{props.label}</h2>
        <p className="capitalize text-slate-500 md:text-sm sm:text-[.5rem] lg:text-1.5xl flex-wrap transition-all duration-700"
           style={{display: showDescription ? "flex" : "none"}}>{props.description}</p>
        <ol className="flex justify-between items-center">
            <a href="">
                <p className="flex gap-1 items-center justify-start dark:text-white transition-all duration-700 lg:text-1.5xl">
                    Projects
                    <img src={props.icon} alt="arrow" width="30"/>
                </p>
            </a>
            <Button width="5rem" name={name} bgColor="none" textColor="orange" onClick={OnClick}/>
        </ol>
    </div>)
}
export default ServiceCard