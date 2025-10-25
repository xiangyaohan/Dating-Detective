import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  text = '加载中...', 
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <LoadingContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-40 rounded-lg">
        <LoadingContent />
      </div>
    );
  }

  return <LoadingContent />;
};

// 骨架屏组件
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// 卡片骨架屏
export const CardSkeleton: React.FC = () => (
  <div className="card animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <SkeletonLoader className="w-12 h-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-3">
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-5/6" />
      <SkeletonLoader className="h-4 w-4/6" />
    </div>
  </div>
);

// 表格骨架屏
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <SkeletonLoader 
            key={colIndex} 
            className={`h-4 ${colIndex === 0 ? 'w-1/4' : colIndex === 1 ? 'w-1/3' : 'w-1/6'}`} 
          />
        ))}
      </div>
    ))}
  </div>
);

// 按钮加载状态
export const ButtonLoading: React.FC<{ 
  loading: boolean; 
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ loading, children, className = '', disabled = false, onClick }) => (
  <button
    className={`btn ${className} ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading || disabled}
    onClick={onClick}
  >
    {loading ? (
      <div className="flex items-center space-x-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>处理中...</span>
      </div>
    ) : (
      children
    )}
  </button>
);

export default Loading;