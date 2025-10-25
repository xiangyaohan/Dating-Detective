import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  User, 
  CreditCard,
  GraduationCap,
  Building,
  MessageSquare,
  Shield,
  Eye,
  Download,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Activity,
  Database,
  Zap,
  AlertCircle,
  FileText,
  IdCard
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { showToast } from '../components/Toast';

interface SearchTask {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  description: string;
  estimatedTime?: string;
  result?: any;
  dataSource: string;
  icon: React.ComponentType<any>;
  priority: 'high' | 'medium' | 'low';
}

const SearchResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentInvestigation, getInvestigationById, isLoading } = useAppStore();
  
  const [tasks, setTasks] = useState<SearchTask[]>([
    {
      id: '1',
      name: '基本信息核实',
      status: 'completed',
      progress: 100,
      description: '验证身份证号、姓名等基础身份信息',
      result: { verified: true, confidence: 98, details: '身份信息验证通过' },
      dataSource: '公安部身份验证API',
      icon: IdCard,
      priority: 'high',
      estimatedTime: '30秒'
    },
    {
      id: '2',
      name: '信用记录查询',
      status: 'running',
      progress: 75,
      description: '查询个人征信记录、信贷历史、逾期记录',
      dataSource: '征信中心API',
      icon: CreditCard,
      priority: 'high',
      estimatedTime: '2分钟'
    },
    {
      id: '3',
      name: '教育背景验证',
      status: 'running',
      progress: 45,
      description: '核实学历证书、毕业院校、专业信息',
      dataSource: '学信网API',
      icon: GraduationCap,
      priority: 'medium',
      estimatedTime: '3分钟'
    },
    {
      id: '4',
      name: '工作履历查询',
      status: 'pending',
      progress: 0,
      description: '查询工商注册信息、职业资格、工作经历',
      dataSource: '工商信息API',
      icon: Building,
      priority: 'medium',
      estimatedTime: '4分钟'
    },
    {
      id: '5',
      name: '社交媒体分析',
      status: 'pending',
      progress: 0,
      description: '分析社交平台活动、数字足迹、网络行为',
      dataSource: '社交媒体API',
      icon: MessageSquare,
      priority: 'low',
      estimatedTime: '5分钟'
    },
    {
      id: '6',
      name: 'AI风险评估',
      status: 'pending',
      progress: 0,
      description: '基于GPT-4的综合风险分析和可信度评分',
      dataSource: 'OpenAI GPT-4 API',
      icon: Zap,
      priority: 'high',
      estimatedTime: '1分钟'
    }
  ]);

  const [overallProgress, setOverallProgress] = useState(0);
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (id) {
      const investigation = getInvestigationById(id);
      // 这里可以设置当前调查或处理获取到的调查数据
    }
  }, [id, getInvestigationById]);

  useEffect(() => {
    // 模拟任务进度更新
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.status === 'running' && task.progress < 100) {
            const newProgress = Math.min(task.progress + Math.random() * 15, 100);
            const newStatus: 'completed' | 'running' = newProgress >= 100 ? 'completed' : 'running';
            return { ...task, progress: newProgress, status: newStatus };
          }
          
          if (task.status === 'pending') {
            const runningTasks = prevTasks.filter(t => t.status === 'running').length;
            if (runningTasks < 2 && Math.random() > 0.7) {
              return { ...task, status: 'running' as const, progress: 5 };
            }
          }
          
          return task;
        });

        // 计算总体进度
        const totalProgress = updatedTasks.reduce((sum, task) => sum + task.progress, 0);
        const avgProgress = totalProgress / updatedTasks.length;
        setOverallProgress(avgProgress);

        // 计算预估完成时间
        const remainingTasks = updatedTasks.filter(task => task.status !== 'completed');
        if (remainingTasks.length > 0) {
          const totalEstimatedMinutes = remainingTasks.reduce((sum, task) => {
            const minutes = task.estimatedTime ? parseInt(task.estimatedTime) : 2;
            return sum + minutes;
          }, 0);
          setEstimatedCompletion(`约${totalEstimatedMinutes}分钟`);
        } else {
          setEstimatedCompletion('即将完成');
        }

        return updatedTasks;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'running':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'running':
        return '进行中';
      case 'failed':
        return '失败';
      default:
        return '等待中';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'running':
        return 'text-primary-600 bg-primary-50 border-primary-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // 模拟刷新操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast.success('数据已刷新');
    } catch (error) {
      showToast.error('刷新失败');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleViewReport = () => {
    if (overallProgress >= 100) {
      navigate(`/report/${id}`);
    } else {
      showToast.loading('调查尚未完成，请稍候');
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            实时背景调查进行中
          </h1>
          <p className="text-lg text-gray-600">
            正在通过多个权威数据源进行全面背景核查，预计30秒内完成
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <Database className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm text-blue-700">
              已连接6个权威数据源，确保信息准确性和完整性
            </span>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              实时查询进度
            </h2>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              刷新状态
            </button>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">总体查询进度</span>
              <span className="text-sm text-gray-500">{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-green-600">已完成查询</p>
                  <p className="text-2xl font-bold text-green-700">{completedTasks}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-blue-600">数据源总数</p>
                  <p className="text-2xl font-bold text-blue-700">{totalTasks}</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-orange-600">预计完成</p>
                  <p className="text-lg font-bold text-orange-700">{estimatedCompletion}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-purple-600">数据可信度</p>
                  <p className="text-2xl font-bold text-purple-700">98%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Target Information */}
          {currentInvestigation && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                调查对象信息
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <IdCard className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">完整姓名</p>
                    <p className="font-medium">{currentInvestigation.targetName}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">身份证号</p>
                    <p className="font-medium">{currentInvestigation.targetPhone || '未提供'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-blue-600" />
            实时查询详情
          </h2>
          
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${getStatusColor(task.status)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-300 mr-3 text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex items-center mr-3">
                      <task.icon className="h-5 w-5 text-blue-600 mr-2" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{task.name}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <p className="text-xs text-gray-400 mt-1">数据源: {task.dataSource}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {task.estimatedTime && task.status !== 'completed' && (
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                        {task.estimatedTime}
                      </span>
                    )}
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium mr-2 ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                      {getStatusIcon(task.status)}
                      <span className="ml-2 text-sm font-medium">
                        {getStatusText(task.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">进度</span>
                    <span className="text-xs text-gray-600">{Math.round(task.progress)}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        task.status === 'completed' 
                          ? 'bg-green-500' 
                          : task.status === 'running'
                          ? 'bg-primary-500'
                          : 'bg-gray-300'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Result Preview */}
                {task.result && task.status === 'completed' && (
                  <div className="mt-3 p-3 bg-white bg-opacity-50 rounded border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">
                          验证成功，可信度: {task.result.confidence}%
                        </span>
                      </div>
                      <button className="text-xs text-primary-600 hover:text-primary-700">
                        查看详情
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleViewReport}
            disabled={overallProgress < 100}
            className="group flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <FileText className="h-5 w-5 mr-2" />
            {overallProgress < 100 ? '生成报告中...' : '查看完整报告'}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/reports')}
            className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回报告管理
          </button>
        </div>

        {/* Real-time Updates Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
            <Zap className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm text-blue-700 font-medium">
              实时查询进行中，数据将自动更新，预计30秒内完成
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;