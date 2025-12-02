import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Textarea } from './ui/Input';
import { Button } from './ui/Button';
import { Send, CheckCircle, Mail, MapPin, Copy, Check } from 'lucide-react';
import { ContactMessage } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('puran@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString()
      };

      const existingMessages = JSON.parse(localStorage.getItem('puran_messages') || '[]');
      localStorage.setItem('puran_messages', JSON.stringify([...existingMessages, newMessage]));

      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Let's work together.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-md">
              I'm currently available for freelance work and internships. If you have a project that needs some creative touch, I'd love to hear about it.
            </p>

            <div className="space-y-6">
              <div className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={handleCopyEmail}>
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">puran@example.com</p>
                    <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-500 transition-colors">
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-5 p-4">
                 <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-2xl text-pink-600 dark:text-pink-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Location</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">Kanpur, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative blob behind form */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[2rem] opacity-20 blur-xl"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <Input 
                    name="name" 
                    label="Name" 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Input 
                    name="email" 
                    type="email" 
                    label="Email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Textarea 
                    name="message" 
                    label="Message" 
                    placeholder="Tell me about your project..." 
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />
                </div>
                
                <Button type="submit" className="w-full rounded-xl" size="lg" isLoading={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-2xl border border-slate-800 dark:border-slate-200"
          >
            <div className="bg-green-500 rounded-full p-1">
               <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">Success!</p>
              <p className="text-xs opacity-90">Your message has been sent successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};