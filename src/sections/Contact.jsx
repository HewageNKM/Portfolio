import {icons} from "../constants/index.js";
import ReCAPTCHA from "react-google-recaptcha";
import {useRef} from "react";
import emailjs from '@emailjs/browser';


const Contact =()=>{
    const form = useRef();
    let captchaRef = useRef(null)
    const handleSubmit = (e) =>{
        e.preventDefault();
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        if(token.length > 0){
        emailjs.sendForm(import.meta.env.VITE_EMAIL_JS_SERVICE_ID,import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,form.current,import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY)
            .then((result) => {
                if (result.text === "OK"){
                    alert("Message Sent")
                }else {
                    alert("Message Not Send")
                }
            }, (error) => {
                console.log(error)
                alert("Error While Sending Message")
            });
        }else {
            captchaRef.current.reset()
        }
    }

    return (
        <main className=" flex flex-col lg:flex-row lg:items-center lg:justify-between " onSubmit={handleSubmit}>
            <section className="flex flex-col gap-5">
                <h2 className="md:text-5xl text-3xl font-medium lg:text-8xl p-6 dark:text-white transition-all duration-700">Get
                    In Touch</h2>
                <div
                    className="justify-start flex ml-5 items-center gap-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-auto rounded-xl m-3 p-4 dark:bg-neutral-800 cursor-pointer">
                    <img src={icons.email} alt="email" className="w-10"/>
                    <h2 className="sm:text-sm dark:text-slate-500 font-medium md:text-xl">kawishikam@gmail.com</h2>
                </div>
                <div
                    className="justify-start flex ml-5 items-center gap-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-auto rounded-xl m-3 p-4 dark:bg-neutral-800 cursor-pointer">
                    <img src={icons.ping} alt="ping" className="w-10"/>
                    <h2 className="sm:text-sm dark:text-slate-500 font-medium md:text-xl">Dompe, Sri Lanka</h2>
                </div>
                <div
                    className="justify-start g-recaptcha flex ml-5 items-center gap-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-auto rounded-xl m-3 p-4 dark:bg-neutral-800 cursor-pointer">
                    <img src={icons.phone} alt="ping" className="w-10"/>
                    <h2 className="sm:text-sm dark:text-slate-500 font-medium md:text-xl">+94761729000</h2>
                </div>
            </section>
            <section>
                <form className="flex-col flex gap-5 p-5 w-full" ref={form}>
                    <legend className="text-5xl font-medium dark:text-white">Send a Message</legend>
                    <input required="true" type="text"
                           className="rounded-2xl p-2 bg-slate-100 dark:bg-neutral-800 dark:text-white"
                           placeholder="Name" name="name"/>
                    <input required="true" type="email" autoComplete="true"
                           className="rounded-2xl p-2 bg-slate-100 dark:bg-neutral-800 dark:text-white"
                           placeholder="Email" name="email"/>
                    <input required="true" type="text"
                           className="rounded-2xl p-2 dark:bg-neutral-800 bg-slate-100 dark:text-white"
                           placeholder="Subject" name="subject"/>
                    <textarea name="message" required="true" id="" cols="30" rows="10"
                              className="rounded-2xl p-2 bg-slate-100 dark:bg-neutral-800 dark:text-white"
                              placeholder="Message"></textarea>
                    <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} ref={captchaRef}/>
                    <button type="submit"
                            className="rounded-xl flex gap-2 justify-center items-center bg-orange-500 dark:text-white hover:bg-orange-600">
                        <img src={icons.right_arrow} alt="arrow" className="w-10"/>
                        Drop
                    </button>
                </form>
            </section>
        </main>
    )
}
export default Contact