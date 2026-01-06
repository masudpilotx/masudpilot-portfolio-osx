import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Folder, ExternalLink, LayoutGrid, List } from 'lucide-react';
import { clsx } from 'clsx';

export const ProjectsApp: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const projects = portfolioData?.projects || [];
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech || [])))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.tech?.includes(filter));

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#1c1c1c] text-gray-800 dark:text-gray-200 font-sans transition-colors">
      {/* Toolbar */}
      <div className="h-12 bg-white dark:bg-[#2c2c2c] border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 sticky top-0 z-10 transition-colors">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={clsx(
                        "px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                        filter === tag 
                            ? "bg-gray-200 dark:bg-white/20 text-gray-900 dark:text-white" 
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
                    )}
                >
                    {tag}
                </button>
            ))}
        </div>
        <div className="flex bg-gray-100 dark:bg-black/20 rounded-lg p-1 ml-4 shadow-inner">
            <button onClick={() => setView('grid')} className={clsx("p-1 rounded-md transition-colors", view === 'grid' ? "bg-white dark:bg-white/10 shadow-sm text-black dark:text-white" : "text-gray-500 dark:text-gray-400")}><LayoutGrid size={16} /></button>
            <button onClick={() => setView('list')} className={clsx("p-1 rounded-md transition-colors", view === 'list' ? "bg-white dark:bg-white/10 shadow-sm text-black dark:text-white" : "text-gray-500 dark:text-gray-400")}><List size={16} /></button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className={clsx(
            "gap-6",
            view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
        )}>
            {filteredProjects.map((project, idx) => (
                <div 
                    key={idx} 
                    className={clsx(
                        "bg-white dark:bg-[#252525] border text-left border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden flex group",
                        view === 'grid' ? "flex-col" : "flex-row items-center p-4 h-32"
                    )}
                >
                    {/* Project Icon/Preview - Placeholder for now using Folder icon */}
                    <div className={clsx(
                        "bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center transition-colors",
                        view === 'grid' ? "h-32 w-full" : "h-16 w-16 rounded-lg mr-6 flex-shrink-0"
                    )}>
                        {project.image ? (
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> 
                        ) : (
                           <Folder size={view === 'grid' ? 48 : 32} className="text-blue-400 dark:text-blue-500" />
                        )}
                    </div>

                    <div className={clsx("p-4 flex-1", view === 'list' && "p-0")}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white transition-colors">{project.title}</h3>
                            </div>
                        </div>
                        
                        <p className={clsx("text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 transition-colors", view === 'list' && "mb-2")}>
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-white/5 transition-colors">{t}</span>
                            ))}
                            {project.tech.length > 3 && <span className="text-xs text-gray-400 dark:text-gray-500">+{project.tech.length - 3}</span>}
                        </div>

                        <div className="flex space-x-3 mt-auto">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                    <ExternalLink size={12} className="mr-1" /> Visit Site
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
