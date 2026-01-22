import React, { useState, useRef, useEffect } from 'react';
import { useTime } from '../../hooks/useTime';
import { useStore } from '../../store/useStore';
import { Search } from 'lucide-react';

// Apple Menu Dropdown Component
const AppleMenu: React.FC<{ onClose: () => void; onAbout: () => void }> = ({ onClose, onAbout }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const MenuItem: React.FC<{ label: string; shortcut?: string; onClick?: () => void; disabled?: boolean; danger?: boolean }> = 
    ({ label, shortcut, onClick, disabled, danger }) => (
    <button
      onClick={disabled ? undefined : onClick}
      className={`w-full px-3 py-1 text-left text-[13px] flex items-center justify-between rounded-[4px] mx-1 
        ${disabled 
          ? 'text-gray-400 dark:text-gray-500 cursor-default' 
          : danger 
            ? 'text-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white' 
            : 'text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white'
        } transition-colors`}
      style={{ width: 'calc(100% - 8px)' }}
    >
      <span>{label}</span>
      {shortcut && <span className="text-gray-400 text-[11px]">{shortcut}</span>}
    </button>
  );

  const Divider = () => <div className="h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2" />;

  return (
    <div 
      ref={menuRef}
      className="absolute top-8 left-2 w-64 bg-white/95 dark:bg-[#2c2c2e]/95 backdrop-blur-2xl rounded-lg shadow-2xl border border-gray-200/50 dark:border-white/10 py-1 z-[200] animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <MenuItem label="About This Mac" onClick={() => { onAbout(); onClose(); }} />
      <Divider />
      <MenuItem label="System Settings..." shortcut="⌘ ," onClick={onClose} />
      <MenuItem label="App Store..." disabled />
      <Divider />
      <MenuItem label="Recent Items" disabled />
      <Divider />
      <MenuItem label="Force Quit Finder" shortcut="⌥⌘ Esc" disabled />
      <Divider />
      <MenuItem label="Sleep" onClick={() => { alert('Sleep mode'); onClose(); }} />
      <MenuItem label="Restart..." onClick={() => { window.location.reload(); }} />
      <MenuItem label="Shut Down..." onClick={() => { 
        document.body.innerHTML = '<div style="background:#000;height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;color:#666;font-family:system-ui;">Shut Down</div>';
      }} />
      <Divider />
      <MenuItem label="Lock Screen" shortcut="⌃⌘ Q" onClick={onClose} />
      <MenuItem label="Log Out Masud..." shortcut="⇧⌘ Q" onClick={() => { window.location.reload(); }} />
    </div>
  );
};

