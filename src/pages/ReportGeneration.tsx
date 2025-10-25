import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { Brain, Clock, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';

const ReportGeneration: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { 
    currentInvestigation, 
    getInvestigationById, 
    updateInvestigation,
    aiAnalysisProgress,
    setAiAnalysisProgress,
    setAiProcessing,
    isAiProcessing
  } = useAppStore();

  const [investigation, setInvestigation] = useState(currentInvestigation);

  useEffect(() => {
    if (id && !investigation) {
      const foundInvestigation = getInvestigationById(id);
      if (foundInvestigation) {
        setInvestigation(foundInvestigation);
      } else {
        navigate('/investigations');
      }
    }
  }, [id, investigation, getInvestigationById, navigate]);

  useEffect(() => {
    if (investigation && investigation.status === 'pending') {
      startAnalysis();
    }
  }, [investigation]);

  const startAnalysis = async () => {
    if (!investigation) return;

    setAiProcessing(true);
    
    // 模拟AI分析进度
    const stages = [
      { stage: 'initializing', task: '初始化分析引擎...', duration: 1000 },
      { stage: 'analyzing', task: '分析用户基本信息...', duration: 2000 },
      { stage: 'analyzing', task: '评估性格特征...', duration: 2000 },
      { stage: 'analyzing', task: '分析兴趣爱好匹配度...', duration: 1500 },
      { stage: 'generating', task: '生成分析报告...', duration: 1500 },
      { stage: 'reviewing', task: '质量检查与优化...', duration: 1000 },
      { stage: 'completed', task: '分析完成', duration: 0 }
    ];

    let totalProgress = 0;
    const progressStep = 100 / (stages.length - 1);

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      
      setAiAnalysisProgress({
        stage: stage.stage as any,
        progress: totalProgress,
        currentTask: stage.task,
        estimatedTimeRemaining: stages.slice(i + 1).reduce((sum, s) => sum + s.duration, 0) / 1000
      });

      if (stage.duration > 0) {
        await new Promise(resolve => setTimeout(resolve, stage.duration));
        totalProgress += progressStep;
      }
    }

    // 更新调查状态
    updateInvestigation(investigation.id, {
      status: 'completed',
      progress: 100,
      completedAt: new Date().toISOString()
    });

    setAiAnalysisProgress({
      stage: 'completed',
      progress: 100,
      currentTask: '分析完成',
      estimatedTimeRemaining: 0
    });

    setAiProcessing(false);

    // 3秒后跳转到报告页面
    setTimeout(() => {
      if (investigation.investigationType === 'dating') {
        navigate(`/dating-report/${investigation.id}`);
      } else {
        navigate(`/report/${investigation.id}`);
      }
    }, 3000);
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'initializing':
        return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
      case 'analyzing':
        return <Brain className="h-6 w-6 text-purple-500" />;
      case 'generating':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'reviewing':
        return <CheckCircle className="h-6 w-6 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'initializing':
        return 'bg-blue-500';
      case 'analyzing':
        return 'bg-purple-500';
      case 'generating':
        return 'bg-green-500';
      case 'reviewing':
        return 'bg-orange-500';
      case 'completed':
        return 'bg-green-600';
      default:
        return 'bg-gray-400';
    }
  };

  if (!investigation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">调查记录未找到</h2>
          <p className="text-gray-600 mb-4">请检查调查ID是否正确</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI智能分析进行中
          </h1>
          <p className="text-lg text-gray-600">
            正在为 <span className="font-semibold text-blue-600">{investigation.targetName}</span> 生成专业分析报告
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">分析进度</span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(aiAnalysisProgress?.progress || 0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getStageColor(aiAnalysisProgress?.stage || '')}`}
                style={{ width: `${aiAnalysisProgress?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Current Stage */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {getStageIcon(aiAnalysisProgress?.stage || '')}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {aiAnalysisProgress?.currentTask || '准备中...'}
                </h3>
                {aiAnalysisProgress?.estimatedTimeRemaining ? (
                  <p className="text-sm text-gray-600">
                    预计剩余时间: {Math.ceil(aiAnalysisProgress.estimatedTimeRemaining)}秒
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Stage Timeline */}
          <div className="space-y-4">
            {[
              { key: 'initializing', label: '初始化分析引擎', description: '准备AI分析环境和数据预处理' },
              { key: 'analyzing', label: '深度数据分析', description: '分析用户信息、性格特征和兴趣爱好' },
              { key: 'generating', label: '生成分析报告', description: '基于分析结果生成专业报告' },
              { key: 'reviewing', label: '质量检查', description: '验证分析结果的准确性和完整性' },
              { key: 'completed', label: '分析完成', description: '报告生成完毕，准备查看结果' }
            ].map((item, index) => {
              const isActive = aiAnalysisProgress?.stage === item.key;
              const isCompleted = ['initializing', 'analyzing', 'generating', 'reviewing'].indexOf(aiAnalysisProgress?.stage || '') > 
                                 ['initializing', 'analyzing', 'generating', 'reviewing'].indexOf(item.key);
              
              return (
                <div key={item.key} className="flex items-center space-x-4">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${isCompleted ? 'bg-green-100 text-green-600' : 
                      isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                  `}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {item.label}
                    </h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  {isActive && (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Investigation Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">调查信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">调查对象:</span>
              <p className="font-medium">{investigation.targetName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">调查类型:</span>
              <p className="font-medium">
                {investigation.investigationType === 'dating' ? '相亲背景调查' : '一般背景调查'}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">创建时间:</span>
              <p className="font-medium">
                {new Date(investigation.createdAt).toLocaleString('zh-CN')}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">预计完成时间:</span>
              <p className="font-medium">{investigation.estimatedTime}</p>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {aiAnalysisProgress?.stage === 'completed' && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">分析完成！</h3>
            <p className="text-green-700 mb-4">
              AI分析报告已生成完毕，正在为您跳转到报告页面...
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  if (investigation.investigationType === 'dating') {
                    navigate(`/dating-report/${investigation.id}`);
                  } else {
                    navigate(`/report/${investigation.id}`);
                  }
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                立即查看报告
              </button>
              <button
                onClick={() => navigate('/investigations')}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                返回调查列表
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGeneration;