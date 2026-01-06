import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SAVAGE_RESPONSES = [
    "Searching for intelligence... 404 Not Found.",
    "Why are you searching here? Go use Google like a normal person.",
    "You type like you have mittens on. Try again.",
    "I'd tell you the answer, but I don't think you'd understand.",
    "Nice try. Access Denied.",
    "Loading results... just kidding.",
    "Error: User implementation flawed.",
    "Do you always ask such silly questions?",
    "Calculations indicate a 99% chance of user error.",
    "System overload: Too much incompetence detected.",
    "Have you tried turning your brain off and on again?",
    "I'm a portfolio, not a genie. Make a wish elsewhere.",
    "Search results for that query have been permanently deleted.",
    "Analyzing your request... logic not found.",
    "Wow, original query. Never heard that one before."
];

export const Spotlight: React.FC = () => {
  const { system, setSpotlightOpen } = useStore();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (system.spotlightOpen) {
        setTimeout(() => inputRef.current?.focus(), 50);
    } else {
        setQuery('');
        setResponse(null);
    }
  }, [system.spotlightOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSpotlightOpen(false);
      }
    };

    if (system.spotlightOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [system.spotlightOpen, setSpotlightOpen]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      
      const randomResponse = SAVAGE_RESPONSES[Math.floor(Math.random() * SAVAGE_RESPONSES.length)];
      setResponse(randomResponse);
  };

  return (
    <AnimatePresence>
      {system.spotlightOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/20 backdrop-blur-sm transition-all">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-[600px] mx-4 bg-[#e3e3e3]/80 dark:bg-[#1e1e1e]/80 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex items-center p-4 gap-3 relative">
                <Search size={24} className="text-gray-500 dark:text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Spotlight Search"
                    className="flex-1 bg-transparent border-none outline-none text-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-light"
                />
                {!query && (
                    <span className="text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5 pointer-events-none hidden sm:block">
                        Esc to close
                    </span>
                )}
            </form>

            {/* Results Area (Mock) */}
            {response && (
                <div className="border-t border-gray-300/50 dark:border-white/10 p-4 bg-white/50 dark:bg-black/20">
                    <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0">
                            <Command className="text-white" size={20} />
                         </div>
                         <div>
                             <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">Top Hit</h4>
                             <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                 {response}
                             </p>
                         </div>
                    </div>
                </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
