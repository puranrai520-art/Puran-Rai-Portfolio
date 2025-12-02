import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Github, ExternalLink, Trash2, Edit2, X, FolderGit2, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';
import { Project } from '../types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Student Management System',
    description: 'A Python-based GUI application to manage student records effectively using Tkinter and MySQL. Features include attendance tracking, grade management, and reporting tools.',
    techStack: ['Python', 'Tkinter', 'MySQL'],
    repoLink: 'https://github.com',
    demoLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'A modern, interactive portfolio website built with React, Tailwind CSS, and Framer Motion to showcase my skills and projects with style.',
    techStack: ['React', 'Tailwind', 'Framer Motion'],
    repoLink: 'https://github.com',
    demoLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=800&q=80'
  }
];

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', description: '', techStack: [], repoLink: '', demoLink: '', imageUrl: ''
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('puran_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('puran_projects', JSON.stringify(INITIAL_PROJECTS));
    }
  }, []);

  const saveToLocalStorage = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('puran_projects', JSON.stringify(newProjects));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const filtered = projects.filter(p => p.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setTechStackInput(project.techStack.join(', '));
    setErrors({});
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', techStack: [], repoLink: '', demoLink: '', imageUrl: '' });
    setTechStackInput('');
    setErrors({});
    setIsModalOpen(true);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = 'Project title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!techStackInput.trim()) newErrors.techStack = 'Please list at least one technology';
    
    // Validate URLs if provided
    if (formData.repoLink && !isValidUrl(formData.repoLink)) newErrors.repoLink = 'Invalid URL format';
    if (formData.demoLink && !isValidUrl(formData.demoLink)) newErrors.demoLink = 'Invalid URL format';
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) newErrors.imageUrl = 'Invalid URL format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const stack = techStackInput.split(',').map(s => s.trim()).filter(s => s !== '');
    
    if (editingProject) {
      const updated = projects.map(p => p.id === editingProject.id ? { ...p, ...formData, techStack: stack } as Project : p);
      saveToLocalStorage(updated);
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title || 'Untitled',
        description: formData.description || '',
        techStack: stack,
        repoLink: formData.repoLink || '',
        demoLink: formData.demoLink || '',
        imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=800&q=80`
      };
      saveToLocalStorage([...projects, newProject]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (field: keyof Project, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Featured Projects</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full md:mx-0 mx-auto"></div>
          </div>
          <Button onClick={handleAddNew} className="shadow-lg shadow-blue-500/20 group">
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" /> Add New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 flex flex-col h-full"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/40 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img 
                    src={project.imageUrl || 'https://via.placeholder.com/800x600'} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <button onClick={() => handleEdit(project)} className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-md"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-slate-700 dark:text-slate-300 hover:text-red-600 shadow-md"><Trash2 size={16} /></button>
                  </div>
                </div>
                
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <FolderGit2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Project</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs font-semibold bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-emerald-300 rounded-full border border-slate-200 dark:border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <a href={project.repoLink} target="_blank" rel="noreferrer" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Button>
                    </a>
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex-1">
                      <Button size="sm" className="w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200">
                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modern Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white dark:bg-slate-950 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {editingProject ? 'Edit Project' : 'Create New Project'}
                     </h3>
                     <p className="text-slate-500 dark:text-slate-400 text-sm">Fill in the details below to showcase your work.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                     <X size={20} />
                   </button>
                </div>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input 
                    label="Project Title" 
                    value={formData.title} 
                    onChange={e => handleInputChange('title', e.target.value)} 
                    required 
                    placeholder="e.g. E-Commerce Dashboard"
                    error={errors.title}
                  />
                  <Textarea 
                    label="Description" 
                    value={formData.description} 
                    onChange={e => handleInputChange('description', e.target.value)} 
                    required 
                    placeholder="Describe the key features, challenges faced, and tech stack used..."
                    error={errors.description}
                  />
                  
                  <div>
                    <div className={`bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex gap-3 items-start ${errors.techStack ? 'ring-2 ring-red-500' : ''}`}>
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                          <Input 
                            label="Tech Stack" 
                            placeholder="React, Node.js, MongoDB (comma separated)"
                            value={techStackInput} 
                            onChange={e => {
                              setTechStackInput(e.target.value);
                              if (errors.techStack) setErrors({ ...errors, techStack: '' });
                            }} 
                            className="bg-transparent border-none px-0 h-auto focus:ring-0 placeholder:text-blue-300"
                          />
                          <p className="text-xs text-blue-600/70 dark:text-blue-300/70 mt-1">Separate technologies with commas.</p>
                      </div>
                    </div>
                    {errors.techStack && <p className="text-xs text-red-500 mt-1 animate-pulse">{errors.techStack}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Repository URL" 
                      value={formData.repoLink} 
                      onChange={e => handleInputChange('repoLink', e.target.value)} 
                      placeholder="https://github.com/..."
                      error={errors.repoLink}
                    />
                    <Input 
                      label="Live Demo URL" 
                      value={formData.demoLink} 
                      onChange={e => handleInputChange('demoLink', e.target.value)} 
                      placeholder="https://..."
                      error={errors.demoLink}
                    />
                  </div>
                  <Input 
                    label="Cover Image URL" 
                    placeholder="https://unsplash.com/..."
                    value={formData.imageUrl} 
                    onChange={e => handleInputChange('imageUrl', e.target.value)} 
                    error={errors.imageUrl}
                  />
                  
                  <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingProject ? 'Save Changes' : 'Publish Project'}</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};