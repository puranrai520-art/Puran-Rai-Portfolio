export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoLink: string;
  demoLink: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  years: string;
  description: string;
  category: 'Language' | 'Frontend' | 'Tools';
}

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
