import './App.css'
import Footer from './sections/Footer';
import Header from './sections/Header';
const App = ()=>{
  return (
  <main className='h-screen flex flex-col pt-10 pb-10 p-[20rem] w-full'>
    <Header />
    <Footer />
  </main>
  );
}

export default App;