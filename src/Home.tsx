import { AnimatePresence } from 'framer-motion';
import './App.css'
import Footer from './sections/Footer';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Message from './sections/Message';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import { useState } from 'react';
import { Setting } from './components/Setting';
import { Menu } from './components/Menu';


const Home = () => {
  const [showSetting, setShowSetting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main className="dark:bg-black relative flex md:gap-5 gap-3 flex-col p-5 pb-2 xl:pt-10 xl:p-[20rem] xl:pb-0.5 w-full">
      <Header showMenu={setShowMenu} showSetting={setShowSetting} />
      <Hero />
      <Stack />
      <Projects />
      <Message />
      <Footer />
      <AnimatePresence>
        {showSetting && <Setting showSetting={setShowSetting} />}
      </AnimatePresence>
      <AnimatePresence>
        {showMenu && <Menu showMenu={setShowMenu} />}
      </AnimatePresence>
    </main>
  );
};

export default Home;
