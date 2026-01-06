import React, { useState } from 'react';
import { useTime } from '../../hooks/useTime';

export const MenuBar: React.FC = () => {
  const { formattedTime } = useTime();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 h-[30px] bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 z-50 text-white shadow-sm select-none">
      <div className="flex items-center space-x-4 text-sm font-medium">
        <button 
            className="hover:bg-white/10 p-1 rounded transition-colors"
            onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
        >
            <img src="/icons/symbolic/apple.svg" alt="Apple" className="w-4 h-4 invert" />
        </button>
        <span className="font-bold hidden sm:block">Finder</span>
        
        {/* Simplified Menu Items for visual aesthetic */}
        <div className="hidden md:flex space-x-4 font-normal text-white/90">
             {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
                 <button key={item} className="hover:text-white transition-colors cursor-default">{item}</button>
             ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-3 opacity-90">
            <img src="/icons/symbolic/battery.svg" alt="Battery" className="w-5 h-5 invert" />
            <img src="/icons/symbolic/wifi.svg" alt="WiFi" className="w-4 h-4 invert" />
            <img src="/icons/symbolic/search.svg" alt="Search" className="w-4 h-4 invert hidden sm:block" />
            <img src="/icons/symbolic/control-center.svg" alt="Control Center" className="w-4 h-4 invert hidden sm:block" />
        </div>
        <span className="font-medium min-w-[80px] text-right text-xs">{formattedTime}</span>
      </div>
    </header>
  );
};
