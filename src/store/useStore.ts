import { create } from 'zustand';

export type AppId = 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'settings' | 'safari';

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
}

const defaultWindows: Record<AppId, WindowState> = {
  about: {
    id: 'about',
    title: 'About Me',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 50, y: 50 },
    size: { width: 800, height: 600 },
    zIndex: 1,
  },
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
};

export const useStore = create<PortfolioStore>((set) => ({
  windows: defaultWindows,
  activeAppId: 'about',
  maxZIndex: 1,

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
             // Update origin ONLY if provided (e.g. fresh open), otherwise keep existing if re-opening? 
             // Actually always update it so if window moves to dock then back, it knows where to go.
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
      // If closing active app, set active to null or find next highest zIndex?
      activeAppId: state.activeAppId === id ? null : state.activeAppId,
    })),

  minimizeApp: (id) =>
    set((state) => ({
        activeAppId: state.activeAppId === id ? null : state.activeAppId, // Deactivate on minimize
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
      if (state.activeAppId === id) return {}; // No change needed
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
}));
