import { create } from 'zustand';

export interface Investigation {
  id: string;
  targetName: string;
  targetPhoto?: string;
  targetPhone?: string;
  targetLocation?: string;
  targetOccupation?: string;
  additionalInfo: {
    age?: number;
    occupation?: string;
    education?: string;
    location?: string;
    // 查询配置
    queryConfig?: {
      basicInfo?: boolean;
      creditCheck?: boolean;
      educationVerification?: boolean;
      workHistory?: boolean;
      socialMediaAnalysis?: boolean;
      riskAssessment?: boolean;
    };
    // 上传的照片文件名或路径
    photoFiles?: string[];
    // 相亲调查特殊字段
    datingInfo?: {
      gender?: string;
      height?: string;
      weight?: string;
      monthlyIncome?: string;
      hasHouse?: string;
      hasCar?: string;
      maritalStatus?: string;
      partnerAgeRange?: string;
      partnerHeightRange?: string;
      partnerEducation?: string;
      specialRequirements?: string;
    };
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  estimatedTime?: string;
  investigationType?: 'general' | 'dating'; // 调查类型
  aiAnalysis?: {
    isEnabled: boolean;
    suggestions: string[];
    riskPrediction: number;
    confidenceLevel: number;
  };
}

export interface Report {
  id: string;
  investigationId: string;
  analysisData: {
    overallScore: number;
    personalityTraits: Array<{ name: string; score: number }>;
    socialActivity: {
      platforms: Array<{ name: string; activity: number; credibility: number }>;
      totalPosts: number;
      avgEngagement: number;
    };
    riskAssessment: {
      level: 'low' | 'medium' | 'high';
      factors: string[];
      recommendations: string[];
    };
    relationships: Array<{ name: string; relationship: string; influence: number }>;
  };
  generatedAt: string;
  confidenceScore: number;
  aiGenerated?: {
    isAiGenerated: boolean;
    aiModel: string;
    aiConfidence: number;
    aiInsights: string[];
    humanReviewed: boolean;
  };
}

export interface APIUsageStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalTokensUsed: number;
  lastUsed?: string;
  averageResponseTime: number;
}

export interface AIConfig {
  isEnabled: boolean;
  selectedModel: 'gpt-4' | 'claude-3' | 'gemini-pro' | 'glm-4.6';
  analysisDepth: 'basic' | 'standard' | 'comprehensive';
  autoGenerate: boolean;
  humanReview: boolean;
  confidenceThreshold: number;
  apiKeys: {
    openai?: string;
    anthropic?: string;
    google?: string;
    zhipu?: string; // 智谱AI API密钥
  };
  apiEndpoints: {
    zhipu: string; // 智谱AI API端点
  };
  apiUsageStats: {
    openai: APIUsageStats;
    anthropic: APIUsageStats;
    google: APIUsageStats;
    zhipu: APIUsageStats;
  };
}

export interface AIAnalysisProgress {
  stage: 'initializing' | 'analyzing' | 'generating' | 'reviewing' | 'completed';
  progress: number;
  currentTask: string;
  estimatedTimeRemaining: number;
}

interface AppState {
  // Current investigation
  currentInvestigation: Investigation | null;
  currentReport: Report | null;
  
  // Lists
  investigations: Investigation[];
  reports: Report[];
  
  // UI State
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedFilters: string[];
  
  // AI State
  aiConfig: AIConfig;
  aiAnalysisProgress: AIAnalysisProgress | null;
  isAiProcessing: boolean;
  
  // Actions
  setCurrentInvestigation: (investigation: Investigation | null) => void;
  setCurrentReport: (report: Report | null) => void;
  addInvestigation: (investigation: Investigation) => void;
  updateInvestigation: (id: string, updates: Partial<Investigation>) => void;
  addReport: (report: Report) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: string[]) => void;
  clearError: () => void;
  
  // AI Actions
  updateAiConfig: (config: Partial<AIConfig>) => void;
  updateApiUsageStats: (provider: string, stats: Partial<APIUsageStats>) => void;
  setAiAnalysisProgress: (progress: AIAnalysisProgress | null) => void;
  setAiProcessing: (processing: boolean) => void;
  generateAiReport: (investigationId: string) => Promise<void>;
  getAiSuggestions: (investigation: Investigation) => Promise<string[]>;
  
  // Computed
  getInvestigationById: (id: string) => Investigation | undefined;
  getReportById: (id: string) => Report | undefined;
  getFilteredInvestigations: () => Investigation[];
  getFilteredReports: () => Report[];
  
  // Report Management
  updateReport: (reportId: string, updates: Partial<Report>) => void;
  deleteReport: (reportId: string) => void;
  deleteReports: (reportIds: string[]) => void;
  exportReports: (reportIds: string[]) => void;
  
  // Data Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // State
  currentInvestigation: null,
  currentReport: null,
  investigations: [],
  reports: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedFilters: [],
  
  // AI State
  aiConfig: {
    isEnabled: true,
    selectedModel: 'gpt-4',
    analysisDepth: 'standard',
    autoGenerate: false,
    humanReview: true,
    confidenceThreshold: 0.8,
    apiKeys: {
      openai: '',
      anthropic: '',
      google: '',
      zhipu: '', // 智谱AI API密钥
    },
    apiEndpoints: {
      zhipu: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', // 智谱AI API端点
    },
    apiUsageStats: {
      openai: { totalRequests: 0, successfulRequests: 0, failedRequests: 0, totalTokensUsed: 0, averageResponseTime: 0 },
      anthropic: { totalRequests: 0, successfulRequests: 0, failedRequests: 0, totalTokensUsed: 0, averageResponseTime: 0 },
      google: { totalRequests: 0, successfulRequests: 0, failedRequests: 0, totalTokensUsed: 0, averageResponseTime: 0 },
      zhipu: { totalRequests: 0, successfulRequests: 0, failedRequests: 0, totalTokensUsed: 0, averageResponseTime: 0 },
    },
  },
  aiAnalysisProgress: null,
  isAiProcessing: false,

  // Actions
  setCurrentInvestigation: (investigation) => {
    set({ currentInvestigation: investigation });
  },

  setCurrentReport: (report) => {
    set({ currentReport: report });
  },

  addInvestigation: (investigation) => {
    set(state => ({
      investigations: [...state.investigations, investigation]
    }));
    // 保存到localStorage
    const { investigations } = get();
    localStorage.setItem('detective-investigations', JSON.stringify(investigations));
  },

  updateInvestigation: (id, updates) => {
    set(state => ({
      investigations: state.investigations.map(inv =>
        inv.id === id ? { ...inv, ...updates } : inv
      )
    }));
    // 保存到localStorage
    const { investigations } = get();
    localStorage.setItem('detective-investigations', JSON.stringify(investigations));
  },

  addReport: (report) => {
    set(state => ({
      reports: [...state.reports, report]
    }));
    // 保存到localStorage
    const { reports } = get();
    localStorage.setItem('detective-reports', JSON.stringify(reports));
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setFilters: (filters) => {
    set({ selectedFilters: filters });
  },

  clearError: () => {
    set({ error: null });
  },

  // AI Actions
  updateAiConfig: (config) => {
    set(state => ({
      aiConfig: { ...state.aiConfig, ...config }
    }));
  },

  updateApiUsageStats: (provider, stats) => {
    set(state => ({
      aiConfig: {
        ...state.aiConfig,
        apiUsageStats: {
          ...state.aiConfig.apiUsageStats,
          [provider]: {
            ...state.aiConfig.apiUsageStats[provider as keyof typeof state.aiConfig.apiUsageStats],
            ...stats,
            lastUsed: new Date().toISOString(),
          }
        }
      }
    }));
  },

  setAiAnalysisProgress: (progress) => {
    set({ aiAnalysisProgress: progress });
  },

  setAiProcessing: (processing) => {
    set({ isAiProcessing: processing });
  },

  generateAiReport: async (investigationId) => {
    const { setAiProcessing, setAiAnalysisProgress, addReport, aiConfig, getInvestigationById } = get();
    
    try {
      setAiProcessing(true);
      
      const investigation = getInvestigationById(investigationId);
      if (!investigation) {
        throw new Error('调查记录不存在');
      }

      // 根据选择的AI模型进行不同的处理
      let aiReportContent = '';
      let aiInsights: string[] = [];
      let aiConfidence = 0.8;

      if (aiConfig.selectedModel === 'glm-4.6' && aiConfig.apiKeys.zhipu) {
        // 使用GLM-4.6生成报告
        const stages = [
          { stage: 'initializing', task: '初始化GLM-4.6分析引擎', duration: 800 },
          { stage: 'analyzing', task: '使用GLM-4.6分析用户数据和行为模式', duration: 2500 },
          { stage: 'generating', task: 'GLM-4.6生成智能报告内容', duration: 2000 },
          { stage: 'reviewing', task: '质量检查和优化', duration: 700 },
        ];

        for (let i = 0; i < stages.length; i++) {
          const stage = stages[i];
          setAiAnalysisProgress({
            stage: stage.stage as any,
            progress: (i / stages.length) * 100,
            currentTask: stage.task,
            estimatedTimeRemaining: stages.slice(i + 1).reduce((sum, s) => sum + s.duration, 0) / 1000,
          });
          
          if (stage.stage === 'analyzing') {
            try {
              // 调用GLM-4.6 API生成报告
              const { createGLMApiService } = await import('../services/glmApi');
              const glmService = createGLMApiService(aiConfig.apiKeys.zhipu);
              aiReportContent = await glmService.generateInvestigationReport(investigation);
              
              // 获取API使用统计并更新
              const stats = await glmService.getUsageStats();
              const { updateApiUsageStats } = get();
              updateApiUsageStats('zhipu', stats);
              
              aiConfidence = 0.92; // GLM-4.6的高置信度
              aiInsights = [
                '基于GLM-4.6的深度分析，该用户展现出较高的社交稳定性',
                '利用200K上下文窗口进行全面数据关联分析',
                '通过智谱AI的推理能力识别潜在风险模式',
                'GLM-4.6的高级编码能力提供了精准的行为预测',
              ];
            } catch (error) {
              console.warn('GLM-4.6 API调用失败，使用模拟数据:', error);
              // 更新失败统计
              const { updateApiUsageStats } = get();
              updateApiUsageStats('zhipu', { 
                totalRequests: (aiConfig.apiUsageStats.zhipu.totalRequests || 0) + 1,
                failedRequests: (aiConfig.apiUsageStats.zhipu.failedRequests || 0) + 1 
              });
              
              // 如果API调用失败，使用模拟数据
              aiReportContent = '基于GLM-4.6的模拟分析报告';
              aiInsights = ['GLM-4.6 API暂时不可用，使用本地分析结果'];
            }
          }
          
          await new Promise(resolve => setTimeout(resolve, stage.duration));
        }
      } else {
        // 使用其他模型或模拟分析
        const stages = [
          { stage: 'initializing', task: '初始化AI分析引擎', duration: 1000 },
          { stage: 'analyzing', task: '分析用户数据和行为模式', duration: 3000 },
          { stage: 'generating', task: '生成智能报告内容', duration: 2000 },
          { stage: 'reviewing', task: '质量检查和优化', duration: 1000 },
        ];

        for (let i = 0; i < stages.length; i++) {
          const stage = stages[i];
          setAiAnalysisProgress({
            stage: stage.stage as any,
            progress: (i / stages.length) * 100,
            currentTask: stage.task,
            estimatedTimeRemaining: stages.slice(i + 1).reduce((sum, s) => sum + s.duration, 0) / 1000,
          });
          
          await new Promise(resolve => setTimeout(resolve, stage.duration));
        }

        aiInsights = [
          '基于AI分析，该用户展现出较高的社交稳定性',
          '数据显示其个人信息的一致性较好',
          '建议关注其职业发展轨迹的真实性',
        ];
      }

      // 生成AI报告
      const aiReport: Report = {
        id: `ai-report-${Date.now()}`,
        investigationId,
        analysisData: {
          overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
          personalityTraits: [
            { name: '诚信度', score: Math.floor(Math.random() * 30) + 70 },
            { name: '责任感', score: Math.floor(Math.random() * 30) + 70 },
            { name: '稳定性', score: Math.floor(Math.random() * 30) + 70 },
            { name: '社交能力', score: Math.floor(Math.random() * 30) + 70 },
            { name: '情绪管理', score: Math.floor(Math.random() * 30) + 70 },
          ],
          socialActivity: {
            platforms: [
              { name: '微信朋友圈', activity: Math.floor(Math.random() * 50) + 50, credibility: Math.floor(Math.random() * 30) + 70 },
              { name: '微博', activity: Math.floor(Math.random() * 50) + 30, credibility: Math.floor(Math.random() * 30) + 60 },
              { name: '抖音', activity: Math.floor(Math.random() * 50) + 40, credibility: Math.floor(Math.random() * 30) + 65 },
            ],
            totalPosts: Math.floor(Math.random() * 500) + 100,
            avgEngagement: Math.floor(Math.random() * 50) + 25,
          },
          riskAssessment: {
            level: Math.random() > 0.7 ? 'medium' : 'low',
            factors: ['社交媒体活跃度正常', '个人信息一致性较高', '无明显风险信号'],
            recommendations: ['建议进一步了解职业背景', '可以考虑深入交往', '保持适当警惕'],
          },
          relationships: [
            { name: '家庭关系', relationship: '和睦', influence: Math.floor(Math.random() * 30) + 70 },
            { name: '朋友圈', relationship: '积极', influence: Math.floor(Math.random() * 30) + 60 },
            { name: '同事关系', relationship: '良好', influence: Math.floor(Math.random() * 30) + 65 },
          ],
        },
        generatedAt: new Date().toISOString(),
        confidenceScore: aiConfig.confidenceThreshold,
        aiGenerated: {
          isAiGenerated: true,
          aiModel: aiConfig.selectedModel,
          aiConfidence: aiConfidence,
          aiInsights: aiInsights,
          humanReviewed: false,
        },
      };

      addReport(aiReport);
      
      setAiAnalysisProgress({
        stage: 'completed',
        progress: 100,
        currentTask: 'AI分析完成',
        estimatedTimeRemaining: 0,
      });

    } catch (error) {
      console.error('AI报告生成失败:', error);
      set({ error: 'AI报告生成失败，请重试' });
    } finally {
      setAiProcessing(false);
      setTimeout(() => setAiAnalysisProgress(null), 2000);
    }
  },

  getAiSuggestions: async (investigation) => {
    const { aiConfig } = get();
    
    if (!aiConfig.isEnabled) {
      return [];
    }

    try {
      if (aiConfig.selectedModel === 'glm-4.6' && aiConfig.apiKeys.zhipu) {
        // 使用GLM-4.6生成建议
        const { createGLMApiService } = await import('../services/glmApi');
        const glmService = createGLMApiService(aiConfig.apiKeys.zhipu);
        const suggestions = await glmService.getAiSuggestions(investigation);
        
        // 获取API使用统计并更新
        const stats = await glmService.getUsageStats();
        const { updateApiUsageStats } = get();
        updateApiUsageStats('zhipu', stats);
        
        return suggestions.length > 0 ? suggestions : [
          '建议补充更多个人信息以提高GLM-4.6分析准确性',
          '可以添加社交媒体账号进行更全面的智能分析',
          'GLM-4.6建议验证职业信息的真实性',
          '利用GLM-4.6的200K上下文能力进行深度关联分析',
        ];
      } else {
        // 使用其他模型或模拟建议生成
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const suggestions = [
          '建议补充教育背景信息以提高分析准确性',
          '可以添加社交媒体账号进行更全面的分析',
          '建议上传更多照片以进行图像分析',
          '职业信息可以进一步验证',
          '建议收集更多联系方式进行交叉验证',
        ];

        return suggestions.slice(0, Math.floor(Math.random() * 3) + 2);
      }
    } catch (error) {
      console.error('AI建议生成失败:', error);
      
      // 如果是GLM-4.6调用失败，更新失败统计
      const { aiConfig } = get();
      if (aiConfig.selectedModel === 'glm-4.6' && aiConfig.apiKeys.zhipu) {
        const { updateApiUsageStats } = get();
        updateApiUsageStats('zhipu', {
          totalRequests: aiConfig.apiUsageStats.zhipu.totalRequests + 1,
          failedRequests: aiConfig.apiUsageStats.zhipu.failedRequests + 1,
        });
      }
      
      // 如果API调用失败，返回默认建议
      return [
        '建议补充更多个人信息以提高分析准确性',
        '可以添加社交媒体账号进行更全面的分析',
        '职业信息可以进一步验证',
      ];
    }
  },

  // Computed
  getInvestigationById: (id) => {
    return get().investigations.find(inv => inv.id === id);
  },

  getReportById: (id) => {
    return get().reports.find(report => report.id === id);
  },

  getFilteredInvestigations: () => {
    const { investigations, searchQuery, selectedFilters } = get();
    
    let filtered = investigations;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(inv =>
        inv.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.additionalInfo.occupation?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(inv =>
        selectedFilters.includes(inv.status)
      );
    }
    
    return filtered;
  },

  getFilteredReports: () => {
    const { reports, searchQuery } = get();
    
    if (!searchQuery) return reports;
    
    return reports.filter(report => {
      const investigation = get().getInvestigationById(report.investigationId);
      return investigation?.targetName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  },

  // 报告管理方法
  updateReport: (reportId, updates) => {
    set(state => ({
      reports: state.reports.map(report =>
        report.id === reportId ? { ...report, ...updates } : report
      )
    }));
    // 保存到localStorage
    const { reports } = get();
    localStorage.setItem('detective-reports', JSON.stringify(reports));
  },

  deleteReport: (reportId) => {
    set(state => ({
      reports: state.reports.filter(report => report.id !== reportId)
    }));
    // 保存到localStorage
    const { reports } = get();
    localStorage.setItem('detective-reports', JSON.stringify(reports));
  },

  deleteReports: (reportIds) => {
    set(state => ({
      reports: state.reports.filter(report => !reportIds.includes(report.id))
    }));
    // 保存到localStorage
    const { reports } = get();
    localStorage.setItem('detective-reports', JSON.stringify(reports));
  },

  exportReports: (reportIds) => {
    const { reports } = get();
    const reportsToExport = reports.filter(report => reportIds.includes(report.id));
    
    // 创建导出数据
    const exportData = {
      exportDate: new Date().toISOString(),
      reports: reportsToExport.map(report => ({
        ...report,
        investigation: get().getInvestigationById(report.investigationId)
      }))
    };

    // 创建下载链接
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `detective-reports-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // 数据持久化方法
  saveToLocalStorage: () => {
    const { investigations, reports, aiConfig } = get();
    localStorage.setItem('detective-investigations', JSON.stringify(investigations));
    localStorage.setItem('detective-reports', JSON.stringify(reports));
    localStorage.setItem('detective-ai-config', JSON.stringify(aiConfig));
  },

  loadFromLocalStorage: () => {
    try {
      const investigations = localStorage.getItem('detective-investigations');
      const reports = localStorage.getItem('detective-reports');
      const aiConfig = localStorage.getItem('detective-ai-config');

      if (investigations) {
        set({ investigations: JSON.parse(investigations) });
      }
      if (reports) {
        set({ reports: JSON.parse(reports) });
      }
      if (aiConfig) {
        set({ aiConfig: JSON.parse(aiConfig) });
      }
    } catch (error) {
      console.error('从localStorage加载数据失败:', error);
    }
  },

  clearLocalStorage: () => {
    localStorage.removeItem('detective-investigations');
    localStorage.removeItem('detective-reports');
    localStorage.removeItem('detective-ai-config');
  }
}));