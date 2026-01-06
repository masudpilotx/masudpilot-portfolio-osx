import React from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowManager } from '../os/WindowManager';
// import { AnimatedBackground } from '../ui/AnimatedBackground';
import { ControlCenter } from '../os/ControlCenter';
import { useStore } from '../../store/useStore';
import { Spotlight } from '../os/Spotlight';

export const Desktop: React.FC = () => {
  const { system } = useStore();

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
      default: return 'none'; // 'animated' handles its own background
    }
  };

  return (
    <div 
        className="h-screen w-screen overflow-hidden relative select-none cursor-default bg-cover bg-center transition-all duration-700 bg-black"
        style={{ backgroundImage: getWallpaper() }}
    >
      {/* Brightness Overlay (Pointer events none allows clicking through) */}
      <div 
        className="fixed inset-0 z-[100] pointer-events-none bg-black transition-opacity duration-300"
        style={{ opacity: (100 - system.brightness) / 100 * 0.8 }} 
      />

      {/* {system.wallpaper === 'animated' && <AnimatedBackground />} */}
      
      <div className="relative z-10 h-full w-full">
        <MenuBar />
        
        {/* Desktop Welcome Text */}
        <div className="absolute top-24 left-8 z-0 pointer-events-none select-none">
            <p className="text-lg font-light text-white/80 dark:text-white/80 ml-1 tracking-wide font-sans">welcome to my</p>
            <h1 className="text-7xl font-serif italic text-white dark:text-white -mt-2 tracking-tight drop-shadow-lg">portfolio.</h1>
        </div>

        <WindowManager />
        <Dock />
        <ControlCenter />
        <Spotlight />
      </div>
    </div>
  );
};
