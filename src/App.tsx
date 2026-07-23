import { useState, useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';

function getInitialPage(): string {
  const hash = window.location.hash.replace('#', '');
  if (['home', 'services', 'about', 'contact'].includes(hash)) {
    return hash;
  }
  return 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="antialiased relative min-h-screen flex flex-col justify-between">
      <ShaderBackground />
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="pt-24 flex-1">
        {currentPage === 'home' && (
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            <Hero />
            <Process />
            <Insights onNavigate={handleNavigate} />
            <Testimonials />
          </div>
        )}

        {currentPage === 'services' && (
          <div className="space-y-stack-lg min-h-[70vh] pt-8">
            <Services onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="space-y-stack-lg min-h-[70vh] pt-8">
            <About />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="space-y-stack-lg min-h-[70vh] pt-8">
            <Contact onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
