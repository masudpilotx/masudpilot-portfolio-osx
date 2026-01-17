import React, { useState, useEffect } from 'react';
import { AlertTriangle, FileWarning, ShieldAlert, Skull, XCircle } from 'lucide-react';

interface VirusFile {
  id: number;
  name: string;
  size: string;
  progress: number;
  status: 'downloading' | 'installing' | 'completed' | 'critical';
  speed: string;
}

const VIRUS_NAMES = [
  "TROJAN_HORSE_GENERIC.exe",
  "WannaCry_Ransomware_v2.0.zip",
  "System32_Deleter.bat",
  "Steal_All_Passwords.js",
  "CryptoMiner_Hidden.exe",
  "Keylogger_Pro_Cracked.rar",
  "DarkWeb_Access_Tool.MSI",
  "FBI_Backdoor_Installer.exe",
  "Not_A_Virus_Trust_Me.pdf.exe",
  "MEMZ_V2.0_Destructive.trojan",
  "Bank_Account_Drainer.script",
  "Webcam_Rat_Server.jar"
];

export const DownloadsApp: React.FC = () => {
  const [files, setFiles] = useState<VirusFile[]>([]);
  const [criticalAlert, setCriticalAlert] = useState(false);

  // Simulate adding new downloads
  useEffect(() => {
    const interval = setInterval(() => {
      if (files.length < 15) {
        const newFile: VirusFile = {
            id: Date.now(),
            name: VIRUS_NAMES[Math.floor(Math.random() * VIRUS_NAMES.length)],
            size: (Math.random() * 50 + 1).toFixed(1) + " MB",
            progress: 0,
            status: 'downloading',
            speed: (Math.random() * 10 + 2).toFixed(1) + " MB/s"
        };
        setFiles(prev => [newFile, ...prev]);
        
        // Trigger alert randomly
        if (Math.random() > 0.7) {
            setCriticalAlert(true);
            setTimeout(() => setCriticalAlert(false), 2000);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [files.length]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.status === 'completed') return file;
        
        const newProgress = file.progress + Math.random() * 10;
        if (newProgress >= 100) {
          return { ...file, progress: 100, status: 'completed', speed: 'Done' };
        }
        return { ...file, progress: newProgress };
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`h-full flex flex-col ${criticalAlert ? 'bg-red-900/20' : 'bg-[#f5f5f7] dark:bg-[#1c1c1e]'} transition-colors duration-100 p-4 overflow-hidden relative`}>
      {/* Scary Overlay */}
      {criticalAlert && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 bg-red-500/10 backdrop-blur-sm animate-pulse">
            <div className="bg-red-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 text-2xl font-bold border-4 border-white/20">
                <Skull size={40} className="animate-bounce" />
                CRITICAL SECURITY ALERT
                <AlertTriangle size={40} className="animate-bounce" />
            </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">↓</span>
            </div>
            Downloads
        </h1>
        <span className="text-sm font-medium text-red-500 animate-pulse">
            {files.filter(f => f.status !== 'completed').length} Active Threats
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {files.map((file) => (
          <div key={file.id} className="bg-white dark:bg-[#2c2c2e] p-3 rounded-lg shadow-sm border border-red-200 dark:border-red-900/30">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {file.status === 'completed' ? (
                    <Skull className="text-red-500" size={24} />
                ) : (
                    <FileWarning className="text-orange-500" size={24} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 h-6">
                  <h3 className="text-sm font-medium text-red-600 dark:text-red-400 truncate pr-2 font-mono">
                    {file.name}
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <XCircle size={14} />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                  <div 
                    className={`h-full transition-all duration-300 ${
                        file.status === 'completed' ? 'bg-red-600' : 'bg-orange-500'
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <span>{file.size}</span>
                  <span className={file.status === 'completed' ? 'text-red-600 font-bold' : ''}>
                    {file.status === 'completed' ? 'VIRUS INSTALLED' : `${file.speed} - ${(100 - file.progress).toFixed(0)}s`}
                  </span>
                </div>
              </div>
            </div>
            {/* Warning Message */}
            {file.progress > 50 && file.status !== 'completed' && (
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-red-500 font-bold uppercase tracking-wide">
                    <ShieldAlert size={10} />
                    <span>Defender Failed to block</span>
                </div>
            )}
          </div>
        ))}

        {files.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
                Initializing Botnet Connection...
            </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-white/10 text-[10px] text-center text-gray-400">
        System integrity: <span className="text-red-500 font-bold">COMPROMISED</span>
      </div>
    </div>
  );
};
