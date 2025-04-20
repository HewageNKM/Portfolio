import './App.css'
import Footer from './sections/Footer';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Stack from './sections/Stack';
const App = ()=>{
  return (
  <main className='h-screen font-serif flex flex-col justify-between p-5 xl:pt-10 xl:pb-4 xl:p-[20rem] w-full'>
    <Header />
    <Hero />
    <Stack />
    <Footer />
  </main>
  );
}

export default App;