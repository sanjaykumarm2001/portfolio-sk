import ShaderBackground from './components/ShaderBackground';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Services from './components/Services';
import Observability from './components/Observability';
import Process from './components/Process';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="antialiased relative min-h-screen">
      <div className="fixed inset-0 z-[-1] opacity-40">
        <ShaderBackground />
      </div>
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Observability />
        <Process />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
