import React, { useState } from 'react';
import { FileCode, FileJson, Folder, FolderOpen, Search, GitBranch, Settings, X, ChevronRight, ChevronDown, Monitor, Layout, Globe } from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

const fileSystem: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
        {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
                {
                    id: 'apps',
                    name: 'apps',
                    type: 'folder',
                    children: [
                        { id: 'VSCode.tsx', name: 'VSCode.tsx', type: 'file', language: 'typescript', content: `// You are looking at this file right now!\n\nimport React, { useState } from 'react';\nimport { FileCode, Folder, FolderOpen } from 'lucide-react';\n\n// Recursive File Tree Component...` },
                        { id: 'Safari.tsx', name: 'Safari.tsx', type: 'file', language: 'typescript', content: `import { useState } from 'react';\n\nexport const SafariApp = () => {\n  // Browser implementation\n};` },
                    ]
                },
                {
                    id: 'layout',
                    name: 'layout',
                    type: 'folder',
                    children: [
                        { id: 'MenuBar.tsx', name: 'MenuBar.tsx', type: 'file', language: 'typescript', content: `import React, { useState } from 'react';\nimport { useTime } from '../../hooks/useTime';\n\nexport const MenuBar: React.FC = () => {\n  const { formattedTime } = useTime();\n  // ...\n};` },
                        { id: 'Dock.tsx', name: 'Dock.tsx', type: 'file', language: 'typescript', content: `import React from 'react';\nimport { motion } from 'framer-motion';\nimport { useStore } from '../../store/useStore';\n\nexport const Dock = () => {\n  // Magnification logic\n};` },
                    ]
                },
                {
                    id: 'os',
                    name: 'os',
                    type: 'folder',
                    children: [
                        { id: 'WindowManager.tsx', name: 'WindowManager.tsx', type: 'file', language: 'typescript', content: `import { useStore } from '../../store/useStore';\nimport { Window } from './Window';\n\nexport const WindowManager = () => {\n  const { windows } = useStore();\n  // Render mapped windows\n};` },
                    ]
                }
            ]
        },
        {
            id: 'store',
            name: 'store',
            type: 'folder',
            children: [
                { id: 'useStore.ts', name: 'useStore.ts', type: 'file', language: 'typescript', content: `import { create } from 'zustand';\n\nexport type AppId = 'about' | 'projects' | 'vscode' ...;\n\nexport const useStore = create((set) => ({\n  windows: defaultWindows,\n  openApp: (id) => set(...),\n}));` },
            ]
        },
        { id: 'App.tsx', name: 'App.tsx', type: 'file', language: 'typescript', content: `import { Desktop } from './components/layout/Desktop';\n\nfunction App() {\n  return (\n    <Desktop />\n  );\n}\n\nexport default App;` },
        { id: 'main.tsx', name: 'main.tsx', type: 'file', language: 'typescript', content: `import ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <App />\n);` },
    ]
  },
  { id: 'package.json', name: 'package.json', type: 'file', language: 'json', content: `{\n  "name": "macos-portfolio",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "framer-motion": "^10.12.4",\n    "zustand": "^4.3.8"\n  }\n}` },
  { id: 'readme.md', name: 'README.md', type: 'file', language: 'markdown', content: `# macOS Portfolio\n\n## Features\n- 🍎 macOS Sonoma UI\n- 🖥️ Draggable Windows\n- 🚀 Dock with magnification\n- 📝 VS Code Clone` }
];