export const MenuBar: React.FC = () => {
  const { formattedTime } = useTime();
  const { system, setControlCenterOpen, setSpotlightOpen, openApp } = useStore();
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);

  const handleAbout = () => {
    openApp('about');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[30px] bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 z-50 text-white shadow-sm select-none">
      <div className="flex items-center space-x-4 text-sm font-medium">
        <button 
            className={`hover:bg-white/10 p-1 rounded transition-colors ${appleMenuOpen ? 'bg-white/20' : ''}`}
            onClick={() => setAppleMenuOpen(!appleMenuOpen)}
        >
            {/* Apple Logo */}
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.881 8.5c-.02-2 1.653-3 1.727-3-.94-1.4-2.404-1.6-2.925-1.6-1.246-.2-2.432.7-3.064.7-.63 0-1.606-.7-2.64-.7-1.358 0-2.61.8-3.31 2C.26 8.4 1.31 12 2.684 14c.673.9 1.474 2 2.526 2 1.013 0 1.396-.7 2.621-.7s1.57.7 2.642.7c1.09 0 1.781-1 2.448-2 .771-1.1 1.089-2.2 1.108-2.3-.024 0-2.126-.8-2.147-3.2zM9.866 2.6c.559-.7.936-1.7.833-2.6-.804 0-1.78.5-2.357 1.2-.517.6-.97 1.6-.85 2.5.899.1 1.815-.5 2.374-1.1z" />
            </svg>
        </button>

        {/* Apple Menu Dropdown */}
        {appleMenuOpen && <AppleMenu onClose={() => setAppleMenuOpen(false)} onAbout={handleAbout} />}

        <span className="font-bold hidden sm:block">Finder</span>
        
        {/* Menu Items */}
        <div className="hidden md:flex space-x-4 font-normal text-white/90">
             {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
                 <button key={item} className="hover:text-white transition-colors cursor-default">{item}</button>
             ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm z-50">
        <div className="flex items-center space-x-5 opacity-90">
            {/* Battery */}
            <svg width="24" height="24" viewBox="0 0 24 24" className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(1,5)" fill="white">
                     <path fillRule="evenodd" d="m2.5215 5c-0.28865 0-0.52148 0.24253-0.52148 0.54492v4.9102c0 0.30239 0.23284 0.54492 0.52148 0.54492h4.4473l0.25-1h-1.7188c-0.79859-1.712e-4 -1.2749-0.89013-0.83203-1.5547l2.2969-3.4453h-4.4434zm7.5098 0-0.25 1h1.7188c0.79859 1.713e-4 1.2749 0.89013 0.83203 1.5547l-2.2969 3.4453h4.4434c0.28865 0 0.52148-0.24253 0.52148-0.54492v-4.9102c0-0.30239-0.23284-0.54492-0.52148-0.54492h-4.4473z" className="fill-green-400" />
                    <path d="m2 3c-1.108 0-2 0.892-2 2v6c0 1.108 0.892 2 2 2h13c1.108 0 2-0.892 2-2v-6c0-1.108-0.892-2-2-2zm0 1h13c0.554 0 1 0.446 1 1v6c0 0.554-0.446 1-1 1h-13c-0.554 0-1-0.446-1-1v-6c0-0.554 0.446-1 1-1z" className="fill-white opacity-40" />
                    <path d="m18 6v4a2 2 0 0 0 2-2 2 2 0 0 0-2-2z" className="fill-white opacity-40" />
                </g>
                <path d="m8.834 9-3.334 5h3l-0.75 3h0.41602l3.334-5h-3l0.75-3z" transform="translate(1,0)" className="fill-white" />
            </svg>

            {/* Wifi */}
            <svg width="22" height="22" viewBox="0 0 16 16" className="w-[18px] h-[18px] fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="m 7.9997738,2.5974136 c -3.0209991,0 -5.8744581,1.3332678 -7.82888539,3.6583298 -0.25960384,0.30878 -0.21870885,0.769328 0.0905674,1.028905 0.13683446,0.114927 0.30310611,0.170742 0.46916891,0.170742 0.2084413,0 0.41511118,-0.0879 0.55973638,-0.259824 1.6753731,-1.9933813 4.1208775,-3.1371963 6.7094127,-3.1371963 2.5885352,0 5.0340652,1.1442857 6.7094122,3.1371963 0.144651,0.171919 0.351269,0.259824 0.559737,0.259824 0.166089,0 0.333819,-0.05532 0.470654,-0.170742 0.308779,-0.259133 0.348685,-0.720622 0.08908,-1.028905 C 13.874728,3.9306814 11.020773,2.5974136 7.9997738,2.5974136 Z m 0,3.0941398 c -2.1580059,0 -4.1956292,0.952804 -5.5914248,2.613092 -0.2595776,0.30878 -0.2201935,0.769328 0.089083,1.028906 0.1368345,0.114926 0.3030799,0.170742 0.4691689,0.170742 0.2084412,0 0.4155818,-0.08791 0.5597364,-0.259825 1.1167409,-1.329078 2.7478947,-2.091959 4.4734367,-2.091959 1.7255424,0 3.356199,0.762881 4.473437,2.091959 0.144651,0.172416 0.351791,0.259825 0.559736,0.259825 0.166088,0 0.332308,-0.05532 0.469168,-0.170742 0.309251,-0.259578 0.348634,-0.720597 0.08908-1.028906 -1.396318,-1.660261 -3.433419-2.613092 -5.591424-2.613092 z m 0,3.214401 c -1.2954832,0 -2.5187558,0.570413 -3.3554487,1.5663704 -0.2596039,0.30878 -0.2187089,0.769328 0.090567,1.028905 0.1368345,0.114927 0.30308,0.172227 0.4691689,0.172227 0.2084413,0 0.4155817-0.08939 0.5597364-0.26131 0.5586319-0.664799 1.3734534-1.045236 2.235976-1.045236 0.8625228,0 1.6773704,0.380437 2.2359756,1.045236 0.144652,0.172416 0.351766,0.26131 0.559737,0.26131 0.166089,0 0.332334-0.0568 0.469169-0.172227 0.309276-0.259604 0.350145-0.720152 0.09057-1.028905 C 10.518506,9.4763674 9.2952334,8.9059544 7.9997764,8.9059544 Z M 7.9374158,11.679396 C 7.3660439,11.733836 6.8165131,12.161224 6.7971572,12.797384 6.7971572,13.461581 7.3355982,14 7.9997738,14 8.6639494,14 9.2023902,13.461581 9.2023902,12.797384 9.1007513,11.943462 8.5087875,11.624955 7.9374161,11.679396 Z" />
            </svg>

            {/* Search */}
            <button 
                onClick={() => setSpotlightOpen(!system.spotlightOpen)}
                className={`hover:bg-white/10 p-1 rounded transition-colors ${system.spotlightOpen ? 'bg-white/20' : ''}`}
            >
                <Search className="w-4 h-4 text-white" strokeWidth={3} />
            </button>

            {/* Control Center */}
            <button 
                id="control-center-toggle"
                onClick={() => setControlCenterOpen(!system.controlCenterOpen)}
                className={`rounded hover:bg-white/10 transition-colors ${system.controlCenterOpen ? 'bg-white/20' : ''}`}
            >
                <svg viewBox="0 0 29 29" className="w-[18px] h-[18px] fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z" />
                </svg>
            </button>
        </div>
        <span className="font-medium min-w-[80px] text-right text-xs">{formattedTime}</span>
      </div>
    </header>
  );
};
