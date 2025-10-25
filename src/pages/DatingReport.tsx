import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { 
  User, Heart, Brain, TrendingUp, Download, Share2, 
  Star, MapPin, Briefcase, GraduationCap, Home, Car,
  Users, Target, AlertTriangle, CheckCircle, ArrowLeft,
  Activity, Award, BarChart3, FileText, Loader2
} from 'lucide-react';
import { 
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {
  CircularProgress,
  EnhancedRadarChart,
  GradientBarChart,
  DonutChart,
  MultiDimensionComparison,
  ScoreCard,
  CHART_COLORS,
  COLOR_PALETTE
} from '../components/charts';
import { generateAndDownloadReport, generatePDFFromElement, ReportData } from '../utils/pdfGenerator';
import { toast } from 'sonner';

const DatingReport: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getInvestigationById } = useAppStore();
  const [investigation, setInvestigation] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (id) {
      const foundInvestigation = getInvestigationById(id);
      if (foundInvestigation) {
        setInvestigation(foundInvestigation);
      } else {
        navigate('/investigations');
      }
    }
  }, [id, getInvestigationById, navigate]);

  // 模拟报告数据
  const reportData: ReportData = {
    // 基本信息汇总
    basicInfo: {
      name: investigation?.targetName || '张三',
      age: investigation?.additionalInfo?.datingInfo?.age || 28,
      gender: investigation?.additionalInfo?.datingInfo?.gender === 'male' ? '男' : '女',
      height: investigation?.additionalInfo?.datingInfo?.height || '175cm',
      weight: investigation?.additionalInfo?.datingInfo?.weight || '70kg',
      education: investigation?.additionalInfo?.datingInfo?.education || '本科',
      occupation: investigation?.additionalInfo?.datingInfo?.occupation || 'IT工程师',
      monthlyIncome: investigation?.additionalInfo?.datingInfo?.monthlyIncome || '15000-20000',
      hasHouse: investigation?.additionalInfo?.datingInfo?.hasHouse === 'yes' ? '有房' : '无房',
      hasCar: investigation?.additionalInfo?.datingInfo?.hasCar === 'yes' ? '有车' : '无车',
      maritalStatus: investigation?.additionalInfo?.datingInfo?.maritalStatus || '未婚'
    },
    
    // 性格特征分析
    personalityAnalysis: {
      traits: [
        { name: '外向性', value: 75, description: '善于社交，喜欢与人交往' },
        { name: '开放性', value: 82, description: '思维开放，接受新事物能力强' },
        { name: 'responsibility', value: 88, description: '做事认真负责，值得信赖' },
        { name: '情绪稳定性', value: 70, description: '情绪管理能力良好' },
        { name: '亲和力', value: 85, description: '待人友善，容易相处' }
      ],
      overallScore: 80,
      summary: '该用户性格较为均衡，具有良好的社交能力和responsibility，是理想的交往对象。',
      comparison: [
        { category: '外向性', user: 75, average: 65, ideal: 80 },
        { category: '开放性', user: 82, average: 70, ideal: 85 },
        { category: 'responsibility', user: 88, average: 75, ideal: 90 },
        { category: '情绪稳定', user: 70, average: 68, ideal: 85 },
        { category: '亲和力', user: 85, average: 72, ideal: 88 }
      ]
    },

    // 兴趣爱好匹配度
    interestAnalysis: {
      hobbies: [
        { name: '运动健身', value: 85, color: CHART_COLORS.primary, details: ['跑步', '游泳', '健身'] },
        { name: '文化艺术', value: 70, color: CHART_COLORS.secondary, details: ['阅读', '电影', '音乐'] },
        { name: '旅行探索', value: 90, color: CHART_COLORS.accent, details: ['国内旅游', '户外徒步'] },
        { name: '美食烹饪', value: 60, color: CHART_COLORS.danger, details: ['中式料理', '烘焙'] },
        { name: '科技数码', value: 95, color: CHART_COLORS.purple, details: ['编程', '游戏', '数码产品'] }
      ],
      compatibilityScore: 82,
      trendData: [
        { name: '运动健身', value: 85, trend: 88 },
        { name: '文化艺术', value: 70, trend: 75 },
        { name: '旅行探索', value: 90, trend: 92 },
        { name: '美食烹饪', value: 60, trend: 65 },
        { name: '科技数码', value: 95, trend: 98 }
      ]
    },

    // 价值观和生活方式
    lifestyleAnalysis: {
      values: [
        { name: '家庭观念', score: 90, status: 'excellent', trend: 'up', trendValue: 5 },
        { name: '事业心', score: 85, status: 'good', trend: 'stable', trendValue: 0 },
        { name: '消费观', score: 75, status: 'good', trend: 'up', trendValue: 3 },
        { name: '社交观', score: 80, status: 'good', trend: 'down', trendValue: -2 },
        { name: '健康意识', score: 88, status: 'excellent', trend: 'up', trendValue: 7 }
      ],
      lifestyle: [
        { name: '工作生活平衡', value: 78 },
        { name: '社交活跃度', value: 82 },
        { name: '健康意识', value: 85 },
        { name: '理财能力', value: 75 }
      ]
    },

    // 潜在匹配度评分
    matchingScore: {
      overall: 85,
      categories: [
        { name: '基本条件', score: 88, weight: 25 },
        { name: '性格匹配', score: 82, weight: 30 },
        { name: '兴趣爱好', score: 85, weight: 20 },
        { name: '价值观念', score: 87, weight: 25 }
      ],
      recommendation: 'highly_recommended'
    },

    // 风险评估
    riskAssessment: {
      level: 'low',
      factors: [
        { type: 'positive', text: '教育背景良好，职业稳定' },
        { type: 'positive', text: '性格开朗，社交能力强' },
        { type: 'positive', text: '有明确的人生规划' },
        { type: 'neutral', text: '工作较忙，需要平衡工作与生活' }
      ],
      trustScore: 92
    }
  };

  // 扩展的报告数据（用于图表显示）
  const extendedReportData = {
    ...reportData,
    personalityAnalysis: {
      ...reportData.personalityAnalysis,
      comparison: [
        { category: '外向性', user: 75, average: 65, ideal: 80 },
        { category: '开放性', user: 82, average: 70, ideal: 85 },
        { category: 'responsibility', user: 88, average: 75, ideal: 90 },
        { category: '情绪稳定', user: 70, average: 68, ideal: 85 },
        { category: '亲和力', user: 85, average: 72, ideal: 88 }
      ]
    },
    interestAnalysis: {
      ...reportData.interestAnalysis,
      hobbies: [
        { name: '运动健身', value: 85, color: CHART_COLORS.primary, details: ['跑步', '游泳', '健身'] },
        { name: '文化艺术', value: 70, color: CHART_COLORS.secondary, details: ['阅读', '电影', '音乐'] },
        { name: '旅行探索', value: 90, color: CHART_COLORS.accent, details: ['国内旅游', '户外徒步'] },
        { name: '美食烹饪', value: 60, color: CHART_COLORS.danger, details: ['中式料理', '烘焙'] },
        { name: '科技数码', value: 95, color: CHART_COLORS.purple, details: ['编程', '游戏', '数码产品'] }
      ]
    },
    lifestyleAnalysis: {
      ...reportData.lifestyleAnalysis,
      values: [
        { name: '家庭观念', score: 90, status: 'excellent', trend: 'up', trendValue: 5 },
        { name: '事业心', score: 85, status: 'good', trend: 'stable', trendValue: 0 },
        { name: '消费观', score: 75, status: 'good', trend: 'up', trendValue: 3 },
        { name: '社交观', score: 80, status: 'good', trend: 'down', trendValue: -2 },
        { name: '健康意识', score: 88, status: 'excellent', trend: 'up', trendValue: 7 }
      ],
      lifestyle: [
        { name: '工作生活平衡', value: 78 },
        { name: '社交活跃度', value: 82 },
        { name: '健康意识', value: 85 },
        { name: '理财能力', value: 75 }
      ]
    }
  };

  // 下载PDF报告（文本版本）
  const handleDownloadTextPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const filename = `${reportData.basicInfo.name}_相亲调查报告_${new Date().toISOString().split('T')[0]}.pdf`;
      await generateAndDownloadReport(reportData, filename);
      toast.success('PDF报告生成成功！');
    } catch (error) {
      console.error('PDF生成失败:', error);
      toast.error('PDF生成失败，请重试');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 下载PDF报告（图表版本）
  const handleDownloadVisualPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const filename = `${reportData.basicInfo.name}_可视化报告_${new Date().toISOString().split('T')[0]}.pdf`;
      await generatePDFFromElement('report-content', filename);
      toast.success('可视化PDF报告生成成功！');
    } catch (error) {
      console.error('PDF生成失败:', error);
      toast.error('PDF生成失败，请重试');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    // 复制报告链接到剪贴板
    const reportUrl = window.location.href;
    navigator.clipboard.writeText(reportUrl).then(() => {
      toast.success('报告链接已复制到剪贴板');
    }).catch(() => {
      toast.error('复制失败，请手动复制链接');
    });
  };

  if (!investigation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">报告未找到</h2>
          <p className="text-gray-600 mb-4">请检查报告ID是否正确</p>
          <button
            onClick={() => navigate('/investigations')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            返回调查列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/investigations')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  相亲背景调查报告
                </h1>
                <p className="text-gray-600">
                  调查对象: {reportData.basicInfo.name} | 生成时间: {new Date().toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </button>
              
              {/* PDF下载按钮组 */}
              <div className="relative group">
                <button
                  disabled={isGeneratingPDF}
                  className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  下载PDF
                </button>
                
                {/* 下拉菜单 */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={handleDownloadTextPDF}
                    disabled={isGeneratingPDF}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    文本版报告
                  </button>
                  <button
                    onClick={handleDownloadVisualPDF}
                    disabled={isGeneratingPDF}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    可视化报告
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: '综合概览', icon: Target },
                { id: 'basic', label: '基本信息', icon: User },
                { id: 'personality', label: '性格分析', icon: Brain },
                { id: 'interests', label: '兴趣爱好', icon: Heart },
                { id: 'lifestyle', label: '生活方式', icon: TrendingUp },
                { id: 'matching', label: '匹配评分', icon: Star }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div id="report-content" className="space-y-8">
          {/* 综合概览 */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 总体评分 - 使用CircularProgress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">总体匹配度</h3>
                <div className="flex justify-center">
                  <CircularProgress
                    value={extendedReportData.matchingScore.overall}
                    size={140}
                    strokeWidth={12}
                    color={CHART_COLORS.primary}
                    label="优秀匹配"
                  />
                </div>
                <div className="text-center mt-4">
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">推荐指数: 5星</p>
                </div>
              </div>

              {/* 关键指标 - 使用ScoreCard */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">关键指标</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extendedReportData.matchingScore.categories.map((category, index) => (
                    <ScoreCard
                      key={category.name}
                      title={category.name}
                      score={category.score}
                      description={`权重: ${category.weight}%`}
                      color={COLOR_PALETTE[index]}
                      icon={
                        category.name === '基本条件' ? <User className="h-5 w-5" /> :
                        category.name === '性格匹配' ? <Brain className="h-5 w-5" /> :
                        category.name === '兴趣爱好' ? <Heart className="h-5 w-5" /> :
                        <Award className="h-5 w-5" />
                      }
                    />
                  ))}
                </div>
              </div>

              {/* 风险评估 */}
              <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">风险评估</h3>
                <div className="flex items-center mb-4">
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${extendedReportData.riskAssessment.level === 'low' ? 'bg-green-100 text-green-800' : 
                      extendedReportData.riskAssessment.level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {extendedReportData.riskAssessment.level === 'low' ? '低风险' : 
                     extendedReportData.riskAssessment.level === 'medium' ? '中等风险' : '高风险'}
                  </div>
                  <div className="ml-4 flex items-center">
                    <span className="text-sm text-gray-600 mr-2">信任度:</span>
                    <CircularProgress
                      value={extendedReportData.riskAssessment.trustScore}
                      size={40}
                      strokeWidth={4}
                      color={CHART_COLORS.secondary}
                      showPercentage={false}
                    />
                    <span className="ml-2 font-semibold text-green-600">
                      {extendedReportData.riskAssessment.trustScore}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extendedReportData.riskAssessment.factors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      {factor.type === 'positive' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : factor.type === 'negative' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      ) : (
                        <div className="h-5 w-5 bg-yellow-500 rounded-full mt-0.5" />
                      )}
                      <span className="text-sm text-gray-700">{factor.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 基本信息 */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">基本信息汇总</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: User, label: '姓名', value: reportData.basicInfo.name },
                  { icon: User, label: '年龄', value: `${reportData.basicInfo.age}岁` },
                  { icon: User, label: '性别', value: reportData.basicInfo.gender },
                  { icon: TrendingUp, label: '身高', value: reportData.basicInfo.height },
                  { icon: TrendingUp, label: '体重', value: reportData.basicInfo.weight },
                  { icon: GraduationCap, label: '学历', value: reportData.basicInfo.education },
                  { icon: Briefcase, label: '职业', value: reportData.basicInfo.occupation },
                  { icon: TrendingUp, label: '月收入', value: reportData.basicInfo.monthlyIncome },
                  { icon: Home, label: '房产', value: reportData.basicInfo.hasHouse },
                  { icon: Car, label: '车辆', value: reportData.basicInfo.hasCar },
                  { icon: Heart, label: '婚姻状况', value: reportData.basicInfo.maritalStatus }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="font-medium text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 性格分析 */}
          {activeTab === 'personality' && (
            <div className="space-y-8">
              {/* 性格雷达图和对比分析 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 增强型雷达图 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">性格特征雷达图</h3>
                  <EnhancedRadarChart
                    data={extendedReportData.personalityAnalysis.traits}
                    height={300}
                    colors={[CHART_COLORS.primary]}
                  />
                </div>

                {/* 多维度对比图 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">性格对比分析</h3>
                  <MultiDimensionComparison
                    data={extendedReportData.personalityAnalysis.comparison}
                    height={300}
                  />
                </div>
              </div>

              {/* 详细分析 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">性格特征详解</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extendedReportData.personalityAnalysis.traits.map((trait, index) => (
                    <ScoreCard
                      key={trait.name}
                      title={trait.name}
                      score={trait.value}
                      description={trait.description}
                      color={COLOR_PALETTE[index]}
                      icon={<Activity className="h-5 w-5" />}
                    />
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">综合评价</h4>
                  <p className="text-sm text-blue-800">{extendedReportData.personalityAnalysis.summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* 兴趣爱好 */}
          {activeTab === 'interests' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 环形饼图 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">兴趣爱好分布</h3>
                  <DonutChart
                    data={extendedReportData.interestAnalysis.hobbies}
                    height={300}
                    innerRadius={60}
                    outerRadius={100}
                    centerContent={
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {extendedReportData.interestAnalysis.compatibilityScore}%
                        </div>
                        <div className="text-sm text-gray-600">匹配度</div>
                      </div>
                    }
                  />
                </div>

                {/* 渐变柱状图 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">兴趣强度分析</h3>
                  <GradientBarChart
                    data={extendedReportData.interestAnalysis.hobbies}
                    height={300}
                  />
                </div>
              </div>

              {/* 兴趣详情卡片 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">兴趣爱好详情</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {extendedReportData.interestAnalysis.hobbies.map((hobby, index) => (
                    <div key={hobby.name} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{hobby.name}</span>
                        <span className="text-blue-600 font-bold">{hobby.value}分</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${hobby.value}%`,
                            backgroundColor: hobby.color
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hobby.details.map((detail, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 生活方式 */}
          {activeTab === 'lifestyle' && (
            <div className="space-y-8">
              {/* 价值观评估卡片 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">价值观评估</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {extendedReportData.lifestyleAnalysis.values.map((value, index) => (
                    <ScoreCard
                      key={value.name}
                      title={value.name}
                      score={value.score}
                      color={
                        value.status === 'excellent' ? CHART_COLORS.secondary :
                        value.status === 'good' ? CHART_COLORS.primary :
                        CHART_COLORS.accent
                      }
                      icon={<BarChart3 className="h-5 w-5" />}
                      trend={value.trend as any}
                      trendValue={value.trendValue}
                    />
                  ))}
                </div>
              </div>

              {/* 生活方式分析 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">生活方式分析</h3>
                <GradientBarChart
                  data={extendedReportData.lifestyleAnalysis.lifestyle}
                  height={300}
                  orientation="horizontal"
                />
              </div>
            </div>
          )}

          {/* 匹配评分 */}
          {activeTab === 'matching' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">综合匹配评分</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 评分详情 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">各项评分详情</h4>
                  <div className="space-y-4">
                    {extendedReportData.matchingScore.categories.map((category, index) => (
                      <div key={category.name} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{category.name}</span>
                          <div className="text-right">
                            <span className="text-blue-600 font-bold">{category.score}分</span>
                            <span className="text-sm text-gray-600 ml-2">权重: {category.weight}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full"
                            style={{ width: `${category.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 推荐结果 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">推荐结果</h4>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                    <CircularProgress
                      value={extendedReportData.matchingScore.overall}
                      size={120}
                      strokeWidth={10}
                      color={CHART_COLORS.primary}
                      label="综合评分"
                    />
                    <div className="mt-4">
                      <div className="text-lg font-semibold text-gray-900 mb-2">
                        {extendedReportData.matchingScore.recommendation === 'highly_recommended' ? '强烈推荐' :
                         extendedReportData.matchingScore.recommendation === 'recommended' ? '推荐' : '一般推荐'}
                      </div>
                      <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${
                              star <= (extendedReportData.matchingScore.overall >= 90 ? 5 : 
                                     extendedReportData.matchingScore.overall >= 80 ? 4 : 
                                     extendedReportData.matchingScore.overall >= 70 ? 3 : 
                                     extendedReportData.matchingScore.overall >= 60 ? 2 : 1)
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        基于多维度分析，该用户具有很高的匹配潜力，建议进一步深入了解。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatingReport;