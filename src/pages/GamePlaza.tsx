import React, { useEffect, useState } from 'react';
import { ArrowLeft, Gamepad2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { Game } from '../types/game';
import { gamesData, getFeaturedGame, getOtherGames } from '../data/games';

const GamePlaza: React.FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [featuredGame, setFeaturedGame] = useState<Game | null>(null);
  const [otherGames, setOtherGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载效果
    const loadGames = async () => {
      setIsLoading(true);
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const featured = getFeaturedGame();
      const others = getOtherGames();
      
      setFeaturedGame(featured || null);
      setOtherGames(others);
      setGames(gamesData);
      setIsLoading(false);
    };

    loadGames();
  }, []);

  const handleGameClick = (game: Game) => {
    if (game.url === '#') {
      // 显示"敬请期待"提示
      alert('该游戏正在开发中，敬请期待！');
      return;
    }
    
    // 在新标签页打开游戏
    window.open(game.url, '_blank', 'noopener,noreferrer');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* 顶部导航栏 */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">返回主页</span>
              </button>
              
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-blue-600" />
                游戏广场
              </h1>
              
              <div className="w-20"></div> {/* 占位符保持居中 */}
            </div>
          </div>
        </div>

        {/* 加载动画 */}
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">正在加载游戏广场...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:bg-blue-50 px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回主页</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-blue-600" />
              游戏广场
            </h1>
            
            <div className="w-20"></div> {/* 占位符保持居中 */}
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 主视觉展示区 - 攻城略地 */}
        {featuredGame && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-yellow-500" />
                精选推荐
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                体验最受欢迎的策略游戏，在战场上展现你的智慧与勇气
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <GameCard
                  game={featuredGame}
                  onClick={handleGameClick}
                  isFeatured={true}
                  className="animate-fade-in-up"
                />
              </div>
            </div>
          </div>
        )}

        {/* 游戏网格区域 - 其他游戏 */}
        {otherGames.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                更多精彩游戏
              </h2>
              <p className="text-gray-600 text-lg">
                探索各种类型的经典游戏，总有一款适合你
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherGames.map((game, index) => (
                <div
                  key={game.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <GameCard
                    game={game}
                    onClick={handleGameClick}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 底部提示 */}
        <div className="text-center mt-16 py-8">
          <p className="text-gray-500 text-sm">
            更多游戏正在开发中，敬请期待...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePlaza;