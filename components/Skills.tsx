import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import { Terminal, Code, Layout, GitBranch, Globe, Cpu } from 'lucide-react';

export const Skills: React.FC = () => {
  const skills: (Skill & { icon: React.ReactNode, color: string })[] = [
    { name: "Python", level: 90, years: "4+ Years", description: "Scripting, Automation, DSA", category: "Language", icon: <Terminal className="w-6 h-6" />, color: "from-blue-500 to-emerald-400" },
    { name: "Java", level: 75, years: "2 Years", description: "OOPs, Enterprise Logic", category: "Language", icon: <Code className="w-6 h-6" />, color: "from-orange-500 to-red-500" },
    { name: "React.js", level: 75, years: "1 Year", description: "Modern Web Apps, Hooks", category: "Frontend", icon: <Cpu className="w-6 h-6" />, color: "from-cyan-400 to-blue-500" },
    { name: "HTML/CSS", level: 85, years: "3 Years", description: "Responsive layouts, Tailwind", category: "Frontend", icon: <Layout className="w-6 h-6" />, color: "from-pink-500 to-purple-500" },
    { name: "JavaScript", level: 80, years: "2 Years", description: "ES6+, Async, DOM", category: "Frontend", icon: <Globe className="w-6 h-6" />, color: "from-yellow-400 to-orange-500" },
    { name: "Git & GitHub", level: 85, years: "3 Years", description: "CI/CD, Version Control", category: "Tools", icon: <GitBranch className="w-6 h-6" />, color: "from-slate-500 to-slate-900 dark:from-slate-400 dark:to-slate-600" },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Technical Arsenal</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive look at the languages and tools I use to build digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              {/* Gradient Border Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Corner Blob */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${skill.color} opacity-10 rounded-bl-[100px] transition-transform group-hover:scale-110`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                  {skill.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{skill.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">{skill.category}</p>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {skill.description}
                </p>
              </div>

              <div className="relative z-10 space-y-2">
                 <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wide">
                    <span className="text-slate-500 dark:text-slate-400">{skill.years}</span>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${skill.color}`}>{skill.level}% Proficiency</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};