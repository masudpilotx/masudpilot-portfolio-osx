import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Wifi, Bluetooth, Moon, Sun, Volume2, Maximize, Airplay, Aperture, Cast, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ControlCenter: React.FC = () => {
  const { system, toggleSystem, setSystemValue, setControlCenterOpen } = useStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const toggleBtn = document.getElementById('control-center-toggle');
        if (toggleBtn && toggleBtn.contains(event.target as Node)) return;
        setControlCenterOpen(false);
      }
    };

    if (system.controlCenterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [system.controlCenterOpen, setControlCenterOpen]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  };

  return (
    <AnimatePresence>
      {system.controlCenterOpen && (
        <motion.div 
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -20, x: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-9 right-4 w-80 bg-[#e3e3e3]/70 dark:bg-[#1e1e1e]/70 backdrop-blur-2xl rounded-2xl p-3 shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/20 z-[60] text-black dark:text-white"
        >
            <div className="grid grid-flow-row gap-3">
                {/* Top Section: Toggles */}
                 <div className="flex gap-3 h-[136px]">
                     {/* Connectivity Module */}
                     <div className="flex-1 bg-white/50 dark:bg-[#323232]/50 rounded-2xl p-3 flex flex-col justify-between shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
                         {/* Wifi */}
                         <div className="flex items-center gap-3 group cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg p-1 transition-colors">
                             <button
                                onClick={(e) => { e.stopPropagation(); toggleSystem('wifi'); }} 
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-sm ${system.wifi ? 'bg-[#007aff]' : 'bg-[#808080]'}`}
                             >
                                 <Wifi size={16} strokeWidth={2.5} />
                             </button>
                             <div className="flex flex-col">
                                 <span className="text-[13px] font-semibold leading-tight">Wi-Fi</span>
                                 <span className="text-[11px] opacity-60 leading-tight">{system.wifi ? 'Home_5G' : 'Off'}</span>
                             </div>
                         </div>
                         
                         {/* Bluetooth */}
                         <div className="flex items-center gap-3 group cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg p-1 transition-colors">
                             <button 
                                onClick={(e) => { e.stopPropagation(); toggleSystem('bluetooth'); }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-sm ${system.bluetooth ? 'bg-[#007aff]' : 'bg-[#808080]'}`}
                             >
                                 <Bluetooth size={16} strokeWidth={2.5} />
                             </button>
                             <div className="flex flex-col">
                                 <span className="text-[13px] font-semibold leading-tight">Bluetooth</span>
                                 <span className="text-[11px] opacity-60 leading-tight">{system.bluetooth ? 'On' : 'Off'}</span>
                             </div>
                         </div>

                          {/* Airdrop */}
                          <div className="flex items-center gap-3 group cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg p-1 transition-colors">
                             <button 
                                onClick={(e) => { e.stopPropagation(); toggleSystem('airdrop'); }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-sm ${system.airdrop ? 'bg-[#007aff]' : 'bg-[#808080]'}`}
                             >
                                 <Airplay size={16} strokeWidth={2.5} />
                             </button>
                             <div className="flex flex-col">
                                 <span className="text-[13px] font-semibold leading-tight">AirDrop</span>
                                 <span className="text-[11px] opacity-60 leading-tight">{system.airdrop ? 'Contacts Only' : 'Off'}</span>
                             </div>
                         </div>
                     </div>

                     {/* Other Toggles Module */}
                     <div className="flex-1 grid grid-cols-2 gap-3 h-full">
                         {/* Dark Mode */}
                         <div 
                             className={`bg-white/50 dark:bg-[#323232]/50 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-white/80 dark:hover:bg-[#323232]/80 shadow-[0_1px_5px_rgba(0,0,0,0.05)] active:scale-95 ${system.darkMode ? 'bg-white/60 dark:bg-[#323232]/80' : ''}`}
                             onClick={() => toggleSystem('darkMode')}
                         >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${system.darkMode ? 'bg-black text-white' : 'bg-[#e5e5e5] text-black'}`}>
                                {system.darkMode ? <Moon size={16} fill="currentColor" strokeWidth={0} /> : <Sun size={18} strokeWidth={2} />}
                            </div>
                            <span className="text-[11px] font-semibold">Dark Mode</span>
                         </div>
                         
                         {/* Fullscreen */}
                         <div 
                            className="bg-white/50 dark:bg-[#323232]/50 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-white/80 dark:hover:bg-[#323232]/80 shadow-[0_1px_5px_rgba(0,0,0,0.05)] active:scale-95"
                            onClick={toggleFullscreen}
                         >
                            <div className="w-8 h-8 rounded-full bg-[#e5e5e5] dark:bg-gray-600 text-black dark:text-white flex items-center justify-center">
                                <Maximize size={16} strokeWidth={2.5} />
                            </div>
                            <span className="text-[11px] font-semibold">Fullscreen</span>
                         </div>

                         {/* Wallpaper Cycle */}
                         <div 
                            className="bg-white/50 dark:bg-[#323232]/50 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-white/80 dark:hover:bg-[#323232]/80 col-span-2 shadow-[0_1px_5px_rgba(0,0,0,0.05)] active:scale-95"
                            onClick={() => {
                                const wallpapers: ('animated' | 'tahoe' | 'sonoma' | 'ventura' | 'monterey')[] = ['animated', 'tahoe', 'sonoma', 'ventura', 'monterey'];
                                const currentIndex = wallpapers.indexOf(system.wallpaper);
                                const nextIndex = (currentIndex + 1) % wallpapers.length;
                                useStore.getState().setWallpaper(wallpapers[nextIndex]);
                            }}
                         >
                             <div className="w-8 h-8 rounded-full bg-[#e5e5e5] dark:bg-gray-600 text-black dark:text-white flex items-center justify-center">
                                <LayoutTemplate size={16} strokeWidth={2.5} />
                             </div>
                             <span className="text-[11px] font-semibold">Wallpapers: <span className="capitalize opacity-70">{system.wallpaper}</span></span>
                         </div>
                     </div>
                 </div>

                 {/* Display & Sound */}
                 <div className="bg-white/50 dark:bg-[#323232]/50 rounded-2xl p-3 space-y-4 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
                     {/* Brightness */}
                     <div className="space-y-2">
                         <div className="flex items-center justify-between px-1">
                             <div className="text-[11px] font-semibold opacity-80 uppercase tracking-wide">Display</div>
                         </div>
                         <div className="relative h-7 bg-[#e5e5e5] dark:bg-black/40 rounded-full overflow-hidden flex items-center group cursor-ew-resize border border-black/5 dark:border-white/5">
                            <div 
                                className="absolute left-0 top-0 bottom-0 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.1)] transition-all duration-75"
                                style={{ width: `${system.brightness}%` }}
                            />
                            <div className="absolute left-2 z-10 pointer-events-none">
                                <Sun size={14} className="text-gray-500 dark:text-gray-400 fill-current opacity-80" />
                            </div>
                            <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={system.brightness}
                                onChange={(e) => setSystemValue('brightness', parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                         </div>
                     </div>

                      {/* Sound */}
                      <div className="space-y-2">
                         <div className="flex items-center justify-between px-1">
                             <div className="text-[11px] font-semibold opacity-80 uppercase tracking-wide">Sound</div>
                         </div>
                         <div className="relative h-7 bg-[#e5e5e5] dark:bg-black/40 rounded-full overflow-hidden flex items-center group cursor-ew-resize border border-black/5 dark:border-white/5">
                            <div 
                                className="absolute left-0 top-0 bottom-0 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.1)] transition-all duration-75"
                                style={{ width: `${system.volume}%` }}
                            />
                            <div className="absolute left-2 z-10 pointer-events-none">
                                <Volume2 size={14} className="text-gray-500 dark:text-gray-400 fill-current opacity-80" />
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={system.volume}
                                onChange={(e) => setSystemValue('volume', parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                         </div>
                     </div>
                 </div>

                 {/* Media Player (Mock) */}
                 <div className="bg-white/50 dark:bg-[#323232]/50 rounded-2xl p-3 flex items-center gap-3 shadow-[0_1px_5px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-white/60 dark:hover:bg-[#323232]/70 transition-colors">
                     <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-md">
                         <Aperture size={24} className="text-white" strokeWidth={2} />
                     </div>
                     <div className="flex flex-col justify-center gap-0.5">
                         <span className="text-[13px] font-bold leading-none">Apple Music</span>
                         <span className="text-[11px] opacity-60 leading-none">Not Playing</span>
                     </div>
                     <div className="flex-grow flex justify-end pr-2 opacity-50">
                        <Cast size={18} />
                     </div>
                 </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
