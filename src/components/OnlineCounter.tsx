import React, { useState, useEffect, useRef } from 'react';
import { Users } from 'lucide-react';
import { onlineService, OnlineStats } from '../services/onlineService';

interface OnlineCounterProps {
  className?: string;
}

const OnlineCounter: React.FC<OnlineCounterProps> = ({ className = '' }) => {
  const [onlineData, setOnlineData] = useState<OnlineStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // 数字动画函数
  const animateNumber = (from: number, to: number, duration: number = 1000) => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    const startTime = Date.now();
    const difference = to - from;

    const updateNumber = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数实现平滑动画
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(from + difference * easeOutQuart);
      
      setDisplayCount(currentValue);

      if (progress < 1) {
        animationRef.current = setTimeout(updateNumber, 16); // 60fps
      }
    };

    updateNumber();
  };

  // 获取在线人数
  const fetchOnlineCount = async () => {
    try {
      const data = await onlineService.getOnlineCount();
      const previousCount = onlineData?.count || data.count;
      
      setOnlineData(data);
      
      // 如果是首次加载，直接设置数字
      if (isLoading) {
        setDisplayCount(data.count);
        setIsLoading(false);
      } else {
        // 否则播放动画
        animateNumber(previousCount, data.count);
      }
    } catch (error) {
      console.error('获取在线人数失败:', error);
      setIsLoading(false);
    }
  };

  // 初始化和定时更新
  useEffect(() => {
    // 立即获取一次
    fetchOnlineCount();

    // 每30秒更新一次
    intervalRef.current = setInterval(fetchOnlineCount, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // 清理函数
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [onlineData]);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 text-gray-600 ${className}`}>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">加载中...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-gray-700 ${className}`}>
      {/* 在线状态指示器 */}
      <div className="relative">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>
      
      {/* 在线人数显示 */}
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-800">
          当前在线：
          <span className="font-bold text-blue-600 ml-1 transition-all duration-300">
            {displayCount}
          </span>
          人
        </span>
      </div>
    </div>
  );
};

export default OnlineCounter;