const FileTree: React.FC<{ node: FileNode; level: number; onSelect: (file: FileNode) => void; activeFileId: string | null }> = ({ node, level, onSelect, activeFileId }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === 'folder') {
    return (
      <div>
        <div 
            className="flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer text-[#cccccc] hover:text-white transition-colors"
            style={{ paddingLeft: `${level * 12 + 4}px` }}
            onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown size={14} className="mr-1 opacity-80" /> : <ChevronRight size={14} className="mr-1 opacity-80" />}
          {isOpen ? <FolderOpen size={14} className="mr-2 text-blue-400" /> : <Folder size={14} className="mr-2 text-blue-400" />}
          <span className="text-[13px] font-medium truncate">{node.name}</span>
        </div>
        {isOpen && node.children?.map(child => (
          <FileTree key={child.id} node={child} level={level + 1} onSelect={onSelect} activeFileId={activeFileId} />
        ))}
      </div>
    );
  }

  // File Icons Logic
  const getIcon = (name: string) => {
      if (name.endsWith('.tsx')) return <FileCode size={14} className="mr-2 text-[#4d93e9]" />;
      if (name.endsWith('.ts')) return <FileCode size={14} className="mr-2 text-[#3178c6]" />;
      if (name.endsWith('.css')) return <Layout size={14} className="mr-2 text-[#42a5f5]" />;
      if (name.endsWith('.json')) return <FileJson size={14} className="mr-2 text-[#fbc02d]" />;
      if (name.endsWith('.md')) return <Monitor size={14} className="mr-2 text-[#90a4ae]" />;
      return <FileCode size={14} className="mr-2 text-gray-400" />;
  };

  return (
    <div 
        className={`flex items-center py-1 px-2 cursor-pointer text-[#cccccc] hover:text-white transition-colors ${activeFileId === node.id ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
        style={{ paddingLeft: `${level * 12 + 20}px` }}
        onClick={() => onSelect(node)}
    >
      {getIcon(node.name)}
      <span className="text-[13px] truncate">{node.name}</span>
    </div>
  );
};

export const VSCodeApp: React.FC = () => {
  const [activeFile, setActiveFile] = useState<FileNode | null>(fileSystem[0].children![2]); // default to App.tsx
  
  // Syntax highlighting mock (very basic)
  const renderCode = (content: string) => {
      return content.split('\n').map((line, i) => (
          <div key={i} className="table-row hover:bg-[#2f3133]">
              <span className="table-cell text-right pr-6 text-[#858585] select-none w-10 text-[13px] font-mono">{i + 1}</span>
              <span className="table-cell font-mono text-[13px] text-[#d4d4d4] whitespace-pre">{line}</span>
          </div>
      ));
  };

  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden rounded-b-lg selection:bg-[#264f78]">
      {/* Activity Bar */}
      <div className="w-12 bg-[#333333] flex flex-col items-center py-3 space-y-4 border-r border-[#1e1e1e]">
        <FileCode size={24} className="text-white cursor-pointer opacity-100 p-1 border-l-2 border-white" />
        <Search size={24} className="text-[#858585] hover:text-white cursor-pointer transition-opacity p-1" />
        <GitBranch size={24} className="text-[#858585] hover:text-white cursor-pointer transition-opacity p-1" />
        <div className="flex-grow" />
        <Settings size={24} className="text-[#858585] hover:text-white cursor-pointer transition-opacity p-1 mb-2" />
      </div>

      {/* Sidebar */}
      <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
        <div className="h-9 flex items-center px-4 text-[11px] font-bold tracking-wider uppercase text-[#bbbbbb] ellipsis overflow-hidden whitespace-nowrap">
            Explorer: macos-portfolio
        </div>
        <div className="flex-grow overflow-y-auto custom-scrollbar">
            {/* Project Folder Header */}
            <div className="px-1 py-1">
                <div className="flex items-center px-1 py-1 text-xs font-bold text-white bg-[#37373d] cursor-pointer">
                    <ChevronDown size={12} className="mr-1" />
                    MACOS-PORTFOLIO
                </div>
                <div>
                   {fileSystem.map(node => (
                      <FileTree key={node.id} node={node} level={0} onSelect={setActiveFile} activeFileId={activeFile?.id || null} />
                  ))}
                </div>
            </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-grow flex flex-col bg-[#1e1e1e]">
        {/* Tabs */}
        <div className="h-9 bg-[#252526] flex items-center overflow-x-auto no-scrollbar">
            {activeFile && (
                <div className="h-full px-3 bg-[#1e1e1e] flex items-center border-t-2 border-[#007acc] text-white text-[13px] min-w-[140px] justify-between group cursor-pointer pr-2">
                    <span className="flex items-center">
                        <FileCode size={14} className="mr-2 text-[#4d93e9]" />
                        {activeFile.name}
                    </span>
                    <X size={14} className="opacity-0 group-hover:opacity-100 hover:bg-[#333] rounded-sm p-[1px] transition-all" />
                </div>
            )}
        </div>

        {/* Breadcrumbs */}
        <div className="h-6 flex items-center px-4 text-[#8b8b8b] text-[13px] bg-[#1e1e1e] shadow-[0_1px_0_#2b2b2b]">
            src <ChevronRight size={12} className="mx-1 opacity-50" /> {activeFile?.name}
        </div>

        {/* Code Content */}
        <div className="flex-grow overflow-auto custom-scrollbar relative">
             {activeFile ? (
                 <div className="p-2 pt-4">
                     {renderCode(activeFile.content || '')}
                 </div>
             ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#3b3b3b]">
                   <Globe size={100} strokeWidth={0.5} />
                </div>
             )}
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-[12px] justify-between z-10 select-none">
            <div className="flex items-center space-x-3">
                <span className="flex items-center hover:bg-white/20 px-1 rounded cursor-pointer transition-colors"><GitBranch size={10} className="mr-1" /> main</span>
                <span className="hover:bg-white/20 px-1 rounded cursor-pointer transition-colors flex items-center"><X size={10} className="mr-1" /> 0 <div className="w-3" /> 0</span>
            </div>
            <div className="flex items-center space-x-4">
                <span className="hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">Ln 14, Col 32</span>
                <span className="hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">UTF-8</span>
                <span className="hover:bg-white/20 px-1 rounded cursor-pointer transition-colors">TypeScript React</span>
                <div className="hover:bg-white/20 p-1 rounded cursor-pointer"><Settings size={12} /></div>
            </div>
        </div>
      </div>
    </div>
  );
};
