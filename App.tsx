import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-300 overflow-x-hidden font-sans antialiased selection:bg-blue-500/30 selection:text-blue-900">
      {/* Global Modern Background System */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-[#0B1120]">
        {/* Subtle Grid Pattern */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Ambient "Aurora" Gradient Orbs - Blue, Purple, Emerald */}
        <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-blue-900/20 to-transparent blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[500px] w-full bg-gradient-to-t from-emerald-900/10 to-transparent blur-3xl transform translate-y-1/2"></div>
        
        {/* Floating Light Accents */}
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[60%] left-[5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      </div>

      <Navbar />
      <div className="relative z-10 flex flex-col gap-12 sm:gap-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

export default App;