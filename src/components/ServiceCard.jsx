const ServiceCard = (props) => {
    return (
        <div
            className="grid gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[15rem] md:w-[20rem] hover:w-[21rem] transition-all duration-700 rounded-2xl m-3 p-4 dark:shadow-slate-600">
            <img src={props.imgURL} alt="img" className="bg-cover bg-center w-[15rem] md:w-[20rem] rounded-[1rem] "/>
            <h2 className="font-medium text-xl dark:text-white">{props.label}</h2>
            <p className="capitalize text-slate-500 md:text-sm sm:text-[.5rem] lg:text-1.5xl flex flex-wrap transition-all duration-700">{props.description}</p>
            <a href="">
                <p className="flex gap-1 items-center justify-start dark:text-white transition-all duration-700 lg:text-1.5xl">
                    Projects
                    <img src={props.icon} alt="arrow" width="30"/>
                </p>
            </a>
        </div>
    )
}
export default ServiceCard