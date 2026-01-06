import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useStore, AppId } from '../../store/useStore';
import { clsx } from 'clsx';

interface WindowProps {
  id: AppId;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, children }) => {
  const { windows, closeApp, minimizeApp, toggleMaximizeApp, focusApp, updateWindowPosition } = useStore();
  const state = windows[id];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!state.isOpen) return null;

  const isMaximized = state.isMaximized || isMobile;

  const handleFocus = () => {
    focusApp(id);
  };

  // Determine animation start state
  const initial = isMaximized ? { 
    opacity: 0, scale: 0.95, x: 0, y: 0 
  } : state.origin ? {
    // If we have an origin, start from there (Scale from Dock effect)
    opacity: 0,
    scale: 0,
    x: state.origin.left,
    y: state.origin.top,
    width: state.origin.width,
    height: state.origin.height,
  } : { 
    // Default fade in if no origin
    opacity: 0, scale: 0.9, x: state.position.x, y: state.position.y 
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={initial}
      animate={{ 
        opacity: state.isMinimized ? 0 : 1, 
        scale: state.isMinimized ? 0 : 1,
        // When minimized, go back to origin if possible, else just fade out
        x: state.isMinimized && state.origin ? state.origin.left : (isMaximized ? 0 : state.position.x),
        y: state.isMinimized && state.origin ? state.origin.top : (isMaximized ? 0 : state.position.y),
        width: state.isMinimized && state.origin ? state.origin.width : (isMaximized ? '100%' : state.size.width),
        height: state.isMinimized && state.origin ? state.origin.height : (isMaximized ? 'calc(100% - 30px)' : state.size.height),
        top: isMaximized ? 30 : 0,
        filter: "blur(0px)" 
      }}
      transition={{ 
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8 // Slightly heavier for that solid macOS feel
      }}
      onDragEnd={(_, info) => {
        if (!isMaximized) {
            updateWindowPosition(id, { x: state.position.x + info.offset.x, y: state.position.y + info.offset.y });
        }
      }}
      onPointerDown={handleFocus}
      style={{ zIndex: state.zIndex }}
      className={clsx(
        "absolute flex flex-col overflow-hidden", // Base positioning
        !isMaximized && "rounded-xl border border-white/20 shadow-2xl bg-white/80 backdrop-blur-xl", // Standard window style
        isMaximized && "rounded-none border-none bottom-0 bg-white/95" // Maximized style
      )}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-gradient-to-b from-white/50 to-white/20 border-b border-black/5 flex items-center px-4 space-x-4 cursor-default select-none flex-shrink-0"
        onDoubleClick={() => toggleMaximizeApp(id)}
      >
        <div className="flex space-x-2 group">
          <button 
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            className="w-3 h-3 rounded-full bg-red-500 border border-red-600 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600 flex items-center justify-center hover:bg-yellow-600 transition-colors"
          >
             <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(id); }}
            className={clsx(
                "w-3 h-3 rounded-full bg-green-500 border border-green-600 flex items-center justify-center hover:bg-green-600 transition-colors",
                isMobile && "opacity-50 cursor-not-allowed"
            )}
            disabled={isMobile}
          >
             <Maximize2 size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex-1 text-center font-medium text-sm text-gray-700">
            {state.title}
        </div>
        <div className="w-14"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-white/50">
        {children}
      </div>
    </motion.div>
  );
};
