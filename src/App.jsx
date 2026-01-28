import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Logos from './components/Logos';
import QueEs from './components/QueEs';
import Ejemplos from './components/Ejemplos';
import Beneficios from './components/Beneficios';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CalendlyModal from './components/CalendlyModal';
import VideoModal from './components/VideoModal';

function App() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  // Enforce Light Mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');

    // Auto-play video on first landing
    const timer = setTimeout(() => {
      setIsVideoOpen(true);
    }, 1000); // Small delay for smoother entrance

    return () => clearTimeout(timer);
  }, []);

  const openVideo = (e) => {
    if (e) e.preventDefault();
    setIsVideoOpen(true);
  };

  const openCalendly = (e) => {
    if (e) e.preventDefault();
    setIsCalendlyOpen(true);
  };

  return (
    <div className="bg-background-light text-text-main transition-colors duration-300 font-body relative">
      <Header onOpenModal={openCalendly} />
      <main>
        <Hero onOpenModal={openVideo} onOpenCalendly={openCalendly} />
        <Logos />
        <QueEs />
        <Ejemplos />
        <Beneficios />
        <FAQ />
      </main>
      <Footer onOpenModal={openCalendly} />

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}

export default App;
