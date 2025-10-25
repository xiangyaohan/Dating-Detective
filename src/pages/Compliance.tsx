import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  Clock, 
  User, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Lock,
  UserCheck,
  Database,
  Globe,
  Calendar,
  Activity
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
  riskLevel: 'low' | 'medium' | 'high';
}

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  lastCheck: string;
  nextCheck: string;
  category: string;
}

interface RiskAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  affectedUsers: number;
}

const Compliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'privacy' | 'alerts'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      userId: 'user_001',
      userName: '张三',
      action: '查询背景调查',
      resource: '调查ID: INV_20240115_001',
      details: '查询目标: 李四, 身份证: 110101199001011234',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      riskLevel: 'low'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:18',
      userId: 'user_002',
      userName: '王五',
      action: '导出报告',
      resource: '报告ID: RPT_20240115_002',
      details: 'PDF格式导出, 包含敏感信息',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      riskLevel: 'medium'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:45',
      userId: 'user_003',
      userName: '赵六',
      action: '批量查询',
      resource: '批次ID: BATCH_20240115_001',
      details: '批量查询50个目标, 超出日限额',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'failed',
      riskLevel: 'high'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:32',
      userId: 'admin_001',
      userName: '管理员',
      action: '修改用户权限',
      resource: '用户ID: user_004',
      details: '提升用户权限至企业级',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      riskLevel: 'medium'
    }
  ];

  const complianceChecks: ComplianceCheck[] = [
    {
      id: '1',
      name: 'GDPR合规检查',
      description: '检查数据处理是否符合GDPR要求',
      status: 'passed',
      lastCheck: '2024-01-15 12:00:00',
      nextCheck: '2024-01-16 12:00:00',
      category: '数据保护'
    },
    {
      id: '2',
      name: '数据脱敏验证',
      description: '验证敏感数据是否正确脱敏',
      status: 'passed',
      lastCheck: '2024-01-15 11:30:00',
      nextCheck: '2024-01-15 23:30:00',
      category: '数据安全'
    },
    {
      id: '3',
      name: '用户授权检查',
      description: '检查用户是否有适当的查询授权',
      status: 'warning',
      lastCheck: '2024-01-15 10:15:00',
      nextCheck: '2024-01-15 22:15:00',
      category: '访问控制'
    },
    {
      id: '4',
      name: '数据保留期限',
      description: '检查数据是否超过保留期限',
      status: 'failed',
      lastCheck: '2024-01-15 09:45:00',
      nextCheck: '2024-01-15 21:45:00',
      category: '数据管理'
    }
  ];

  const riskAlerts: RiskAlert[] = [
    {
      id: '1',
      title: '异常查询频率',
      description: '用户user_003在短时间内进行了大量查询，可能存在滥用风险',
      severity: 'high',
      timestamp: '2024-01-15 14:20:45',
      status: 'active',
      affectedUsers: 1
    },
    {
      id: '2',
      title: '数据保留期限超期',
      description: '发现123条记录超过数据保留期限，需要及时清理',
      severity: 'medium',
      timestamp: '2024-01-15 09:45:00',
      status: 'investigating',
      affectedUsers: 0
    },
    {
      id: '3',
      title: '未授权访问尝试',
      description: '检测到来自IP 203.0.113.1的多次未授权访问尝试',
      severity: 'critical',
      timestamp: '2024-01-15 08:30:15',
      status: 'resolved',
      affectedUsers: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
      case 'success':
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
      case 'medium':
      case 'investigating':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'success':
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'failed':
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'warning':
      case 'medium':
      case 'investigating':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'critical':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">合规监控</h1>
        <p className="text-gray-600">监控系统合规性、审计日志和风险预警</p>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">合规检查</p>
              <p className="text-2xl font-bold text-gray-900">
                {complianceChecks.filter(c => c.status === 'passed').length}/{complianceChecks.length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">活跃警报</p>
              <p className="text-2xl font-bold text-gray-900">
                {riskAlerts.filter(a => a.status === 'active').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今日审计</p>
              <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">风险等级</p>
              <p className="text-2xl font-bold text-gray-900">中等</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: '概览', icon: <Shield className="w-4 h-4" /> },
              { key: 'audit', label: '审计日志', icon: <FileText className="w-4 h-4" /> },
              { key: 'privacy', label: '隐私合规', icon: <Lock className="w-4 h-4" /> },
              { key: 'alerts', label: '风险预警', icon: <AlertTriangle className="w-4 h-4" /> }
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
              {/* 合规检查状态 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">合规检查状态</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceChecks.map((check) => (
                    <div key={check.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{check.name}</h4>
                          <p className="text-sm text-gray-600">{check.description}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(check.status)}
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(check.status)}`}>
                            {check.status === 'passed' ? '通过' : check.status === 'failed' ? '失败' : '警告'}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <p>上次检查: {check.lastCheck}</p>
                        <p>下次检查: {check.nextCheck}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 最新风险警报 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">最新风险警报</h3>
                <div className="space-y-3">
                  {riskAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(alert.severity)}
                            <h4 className="font-medium text-gray-900">{alert.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(alert.severity)}`}>
                              {alert.severity === 'low' ? '低' : alert.severity === 'medium' ? '中' : alert.severity === 'high' ? '高' : '严重'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{alert.timestamp}</span>
                            <span>影响用户: {alert.affectedUsers}</span>
                            <span className={`px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                              {alert.status === 'active' ? '活跃' : alert.status === 'resolved' ? '已解决' : '调查中'}
                            </span>
                          </div>
                        </div>
                        <button className="btn btn-secondary btn-sm ml-4">
                          查看详情
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* 搜索和筛选 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索用户、操作或详情..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">所有状态</option>
                    <option value="success">成功</option>
                    <option value="failed">失败</option>
                    <option value="warning">警告</option>
                  </select>
                  <button className="btn btn-secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    筛选
                  </button>
                  <button className="btn btn-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    导出
                  </button>
                </div>
              </div>

              {/* 审计日志表格 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          时间
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          用户
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          详情
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          风险等级
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="w-4 h-4 text-gray-400 mr-2" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                                <div className="text-sm text-gray-500">{log.userId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {log.details}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(log.status)}
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(log.status)}`}>
                                {log.status === 'success' ? '成功' : log.status === 'failed' ? '失败' : '警告'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(log.riskLevel)}`}>
                              {log.riskLevel === 'low' ? '低' : log.riskLevel === 'medium' ? '中' : '高'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
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

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-blue-800">隐私保护说明</h3>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  系统严格遵循GDPR、CCPA等数据保护法规，确保用户隐私和数据安全。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceChecks.map((check) => (
                  <div key={check.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{check.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {check.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(check.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(check.status)}`}>
                          {check.status === 'passed' ? '通过' : check.status === 'failed' ? '失败' : '警告'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>上次检查:</span>
                        <span>{check.lastCheck}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>下次检查:</span>
                        <span>{check.nextCheck}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="btn btn-secondary btn-sm w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        立即检查
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">风险预警</h3>
                <button className="btn btn-secondary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </button>
              </div>

              <div className="space-y-4">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {getStatusIcon(alert.severity)}
                          <h4 className="text-lg font-medium text-gray-900">{alert.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(alert.severity)}`}>
                            {alert.severity === 'low' ? '低风险' : alert.severity === 'medium' ? '中风险' : alert.severity === 'high' ? '高风险' : '严重风险'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                            {alert.status === 'active' ? '活跃' : alert.status === 'resolved' ? '已解决' : '调查中'}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{alert.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{alert.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>影响用户: {alert.affectedUsers}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button className="btn btn-secondary btn-sm">
                          查看详情
                        </button>
                        {alert.status === 'active' && (
                          <button className="btn btn-primary btn-sm">
                            处理
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compliance;