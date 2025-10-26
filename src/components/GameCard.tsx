import React, { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  className?: string;
  isFeatured?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  onClick, 
  className = '', 
  isFeatured = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    // 记录游戏访问
    const visits = JSON.parse(localStorage.getItem('gameVisits') || '[]');
    const existingVisit = visits.find((v: any) => v.gameId === game.id);
    
    if (existingVisit) {
      existingVisit.visitCount += 1;
      existingVisit.lastVisited = new Date().toISOString();
    } else {
      visits.push({
        gameId: game.id,
        visitCount: 1,
        lastVisited: new Date().toISOString()
      });
    }
    
    localStorage.setItem('gameVisits', JSON.stringify(visits));
    onClick(game);
  };

  const cardSizeClass = isFeatured 
    ? 'h-80 md:h-96 lg:h-[28rem]' 
    : 'h-64 md:h-72';

  return (
    <div
      className={`
        relative group cursor-pointer rounded-xl overflow-hidden shadow-lg
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:-translate-y-2
        bg-white border border-gray-200
        ${cardSizeClass}
        ${className}
      `}
      onClick={handleClick}
    >
      {/* 推荐角标 */}
      {game.isRecommended && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            推荐
          </div>
        </div>
      )}

      {/* 游戏图片 */}
      <div className="relative w-full h-2/3 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl animate-pulse">{game.icon}</div>
              </div>
            )}
            <img
              src={game.thumbnail}
              alt={game.name}
              className={`
                w-full h-full object-cover transition-all duration-300
                group-hover:scale-110
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="text-center">
              <div className="text-6xl mb-2">{game.icon}</div>
              <div className="text-gray-600 text-sm">{game.name}</div>
            </div>
          </div>
        )}
        
        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
              <ExternalLink className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 游戏信息 */}
      <div className="p-4 h-1/3 flex flex-col justify-between">
        <div>
          <h3 className={`font-bold text-gray-800 mb-1 ${isFeatured ? 'text-xl' : 'text-lg'}`}>
            {game.name}
          </h3>
          <p className={`text-gray-600 line-clamp-2 ${isFeatured ? 'text-base' : 'text-sm'}`}>
            {game.description}
          </p>
        </div>
        
        {/* 分类标签 */}
        <div className="flex items-center justify-between mt-2">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${game.category === 'featured' ? 'bg-blue-100 text-blue-800' : ''}
            ${game.category === 'puzzle' ? 'bg-green-100 text-green-800' : ''}
            ${game.category === 'action' ? 'bg-red-100 text-red-800' : ''}
            ${game.category === 'casual' ? 'bg-purple-100 text-purple-800' : ''}
          `}>
            {game.category === 'featured' && '精选'}
            {game.category === 'puzzle' && '益智'}
            {game.category === 'action' && '动作'}
            {game.category === 'casual' && '休闲'}
          </span>
          
          <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;