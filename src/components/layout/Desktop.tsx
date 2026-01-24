import React, { useState } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowManager } from '../os/WindowManager';
import { ControlCenter } from '../os/ControlCenter';
import { useStore } from '../../store/useStore';
import { Spotlight } from '../os/Spotlight';
import { X } from 'lucide-react';


// Desktop Icon Component - Clean macOS style
const DesktopIcon: React.FC<{ 
  icon: string; 
  label: string; 
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <div 
    className="flex flex-col items-center cursor-pointer group w-16"
    onClick={onClick}
    onDoubleClick={onClick}
  >
    <img 
      src={icon} 
      alt={label} 
      className="w-12 h-12 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-200 group-active:scale-95" 
    />
    <span className="text-[11px] text-white mt-1 text-center font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight">
      {label}
    </span>
  </div>
);

// macOS-style Confirmation Dialog
const ConfirmDialog: React.FC<{ 
  onConfirm: () => void; 
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
    {/* macOS Alert Window */}
    <div className="bg-white/95 dark:bg-[#323232]/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-[320px] overflow-hidden border border-white/20">
      {/* Window Header with Traffic Lights */}
      <div className="h-8 bg-gradient-to-b from-white/10 to-transparent flex items-center px-3 gap-2">
        <div className="flex gap-[6px]">
          <button onClick={onCancel} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 pb-6 pt-2 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
          <span className="text-3xl">⚠️</span>
        </div>
        
        {/* Title */}
        <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1">
          Are you sure about this?
        </h2>
        
        {/* Description */}
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
          I warned you... Once you click, there's no going back.
        </p>
        
        {/* Buttons - macOS Style */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-[13px] shadow-sm transition-all active:scale-[0.98]"
          >
            Yes, I'm brave! 💀
          </button>
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-[13px] transition-all active:scale-[0.98]"
          >
            Nevermind, take me back
          </button>
        </div>
      </div>
    </div>
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
  const [showConfirm, setShowConfirm] = useState(false);

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
      case 'tahoe': return system.darkMode ? 'url(/wallpapers/tahoe-dark.webp)' : 'url(/wallpapers/tahoe-light.webp)';
      case 'sonoma': return 'url(https://4kwallpapers.com/images/wallpapers/macos-sonoma-6016x3384-11457.jpg)';
      case 'ventura': return 'url(https://4kwallpapers.com/images/wallpapers/macos-ventura-5k-6016x3384-8841.jpg)';
      case 'monterey': return 'url(https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-purple-dark-mode-layers-5k-6016x3384-5898.jpg)';
      default: return 'none';
    }
  };

  const handleMysteryClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    setShowRickroll(true);
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

      {/* Confirmation Dialog */}
      {showConfirm && (
        <ConfirmDialog 
          onConfirm={handleConfirmYes} 
          onCancel={() => setShowConfirm(false)} 
        />
      )}

      {/* Rickroll Modal */}
      {showRickroll && <RickrollModal onClose={() => setShowRickroll(false)} />}
      
      <div className="relative z-10 h-full w-full">
        <MenuBar />
        
        {/* Desktop Welcome Text */}
        <div className="absolute top-16 left-4 sm:top-24 sm:left-8 z-0 pointer-events-none select-none">
            <p className="text-2xl sm:text-4xl text-white/90 tracking-wide drop-shadow-md" style={{ fontFamily: 'Caveat, cursive' }}>
              Welcome to my corner
            </p>
            <p className="text-2xl sm:text-4xl text-white/90 tracking-wide -mt-1 drop-shadow-md" style={{ fontFamily: 'Caveat, cursive' }}>
              on the internet :)
            </p>
        </div>



        {/* Desktop Icons - Positioned to the right, responsive */}
        <div className="absolute top-16 sm:top-24 md:top-32 right-4 sm:right-8 md:right-12 z-0 flex flex-col gap-4 sm:gap-6 items-center">
            <DesktopIcon 
              icon="/icons/mail.ico" 
              label="Contact" 
              onClick={() => openApp('contact')} 
            />
            <DesktopIcon 
              icon="/icons/github.ico" 
              label="GitHub" 
              onClick={() => window.open('https://github.com/masudpilotx', '_blank')} 
            />
            <DesktopIcon 
              icon="/icons/video-television.ico" 
              label="don't click 🙂" 
              onClick={handleMysteryClick} 
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
