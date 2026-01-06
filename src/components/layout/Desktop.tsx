import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowManager } from '../os/WindowManager';

interface DesktopProps {
  children?: React.ReactNode;
}

export const Desktop: React.FC<DesktopProps> = () => {
    // Placeholder for background image style
    const bgStyle = {
        backgroundImage: "url('/wallpapers/tahoe-light.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

  return (
    <div className="h-screen w-screen overflow-hidden relative flex flex-col" style={bgStyle}>
      <MenuBar />
      
      {/* Desktop Area - Windows render here */}
      <main className="flex-1 relative z-0">
          <WindowManager />
      </main>

      <Dock />
    </div>
  );
};
