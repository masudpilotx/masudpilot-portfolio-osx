import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, RotateCw, Plus, Shield, 
  Lock, Share, BookOpen, Grid
} from 'lucide-react';

const Favorites = [
  { name: 'GitHub', url: 'https://github.com/masudpilot', icon: 'github', color: 'bg-black' },
  { name: 'Portfolio', url: 'masudpilot.info', icon: 'layout', color: 'bg-blue-500' },
  { name: 'LinkedIn', url: 'linkedin.com', icon: 'linkedin', color: 'bg-blue-700' },
  { name: 'Twitter', url: 'twitter.com', icon: 'twitter', color: 'bg-sky-500' },
];

export const SafariApp: React.FC = () => {
  const [url, setUrl] = useState('masudpilot.info');
  const [loading, setLoading] = useState(false);

  // Mock refresh handler
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white text-slate-800">
      {/* Safari Toolbar */}
      <div className="h-12 bg-[#f3f4f6] border-b border-gray-200 flex items-center px-4 space-x-4 select-none shrink-0">
        
        {/* Navigation Controls */}
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="text-gray-400 p-1 rounded-md cursor-default">
            <ArrowLeft size={18} />
          </button>
          <button className="text-gray-400 p-1 rounded-md cursor-default">
            <ArrowRight size={18} />
          </button>
          <button className="hover:text-gray-800 transition-colors p-1 rounded-md active:bg-gray-200">
            <BookOpen size={16} />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex justify-center">
            <div className="bg-white/80 hover:bg-white border border-gray-300/50 shadow-sm rounded-lg h-8 w-full max-w-2xl flex items-center px-3 text-xs transition-all focus-within:ring-2 focus-within:ring-blue-500/30 group relative">
                <Shield size={10} className="text-gray-400 mr-2 group-hover:text-gray-600 shrink-0" />
                
                {/* Centered Lock & Input Wrapper */}
                <div className="flex-1 flex items-center justify-center relative">
                    <Lock size={8} className="text-gray-500 mr-1 shrink-0" />
                    <input 
                        className="w-full bg-transparent border-none outline-none text-center font-medium text-gray-700 placeholder-transparent selection:bg-blue-200"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        readOnly // Make non-functional
                    />
                </div>

                <RotateCw 
                    size={12} 
                    className={`text-gray-400 cursor-pointer hover:text-gray-800 transition-transform ml-2 shrink-0 ${loading ? 'animate-spin' : ''}`} 
                    onClick={handleRefresh}
                />
            </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 text-gray-500">
          <button className="hover:text-gray-800 transition-colors">
            <Share size={16} />
          </button>
          <button className="hover:text-gray-800 transition-colors">
            <Grid size={16} />
          </button>
          <button className="hover:text-gray-800 transition-colors">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Bookmark Bar */}
      <div className="h-7 bg-[#fbfbfd] border-b border-gray-200 flex items-center px-4 space-x-4 text-xs font-medium text-gray-500 overflow-hidden shrink-0">
        {Favorites.map(fav => (
            <div key={fav.name} className="flex items-center hover:bg-gray-200/50 px-2 py-0.5 rounded cursor-pointer transition-colors">
                <span className="mr-1">★</span> {fav.name}
            </div>
        ))}
      </div>

      {/* Content Area - Static Favorites Grid */}
      <div className="flex-1 bg-[#fbfbfd] overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-16 px-8 flex flex-col items-center">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-300 text-center tracking-tight">Favorites</h1>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                {Favorites.map((fav) => (
                    <div key={fav.name} className="flex flex-col items-center group cursor-pointer hover:opacity-80 transition-opacity">
                        <div className={`w-16 h-16 ${fav.color} rounded-2xl shadow-lg mb-3 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform duration-200`}>
                            {fav.name[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{fav.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-20 w-full border-t border-gray-200 pt-8">
                <h2 className="text-sm font-semibold text-gray-400 mb-4 px-2">Privacy Report</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
                    <Shield size={32} className="text-slate-400" />
                    <div>
                        <p className="text-sm text-gray-800 font-medium">In the last 7 days, Safari has prevented 42 trackers from profiling you.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
