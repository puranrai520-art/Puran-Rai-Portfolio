import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-indigo-500">{label}</label>}
      <input
        className={`flex h-12 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 animate-pulse">{error}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300 transition-colors group-focus-within:text-indigo-500">{label}</label>}
      <textarea
        className={`flex min-h-[120px] w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm resize-none hover:border-indigo-300 dark:hover:border-indigo-700 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 animate-pulse">{error}</p>}
    </div>
  );
};