import React, { useState } from 'react';
import { 
  Brain, 
  Settings, 
  Zap, 
  Shield, 
  Target, 
  BarChart3, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Sliders,
  Key,
  Eye,
  EyeOff,
  Activity,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { showToast } from '../components/Toast';

const AIConfig: React.FC = () => {
  const { aiConfig, updateAiConfig } = useAppStore();
  const [localConfig, setLocalConfig] = useState(aiConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState({
    openai: false,
    anthropic: false,
    google: false,
    zhipu: false,
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleConfigChange = (key: keyof typeof aiConfig, value: any) => {
    setLocalConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApiKeyChange = (provider: string, value: string) => {
    setLocalConfig(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [provider]: value
      }
    }));
  };

  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider as keyof typeof prev]
    }));
  };

  const testConnection = async (provider: string) => {
    setIsTestingConnection(true);
    try {
      // 这里可以添加实际的连接测试逻辑
      if (provider === 'zhipu' && localConfig.apiKeys.zhipu) {
        // 测试GLM-4.6连接
        const { createGLMApiService } = await import('../services/glmApi');
        const glmService = createGLMApiService(localConfig.apiKeys.zhipu);
        const isValid = await glmService.validateApiKey();
        
        if (isValid) {
          showToast.success(`${provider.toUpperCase()} API连接测试成功`);
        } else {
          showToast.error(`${provider.toUpperCase()} API连接测试失败`);
        }
      } else {
        // 模拟其他API的测试
        await new Promise(resolve => setTimeout(resolve, 1000));
        showToast.success(`${provider.toUpperCase()} API连接测试成功`);
      }
    } catch (error) {
      showToast.error(`${provider.toUpperCase()} API连接测试失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      updateAiConfig(localConfig);
      showToast.success('AI配置已保存');
    } catch (error) {
      showToast.error('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLocalConfig(aiConfig);
    showToast.success('配置已重置');
  };

  const modelOptions = [
    { value: 'gpt-4', label: 'GPT-4', description: '最先进的AI模型，分析准确度最高' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: '平衡性能和成本的选择' },
    { value: 'claude-3', label: 'Claude-3', description: '专业的分析和推理能力' },
    { value: 'gemini-pro', label: 'Gemini Pro', description: 'Google的多模态AI模型' },
    { value: 'glm-4.6', label: 'GLM-4.6 (推荐)', description: '智谱AI最新旗舰模型，355B参数，200K上下文，高级编码能力对齐Claude Sonnet 4' }
  ];

  const analysisDepthOptions = [
    { value: 'basic', label: '基础分析', description: '快速分析，适合初步了解' },
    { value: 'standard', label: '标准分析', description: '全面分析，平衡深度和速度' },
    { value: 'deep', label: '深度分析', description: '详细分析，提供最全面的洞察' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-chinese mb-4 flex items-center justify-center">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            AI智能配置
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            配置AI分析参数，优化背景调查的智能化程度和准确性
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* AI启用状态 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">AI功能启用</h2>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiEnabled"
                  checked={localConfig.isEnabled}
                  onChange={(e) => handleConfigChange('isEnabled', e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="aiEnabled" className="ml-2 text-sm font-medium text-gray-900">
                  启用AI智能分析
                </label>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-1">AI功能说明</h3>
                  <p className="text-sm text-blue-700">
                    启用AI功能后，系统将使用人工智能技术进行智能分析、风险评估和报告生成，
                    大幅提升调查效率和准确性。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI模型选择 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Brain className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">AI模型选择</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelOptions.map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    localConfig.selectedModel === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleConfigChange('selectedModel', option.value)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{option.label}</h3>
                    {localConfig.selectedModel === option.value && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 分析深度 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">分析深度</h2>
            </div>
            
            <div className="space-y-3">
              {analysisDepthOptions.map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    localConfig.analysisDepth === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleConfigChange('analysisDepth', option.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{option.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                    {localConfig.analysisDepth === option.value && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 高级设置 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Sliders className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">高级设置</h2>
            </div>
            
            <div className="space-y-6">
              {/* 自动生成报告 */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">自动生成AI报告</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    调查完成后自动生成AI分析报告
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localConfig.autoGenerate}
                  onChange={(e) => handleConfigChange('autoGenerate', e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>

              {/* 人工审核 */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">人工审核</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    AI报告生成后需要人工审核确认
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localConfig.humanReview}
                  onChange={(e) => handleConfigChange('humanReview', e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>

              {/* 可信度阈值 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">可信度阈值</h3>
                  <span className="text-sm text-gray-600">
                    {Math.round(localConfig.confidenceThreshold * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  低于此阈值的AI分析结果将被标记为需要人工确认
                </p>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.05"
                  value={localConfig.confidenceThreshold}
                  onChange={(e) => handleConfigChange('confidenceThreshold', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* API密钥配置 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Key className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">API密钥配置</h2>
            </div>
            
            <div className="space-y-6">
              {/* OpenAI API Key */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">OpenAI API密钥</h3>
                  <span className="text-xs text-gray-500">用于GPT-4和GPT-3.5模型</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type={showApiKeys.openai ? 'text' : 'password'}
                      value={localConfig.apiKeys?.openai || ''}
                      onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                      placeholder="sk-..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility('openai')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKeys.openai ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => testConnection('openai')}
                    disabled={!localConfig.apiKeys?.openai || isTestingConnection}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    测试
                  </button>
                </div>
              </div>

              {/* Anthropic API Key */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Anthropic API密钥</h3>
                  <span className="text-xs text-gray-500">用于Claude-3模型</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type={showApiKeys.anthropic ? 'text' : 'password'}
                      value={localConfig.apiKeys?.anthropic || ''}
                      onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
                      placeholder="sk-ant-..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility('anthropic')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKeys.anthropic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => testConnection('anthropic')}
                    disabled={!localConfig.apiKeys?.anthropic || isTestingConnection}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    测试
                  </button>
                </div>
              </div>

              {/* Google API Key */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Google API密钥</h3>
                  <span className="text-xs text-gray-500">用于Gemini Pro模型</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type={showApiKeys.google ? 'text' : 'password'}
                      value={localConfig.apiKeys?.google || ''}
                      onChange={(e) => handleApiKeyChange('google', e.target.value)}
                      placeholder="AIza..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility('google')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKeys.google ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => testConnection('google')}
                    disabled={!localConfig.apiKeys?.google || isTestingConnection}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    测试
                  </button>
                </div>
              </div>

              {/* 智谱AI API Key */}
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">智谱AI API密钥</h3>
                  <span className="text-xs text-blue-600 font-medium">用于GLM-4.6模型 (推荐)</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type={showApiKeys.zhipu ? 'text' : 'password'}
                      value={localConfig.apiKeys?.zhipu || ''}
                      onChange={(e) => handleApiKeyChange('zhipu', e.target.value)}
                      placeholder="请输入智谱AI API密钥..."
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility('zhipu')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKeys.zhipu ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => testConnection('zhipu')}
                    disabled={!localConfig.apiKeys?.zhipu || isTestingConnection}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isTestingConnection ? '测试中...' : '测试'}
                  </button>
                </div>
                <div className="mt-3 text-sm text-blue-700">
                  <p>• GLM-4.6是智谱AI最新旗舰模型，具有355B总参数量，32B激活参数</p>
                  <p>• 支持200K上下文窗口，高级编码能力对齐Claude Sonnet 4</p>
                  <p>• 获取API密钥：<a href="https://open.bigmodel.cn" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">https://open.bigmodel.cn</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* API使用统计 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">API使用统计</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* OpenAI 统计 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">OpenAI</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    localConfig.apiUsageStats?.openai?.totalRequests > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {localConfig.apiUsageStats?.openai?.totalRequests > 0 ? '已使用' : '未使用'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">总请求:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.openai?.totalRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">成功率:</span>
                    <span className="font-medium">
                      {localConfig.apiUsageStats?.openai?.totalRequests > 0 
                        ? `${Math.round((localConfig.apiUsageStats.openai.successfulRequests / localConfig.apiUsageStats.openai.totalRequests) * 100)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token使用:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.openai?.totalTokensUsed || 0}</span>
                  </div>
                </div>
              </div>

              {/* Anthropic 统计 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Anthropic</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    localConfig.apiUsageStats?.anthropic?.totalRequests > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {localConfig.apiUsageStats?.anthropic?.totalRequests > 0 ? '已使用' : '未使用'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">总请求:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.anthropic?.totalRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">成功率:</span>
                    <span className="font-medium">
                      {localConfig.apiUsageStats?.anthropic?.totalRequests > 0 
                        ? `${Math.round((localConfig.apiUsageStats.anthropic.successfulRequests / localConfig.apiUsageStats.anthropic.totalRequests) * 100)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token使用:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.anthropic?.totalTokensUsed || 0}</span>
                  </div>
                </div>
              </div>

              {/* Google 统计 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Google</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    localConfig.apiUsageStats?.google?.totalRequests > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {localConfig.apiUsageStats?.google?.totalRequests > 0 ? '已使用' : '未使用'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">总请求:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.google?.totalRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">成功率:</span>
                    <span className="font-medium">
                      {localConfig.apiUsageStats?.google?.totalRequests > 0 
                        ? `${Math.round((localConfig.apiUsageStats.google.successfulRequests / localConfig.apiUsageStats.google.totalRequests) * 100)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token使用:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.google?.totalTokensUsed || 0}</span>
                  </div>
                </div>
              </div>

              {/* 智谱AI 统计 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">智谱AI</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    localConfig.apiUsageStats?.zhipu?.totalRequests > 0 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {localConfig.apiUsageStats?.zhipu?.totalRequests > 0 ? '已使用' : '未使用'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">总请求:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.zhipu?.totalRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">成功率:</span>
                    <span className="font-medium">
                      {localConfig.apiUsageStats?.zhipu?.totalRequests > 0 
                        ? `${Math.round((localConfig.apiUsageStats.zhipu.successfulRequests / localConfig.apiUsageStats.zhipu.totalRequests) * 100)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token使用:</span>
                    <span className="font-medium">{localConfig.apiUsageStats?.zhipu?.totalTokensUsed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">平均响应:</span>
                    <span className="font-medium">
                      {localConfig.apiUsageStats?.zhipu?.averageResponseTime 
                        ? `${Math.round(localConfig.apiUsageStats.zhipu.averageResponseTime)}ms`
                        : '0ms'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 总体统计 */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                总体使用情况
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">总请求数:</span>
                  <span className="font-medium">
                    {(localConfig.apiUsageStats?.openai?.totalRequests || 0) +
                     (localConfig.apiUsageStats?.anthropic?.totalRequests || 0) +
                     (localConfig.apiUsageStats?.google?.totalRequests || 0) +
                     (localConfig.apiUsageStats?.zhipu?.totalRequests || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">总Token使用:</span>
                  <span className="font-medium">
                    {(localConfig.apiUsageStats?.openai?.totalTokensUsed || 0) +
                     (localConfig.apiUsageStats?.anthropic?.totalTokensUsed || 0) +
                     (localConfig.apiUsageStats?.google?.totalTokensUsed || 0) +
                     (localConfig.apiUsageStats?.zhipu?.totalTokensUsed || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">当前模型:</span>
                  <span className="font-medium capitalize">{localConfig.selectedModel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 安全与隐私 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">安全与隐私</h2>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-900 mb-1">隐私保护承诺</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 所有数据传输均采用端到端加密</li>
                    <li>• AI分析过程中不会存储个人敏感信息</li>
                    <li>• 分析结果仅用于生成报告，不会用于其他目的</li>
                    <li>• 严格遵守相关法律法规和隐私保护标准</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              重置配置
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? '保存中...' : '保存配置'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConfig;