import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Download, 
  Share2, 
  Eye,
  EyeOff,
  BarChart3,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle,
  FileText,
  Image as ImageIcon,
  Brain,
  Sparkles,
  Target,
  Zap,
  IdCard,
  CreditCard,
  Building,
  Database,
  Calendar,
  Award,
  TrendingDown as TrendingDownIcon,
  Clock,
  Globe,
  Phone,
  Mail,
  Home,
  Verified
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { showToast } from '../components/Toast';
import RadarChart from '../components/charts/RadarChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import NetworkGraph from '../components/charts/NetworkGraph';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Report: React.FC = () => {
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [aiReportGenerated, setAiReportGenerated] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(true);
  const { 
    currentReport, 
    currentInvestigation, 
    getInvestigationById, 
    aiConfig, 
    generateAiReport, 
    isAiProcessing,
    aiAnalysisProgress 
  } = useAppStore();

  // 专业背景调查报告数据
  const reportData = {
    targetInfo: {
      name: currentInvestigation?.targetName || (currentReport ? getInvestigationById(currentReport.investigationId)?.targetName || '未知' : '张伟'),
      idNumber: currentInvestigation?.targetPhone || '110101199001011234',
      age: 34,
      gender: '男',
      location: '北京市朝阳区',
      phone: '138****5678',
      email: 'zhang***@example.com',
      verificationScore: 92
    },
    // 基本信息核实
    basicVerification: {
      idVerified: true,
      nameVerified: true,
      phoneVerified: true,
      addressVerified: true,
      confidence: 98,
      verificationTime: '2024-01-15 10:30:25',
      dataSource: '公安部身份验证API'
    },
    // 教育背景
    education: {
      verified: true,
      degree: '本科',
      major: '计算机科学与技术',
      university: '北京理工大学',
      graduationYear: 2012,
      studentId: '20080****',
      confidence: 95,
      verificationTime: '2024-01-15 10:32:15',
      dataSource: '学信网API'
    },
    // 工作经历
    workHistory: [
      {
        company: '腾讯科技有限公司',
        position: '高级软件工程师',
        startDate: '2020-03',
        endDate: '至今',
        verified: true,
        confidence: 90,
        description: '负责微信支付核心系统开发'
      },
      {
        company: '百度在线网络技术公司',
        position: '软件工程师',
        startDate: '2015-07',
        endDate: '2020-02',
        verified: true,
        confidence: 88,
        description: '参与搜索引擎后端开发'
      },
      {
        company: '小米科技有限公司',
        position: '初级工程师',
        startDate: '2012-09',
        endDate: '2015-06',
        verified: true,
        confidence: 85,
        description: 'MIUI系统应用开发'
      }
    ],
    // 信用记录
    creditRecord: {
      creditScore: 750,
      level: 'excellent',
      loanHistory: {
        totalLoans: 2,
        activeLoans: 1,
        overdueCount: 0,
        maxOverdueDays: 0
      },
      creditCards: {
        totalCards: 3,
        totalLimit: 180000,
        utilization: 15
      },
      riskIndicators: [],
      lastUpdated: '2024-01-10',
      dataSource: '征信中心API'
    },
    // 社交媒体分析
    socialMedia: {
      platforms: [
        {
          name: '微信朋友圈',
          activity: 'moderate',
          posts: 156,
          sentiment: 'positive',
          riskScore: 2
        },
        {
          name: '微博',
          activity: 'low',
          posts: 45,
          sentiment: 'neutral',
          riskScore: 1
        },
        {
          name: 'LinkedIn',
          activity: 'high',
          posts: 89,
          sentiment: 'professional',
          riskScore: 0
        }
      ],
      overallSentiment: 'positive',
      riskLevel: 'low',
      lastAnalyzed: '2024-01-15 10:35:42'
    },
    // 风险评估
    riskAssessment: {
      overallRisk: 'low',
      riskScore: 15, // 0-100, 越低越好
      categories: {
        financial: { level: 'low', score: 10, factors: ['信用记录良好', '收入稳定'] },
        professional: { level: 'low', score: 8, factors: ['工作履历清晰', '职业发展稳定'] },
        social: { level: 'low', score: 12, factors: ['社交媒体表现正常', '无不良言论'] },
        legal: { level: 'low', score: 5, factors: ['无犯罪记录', '无法律纠纷'] }
      },
      recommendations: [
        '该人员整体风险较低，背景调查结果良好',
        '建议定期更新信用记录监控',
        '可考虑进行更深入的职业背景核实'
      ]
    },
    overallScore: 88,
    credibilityScore: 94,
    completionTime: '30秒',
    reportId: 'RPT-2024011500001',
    // 优势特点
    strengths: [
      '身份信息核实准确，真实性高',
      '教育背景清晰，学历认证通过',
      '工作经历连续，职业发展稳定',
      '信用记录良好，无不良记录',
      '社交媒体表现正常，无负面信息'
    ],
    // 关注点
    concerns: [
      '建议进一步核实最新工作状态',
      '关注信用卡使用情况变化',
      '定期监控社交媒体动态'
    ],
    // 交往建议
    recommendations: [
      '该人员背景调查结果良好，可以考虑建立合作关系',
      '建议定期更新背景信息，保持信息的时效性',
      '在重要合作前可进行补充调查'
    ]
  };

  // 专业背景调查图表数据
  const verificationRadarData = [
    { subject: '身份核实', score: 98, fullMark: 100 },
    { subject: '教育背景', score: 95, fullMark: 100 },
    { subject: '工作经历', score: 88, fullMark: 100 },
    { subject: '信用记录', score: 92, fullMark: 100 },
    { subject: '社交媒体', score: 85, fullMark: 100 },
    { subject: '风险评估', score: 90, fullMark: 100 }
  ];

  const riskDistributionData = [
    { name: '低风险', value: 85, color: '#10B981' },
    { name: '中风险', value: 12, color: '#F59E0B' },
    { name: '高风险', value: 3, color: '#EF4444' }
  ];

  const dataSourceBarData = [
    { name: '公安部API', value: 98 },
    { name: '学信网API', value: 95 },
    { name: '征信中心API', value: 92 },
    { name: '工商信息API', value: 88 },
    { name: '社交媒体API', value: 85 }
  ];

  const networkNodes = [
    { id: '1', name: '张三', type: 'target' as const },
    { id: '2', name: '李四', type: 'friend' as const },
    { id: '3', name: '王五', type: 'colleague' as const },
    { id: '4', name: '赵六', type: 'family' as const },
    { id: '5', name: '钱七', type: 'romantic' as const },
    { id: '6', name: '孙八', type: 'friend' as const }
  ];

  const networkConnections = [
    { from: '1', to: '2', type: 'friend' as const, strength: 4 },
    { from: '1', to: '3', type: 'colleague' as const, strength: 3 },
    { from: '1', to: '4', type: 'family' as const, strength: 5 },
    { from: '1', to: '5', type: 'romantic' as const, strength: 2 },
    { from: '1', to: '6', type: 'friend' as const, strength: 3 },
    { from: '2', to: '6', type: 'friend' as const, strength: 4 }
  ];

  // 职业发展时间线
  const careerTimelineData = [
    { 
      period: '2020-03至今', 
      event: '加入腾讯科技', 
      type: 'work',
      position: '高级软件工程师',
      verified: true
    },
    { 
      period: '2015-07至2020-02', 
      event: '加入百度', 
      type: 'work',
      position: '软件工程师',
      verified: true
    },
    { 
      period: '2012-09至2015-06', 
      event: '加入小米科技', 
      type: 'work',
      position: '初级工程师',
      verified: true
    },
    { 
      period: '2012-06', 
      event: '北京理工大学毕业', 
      type: 'education',
      degree: '计算机科学与技术学士',
      verified: true
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low':
        return '低风险';
      case 'medium':
        return '中等风险';
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

  // 导出PDF功能
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('report-content');
      if (!element) {
        throw new Error('报告内容未找到');
      }

      showToast.loading('正在生成PDF...');
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`背景调查报告-${reportData.targetInfo.name}-${new Date().toLocaleDateString()}.pdf`);
      showToast.success('PDF导出成功！');
    } catch (error) {
      console.error('PDF导出失败:', error);
      showToast.error('PDF导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 导出图片功能
  const exportToImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('report-content');
      if (!element) {
        throw new Error('报告内容未找到');
      }

      showToast.loading('正在生成图片...');
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `背景调查报告-${reportData.targetInfo.name}-${new Date().toLocaleDateString()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      showToast.success('图片导出成功！');
    } catch (error) {
      console.error('图片导出失败:', error);
      showToast.error('图片导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 分享功能
  const shareReport = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${reportData.targetInfo.name}的背景调查报告`,
          text: `查看${reportData.targetInfo.name}的详细背景调查报告`,
          url: window.location.href
        });
        showToast.success('分享成功！');
      } else {
        // 复制链接到剪贴板
        await navigator.clipboard.writeText(window.location.href);
        showToast.success('链接已复制到剪贴板！');
      }
    } catch (error) {
      console.error('分享失败:', error);
      showToast.error('分享失败，请重试');
    }
  };

  // AI报告生成功能
  const handleGenerateAiReport = async () => {
    if (!currentInvestigation) {
      showToast.error('未找到调查信息');
      return;
    }

    try {
      await generateAiReport(currentInvestigation.id);
      setAiReportGenerated(true);
      showToast.success('AI报告生成完成！');
    } catch (error) {
      showToast.error('AI报告生成失败');
    }
  };

  // 组件加载时自动生成AI报告
  useEffect(() => {
    if (aiConfig.isEnabled && aiConfig.autoGenerate && currentInvestigation && !aiReportGenerated) {
      handleGenerateAiReport();
    }
  }, [aiConfig.isEnabled, aiConfig.autoGenerate, currentInvestigation]);

  // 模拟AI生成的报告数据
  const aiGeneratedData = currentReport?.aiGenerated ? {
    aiInsights: currentReport.aiGenerated.aiInsights || [
      '基于社交媒体分析，目标人物表现出较强的社交能力',
      '职业发展轨迹稳定，无明显异常跳槽记录',
      '网络行为模式显示良好的数字素养和责任感',
      '人际关系网络健康，朋友圈质量较高'
    ],
    aiConfidence: currentReport.aiGenerated.aiConfidence || 0.85,
    aiModel: currentReport.aiGenerated.aiModel || 'GPT-4',
    riskAssessment: {
      financialRisk: 'low',
      socialRisk: 'low', 
      professionalRisk: 'medium',
      personalRisk: 'low'
    },
    recommendations: [
      '建议进一步核实职业背景信息',
      '可以考虑进行更深入的财务状况调查',
      '建议关注其社交媒体动态变化'
    ]
  } : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 页面标题和操作按钮 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              背景调查报告
            </h1>
            <p className="text-gray-600">
              生成时间：{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
            
            {/* AI Status Indicator */}
            {aiConfig.isEnabled && (
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700 font-medium">AI增强分析</span>
                  {isAiProcessing && (
                    <div className="ml-2 animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                  )}
                </div>
                
                {aiGeneratedData && (
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-700">
                      AI可信度: {Math.round(aiGeneratedData.aiConfidence * 100)}%
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            {/* AI Report Generation Button */}
            {aiConfig.isEnabled && !aiReportGenerated && (
              <button
                onClick={handleGenerateAiReport}
                disabled={isAiProcessing}
                className="btn btn-primary flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <Brain className="w-4 h-4" />
                <span>{isAiProcessing ? 'AI分析中...' : '生成AI报告'}</span>
              </button>
            )}
            
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>导出PDF</span>
            </button>
            
            <button
              onClick={exportToImage}
              disabled={isExporting}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>导出图片</span>
            </button>
            
            <button
              onClick={shareReport}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* 报告内容 */}
        <div id="report-content" className="bg-white rounded-lg shadow-lg p-8">
          {/* 报告头部信息 */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">背景调查报告</h1>
                <p className="text-gray-600 mt-2">报告编号: {reportData.reportId}</p>
                <p className="text-gray-600">生成时间: {new Date().toLocaleString('zh-CN')}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">完成时间</div>
                <div className="text-2xl font-bold text-green-600">{reportData.completionTime}</div>
                <div className="text-sm text-gray-600">可信度: {reportData.credibilityScore}%</div>
              </div>
            </div>
          </div>

          {/* 基本信息核实 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <IdCard className="w-6 h-6 text-blue-600 mr-2" />
              基本信息核实
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 个人基本信息 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">个人信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">姓名</span>
                    <div className="flex items-center">
                      <span className="text-gray-900 mr-2">{reportData.targetInfo.name}</span>
                      {reportData.basicVerification.nameVerified && (
                        <Verified className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">身份证号</span>
                    <div className="flex items-center">
                      <span className="text-gray-900 mr-2">{reportData.targetInfo.idNumber}</span>
                      {reportData.basicVerification.idVerified && (
                        <Verified className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">性别</span>
                    <span className="text-gray-900">{reportData.targetInfo.gender}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">年龄</span>
                    <span className="text-gray-900">{reportData.targetInfo.age}岁</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">手机号</span>
                    <div className="flex items-center">
                      <span className="text-gray-900 mr-2">{reportData.targetInfo.phone}</span>
                      {reportData.basicVerification.phoneVerified && (
                        <Verified className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">邮箱</span>
                    <span className="text-gray-900">{reportData.targetInfo.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">地址</span>
                    <div className="flex items-center">
                      <span className="text-gray-900 mr-2">{reportData.targetInfo.location}</span>
                      {reportData.basicVerification.addressVerified && (
                        <Verified className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 核实状态 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">核实状态</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#10B981"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(reportData.basicVerification.confidence / 100) * 283} 283`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-green-600">
                          {reportData.basicVerification.confidence}%
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">身份核实可信度</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">数据源</span>
                      <span className="text-gray-900">{reportData.basicVerification.dataSource}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">核实时间</span>
                      <span className="text-gray-900">{reportData.basicVerification.verificationTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 教育背景 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
              教育背景
            </h2>
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">学历信息</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">学历</span>
                      <div className="flex items-center">
                        <span className="text-gray-900 mr-2">{reportData.education.degree}</span>
                        {reportData.education.verified && (
                          <Verified className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">专业</span>
                      <span className="text-gray-900">{reportData.education.major}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">学校</span>
                      <span className="text-gray-900">{reportData.education.university}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">毕业年份</span>
                      <span className="text-gray-900">{reportData.education.graduationYear}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">学号</span>
                      <span className="text-gray-900">{reportData.education.studentId}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">验证信息</h3>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 120 120">
                          <circle
                            cx="60"
                            cy="60"
                            r="45"
                            stroke="#E5E7EB"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="45"
                            stroke="#3B82F6"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(reportData.education.confidence / 100) * 283} 283`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600">
                            {reportData.education.confidence}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">学历验证可信度</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">数据源</span>
                        <span className="text-gray-900">{reportData.education.dataSource}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">验证时间</span>
                        <span className="text-gray-900">{reportData.education.verificationTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 工作经历 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
              工作经历
            </h2>
            <div className="space-y-4">
              {reportData.workHistory.map((work, index) => (
                <div key={index} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Building className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">{work.company}</h3>
                        {work.verified && (
                          <Verified className="w-4 h-4 text-green-600 ml-2" />
                        )}
                      </div>
                      <p className="text-gray-700 font-medium mb-1">{work.position}</p>
                      <p className="text-gray-600 text-sm mb-2">{work.startDate} - {work.endDate}</p>
                      <p className="text-gray-700 text-sm">{work.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600">可信度</div>
                      <div className="text-lg font-bold text-blue-600">{work.confidence}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 信用记录 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              信用记录
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 信用评分 */}
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">信用评分</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#10B981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(reportData.creditRecord.creditScore / 850) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-green-600">
                      {reportData.creditRecord.creditScore}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">满分850分</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    reportData.creditRecord.level === 'excellent' ? 'bg-green-100 text-green-800' :
                    reportData.creditRecord.level === 'good' ? 'bg-blue-100 text-blue-800' :
                    reportData.creditRecord.level === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reportData.creditRecord.level === 'excellent' ? '优秀' :
                     reportData.creditRecord.level === 'good' ? '良好' :
                     reportData.creditRecord.level === 'fair' ? '一般' : '较差'}
                  </span>
                </div>
              </div>

              {/* 贷款记录 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">贷款记录</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">总贷款数</span>
                    <span className="text-gray-900 font-medium">{reportData.creditRecord.loanHistory.totalLoans}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">活跃贷款</span>
                    <span className="text-gray-900 font-medium">{reportData.creditRecord.loanHistory.activeLoans}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">逾期次数</span>
                    <span className={`font-medium ${
                      reportData.creditRecord.loanHistory.overdueCount === 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {reportData.creditRecord.loanHistory.overdueCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">最长逾期天数</span>
                    <span className={`font-medium ${
                      reportData.creditRecord.loanHistory.maxOverdueDays === 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {reportData.creditRecord.loanHistory.maxOverdueDays}天
                    </span>
                  </div>
                </div>
              </div>

              {/* 信用卡记录 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">信用卡记录</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">信用卡数量</span>
                    <span className="text-gray-900 font-medium">{reportData.creditRecord.creditCards.totalCards}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">总额度</span>
                    <span className="text-gray-900 font-medium">¥{reportData.creditRecord.creditCards.totalLimit.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">使用率</span>
                    <span className={`font-medium ${
                      reportData.creditRecord.creditCards.utilization < 30 ? 'text-green-600' : 
                      reportData.creditRecord.creditCards.utilization < 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {reportData.creditRecord.creditCards.utilization}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-1">使用率</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          reportData.creditRecord.creditCards.utilization < 30 ? 'bg-green-500' : 
                          reportData.creditRecord.creditCards.utilization < 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${reportData.creditRecord.creditCards.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              数据来源: {reportData.creditRecord.dataSource} | 最后更新: {reportData.creditRecord.lastUpdated}
            </div>
          </div>

          {/* 社交媒体分析 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 text-blue-600 mr-2" />
              社交媒体分析
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 平台分析 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">平台活跃度</h3>
                <div className="space-y-4">
                  {reportData.socialMedia.platforms.map((platform, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{platform.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          platform.riskScore === 0 ? 'bg-green-100 text-green-800' :
                          platform.riskScore <= 2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          风险: {platform.riskScore}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">活跃度</div>
                          <div className="font-medium text-gray-900">
                            {platform.activity === 'high' ? '高' :
                             platform.activity === 'moderate' ? '中' : '低'}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">发帖数</div>
                          <div className="font-medium text-gray-900">{platform.posts}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">情感倾向</div>
                          <div className={`font-medium ${
                            platform.sentiment === 'positive' ? 'text-green-600' :
                            platform.sentiment === 'neutral' ? 'text-gray-600' :
                            platform.sentiment === 'professional' ? 'text-blue-600' :
                            'text-red-600'
                          }`}>
                            {platform.sentiment === 'positive' ? '积极' :
                             platform.sentiment === 'neutral' ? '中性' :
                             platform.sentiment === 'professional' ? '专业' : '消极'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 总体评估 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">总体评估</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {reportData.socialMedia.overallSentiment === 'positive' ? '积极' :
                       reportData.socialMedia.overallSentiment === 'neutral' ? '中性' : '消极'}
                    </div>
                    <p className="text-gray-600">整体情感倾向</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">风险等级</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        reportData.socialMedia.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                        reportData.socialMedia.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reportData.socialMedia.riskLevel === 'low' ? '低风险' :
                         reportData.socialMedia.riskLevel === 'medium' ? '中风险' : '高风险'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      最后分析时间: {reportData.socialMedia.lastAnalyzed}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 风险评估 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 text-blue-600 mr-2" />
              风险评估
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 总体风险 */}
              <div className="card text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">总体风险评分</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#10B981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${((100 - reportData.riskAssessment.riskScore) / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-green-600">
                      {100 - reportData.riskAssessment.riskScore}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">安全评分 (满分100)</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    reportData.riskAssessment.overallRisk === 'low' ? 'bg-green-100 text-green-800' :
                    reportData.riskAssessment.overallRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reportData.riskAssessment.overallRisk === 'low' ? '低风险' :
                     reportData.riskAssessment.overallRisk === 'medium' ? '中风险' : '高风险'}
                  </span>
                </div>
              </div>

              {/* 分类风险 */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">分类风险分析</h3>
                <div className="space-y-4">
                  {Object.entries(reportData.riskAssessment.categories).map(([key, category]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {key === 'financial' ? '财务风险' :
                           key === 'professional' ? '职业风险' :
                           key === 'social' ? '社交风险' : '法律风险'}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          category.level === 'low' ? 'bg-green-100 text-green-800' :
                          category.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {category.level === 'low' ? '低' :
                           category.level === 'medium' ? '中' : '高'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">风险评分: {category.score}/100</div>
                      <div className="space-y-1">
                        {category.factors.map((factor, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 风险建议 */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                风险建议
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportData.riskAssessment.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 综合评分卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 综合评分 */}
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">综合评分</h3>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(reportData.overallScore / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(reportData.overallScore)}`}>
                    {reportData.overallScore}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">满分100分</p>
            </div>

            {/* 可信度评分 */}
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">可信度评分</h3>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#10B981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(reportData.credibilityScore / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {reportData.credibilityScore}%
                  </span>
                </div>
              </div>
              <p className="text-gray-600">数据可信度</p>
            </div>

            {/* 完成时间 */}
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">完成时间</h3>
              <div className="mb-4">
                <Clock className="w-16 h-16 mx-auto text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {reportData.completionTime}
              </div>
              <p className="text-gray-600">查询完成</p>
            </div>
          </div>

          {/* AI智能洞察 */}
          {aiGeneratedData && showAiInsights && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Brain className="w-6 h-6 text-blue-600 mr-2" />
                  AI智能洞察
                </h2>
                <button
                  onClick={() => setShowAiInsights(!showAiInsights)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showAiInsights ? '隐藏' : '显示'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI洞察分析 */}
                <div className="card">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">智能分析</h3>
                  </div>
                  <div className="space-y-3">
                    {aiGeneratedData.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI模型:</span>
                      <span className="font-medium text-gray-900">{aiGeneratedData.aiModel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-600">可信度:</span>
                      <span className="font-medium text-green-600">
                        {Math.round(aiGeneratedData.aiConfidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI风险评估 */}
                <div className="card">
                  <div className="flex items-center mb-4">
                    <Target className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">风险评估</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">财务风险</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        aiGeneratedData.riskAssessment.financialRisk === 'low' ? 'bg-green-100 text-green-800' :
                        aiGeneratedData.riskAssessment.financialRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {aiGeneratedData.riskAssessment.financialRisk === 'low' ? '低' :
                         aiGeneratedData.riskAssessment.financialRisk === 'medium' ? '中' : '高'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">社交风险</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        aiGeneratedData.riskAssessment.socialRisk === 'low' ? 'bg-green-100 text-green-800' :
                        aiGeneratedData.riskAssessment.socialRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {aiGeneratedData.riskAssessment.socialRisk === 'low' ? '低' :
                         aiGeneratedData.riskAssessment.socialRisk === 'medium' ? '中' : '高'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">职业风险</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        aiGeneratedData.riskAssessment.professionalRisk === 'low' ? 'bg-green-100 text-green-800' :
                        aiGeneratedData.riskAssessment.professionalRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {aiGeneratedData.riskAssessment.professionalRisk === 'low' ? '低' :
                         aiGeneratedData.riskAssessment.professionalRisk === 'medium' ? '中' : '高'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">个人风险</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        aiGeneratedData.riskAssessment.personalRisk === 'low' ? 'bg-green-100 text-green-800' :
                        aiGeneratedData.riskAssessment.personalRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {aiGeneratedData.riskAssessment.personalRisk === 'low' ? '低' :
                         aiGeneratedData.riskAssessment.personalRisk === 'medium' ? '中' : '高'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI建议 */}
                <div className="card lg:col-span-2">
                  <div className="flex items-center mb-4">
                    <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">AI建议</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiGeneratedData.recommendations.map((recommendation, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-800 text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 数据可视化图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 身份核实分析 */}
            <div className="card">
              <RadarChart
                title="身份核实分析"
                data={verificationRadarData}
              />
            </div>

            {/* 风险分布 */}
            <div className="card">
              <PieChart
                title="风险分布"
                data={riskDistributionData}
              />
            </div>

            {/* 数据源可信度 */}
            <div className="card">
              <BarChart
                title="数据源可信度"
                data={dataSourceBarData}
              />
            </div>

            {/* 人际关系网络 */}
            <div className="card">
              <NetworkGraph
                title="人际关系网络"
                nodes={networkNodes}
                connections={networkConnections}
              />
            </div>
          </div>

          {/* 优势与关注点 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                优势特点
              </h3>
              <ul className="space-y-3">
                {reportData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                关注点
              </h3>
              <ul className="space-y-3">
                {reportData.concerns.map((concern, index) => (
                  <li key={index} className="flex items-start">
                    <TrendingDown className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 时间线 */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              个人发展时间线
            </h3>
            <div className="space-y-4">
              {careerTimelineData.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-32 text-sm text-gray-500 font-medium">
                    {item.period}
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    {item.verified ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{item.event}</p>
                    {item.position && (
                      <p className="text-sm text-gray-600">{item.position}</p>
                    )}
                    {item.degree && (
                      <p className="text-sm text-gray-600">{item.degree}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 敏感信息区域 */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                敏感信息
              </h3>
              <button
                onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                className="btn btn-secondary text-sm"
              >
                {showSensitiveInfo ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1" />
                    隐藏
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-1" />
                    显示
                  </>
                )}
              </button>
            </div>
            
            {showSensitiveInfo ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      手机号码
                    </label>
                    <p className="text-gray-900">138****5678</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱地址
                    </label>
                    <p className="text-gray-900">zhang***@example.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      身份证号
                    </label>
                    <p className="text-gray-900">110***********1234</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      家庭住址
                    </label>
                    <p className="text-gray-900">北京市朝阳区***小区</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>点击显示按钮查看敏感信息</p>
                <p className="text-sm">此信息仅供授权用户查看</p>
              </div>
            )}
          </div>

          {/* 建议与总结 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              交往建议
            </h3>
            <ul className="space-y-3 mb-6">
              {reportData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <MessageCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">总结</h4>
              <p className="text-blue-800 text-sm">
                根据综合分析，该人员整体表现良好，具有较高的可信度。
                建议在交往过程中保持理性，通过多种渠道了解对方，
                注意观察其在不同场合的表现，以做出最适合的判断。
              </p>
            </div>
          </div>

          {/* 免责声明 */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">免责声明</h4>
            <p className="text-sm text-gray-600">
              本报告基于公开信息和数据分析生成，仅供参考。报告内容不构成法律建议或保证，
              用户应结合实际情况做出独立判断。我们不对报告的准确性、完整性或时效性承担责任。
              使用本报告时，请遵守相关法律法规，尊重他人隐私权。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;