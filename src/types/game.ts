// 游戏数据类型定义
export interface Game {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
  category: 'featured' | 'puzzle' | 'action' | 'casual';
  isRecommended?: boolean;
  icon?: string; // emoji 图标
}

// 用户游戏访问记录
export interface GameVisit {
  gameId: string;
  visitCount: number;
  lastVisited: string;
}

// 用户偏好设置
export interface UserPreferences {
  favoriteGames: string[];
  theme: 'light' | 'dark';
  animations: boolean;
}

// 游戏卡片属性
export interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  className?: string;
}