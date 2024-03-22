import {About, Contact, Footer, Services} from './sections'
import Nav from "./components/Nav.jsx";

const App = () => {
    return (
        <main className="relative dark:bg-black transition-all duration-700" id="home">
            <Nav/>
            <section className="mt-[10rem] mx-auto lg:pl-[10rem] lg:pr-[10rem] pl-10 pr-10">
                <About/>
            </section>
            <section className="mt-[10rem]  mx-auto lg:pl-[10rem] lg:pr-[10rem] pl-8 pr-8" id="service">
                <Services/>
            </section>
            <section className="mt-[10rem]  mx-auto lg:pl-[10rem] lg:pr-[10rem] pl-8 pr-8" id="contact">
                <Contact/>
            </section>
            <section
                className="mx-auto lg:pl-[10rem] lg:pr-[10rem] p-10 bg-orange-500 dark:bg-orange-600 transition-all duration-700 h-auto lg:h-[16rem]">
                <Footer/>
            </section>
        </main>
    )
}

export default App
