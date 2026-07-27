import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceDetail from './components/ServiceDetail';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <SEO />
      <ScrollToTop />
      <ShaderBackground />
      <NavBar />

      <main className="pt-24 flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-12 sm:space-y-16 lg:space-y-20">
                <Hero />
                <Process />
                <Insights />
                <Testimonials />
              </div>
            }
          />
          <Route
            path="/services"
            element={
              <div className="space-y-stack-lg min-h-[70vh] pt-8">
                <Services />
              </div>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <div className="space-y-stack-lg min-h-[70vh] pt-8">
                <ServiceDetail />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="space-y-stack-lg min-h-[70vh] pt-8">
                <About />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="space-y-stack-lg min-h-[70vh] pt-8">
                <Contact />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="antialiased relative min-h-screen flex flex-col justify-between">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
