"use client"
import {BiCheck, BiCopy} from "react-icons/bi";
import {useGlobalContext} from "@/context/GlobalProvider";

const Email = () => {
    const {setPlayPartyAnimation, emailCopied, setEmailCopied} = useGlobalContext();
    const copyEmail = async () => {
        setPlayPartyAnimation(true)
        // @ts-ignore
        await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL)
        setEmailCopied(true)
    }
    return (
        <button onClick={() => copyEmail()}
                className="border cursor-pointer absolute right-5 top-5 border-gray-900 rounded-lg gap-1 flex justify-center items-center transition-all w-fit p-1 md:p-2 ">
            {emailCopied ? (<BiCheck className="md:w-8 w-5 h-5 md:h-8"/>) : (
                <BiCopy className="md:w-8 w-5 h-5 md:h-8"/>)}
            <p className="font-bold text-sm md:text-lg">{emailCopied ? "Email Copied" : "Copy Email?"}</p>
        </button>
    )
};

export default Email;