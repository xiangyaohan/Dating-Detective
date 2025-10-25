import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              出现了一些问题
            </h1>
            
            <p className="text-gray-600 mb-6">
              抱歉，页面遇到了意外错误。请尝试刷新页面或返回首页。
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  错误详情 (开发模式)
                </summary>
                <div className="bg-gray-100 p-3 rounded text-xs text-gray-700 overflow-auto max-h-32">
                  <div className="font-semibold mb-2">错误信息:</div>
                  <div className="mb-2">{this.state.error.message}</div>
                  <div className="font-semibold mb-2">错误堆栈:</div>
                  <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                </div>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRefresh}
                className="btn btn-primary flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>刷新页面</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="btn btn-secondary flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>返回首页</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 简单的错误显示组件
export const ErrorMessage: React.FC<{
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}> = ({ 
  title = '出错了', 
  message, 
  onRetry, 
  retryText = '重试' 
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertTriangle className="w-8 h-8 text-red-600" />
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    
    <p className="text-gray-600 text-center mb-6 max-w-md">
      {message}
    </p>
    
    {onRetry && (
      <button
        onClick={onRetry}
        className="btn btn-primary flex items-center space-x-2"
      >
        <RefreshCw className="w-4 h-4" />
        <span>{retryText}</span>
      </button>
    )}
  </div>
);

// 网络错误组件
export const NetworkError: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => (
  <ErrorMessage
    title="网络连接失败"
    message="请检查您的网络连接，然后重试。"
    onRetry={onRetry}
    retryText="重新连接"
  />
);

// 404 错误组件
export const NotFound: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-md w-full text-center">
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">页面未找到</h1>
      <p className="text-gray-600 mb-8">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="btn btn-primary flex items-center justify-center space-x-2 mx-auto"
      >
        <Home className="w-4 h-4" />
        <span>返回首页</span>
      </button>
    </div>
  </div>
);

export default ErrorBoundary;