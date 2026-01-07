import React, { useState } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowManager } from '../os/WindowManager';
// import { AnimatedBackground } from '../ui/AnimatedBackground';
import { ControlCenter } from '../os/ControlCenter';
import { useStore } from '../../store/useStore';
import { Spotlight } from '../os/Spotlight';
import { X } from 'lucide-react';

// Desktop Icon Component
const DesktopIcon: React.FC<{ 
  icon: string; 
  label: string; 
  onClick: () => void;
  className?: string;
}> = ({ icon, label, onClick, className = '' }) => (
  <div 
    className={`flex flex-col items-center cursor-pointer group w-20 ${className}`}
    onClick={onClick}
    onDoubleClick={onClick}
  >
    <img 
      src={icon} 
      alt={label} 
      className="w-14 h-14 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-200 group-active:scale-95" 
    />
    <span className="text-[11px] text-white mt-1.5 text-center font-medium drop-shadow-md px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-sm max-w-full truncate">
      {label}
    </span>
  </div>
);

// Rickroll Modal
const RickrollModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center animate-in fade-in duration-300">
    <div className="relative w-full max-w-4xl aspect-video">
      <button 
        onClick={onClose}
        className="absolute -top-10 right-0 text-white hover:text-red-400 transition-colors"
      >
        <X size={32} />
      </button>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        className="w-full h-full rounded-xl shadow-2xl"
        title="Never Gonna Give You Up"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <p className="text-center text-white/60 mt-4 text-sm">You've been rickrolled! 🎵</p>
    </div>
  </div>
);

export const Desktop: React.FC = () => {
  const { system, openApp } = useStore();
  const [showRickroll, setShowRickroll] = useState(false);

  // Handle Dark Mode Class
  React.useEffect(() => {
    if (system.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [system.darkMode]);

  const getWallpaper = () => {
    switch (system.wallpaper) {
      case 'tahoe': return system.darkMode ? 'url(/wallpapers/tahoe-dark.png)' : 'url(/wallpapers/tahoe-light.png)';
      case 'sonoma': return 'url(https://4kwallpapers.com/images/wallpapers/macos-sonoma-6016x3384-11457.jpg)';
      case 'ventura': return 'url(https://4kwallpapers.com/images/wallpapers/macos-ventura-5k-6016x3384-8841.jpg)';
      case 'monterey': return 'url(https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-purple-dark-mode-layers-5k-6016x3384-5898.jpg)';
      default: return 'none';
    }
  };

  return (
    <div 
        className="h-screen w-screen overflow-hidden relative select-none cursor-default bg-cover bg-center transition-all duration-700 bg-black"
        style={{ backgroundImage: getWallpaper() }}
    >
      {/* Brightness Overlay */}
      <div 
        className="fixed inset-0 z-[100] pointer-events-none bg-black transition-opacity duration-300"
        style={{ opacity: (100 - system.brightness) / 100 * 0.8 }} 
      />

      {/* Rickroll Modal */}
      {showRickroll && <RickrollModal onClose={() => setShowRickroll(false)} />}
      
      <div className="relative z-10 h-full w-full">
        <MenuBar />
        
        {/* Desktop Welcome Text */}
        <div className="absolute top-24 left-8 z-0 pointer-events-none select-none">
            <p className="text-lg font-light text-white/80 dark:text-white/80 ml-1 tracking-wide font-sans">welcome to my</p>
            <h1 className="text-7xl font-serif italic text-white dark:text-white -mt-2 tracking-tight drop-shadow-lg">portfolio.</h1>
        </div>

        {/* Desktop Icons - Right Side */}
        <div className="absolute top-12 right-6 z-0 flex flex-col gap-3 items-center">
          <DesktopIcon 
            icon="/icons/finder.ico" 
            label="About Me" 
            onClick={() => openApp('about')} 
          />
          <DesktopIcon 
            icon="/icons/contacts.png" 
            label="Contact" 
            onClick={() => openApp('contact')} 
          />
          <DesktopIcon 
            icon="/icons/github.ico" 
            label="GitHub" 
            onClick={() => window.open('https://github.com/masudpilot', '_blank')} 
          />
          <DesktopIcon 
            icon="https://cdn-icons-png.flaticon.com/512/1182/1182684.png" 
            label="don't click me 🙂" 
            onClick={() => setShowRickroll(true)} 
            className="mt-4 opacity-80 hover:opacity-100"
          />
        </div>

        <WindowManager />
        <Dock />
        <ControlCenter />
        <Spotlight />
      </div>
    </div>
  );
};
