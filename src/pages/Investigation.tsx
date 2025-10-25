import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, CreditCard, Upload, ArrowRight, AlertCircle, Shield, FileText, Settings, CheckCircle, X } from 'lucide-react';
import { useAppStore, Investigation as InvestigationType } from '../stores/appStore';
import { useFormValidation, commonRules } from '../utils/validation';
import { showToast } from '../components/Toast';

interface FormData {
  fullName: string;
  idNumber: string;
  photos: File[];
  queryConfig: {
    basicInfo: boolean;
    creditCheck: boolean;
    educationVerification: boolean;
    workHistory: boolean;
    socialMediaAnalysis: boolean;
    riskAssessment: boolean;
  };
}

const Investigation: React.FC = () => {
  const navigate = useNavigate();
  const { addInvestigation, isLoading } = useAppStore();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    idNumber: '',
    photos: [],
    queryConfig: {
      basicInfo: true,
      creditCheck: true,
      educationVerification: true,
      workHistory: true,
      socialMediaAnalysis: false,
      riskAssessment: true,
    }
  });

  const [dragActive, setDragActive] = useState(false);

  const { errors, validateForm, validateField, clearFieldError } = useFormValidation({
    fullName: commonRules.realName,
    idNumber: {
      required: true,
      custom: (value: string) => {
        // 身份证号验证（18位）
        const idRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!idRegex.test(value)) {
          return '请输入有效的18位身份证号码';
        }
        return null;
      }
    }
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      clearFieldError(field);
    }
    
    // Real-time validation for better UX
    if (value.trim()) {
      setTimeout(() => validateField(field, value), 300);
    }
  };

  const handleQueryConfigChange = (field: keyof FormData['queryConfig'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      queryConfig: {
        ...prev.queryConfig,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles: File[] = [];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        showToast.error(`文件 ${file.name} 超过5MB限制`);
        return;
      }
      
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        showToast.error(`文件 ${file.name} 格式不支持，请上传JPG或PNG格式`);
        return;
      }
      
      validFiles.push(file);
    });
    
    if (formData.photos.length + validFiles.length > 3) {
      showToast.error('最多只能上传3张照片');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles]
    }));
    
    if (validFiles.length > 0) {
      showToast.success(`成功上传 ${validFiles.length} 张照片`);
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      showToast.error('请检查输入信息');
      return;
    }

    if (!formData.fullName.trim() || !formData.idNumber.trim()) {
      showToast.error('请填写完整姓名和身份证号');
      return;
    }

    // 检查至少选择一个查询项目
    const hasSelectedQuery = Object.values(formData.queryConfig).some(value => value);
    if (!hasSelectedQuery) {
      showToast.error('请至少选择一个查询项目');
      return;
    }

    try {
      const investigation = {
        id: Date.now().toString(),
        targetName: formData.fullName,
        targetPhone: formData.idNumber, // 临时使用身份证号作为电话号码字段
        additionalInfo: {
          queryConfig: formData.queryConfig,
          photoFiles: formData.photos.map(photo => photo.name), // 存储文件名
        },
        status: 'pending' as const,
        progress: 0,
        createdAt: new Date().toISOString(),
        estimatedTime: '30秒',
        investigationType: 'general' as const,
      };

      addInvestigation(investigation);
      showToast.success('调查任务已创建，正在启动查询...');
      navigate(`/report-generation/${investigation.id}`);
    } catch (error) {
      showToast.error('提交失败，请重试');
    }
  };

  const queryOptions = [
    { key: 'basicInfo', label: '基本信息核实', description: '身份证信息、户籍地址等基础信息验证', icon: User },
    { key: 'creditCheck', label: '信用记录查询', description: '个人征信报告、信用评级、逾期记录', icon: CreditCard },
    { key: 'educationVerification', label: '教育背景验证', description: '学历学位认证、毕业院校核实', icon: FileText },
    { key: 'workHistory', label: '工作经历调查', description: '职业履历、工作单位、职位信息', icon: Settings },
    { key: 'socialMediaAnalysis', label: '社交媒体分析', description: '网络行为分析、社交关系网络', icon: Search },
    { key: 'riskAssessment', label: '风险评估报告', description: 'AI智能风险分析、可信度评分', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-chinese mb-4">
            新建背景调查
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            请填写被调查人的基本信息并选择查询项目，系统将在30秒内生成专业的背景调查报告
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">信息录入</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-gray-500">实时查询</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-500">报告生成</span>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                基本信息
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name - Required */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    完整姓名 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`
                        block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                        ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                      `}
                      placeholder="请输入被调查人的真实姓名"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* ID Number - Required */}
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    身份证号码 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="idNumber"
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      className={`
                        block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                        ${errors.idNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                      `}
                      placeholder="请输入18位身份证号码"
                      maxLength={18}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.idNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Query Configuration Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                查询配置
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {queryOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <div
                      key={option.key}
                      className={`
                        relative border rounded-lg p-4 cursor-pointer transition-all
                        ${formData.queryConfig[option.key as keyof FormData['queryConfig']] 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                      onClick={() => handleQueryConfigChange(
                        option.key as keyof FormData['queryConfig'], 
                        !formData.queryConfig[option.key as keyof FormData['queryConfig']]
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`
                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                          ${formData.queryConfig[option.key as keyof FormData['queryConfig']] 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-400'
                          }
                        `}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {option.label}
                            </h3>
                            <input
                              type="checkbox"
                              checked={formData.queryConfig[option.key as keyof FormData['queryConfig']]}
                              onChange={() => {}}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                照片上传
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    上传身份证照片或个人照片（支持JPG/PNG，≤5MB）
                  </label>
                  <div 
                    className={`
                      mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer
                      ${dragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          点击上传文件
                        </span>
                        <p className="pl-1">或拖拽到这里</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        支持 JPG, PNG 格式，单个文件最大 5MB，最多上传 3 张
                      </p>
                    </div>
                  </div>
                  <input
                     id="file-upload"
                     name="file-upload"
                     type="file"
                     className="hidden"
                     accept="image/jpeg,image/png"
                     multiple
                     onChange={(e) => handleFileUpload(e.target.files)}
                     disabled={isLoading}
                   />
                </div>

                {/* Photo Preview */}
                 {formData.photos.length > 0 && (
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                     {formData.photos.map((photo, index) => (
                       <div key={index} className="relative group">
                         <img
                           src={URL.createObjectURL(photo)}
                           alt={`上传的照片 ${index + 1}`}
                           className="w-full h-32 object-cover rounded-lg border border-gray-200"
                         />
                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                           <button
                             type="button"
                             onClick={() => removePhoto(index)}
                             className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                             disabled={isLoading}
                           >
                             <X className="h-4 w-4" />
                           </button>
                         </div>
                         <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                           {(photo.size / 1024 / 1024).toFixed(1)}MB
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">隐私保护与合规承诺</h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• 严格遵守《个人信息保护法》、GDPR等相关法律法规</p>
                    <p>• 所有数据传输采用SSL加密，存储采用AES-256加密</p>
                    <p>• 调查结果仅供合法用途，不得用于非法目的</p>
                    <p>• 支持数据主体权利，包括访问、更正、删除等</p>
                    <p>• 定期进行安全审计和合规性检查</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isLoading || Object.keys(errors).length > 0}
                className={`
                  px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 min-w-[200px]
                  ${isLoading || Object.keys(errors).length > 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    正在创建调查...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    开始背景调查
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Investigation;