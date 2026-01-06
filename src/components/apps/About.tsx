import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Github, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';

export const AboutApp: React.FC = () => {
  const { bio } = portfolioData;

  return (
    <div className="flex flex-col md:flex-row h-full text-gray-800">
      {/* Sidebar / Profile Card */}
      <div className="md:w-1/3 bg-gray-50/50 backdrop-blur-sm border-r border-gray-200 p-6 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white">
          <img 
            src={bio.avatar} 
            alt={bio.name} 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Masud&background=random'; }}
          />
        </div>
        <h2 className="text-2xl font-bold">{bio.name}</h2>
        <p className="text-gray-500 font-medium mb-2">{bio.headline}</p>
        
        <div className="flex items-center text-gray-400 text-sm mb-6">
          <MapPin size={14} className="mr-1" />
          Remote / Global
        </div>

        <div className="flex space-x-4 mt-auto md:mt-4">
          <a href={bio.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:text-blue-500 transition-colors"><Github size={20} /></a>
          <a href={bio.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
          <a href={bio.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
          <a href={bio.social.email} className="p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors"><Mail size={20} /></a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-white">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Biography</h3>
        <p className="leading-relaxed text-gray-600 mb-6 font-sans">
          {bio.description}
        </p>

        <h3 className="text-xl font-bold mb-4 border-b pb-2">Current Focus</h3>
        <p className="leading-relaxed text-gray-600 font-sans">
          I am currently focused on guiding technical strategies for AI-driven platforms and contributing to the Web3 ecosystem. 
          My passion lies in building scalable, user-centric solutions that leverage the latest advancements in AI and blockchain technology.
        </p>
      </div>
    </div>
  );
};
