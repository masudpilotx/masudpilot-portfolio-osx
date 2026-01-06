import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Cpu, Globe, Wrench } from 'lucide-react';

const SkillSection: React.FC<{ title: string; skills: string[]; icon: any }> = ({ title, skills, icon: Icon }) => (
    <div className="bg-white dark:bg-[#252525] rounded-xl shadow-sm border border-gray-100 dark:border-white/5 p-6 flex flex-col transition-colors">
        <div className="flex items-center mb-4 text-blue-600 dark:text-blue-400">
            <Icon className="mr-2" size={20} />
            <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
                <div key={skill} className="bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-700/50 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-default">
                    {skill}
                </div>
            ))}
        </div>
    </div>
);

export const SkillsApp: React.FC = () => {
    return (
        <div className="h-full bg-gray-50 dark:bg-[#1c1c1c] p-6 overflow-auto custom-scrollbar transition-colors">
             <div className="max-w-4xl mx-auto space-y-6">
                <header className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Technical Skills</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">A breakdown of my technical stack and tools.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(portfolioData.skills).map(([category, skills]) => (
                        <SkillSection 
                            key={category} 
                            title={category} 
                            skills={skills} 
                            icon={
                                category.includes("AI") ? Cpu : 
                                category.includes("Frontend") ? Globe : 
                                Wrench
                            } 
                        />
                    ))}
                </div>
             </div>
        </div>
    );
};
