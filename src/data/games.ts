import { Game } from '../types/game';

// 游戏配置数据
export const gamesData: Game[] = [
  {
    id: 'battle-game',
    name: '攻城略地',
    description: '策略战争游戏，征服领土扩张版图，体验真实的战争策略',
    url: 'https://traed6xt27cf.vercel.app',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=strategy%20war%20game%20castle%20battle%20medieval%20fortress%20army%20conquest%20blue%20theme&image_size=landscape_4_3',
    category: 'featured',
    isRecommended: true,
    icon: '🏰'
  },
  {
    id: 'snake-game',
    name: '贪吃蛇',
    description: '经典益智游戏，控制蛇吃食物成长，挑战最高分数',
    url: '#',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20snake%20game%20pixel%20art%20green%20snake%20food%20retro%20gaming&image_size=square',
    category: 'puzzle',
    icon: '🐍'
  },
  {
    id: 'tetris-game',
    name: '俄罗斯方块',
    description: '经典消除游戏，旋转方块填满行，考验空间思维能力',
    url: '#',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tetris%20blocks%20colorful%20puzzle%20game%20falling%20pieces%20retro%20style&image_size=square',
    category: 'puzzle',
    icon: '🧩'
  },
  {
    id: 'puzzle-game',
    name: '数字华容道',
    description: '滑动数字拼图，将数字按顺序排列，锻炼逻辑思维',
    url: '#',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=number%20sliding%20puzzle%20game%20tiles%20mathematics%20brain%20training&image_size=square',
    category: 'puzzle',
    icon: '🔢'
  },
  {
    id: 'memory-game',
    name: '记忆翻牌',
    description: '翻开卡片找到相同图案，训练记忆力和专注力',
    url: '#',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=memory%20card%20game%20matching%20pairs%20colorful%20cards%20brain%20training&image_size=square',
    category: 'casual',
    icon: '🃏'
  },
  {
    id: 'maze-game',
    name: '迷宫探险',
    description: '在复杂迷宫中找到出路，考验方向感和耐心',
    url: '#',
    thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=maze%20adventure%20labyrinth%20path%20finding%20exploration%20challenge&image_size=square',
    category: 'puzzle',
    icon: '🌀'
  }
];

// 根据分类获取游戏
export const getGamesByCategory = (category: Game['category']): Game[] => {
  return gamesData.filter(game => game.category === category);
};

// 获取推荐游戏
export const getRecommendedGames = (): Game[] => {
  return gamesData.filter(game => game.isRecommended);
};

// 获取主推游戏（攻城略地）
export const getFeaturedGame = (): Game | undefined => {
  return gamesData.find(game => game.id === 'battle-game');
};

// 获取其他游戏（除了主推游戏）
export const getOtherGames = (): Game[] => {
  return gamesData.filter(game => game.id !== 'battle-game');
};