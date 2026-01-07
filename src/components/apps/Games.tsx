import React, { useState } from 'react';
import { Gamepad2, Maximize2, Minimize2, ArrowLeft } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  description: string;
  embedUrl: string;
  thumbnail: string;
  color: string;
}

// Only Flappy Bird for now
const GAMES: Game[] = [
  {
    id: 'flappy',
    name: 'Flappy Bird',
    description: 'Tap to fly through the pipes!',
    embedUrl: 'https://flappybird.io/',
    thumbnail: 'https://flappybird.io/img/favicon-96x96.png',
    color: 'from-yellow-400 to-green-500',
  },
];

export const GamesApp: React.FC = () => {
  const [playingGame, setPlayingGame] = useState<Game | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handlePlayGame = (game: Game) => {
    setPlayingGame(game);
    setIsFullscreen(false);
  };

  const handleCloseGame = () => {
    setPlayingGame(null);
    setIsFullscreen(false);
  };

  const handleImageError = (gameId: string) => {
    setImageErrors(prev => new Set(prev).add(gameId));
  };

  // If game is playing, show the game player
  if (playingGame) {
    return (
      <div className="flex flex-col h-full w-full bg-[#f5f5f7] dark:bg-[#1c1c1e]">
        {/* Game Header - macOS Style */}
        <div className="h-11 bg-[#e8e8ed] dark:bg-[#2c2c2e] border-b border-black/10 dark:border-white/10 flex items-center px-4 gap-3 shrink-0">
          <button 
            onClick={handleCloseGame}
            className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex-1 text-center">
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{playingGame.name}</span>
          </div>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} className="text-gray-500" /> : <Maximize2 size={16} className="text-gray-500" />}
          </button>
        </div>
        
        {/* Game Iframe */}
        <div className="flex-1 bg-white dark:bg-black overflow-hidden">
          <iframe
            src={playingGame.embedUrl}
            className="w-full h-full border-none"
            title={playingGame.name}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
            allow="fullscreen; autoplay"
          />
        </div>
      </div>
    );
  }

  // Game Grid View - Single game
  return (
    <div className="flex flex-col h-full w-full bg-[#f5f5f7] dark:bg-[#1c1c1e] text-gray-900 dark:text-white">
      {/* Header - macOS Tahoe Style */}
      <div className="h-14 bg-white/80 dark:bg-[#2c2c2e]/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 flex items-center px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Gamepad2 size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Game Center
          </h1>
        </div>
      </div>

      {/* Game Display */}
      <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          {GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => handlePlayGame(game)}
              className="group bg-white dark:bg-[#2c2c2e] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Thumbnail */}
              <div className={`aspect-video bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
                {!imageErrors.has(game.id) && (
                  <img 
                    src={game.thumbnail} 
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    onError={() => handleImageError(game.id)}
                  />
                )}
                <span className="text-8xl font-bold text-white/40 relative z-0">🐦</span>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <div className="w-0 h-0 border-l-[18px] border-l-gray-800 border-y-[10px] border-y-transparent ml-1" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">{game.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{game.description}</p>
                <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
