import React from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowManager } from '../os/WindowManager';
// import { AnimatedBackground } from '../ui/AnimatedBackground';
import { ControlCenter } from '../os/ControlCenter';
import { useStore } from '../../store/useStore';

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
        <WindowManager />
        <Dock />
        <ControlCenter />
      </div>
    </div>
  );
};
