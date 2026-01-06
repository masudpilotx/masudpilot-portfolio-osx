import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppId = 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'settings' | 'safari' | 'vscode' | 'terminal';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  origin?: DOMRect; // Source rect for animation
}

interface PortfolioStore {
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  maxZIndex: number;

  openApp: (id: AppId, origin?: DOMRect) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updateWindowPosition: (id: AppId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: AppId, size: { width: number; height: number }) => void;
  
  // System State
  system: {
    wifi: boolean;
    bluetooth: boolean;
    airdrop: boolean;
    darkMode: boolean;
    brightness: number;
    volume: number;
    controlCenterOpen: boolean;
    spotlightOpen: boolean;
    wallpaper: 'animated' | 'tahoe' | 'sonoma' | 'ventura' | 'monterey';
  };
  toggleSystem: (key: keyof PortfolioStore['system']) => void;
  setSystemValue: (key: 'brightness' | 'volume', value: number) => void;
  setControlCenterOpen: (isOpen: boolean) => void;
  setSpotlightOpen: (isOpen: boolean) => void;
  setWallpaper: (wallpaper: PortfolioStore['system']['wallpaper']) => void;
}

const defaultWindows: Record<AppId, WindowState> = {
  about: {
    id: 'about',
    title: 'About Me',
    isOpen: true, // Open About by default
    isMinimized: false,
    isMaximized: false,
    position: { x: 50, y: 50 },
    size: { width: 800, height: 600 },
    zIndex: 1,
  },
  // ... other windows (restored in memory or assumed unchanged by this partial replace if I'm careful, wait, replacing large chunk safe?)
  // Actually, I should just target the system object initialization to change default if possible, or the interface.
  // The tool replaces contiguous blocks. Use safely.
  // This replacement is for the Interface definition.

  projects: {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 100 },
    size: { width: 900, height: 700 }, // Wider for grid
    zIndex: 1,
  },
  experience: {
    id: 'experience',
    title: 'Experience',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 150 },
    size: { width: 700, height: 600 },
    zIndex: 1,
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 200 },
    size: { width: 600, height: 500 },
    zIndex: 1,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 250, y: 250 },
    size: { width: 500, height: 500 },
    zIndex: 1,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 300 },
    size: { width: 400, height: 400 },
    zIndex: 1,
  },
  safari: {
    id: 'safari',
    title: 'Safari',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 80, y: 60 },
    size: { width: 1024, height: 700 }, 
    zIndex: 1,
  },
  vscode: {
    id: 'vscode',
    title: 'Visual Studio Code',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 80 },
    size: { width: 1100, height: 750 }, 
    zIndex: 1,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 150 },
    size: { width: 600, height: 400 },
    zIndex: 1,
  },
};

export const useStore = create<PortfolioStore>()(
  persist(
    (set) => ({
  windows: defaultWindows,
  activeAppId: 'about',
  maxZIndex: 1,
  
  system: {
      wifi: true,
      bluetooth: true,
      airdrop: true,
      darkMode: false,
      brightness: 100,
      volume: 75,
      controlCenterOpen: false,
      spotlightOpen: false,
      wallpaper: 'tahoe'
  },

  openApp: (id, origin) =>
    set((state) => {
      const newZIndex = state.maxZIndex + 1;
      
      return {
        activeAppId: id,
        maxZIndex: newZIndex,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: newZIndex,
             origin: origin || state.windows[id].origin, 
          },
        },
      };
    }),

  closeApp: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false },
      },
      activeAppId: state.activeAppId === id ? null : state.activeAppId,
    })),

  minimizeApp: (id) =>
    set((state) => ({
        activeAppId: state.activeAppId === id ? null : state.activeAppId, 
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: true },
        },
    })),

  toggleMaximizeApp: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),

  focusApp: (id) =>
    set((state) => {
      if (state.activeAppId === id) return {}; 
      const newZIndex = state.maxZIndex + 1;
      return {
        activeAppId: id,
        maxZIndex: newZIndex,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZIndex, isMinimized: false },
        },
      };
    }),

  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], size },
      },
    })),
    
  toggleSystem: (key) => set((state) => ({
      system: { ...state.system, [key]: !state.system[key] }
  })),
  
  setSystemValue: (key, value) => set((state) => ({
      system: { ...state.system, [key]: value }
  })),

  setControlCenterOpen: (isOpen) => set((state) => ({
      system: { ...state.system, controlCenterOpen: isOpen }
  })),

  setSpotlightOpen: (isOpen) => set((state) => ({
      system: { ...state.system, spotlightOpen: isOpen }
  })),

  setWallpaper: (wallpaper) => set((state) => ({
      system: { ...state.system, wallpaper }
  })),
}),
    {
      name: 'portfolio-settings',
      partialize: (state) => ({ 
        system: {
          darkMode: state.system.darkMode,
          wallpaper: state.system.wallpaper,
          brightness: state.system.brightness,
          volume: state.system.volume,
        }
      }),
    }
  )
);
