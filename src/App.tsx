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

const App = ()=>{
  const [showSetting,setShowSetting] = useState(false)
  const [showMenu,setShowMenu] = useState(false)

  return (
  <main className='h-screen relative font-serif flex md:gap-5 gap-3 flex-col p-5 xl:pt-10 xl:pb-4 xl:p-[20rem] w-full'>
    <Header showSetting={setShowSetting}/>
    <Hero />
    <Stack />
    <Projects />
    <Message />
    <Footer />
    <AnimatePresence>
      {showSetting && (<Setting showSetting={setShowSetting}/>)}
    </AnimatePresence>
    <AnimatePresence>
      {showMenu && (<div></div>)}
    </AnimatePresence>
  </main>
  );
}

export default App;