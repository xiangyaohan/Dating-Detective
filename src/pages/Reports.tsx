import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Calendar, 
  User, 
  Star,
  MoreVertical,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  SortAsc,
  SortDesc,
  Grid,
  List
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { showToast } from '../components/Toast';

interface ReportSummary {
  id: string;
  targetName: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  thumbnail?: string;
  tags: string[];
}

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [localReports, setLocalReports] = useState<ReportSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    reports, 
    setCurrentReport, 
    searchQuery, 
    setSearchQuery,
    selectedFilters,
    setFilters,
    deleteReport,
    deleteReports,
    exportReports
  } = useAppStore();

  // 初始化模拟数据
  useEffect(() => {
    if (localReports.length === 0) {
      const mockReports = [
        {
          id: '1',
          targetName: '张三',
          createdAt: '2024-01-15',
          status: 'completed' as const,
          score: 85,
          riskLevel: 'low' as const,
          tags: ['软件工程师', '北京']
        },
        {
          id: '2',
          targetName: '李四',
          createdAt: '2024-01-14',
          status: 'completed' as const,
          score: 72,
          riskLevel: 'medium' as const,
          tags: ['销售', '上海']
        },
        {
          id: '3',
          targetName: '王五',
          createdAt: '2024-01-13',
          status: 'processing' as const,
          score: 0,
          riskLevel: 'low' as const,
          tags: ['教师', '广州']
        },
        {
          id: '4',
          targetName: '赵六',
          createdAt: '2024-01-12',
          status: 'failed' as const,
          score: 0,
          riskLevel: 'high' as const,
          tags: ['自由职业', '深圳']
        },
        {
          id: '5',
          targetName: '钱七',
          createdAt: '2024-01-11',
          status: 'completed' as const,
          score: 91,
          riskLevel: 'low' as const,
          tags: ['医生', '杭州']
        }
      ];
      setLocalReports(mockReports);
    }
  }, [localReports.length]);

  // 同步搜索状态
  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm, setSearchQuery]);

  // 同步筛选状态
  useEffect(() => {
    if (filterStatus && filterStatus !== 'all' && !selectedFilters.includes(filterStatus)) {
      setFilters([filterStatus]);
    } else if (filterStatus === 'all') {
      setFilters([]);
    }
  }, [filterStatus]); // 移除selectedFilters和setFilters依赖项以避免无限循环

  // 将store中的Report转换为ReportSummary格式
  const convertToReportSummary = (report: any): ReportSummary => {
    try {
      // 尝试从investigations中获取目标姓名
      const investigation = reports.length > 0 ? null : null; // 暂时使用默认值
      const targetName = investigation?.targetName || `报告 ${report.id?.slice(-4) || 'Unknown'}`;
      
      return {
        id: report.id || 'unknown',
        targetName: targetName,
        createdAt: report.generatedAt || new Date().toISOString(),
        status: 'completed' as const,
        score: report.analysisData?.overallScore || 0,
        riskLevel: report.analysisData?.riskAssessment?.level || 'low',
        tags: []
      };
    } catch (error) {
      console.error('转换报告数据时出错:', error);
      return {
        id: 'error',
        targetName: '数据错误',
        createdAt: new Date().toISOString(),
        status: 'failed' as const,
        score: 0,
        riskLevel: 'high' as const,
        tags: []
      };
    }
  };

  // 使用store中的reports数据，添加错误处理
  const reportSummaries = React.useMemo(() => {
    try {
      setError(null);
      return reports.map(convertToReportSummary);
    } catch (error) {
      console.error('处理报告数据时出错:', error);
      setError('加载报告数据时出现错误');
      return [];
    }
  }, [reports]);

  const filteredReports = reportSummaries.filter(report => {
    const matchesSearch = report.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'name':
        comparison = a.targetName.localeCompare(b.targetName);
        break;
      case 'score':
        comparison = a.score - b.score;
        break;
      default:
        return 0;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'processing':
        return '处理中';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low':
        return '低风险';
      case 'medium':
        return '中风险';
      case 'high':
        return '高风险';
      default:
        return '未知';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === sortedReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(sortedReports.map(report => report.id));
    }
  };

  const handleBatchDelete = () => {
    if (window.confirm(`确定要删除选中的 ${selectedReports.length} 个报告吗？`)) {
      try {
        deleteReports(selectedReports);
        setSelectedReports([]);
        showToast.success(`成功删除 ${selectedReports.length} 个报告`);
      } catch (error) {
        showToast.error('删除失败，请重试');
      }
    }
  };

  const handleDeleteReport = (reportId: string) => {
    if (window.confirm('确定要删除这个报告吗？')) {
      try {
        deleteReport(reportId);
        showToast.success('报告删除成功');
      } catch (error) {
        showToast.error('删除失败，请重试');
      }
    }
  };

  const handleViewReport = (report: ReportSummary) => {
    // 这里应该根据report.id获取完整的Report对象
    // 暂时创建一个模拟的Report对象
    const fullReport = {
      id: report.id,
      investigationId: 'mock-investigation-id',
      analysisData: {
        overallScore: report.score,
        personalityTraits: [],
        socialActivity: {
          platforms: [],
          totalPosts: 0,
          avgEngagement: 0
        },
        riskAssessment: {
          level: report.riskLevel,
          factors: [],
          recommendations: []
        },
        relationships: []
      },
      generatedAt: report.createdAt,
      confidenceScore: 85
    };
    setCurrentReport(fullReport);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleBatchExport = () => {
    if (selectedReports.length === 0) {
      showToast.error('请先选择要导出的报告');
      return;
    }
    
    try {
      exportReports(selectedReports);
      showToast.success(`成功导出 ${selectedReports.length} 个报告`);
    } catch (error) {
      showToast.error('导出失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* 页面标题 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-chinese">
                报告管理
              </h1>
              <p className="text-gray-600">
                共 {localReports.length} 个报告，已筛选 {sortedReports.length} 个
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/investigation" className="btn btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                新建调查
              </Link>
            </div>
          </div>

          {/* 搜索和筛选栏 */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* 搜索框 */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索姓名或标签..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10 w-full"
                  />
                </div>
              </div>

              {/* 工具栏 */}
              <div className="flex items-center space-x-3">
                {/* 视图切换 */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* 筛选按钮 */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn btn-secondary ${showFilters ? 'bg-blue-50 text-blue-600' : ''}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </button>

                {/* 批量操作 */}
                {selectedReports.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleBatchExport}
                      className="btn btn-secondary"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      导出 ({selectedReports.length})
                    </button>
                    <button
                      onClick={handleBatchDelete}
                      className="btn btn-danger"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除 ({selectedReports.length})
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 筛选面板 */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 状态筛选 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      状态
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="input w-full"
                    >
                      <option value="all">全部状态</option>
                      <option value="completed">已完成</option>
                      <option value="processing">处理中</option>
                      <option value="failed">失败</option>
                    </select>
                  </div>

                  {/* 排序方式 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      排序方式
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input w-full"
                    >
                      <option value="date">创建时间</option>
                      <option value="name">姓名</option>
                      <option value="score">评分</option>
                    </select>
                  </div>

                  {/* 排序顺序 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      排序顺序
                    </label>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="btn btn-secondary w-full justify-center"
                    >
                      {sortOrder === 'asc' ? (
                        <>
                          <SortAsc className="w-4 h-4 mr-2" />
                          升序
                        </>
                      ) : (
                        <>
                          <SortDesc className="w-4 h-4 mr-2" />
                          降序
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 报告列表 */}
          {sortedReports.length === 0 ? (
            <div className="card text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterStatus !== 'all' ? '没有找到匹配的报告' : '暂无报告'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? '尝试调整搜索条件或筛选器' 
                  : '开始您的第一次背景调查'}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Link to="/investigation" className="btn btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  新建调查
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* 批量选择栏 */}
              {sortedReports.length > 0 && (
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === sortedReports.length}
                      onChange={handleSelectAll}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedReports.length > 0 
                        ? `已选择 ${selectedReports.length} 个报告`
                        : '全选'}
                    </span>
                  </div>
                  
                  {selectedReports.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedReports([])}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        取消选择
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 网格视图 */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedReports.map((report) => (
                    <div key={report.id} className="card hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedReports.includes(report.id)}
                            onChange={() => handleSelectReport(report.id)}
                            className="mr-3"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{report.targetName}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              {getStatusIcon(report.status)}
                              <span className="ml-1">{getStatusText(report.status)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {report.status === 'completed' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">综合评分</span>
                            <span className={`font-semibold ${getScoreColor(report.score)}`}>
                              {report.score}分
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${report.score}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(report.riskLevel)}`}>
                          {getRiskText(report.riskLevel)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(report.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {report.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        {report.status === 'completed' ? (
                          <Link
                            to="/report"
                            onClick={() => handleViewReport(report)}
                            className="btn btn-primary flex-1 text-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            查看
                          </Link>
                        ) : (
                          <button
                            className="btn btn-primary flex-1 text-center opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            查看
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="btn btn-danger"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 列表视图 */}
              {viewMode === 'list' && (
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectedReports.length === sortedReports.length}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('name')}
                          >
                            <div className="flex items-center">
                              姓名
                              {sortBy === 'name' && (
                                sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                              )}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            状态
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('score')}
                          >
                            <div className="flex items-center">
                              评分
                              {sortBy === 'score' && (
                                sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                              )}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            风险等级
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('date')}
                          >
                            <div className="flex items-center">
                              创建时间
                              {sortBy === 'date' && (
                                sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                              )}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedReports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedReports.includes(report.id)}
                                onChange={() => handleSelectReport(report.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {report.targetName}
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {report.tags.map((tag, index) => (
                                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(report.status)}
                                <span className="ml-2 text-sm text-gray-900">
                                  {getStatusText(report.status)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {report.status === 'completed' ? (
                                <span className={`text-sm font-medium ${getScoreColor(report.score)}`}>
                                  {report.score}分
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(report.riskLevel)}`}>
                                {getRiskText(report.riskLevel)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(report.createdAt).toLocaleDateString('zh-CN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {report.status === 'completed' ? (
                                  <Link
                                    to="/report"
                                    onClick={() => handleViewReport(report)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Link>
                                ) : (
                                  <button
                                    className="text-gray-400 cursor-not-allowed"
                                    disabled
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteReport(report.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;