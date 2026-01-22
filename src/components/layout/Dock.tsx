import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStore, AppId } from '../../store/useStore';

interface DockItemProps {
  id: AppId;
  icon: string;
  label: string;
  isOpen: boolean;
  mouseX: any;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ id, icon: Icon, label, isOpen, mouseX, onClick }) => {
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = document.getElementById(`dock-item-${id}`)?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Responsive sizes: smaller on mobile to fit all icons without scrolling
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  // Mobile: ~13 items. Try baseSize 25px + 4px gap = 29px/item * 13 = ~377px (too wide for 360px?)
  // Let's try baseSize 24px + 2px gap (mx-[1px])? No user wants spacing.
  // Let's try baseSize 23px + 4px gap (mx-0.5) => 27 * 13 = 351px. Fits 360px tight.
  // User asked for "bigger" and "spaced".
  // Let's go with baseSize 25 and tight margins, or 24 and wider margins.
  // 24px + mx-0.5 (4px gap) = 28px * 12 items + divider = ~340-350px. Safe.
  const baseSize = isMobile ? 24 : 45;
  const hoverSize = isMobile ? 35 : 90;
  const widthSync = useTransform(distance, [-150, 0, 150], [baseSize, hoverSize, baseSize]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 350, damping: 20 });

  return (
    <motion.div
      id={`dock-item-${id}`}
      style={{ width }}
      className="aspect-square flex flex-col items-center justify-end relative group cursor-pointer mb-1 mx-0.5 sm:mx-1"
      onClick={onClick}
    >
        {/* No background container - pure icon float */}
        <motion.img 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            src={Icon} 
            alt={label} 
            className="w-full h-full object-contain drop-shadow-lg transition-all active:brightness-75 active:scale-95" // Enhanced interactions
        />
        
        {/* Label Tooltip */}
        <span className="absolute -top-14 bg-gray-900/50 backdrop-blur-md border border-white/10 text-white/90 text-[12px] font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            {label}
        </span>

      {/* Open Indicator */}
      {isOpen && (
        <div className="absolute -bottom-1 w-1 h-1 bg-white/80 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
      )}
    </motion.div>
  );
};

export const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const { windows, openApp } = useStore();

  const apps: { id: AppId; icon: string; label: string }[] = [
    { id: 'about', icon: '/icons/finder.ico', label: 'Finder' },
    { id: 'safari', icon: '/icons/safari.ico', label: 'Safari' },
    { id: 'vscode', icon: '/icons/vscode.ico', label: 'VS Code' },
    { id: 'terminal', icon: 'https://sahilsingh.tech/logo/terminal.png', label: 'Terminal' },
    { id: 'projects', icon: '/icons/projects.ico', label: 'Projects' },
    { id: 'experience', icon: '/icons/anythingllm.ico', label: 'Experience' },
    { id: 'skills', icon: '/icons/typora.png', label: 'Skills' },
    { id: 'contact', icon: '/icons/mail.ico', label: 'Contact' },
    { id: 'games', icon: '/icons/games.png', label: 'Games' },
    { id: 'settings', icon: '/icons/settings.ico', label: 'Settings' },
  ];

  const handleAppClick = (id: AppId) => {
    // Capture the origin rect of the icon for animation
    const iconElement = document.getElementById(`dock-item-${id}`);
    const origin = iconElement?.getBoundingClientRect();

    const appState = windows[id];
    if (appState.isOpen) {
        if (appState.isMinimized) {
            openApp(id, origin); // Restore from minimized
        } else {
            openApp(id, origin);
        }
    } else {
        openApp(id, origin);
    }
  };

  return (
    <div 
      className="fixed bottom-6 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-full sm:max-w-fit flex justify-center"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {/* Dock container with relative positioning */}
      <div className="relative w-auto">
        {/* Background layer - scales with content */}
        <div className="absolute bottom-0 left-0 right-0 h-[45px] sm:h-[65px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl" />
        
        {/* Icons container - centered, no scroll */}
        <div className="relative flex items-end px-2 sm:px-3 pb-2 sm:pb-2 w-auto justify-center">
          {apps.map((app) => (
            <DockItem
                key={app.id}
                {...app}
                isOpen={windows[app.id].isOpen}
                mouseX={mouseX}
                onClick={() => handleAppClick(app.id)}
            />
          ))}

          {/* Separator */}
          <div className="h-6 sm:h-10 w-[1px] bg-white/20 mx-1 sm:mx-2 mb-2 sm:mb-2 self-end flex-shrink-0" />

          {/* Placeholder Folders (Downloads, Trash) */}
          <DockItem
              id={'downloads' as any}
              icon="/icons/folder.svg"
              label="Downloads"
              isOpen={windows['downloads']?.isOpen || false}
              mouseX={mouseX}
              onClick={() => handleAppClick('downloads')}
          />
          <DockItem
              id={'trash' as any}
              icon="/icons/trash.svg"
              label="Trash"
              isOpen={false}
              mouseX={mouseX}
              onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
