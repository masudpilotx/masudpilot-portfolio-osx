import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Building2, Calendar } from 'lucide-react';

export const ExperienceApp: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 dark:bg-[#1c1c1c] p-6 overflow-auto custom-scrollbar transition-colors">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Work Experience</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-700 bg-slate-300 dark:bg-slate-800 group-[.is-active]:bg-blue-500 dark:group-[.is-active]:bg-blue-600 text-slate-500 dark:text-slate-400 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
                <Building2 size={18} />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[#252525] p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{exp.role}</h3>
                    <time className="text-xs font-medium text-indigo-500 dark:text-indigo-400 flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        <Calendar size={12} className="mr-1" />
                        {exp.period}
                    </time>
                </div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">{exp.company}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-snug">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
