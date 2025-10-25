import React, { useState } from 'react';
import { 
  Settings, 
  Activity, 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Key,
  Database,
  Globe,
  Brain,
  CreditCard,
  GraduationCap,
  Building,
  Users,
  Camera
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  responseTime: number;
  successRate: number;
  dailyQueries: number;
  monthlyQuota: number;
  usedQuota: number;
  lastUpdated: string;
  icon: React.ReactNode;
  description: string;
}

const DataSources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'config' | 'monitoring'>('overview');

  const dataSources: DataSource[] = [
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      type: 'AI分析',
      status: 'active',
      responseTime: 1200,
      successRate: 98.5,
      dailyQueries: 156,
      monthlyQuota: 10000,
      usedQuota: 3420,
      lastUpdated: '2024-01-15 14:30:00',
      icon: <Brain className="w-5 h-5" />,
      description: '智能分析和风险评估服务'
    },
    {
      id: 'credit',
      name: '征信数据API',
      type: '征信查询',
      status: 'active',
      responseTime: 800,
      successRate: 96.2,
      dailyQueries: 89,
      monthlyQuota: 5000,
      usedQuota: 1890,
      lastUpdated: '2024-01-15 14:25:00',
      icon: <CreditCard className="w-5 h-5" />,
      description: '个人征信记录查询服务'
    },
    {
      id: 'education',
      name: '学历验证API',
      type: '教育背景',
      status: 'active',
      responseTime: 600,
      successRate: 94.8,
      dailyQueries: 67,
      monthlyQuota: 3000,
      usedQuota: 1245,
      lastUpdated: '2024-01-15 14:20:00',
      icon: <GraduationCap className="w-5 h-5" />,
      description: '教育背景真实性验证服务'
    },
    {
      id: 'business',
      name: '工商信息API',
      type: '企业信息',
      status: 'error',
      responseTime: 0,
      successRate: 0,
      dailyQueries: 0,
      monthlyQuota: 2000,
      usedQuota: 567,
      lastUpdated: '2024-01-15 10:15:00',
      icon: <Building className="w-5 h-5" />,
      description: '企业工商信息查询服务'
    },
    {
      id: 'social',
      name: '社交媒体API',
      type: '社交分析',
      status: 'inactive',
      responseTime: 0,
      successRate: 0,
      dailyQueries: 0,
      monthlyQuota: 1000,
      usedQuota: 234,
      lastUpdated: '2024-01-14 16:45:00',
      icon: <Users className="w-5 h-5" />,
      description: '社交媒体数据分析服务'
    },
    {
      id: 'face',
      name: '人脸识别API',
      type: '图像识别',
      status: 'active',
      responseTime: 450,
      successRate: 99.1,
      dailyQueries: 123,
      monthlyQuota: 8000,
      usedQuota: 2890,
      lastUpdated: '2024-01-15 14:35:00',
      icon: <Camera className="w-5 h-5" />,
      description: '照片质量检测和人脸识别服务'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '正常';
      case 'inactive':
        return '未启用';
      case 'error':
        return '异常';
      default:
        return '未知';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const totalQueries = dataSources.reduce((sum, ds) => sum + ds.dailyQueries, 0);
  const avgResponseTime = dataSources
    .filter(ds => ds.status === 'active')
    .reduce((sum, ds, _, arr) => sum + ds.responseTime / arr.length, 0);
  const avgSuccessRate = dataSources
    .filter(ds => ds.status === 'active')
    .reduce((sum, ds, _, arr) => sum + ds.successRate / arr.length, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">数据源管理</h1>
        <p className="text-gray-600">管理和监控系统集成的各种数据源API</p>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总数据源</p>
              <p className="text-2xl font-bold text-gray-900">{dataSources.length}</p>
            </div>
            <Database className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今日查询</p>
              <p className="text-2xl font-bold text-gray-900">{totalQueries}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">平均响应时间</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(avgResponseTime)}ms</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">平均成功率</p>
              <p className="text-2xl font-bold text-gray-900">{avgSuccessRate.toFixed(1)}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: '概览', icon: <Globe className="w-4 h-4" /> },
              { key: 'config', label: '配置', icon: <Settings className="w-4 h-4" /> },
              { key: 'monitoring', label: '监控', icon: <Activity className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {dataSources.map((source) => (
                  <div key={source.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg">
                          {source.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{source.name}</h3>
                          <p className="text-sm text-gray-600">{source.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(source.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(source.status)}`}>
                          {getStatusText(source.status)}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{source.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">响应时间</span>
                        <span className="font-medium">{source.responseTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">成功率</span>
                        <span className="font-medium">{source.successRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">今日查询</span>
                        <span className="font-medium">{source.dailyQueries}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">配额使用</span>
                        <span className="font-medium">
                          {source.usedQuota}/{source.monthlyQuota}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(source.usedQuota / source.monthlyQuota) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        最后更新: {source.lastUpdated}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Key className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-medium text-yellow-800">API配置说明</h3>
                </div>
                <p className="text-sm text-yellow-700 mt-2">
                  请在环境变量中配置各数据源的API密钥。修改配置后需要重启服务才能生效。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {dataSources.map((source) => (
                  <div key={source.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {source.icon}
                        <div>
                          <h3 className="font-semibold text-gray-900">{source.name}</h3>
                          <p className="text-sm text-gray-600">{source.description}</p>
                        </div>
                      </div>
                      <button className="btn btn-secondary btn-sm">
                        <Settings className="w-4 h-4 mr-2" />
                        配置
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API密钥
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="请输入API密钥"
                          defaultValue="••••••••••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          月度配额
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={source.monthlyQuota}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked={source.status === 'active'}
                          />
                          <span className="ml-2 text-sm text-gray-700">启用此数据源</span>
                        </label>
                      </div>
                      <button className="btn btn-primary btn-sm">
                        保存配置
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">实时监控</h3>
                    <button className="btn btn-secondary btn-sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      刷新
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          数据源
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          响应时间
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          成功率
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          今日查询
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          配额使用
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataSources.map((source) => (
                        <tr key={source.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                                {source.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{source.name}</div>
                                <div className="text-sm text-gray-500">{source.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(source.status)}
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(source.status)}`}>
                                {getStatusText(source.status)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {source.responseTime}ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {source.successRate}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {source.dailyQueries}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(source.usedQuota / source.monthlyQuota) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600">
                                {Math.round((source.usedQuota / source.monthlyQuota) * 100)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              测试
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              详情
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSources;