import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
              Puran Rai
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()}. Crafted with <span className="text-red-500">♥</span> using React & Tailwind.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
           <a 
             href="https://github.com" 
             target="_blank" 
             rel="noreferrer" 
             className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
             aria-label="GitHub"
           >
             <Github className="h-5 w-5" />
           </a>
           <a 
             href="https://linkedin.com" 
             target="_blank" 
             rel="noreferrer" 
             className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
             aria-label="LinkedIn"
           >
             <Linkedin className="h-5 w-5" />
           </a>
           <a 
             href="mailto:puran@example.com" 
             className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
             aria-label="Email"
           >
             <Mail className="h-5 w-5" />
           </a>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={scrollToTop}
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
};