import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ChevronDown, ChevronUp, Calendar, MapPin, Award } from 'lucide-react';

export const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `I am Puran Rai, a third-year Bachelor of Computer Applications (BCA) student at Dr. Virendra Swarup College of Management Studies. My interest in computers started early. I completed both my high school and intermediate education at Heritage International School, where I studied in the commerce stream with Computer Science.

From class 9th to 12th, I studied Python consistently, and that experience sparked a deep fascination with coding, software development, and logical problem-solving.

Choosing BCA was a deliberate decision because I wanted to dive deeper into programming, technology, and building real projects. Throughout college, I’ve been focusing on improving my programming fundamentals, learning full-stack web development, and exploring Java, Python, and DSA.

I enjoy creating small meaningful projects, learning new technologies, and bringing ideas to life through clean and functional code. My goal is to enhance my web development and DSA skills, secure internships, and gain real industry experience that will help me grow as a developer and prepare for future startup ambitions.`;

  const shortText = fullText.split('\n\n').slice(0, 1).join('\n\n') + '...';

  const timelineEvents = [
    { title: "BCA (3rd Year)", location: "Dr. Virendra Swarup College", year: "Present", type: "college" },
    { title: "Intermediate", location: "Heritage International School", year: "Commerce + CS", type: "school" },
    { title: "High School", location: "Heritage International School", year: "Completed", type: "school" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">About Me</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Biography */}
            <div className="md:col-span-7 lg:col-span-8 space-y-8">
              <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Award className="w-24 h-24 rotate-12" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-indigo-500 rounded-full"></span> 
                  My Journey
                </h3>
                
                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  <motion.div
                    key={isExpanded ? 'expanded' : 'collapsed'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? fullText : shortText}
                  </motion.div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-0 hover:px-4 transition-all"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronUp className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Read More <ChevronDown className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              </div>

              {/* Fun Fact Chip */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-2xl">
                 <span className="text-xl">💡</span>
                 <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                   Fun Fact: I chose BCA deliberately to specialize in practical coding over theory!
                 </p>
              </div>
            </div>

            {/* Timeline Sidebar */}
            <div className="md:col-span-5 lg:col-span-4 pl-0 md:pl-6 border-l border-slate-200 dark:border-slate-800 md:border-l-0">
               <div className="sticky top-32">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                      <Calendar className="w-4 h-4" />
                    </span>
                    Timeline
                  </h3>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:hidden md:before:block">
                    {timelineEvents.map((event, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className="relative pl-8 md:pl-0"
                      >
                        <div className="md:flex items-center justify-between group">
                           {/* Mobile Line */}
                           <div className="absolute left-0 top-1 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:hidden"></div>
                           <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-950 md:hidden"></div>

                           <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all w-full">
                              <span className="inline-block px-2.5 py-1 mb-2 text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                                {event.year}
                              </span>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg">{event.title}</h4>
                              <div className="flex items-start text-sm text-slate-500 dark:text-slate-400 mt-2">
                                <MapPin className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0 text-slate-400" /> 
                                {event.location}
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};