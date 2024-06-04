'use client'
import {cn} from "../../utils/cn";
import {useState} from "react";
import {BackgroundGradientAnimation} from "./GradientBg";
import animationData from '../../data/confetti.json'
import Lottie from "react-lottie";
import MagicButton from "./MagicButton";
import {IoCopyOutline} from "react-icons/io5";

export const BentoGrid = ({
                              className,
                              children,
                          }: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
                                  className,
                                  title,
                                  description,
                                  id,
                                  img,
                                  imgClassName,
                                  titleClassName,
                                  spareImg
                              }: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
    id?: number;
}) => {
    const [copied, setCopied] = useState(false)
    const  handleCopy = () => {
        navigator.clipboard.writeText("kawishikam@gmail.com").then(r => setCopied(true))
    }
    return (
        <div
            className={cn("row-span-1 border-white/[0.1] overflow-hidden rounded-3xl relative group/bento hover:shadow-xl transition duration-200 shadow-input  bg-white justify-between flex flex-col space-y-4", className)}
            style={{
                background: "rgb(4,7,29)",
                backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
        >
            <div className={`${id === 6 && 'flex justify-center h-full'}`}>
                <div className="w-full h-full absolute">
                    {img && (
                        <img
                            src={img}
                            alt={img}
                            className={cn(imgClassName, `object-cover object-center ${id == 3 && 'absolute lg:w-[25vw] lg:left-10 -left-10'}`)}
                        />
                    )}
                </div>
                <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
                    {spareImg && (
                        <img
                            src={spareImg}
                            alt={spareImg}
                            className={"object-cover object-center w-full h-full"}
                        />
                    )}
                </div>
                <div>
                    {id === 6 && (
                        <BackgroundGradientAnimation>
                            <div className="absolute z-50 flex items-center justify-center text-white font-bold">
                            </div>
                        </BackgroundGradientAnimation>
                    )}
                </div>
                <div className={cn(titleClassName, "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5")}>
                    <div className="font-sans font-extralight text-[#c1c2d3] text-xm md:text-xs lg:text-base z-10">
                        {description}
                    </div>
                    <div className="font-sans capitalize font-bold text-lg lg:text-3xl max-w-96 z-10 mb-3">
                        {title}
                    </div>
                    {id === 3 && (
                        <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2 -top-1">
                            <div className="flex flex-col md:gap-5 gap-3 lg:gap-8">
                                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
                                {
                                    ["React.js", "Angular.js"].map((item) => (
                                        <span key={item}
                                              className="py2 border-white hover:border-[0.5px] lg:py-4 lg:px-3 px-3 text-xs md:text-xl lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">{item}</span>
                                    ))
                                }
                            </div>
                            <div className="flex flex-col md:gap-5 gap-3 lg:gap-8">
                                {
                                    ["Express", "Spring Boot", "Cloud",].map((item) => (
                                        <span key={item}
                                              className="py2 lg:py-4 border-white hover:border-[0.5px] lg:px-3 px-3 text-xs md:text-xl  lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">{item}</span>
                                    ))
                                }
                                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>

                            </div>
                            <div className="flex flex-col md:gap-5 gap-3 lg:gap-8">
                                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
                                {
                                    ["MySQL", "MongoDB", "PostgresSQL",].map((item) => (
                                        <span key={item}
                                              className="py2 lg:py-4 border-white hover:border-[0.5px] lg:px-3 px-3 text-xs lg:text-base md:text-xl  opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">{item}</span>
                                    ))
                                }
                                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
                            </div>
                        </div>
                    )}
                    {
                        id === 6 && (
                            <div className="relative mt-5">
                                <div className={`absolute -bottom-5  right-0`}>
                                    <Lottie options={{
                                        loop: copied,
                                        autoplay: copied,
                                        animationData,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice'
                                        }
                                    }}/>
                                    <MagicButton title={copied?"Email copied":"Copy My Email"} icon={<IoCopyOutline/>} position="left" otherClasses="`bg-[#161A31]`" handleClick={handleCopy}/>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
