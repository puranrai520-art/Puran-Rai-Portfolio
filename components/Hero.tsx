import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, Github, Linkedin, Mail, Terminal, Code2 } from 'lucide-react';

const useTypewriter = (words: string[], speed = 150, delay = 1500) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), delay);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(words[index].substring(0, subIndex));
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : speed, parseInt(String(Math.random() * 50))));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay]);

  return text;
};

export const Hero: React.FC = () => {
  const words = ["Python Developer", "Java Enthusiast", "Web Developer", "React Specialist", "Problem Solver"];
  const typingText = useTypewriter(words);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // Logic to handle user image with fallback
  const [imgSrc, setImgSrc] = useState("./puranh.jpg");
  const fallbackImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80";

  // Canvas for Particles
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track mouse position relative to window
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // Only add listener if motion is allowed
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
        // Randomize colors between blue, purple, and emerald
        const colors = ['rgba(37, 99, 235,', 'rgba(147, 51, 234,', 'rgba(16, 185, 129,'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouse: { x: number; y: number }, w: number, h: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (!prefersReducedMotion) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;
            this.x -= forceDirectionX * force * 2; 
            this.y -= forceDirectionY * force * 2;
          }
        }

        if (this.x > w) this.x = 0;
        if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0;
        if (this.y < 0) this.y = h;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      const numberOfParticles = prefersReducedMotion ? 20 : Math.min(80, (w * h) / 15000); 
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(mouseRef.current, canvas.width, canvas.height);
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-12 relative overflow-hidden">
      
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Modern Gradient Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Text Content */}
        <motion.div 
          style={{ y: y1 }}
          className="col-span-1 lg:col-span-7 text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-wide text-emerald-600 dark:text-emerald-400 uppercase bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-full border border-emerald-100 dark:border-emerald-800/50 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Available for Opportunities
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]"
          >
            Hi, I'm <br />
            {/* New Professional Gradient */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 animate-gradient-x">
              Puran Rai
            </span>
          </motion.h1>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="h-10 mb-8 flex items-center justify-center lg:justify-start"
          >
             <Terminal className="mr-3 text-emerald-500" size={28} />
             <span className="text-2xl sm:text-3xl font-medium text-slate-700 dark:text-slate-200 font-mono">
               {typingText}
               <span className="inline-block w-0.5 h-8 ml-1 bg-emerald-500 animate-pulse align-middle"></span>
             </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed font-light"
          >
            A third-year <span className="font-semibold text-slate-900 dark:text-white">BCA Student</span> engineering clean, efficient solutions. I blend <span className="font-semibold text-blue-500">Python</span> logic with <span className="font-semibold text-purple-500">React</span> creativity to solve real-world problems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="rounded-full w-full sm:w-auto shadow-blue-500/25">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="rounded-full w-full sm:w-auto">
              Contact Me
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex items-center gap-6"
          >
             <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1"><Github className="h-6 w-6"/></a>
             <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all transform hover:scale-110 hover:-translate-y-1"><Linkedin className="h-6 w-6"/></a>
             <a href="mailto:puran@example.com" className="text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all transform hover:scale-110 hover:-translate-y-1"><Mail className="h-6 w-6"/></a>
          </motion.div>
        </motion.div>

        {/* Image/Avatar Area */}
        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
          className="col-span-1 lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          {/* Glass Card Container for Image */}
          <div className="relative group perspective-1000 w-full max-w-md">
             {/* Neon Glow Behind */}
             <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-500 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
             
             {/* The Card Itself */}
             <div className="relative aspect-[3/4] bg-white/10 dark:bg-slate-900/40 backdrop-blur-sm rounded-[2rem] border border-white/20 dark:border-white/10 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                
                {/* 1. Color Grading Overlay (Blue/Purple/Emerald Tint) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-emerald-500/10 mix-blend-overlay pointer-events-none"></div>

                {/* 2. Vignette */}
                <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40 pointer-events-none"></div>

                {/* 3. Noise texture */}
                <div className="absolute inset-0 z-10 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

                {/* The Image */}
                <img 
                  src={imgSrc} 
                  onError={() => setImgSrc(fallbackImage)}
                  alt="Portrait of Puran Rai" 
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter contrast-[1.05] saturate-[1.1] brightness-[1.05]"
                />
                
                {/* 4. Soft edge blending */}
                <div className="absolute inset-0 z-20 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] rounded-[2rem] pointer-events-none"></div>
             </div>

             {/* Floating Info Card */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute bottom-8 -left-8 right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700 flex items-center gap-4 z-20 max-w-[280px]"
             >
               <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl text-white shadow-lg">
                 <Code2 className="h-6 w-6" />
               </div>
               <div>
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Current Focus</p>
                 <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Mastering DSA & Fullstack</p>
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};