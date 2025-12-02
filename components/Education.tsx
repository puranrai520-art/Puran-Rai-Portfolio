import React from 'react';
import { motion } from 'framer-motion';
import { EducationItem } from '../types';
import { GraduationCap } from 'lucide-react';

export const Education: React.FC = () => {
  const educationData: EducationItem[] = [
    {
      institution: "Dr. Virendra Swarup College of Management Studies",
      degree: "Bachelor of Computer Applications (BCA)",
      year: "3rd Year (Present)",
      description: "Focusing on Full-stack development, Java, Python, and DSA."
    },
    {
      institution: "Heritage International School",
      degree: "Intermediate",
      year: "Completed",
      description: "Commerce stream with Computer Science. Sparked interest in coding."
    },
    {
      institution: "Heritage International School",
      degree: "High School",
      year: "Completed",
      description: "Foundation studies."
    }
  ];

  return (
    <section id="education" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-row-reverse`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-900 flex items-center justify-center z-10 shadow-lg">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>

                {/* Content Card */}
                <div className={`w-full sm:w-[calc(50%-2rem)] ml-12 sm:ml-0 ${index % 2 === 0 ? 'sm:mr-auto sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8 sm:text-left'}`}>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wide text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                      {edu.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</h3>
                    <h4 className="text-md text-slate-700 dark:text-slate-300 font-medium mb-2">{edu.institution}</h4>
                    {edu.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">{edu.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
