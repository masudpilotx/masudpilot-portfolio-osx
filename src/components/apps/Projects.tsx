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
    <div className="flex flex-col h-full bg-gray-50 text-gray-800 font-sans">
      {/* Toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={clsx(
                        "px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                        filter === tag ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100"
                    )}
                >
                    {tag}
                </button>
            ))}
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 ml-4 shadow-inner">
            <button onClick={() => setView('grid')} className={clsx("p-1 rounded-md", view === 'grid' && "bg-white shadow-sm")}><LayoutGrid size={16} /></button>
            <button onClick={() => setView('list')} className={clsx("p-1 rounded-md", view === 'list' && "bg-white shadow-sm")}><List size={16} /></button>
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
                        "bg-white border text-left border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl overflow-hidden flex",
                        view === 'grid' ? "flex-col" : "flex-row items-center p-4 h-32"
                    )}
                >
                    {/* Project Icon/Preview - Placeholder for now using Folder icon */}
                    <div className={clsx(
                        "bg-blue-50 flex items-center justify-center",
                        view === 'grid' ? "h-32 w-full" : "h-16 w-16 rounded-lg mr-6 flex-shrink-0"
                    )}>
                        {project.image ? (
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> 
                        ) : (
                           <Folder size={view === 'grid' ? 48 : 32} className="text-blue-400" />
                        )}
                    </div>

                    <div className={clsx("p-4 flex-1", view === 'list' && "p-0")}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                            </div>
                        </div>
                        
                        <p className={clsx("text-sm text-gray-600 mb-4 line-clamp-2", view === 'list' && "mb-2")}>
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">{t}</span>
                            ))}
                            {project.tech.length > 3 && <span className="text-xs text-gray-400">+{project.tech.length - 3}</span>}
                        </div>

                        <div className="flex space-x-3 mt-auto">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-blue-600 hover:underline">
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
