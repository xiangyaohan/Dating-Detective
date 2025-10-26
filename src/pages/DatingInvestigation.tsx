import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  User, 
  Home, 
  Car, 
  GraduationCap, 
  Briefcase, 
  DollarSign,
  Users,
  Target,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Brain,
  Music,
  Gamepad2,
  Camera,
  Book,
  Plane,
  Coffee,
  Dumbbell,
  Palette,
  Code
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { FileUpload } from '../components/FileUpload';

interface DatingInvestigationData {
  // 基本信息
  photo: File | null;
  name: string;
  gender: 'male' | 'female' | '';
  age: number | '';
  height: number | '';
  weight: number | '';
  education: string;
  occupation: string;
  
  // 个人情况
  monthlyIncome: string;
  hasHouse: 'yes' | 'no' | '';
  hasCar: 'yes' | 'no' | '';
  maritalStatus: 'single' | 'divorced' | 'widowed' | '';
  
  // 择偶要求
  expectedAgeRange: {
    min: number | '';
    max: number | '';
  };
  expectedHeightRange: {
    min: number | '';
    max: number | '';
  };
  expectedEducation: string;
  specialRequirements: string;
  
  // 心理测试
  personalityTest: {
    extroversion: number;
    agreeableness: number;
    conscientiousness: number;
    neuroticism: number;
    openness: number;
  };
  
  // 兴趣爱好
  interests: {
    hobbies: string[];
    lifestyle: string;
    values: string[];
    personalityTraits: string[];
  };
}

const DatingInvestigation: React.FC = () => {
  const navigate = useNavigate();
  const { addInvestigation } = useAppStore();
  
  const [formData, setFormData] = useState<DatingInvestigationData>({
    photo: null,
    name: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    education: '',
    occupation: '',
    monthlyIncome: '',
    hasHouse: '',
    hasCar: '',
    maritalStatus: '',
    expectedAgeRange: { min: '', max: '' },
    expectedHeightRange: { min: '', max: '' },
    expectedEducation: '',
    specialRequirements: '',
    personalityTest: {
      extroversion: 3,
      agreeableness: 3,
      conscientiousness: 3,
      neuroticism: 3,
      openness: 3
    },
    interests: {
      hobbies: [],
      lifestyle: '',
      values: [],
      personalityTraits: []
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 学历选项
  const educationOptions = [
    { value: '', label: '请选择学历' },
    { value: 'high_school', label: '高中及以下' },
    { value: 'college', label: '大专' },
    { value: 'bachelor', label: '本科' },
    { value: 'master', label: '硕士' },
    { value: 'phd', label: '博士' },
    { value: 'other', label: '其他' }
  ];

  // 收入选项
  const incomeOptions = [
    { value: '', label: '请选择月收入范围' },
    { value: 'below_5k', label: '5千以下' },
    { value: '5k_10k', label: '5千-1万' },
    { value: '10k_20k', label: '1万-2万' },
    { value: '20k_30k', label: '2万-3万' },
    { value: '30k_50k', label: '3万-5万' },
    { value: 'above_50k', label: '5万以上' }
  ];

  // 婚姻状况选项
  const maritalStatusOptions = [
    { value: '', label: '请选择婚姻状况' },
    { value: 'single', label: '未婚' },
    { value: 'divorced', label: '离异' },
    { value: 'widowed', label: '丧偶' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRangeChange = (rangeType: 'expectedAgeRange' | 'expectedHeightRange', field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? '' : parseInt(value);
    setFormData(prev => ({
      ...prev,
      [rangeType]: {
        ...prev[rangeType],
        [field]: numValue
      }
    }));
  };

  const handlePersonalityChange = (trait: keyof DatingInvestigationData['personalityTest'], value: number) => {
    setFormData(prev => ({
      ...prev,
      personalityTest: {
        ...prev.personalityTest,
        [trait]: value
      }
    }));
  };

  const handleInterestChange = (field: keyof DatingInvestigationData['interests'], value: any) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (field: 'hobbies' | 'values' | 'personalityTraits', value: string) => {
    setFormData(prev => {
      const currentArray = prev.interests[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        interests: {
          ...prev.interests,
          [field]: newArray
        }
      };
    });
  };

  const handlePhotoUpload = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
    
    // 清除照片字段的错误
    if (errors.photo) {
      setErrors(prev => ({
        ...prev,
        photo: ''
      }));
    }
  };

  // 兴趣爱好选项
  const hobbyOptions = [
    { value: 'music', label: '音乐', icon: Music },
    { value: 'gaming', label: '游戏', icon: Gamepad2 },
    { value: 'photography', label: '摄影', icon: Camera },
    { value: 'reading', label: '阅读', icon: Book },
    { value: 'travel', label: '旅行', icon: Plane },
    { value: 'coffee', label: '咖啡', icon: Coffee },
    { value: 'fitness', label: '健身', icon: Dumbbell },
    { value: 'art', label: '艺术', icon: Palette },
    { value: 'coding', label: '编程', icon: Code }
  ];

  const lifestyleOptions = [
    { value: 'active', label: '活跃型' },
    { value: 'quiet', label: '安静型' },
    { value: 'social', label: '社交型' },
    { value: 'homebody', label: '宅家型' }
  ];

  const valueOptions = [
    { value: 'family', label: '家庭' },
    { value: 'career', label: '事业' },
    { value: 'freedom', label: '自由' },
    { value: 'stability', label: '稳定' },
    { value: 'adventure', label: '冒险' },
    { value: 'tradition', label: '传统' }
  ];

  const personalityTraitOptions = [
    { value: 'optimistic', label: '乐观' },
    { value: 'humorous', label: '幽默' },
    { value: 'responsible', label: '负责' },
    { value: 'romantic', label: '浪漫' },
    { value: 'independent', label: '独立' },
    { value: 'caring', label: '体贴' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 照片必填验证
    if (!formData.photo) {
      newErrors.photo = '请上传照片';
    }

    // 必填字段验证
    if (!formData.name.trim()) {
      newErrors.name = '姓名为必填项';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '姓名至少需要2个字符';
    } else if (formData.name.trim().length > 20) {
      newErrors.name = '姓名不能超过20个字符';
    }

    if (!formData.gender) {
      newErrors.gender = '请选择性别';
    }

    // 年龄验证
    if (formData.age) {
      const ageNum = typeof formData.age === 'string' ? parseInt(formData.age) : formData.age;
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        newErrors.age = '年龄应在18-100岁之间';
      }
    }

    // 身高验证
    if (formData.height) {
      const heightNum = typeof formData.height === 'string' ? parseInt(formData.height) : formData.height;
      if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
        newErrors.height = '身高应在100-250厘米之间';
      }
    }

    // 体重验证
    if (formData.weight) {
      const weightNum = typeof formData.weight === 'string' ? parseInt(formData.weight) : formData.weight;
      if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
        newErrors.weight = '体重应在30-300公斤之间';
      }
    }

    // 职业验证
    if (formData.occupation && formData.occupation.trim().length > 50) {
      newErrors.occupation = '职业描述不能超过50个字符';
    }

    // 年龄范围验证
    if (formData.expectedAgeRange.min || formData.expectedAgeRange.max) {
      const minAge = formData.expectedAgeRange.min ? 
        (typeof formData.expectedAgeRange.min === 'string' ? parseInt(formData.expectedAgeRange.min) : formData.expectedAgeRange.min) : null;
      const maxAge = formData.expectedAgeRange.max ? 
        (typeof formData.expectedAgeRange.max === 'string' ? parseInt(formData.expectedAgeRange.max) : formData.expectedAgeRange.max) : null;
      
      if (minAge && (isNaN(minAge) || minAge < 18 || minAge > 100)) {
        newErrors.expectedAgeRange = '期望最小年龄应在18-100岁之间';
      } else if (maxAge && (isNaN(maxAge) || maxAge < 18 || maxAge > 100)) {
        newErrors.expectedAgeRange = '期望最大年龄应在18-100岁之间';
      } else if (minAge && maxAge && minAge > maxAge) {
        newErrors.expectedAgeRange = '最小年龄不能大于最大年龄';
      }
    }

    // 身高范围验证
    if (formData.expectedHeightRange.min || formData.expectedHeightRange.max) {
      const minHeight = formData.expectedHeightRange.min ? 
        (typeof formData.expectedHeightRange.min === 'string' ? parseInt(formData.expectedHeightRange.min) : formData.expectedHeightRange.min) : null;
      const maxHeight = formData.expectedHeightRange.max ? 
        (typeof formData.expectedHeightRange.max === 'string' ? parseInt(formData.expectedHeightRange.max) : formData.expectedHeightRange.max) : null;
      
      if (minHeight && (isNaN(minHeight) || minHeight < 100 || minHeight > 250)) {
        newErrors.expectedHeightRange = '期望最小身高应在100-250厘米之间';
      } else if (maxHeight && (isNaN(maxHeight) || maxHeight < 100 || maxHeight > 250)) {
        newErrors.expectedHeightRange = '期望最大身高应在100-250厘米之间';
      } else if (minHeight && maxHeight && minHeight > maxHeight) {
        newErrors.expectedHeightRange = '最小身高不能大于最大身高';
      }
    }

    // 特殊要求验证
    if (formData.specialRequirements && formData.specialRequirements.trim().length > 500) {
      newErrors.specialRequirements = '特殊要求不能超过500个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 创建调查记录
      const investigation = {
        id: `dating-${Date.now()}`,
        targetName: formData.name,
        targetOccupation: formData.occupation,
        investigationType: 'dating' as const,
        additionalInfo: {
          photo: formData.photo,
          age: typeof formData.age === 'string' ? parseInt(formData.age) : formData.age || undefined,
          occupation: formData.occupation,
          education: formData.education,
          personalityTest: formData.personalityTest,
          interests: formData.interests,
          datingInfo: {
            gender: formData.gender,
            height: formData.height ? String(formData.height) : '',
            weight: formData.weight ? String(formData.weight) : '',
            monthlyIncome: formData.monthlyIncome,
            hasHouse: formData.hasHouse,
            hasCar: formData.hasCar,
            maritalStatus: formData.maritalStatus,
            partnerAgeRange: `${formData.expectedAgeRange.min}-${formData.expectedAgeRange.max}`,
            partnerHeightRange: `${formData.expectedHeightRange.min}-${formData.expectedHeightRange.max}`,
            partnerEducation: formData.expectedEducation,
            specialRequirements: formData.specialRequirements,
          },
        },
        status: 'pending' as const,
        progress: 0,
        createdAt: new Date().toISOString(),
        estimatedTime: '2-3个工作日',
      };

      addInvestigation(investigation);
      
      // 显示成功消息
      alert('相亲调查信息已成功提交！');
      
      // 跳转到报告生成页面
      navigate(`/report-generation/${investigation.id}`);
      
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      photo: null,
      name: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      education: '',
      occupation: '',
      monthlyIncome: '',
      hasHouse: '',
      hasCar: '',
      maritalStatus: '',
      expectedAgeRange: { min: '', max: '' },
      expectedHeightRange: { min: '', max: '' },
      expectedEducation: '',
      specialRequirements: '',
      personalityTest: {
        extroversion: 3,
        agreeableness: 3,
        conscientiousness: 3,
        neuroticism: 3,
        openness: 3
      },
      interests: {
        hobbies: [],
        lifestyle: '',
        values: [],
        personalityTraits: []
      }
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-rose-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">智能相亲调查登记</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            请填写您的基本信息、心理测试和兴趣爱好，我们将为您生成专业的背景调查报告
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">隐私保护承诺</p>
                <p>我们承诺不会收集您的身份证号码等敏感个人信息，所有数据仅用于相亲背景调查服务，严格保护您的隐私安全。</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本信息部分 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">基本信息</h2>
              <span className="ml-2 text-sm text-gray-500">（带*为必填项）</span>
            </div>
            
            {/* 照片上传 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                个人照片 <span className="text-red-500">*</span>
              </label>
              <FileUpload
                onFileSelect={handlePhotoUpload}
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                preview={true}
                value={formData.photo}
                className={errors.photo ? 'border-red-500' : ''}
              />
              {errors.photo && (
                <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                请上传清晰的个人照片，支持JPG、PNG格式，文件大小不超过5MB
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入您的姓名"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* 性别 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  性别 <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">男</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">女</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              {/* 年龄 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  年龄 <span className="text-gray-500">(选填)</span>
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : '')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入年龄"
                  min="18"
                  max="100"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>

              {/* 身高 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  身高 <span className="text-gray-500">(厘米，选填)</span>
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value ? parseInt(e.target.value) : '')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    errors.height ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入身高"
                  min="100"
                  max="250"
                />
                {errors.height && (
                  <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                )}
              </div>

              {/* 体重 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  体重 <span className="text-gray-500">(公斤，选填)</span>
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value ? parseInt(e.target.value) : '')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入体重"
                  min="30"
                  max="300"
                />
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                )}
              </div>

              {/* 学历 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  学历
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {educationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 职业 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职业
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    errors.occupation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="请输入您的职业"
                />
                {errors.occupation && (
                  <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
                )}
              </div>

              {/* 月收入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  月收入
                </label>
                <select
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {incomeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 个人情况部分 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Home className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">个人情况</h2>
              <span className="ml-2 text-sm text-gray-500">（选填）</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 婚姻状况 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  婚姻状况
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {maritalStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 是否有房 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  是否有房
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasHouse"
                      value="yes"
                      checked={formData.hasHouse === 'yes'}
                      onChange={(e) => handleInputChange('hasHouse', e.target.value)}
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasHouse"
                      value="no"
                      checked={formData.hasHouse === 'no'}
                      onChange={(e) => handleInputChange('hasHouse', e.target.value)}
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>

              {/* 是否有车 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  是否有车
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasCar"
                      value="yes"
                      checked={formData.hasCar === 'yes'}
                      onChange={(e) => handleInputChange('hasCar', e.target.value)}
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasCar"
                      value="no"
                      checked={formData.hasCar === 'no'}
                      onChange={(e) => handleInputChange('hasCar', e.target.value)}
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 心理测试问卷部分 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Brain className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">心理测试问卷</h2>
              <span className="ml-2 text-sm text-gray-500">（请根据您的真实情况选择）</span>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 mb-1">大五人格测试</h3>
                    <p className="text-sm text-blue-700">
                      以下是基于科学的大五人格理论设计的测试题目，请根据以下描述，选择最符合您性格特征的程度（1=完全不符合，5=完全符合）
                    </p>
                  </div>
                </div>
              </div>

              {/* 外向性 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="text-rose-600 font-semibold">外向性</span>：我是一个外向、活跃、喜欢社交的人
                </label>
                <p className="text-xs text-gray-500 mb-3">外向的人通常精力充沛、健谈、自信，喜欢与他人互动</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">完全不符合</span>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map(value => (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="extroversion"
                          value={value}
                          checked={formData.personalityTest.extroversion === value}
                          onChange={(e) => handlePersonalityChange('extroversion', parseInt(e.target.value))}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                        />
                        <span className="mt-1 text-xs text-gray-600">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">完全符合</span>
                </div>
              </div>

              {/* 宜人性 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="text-rose-600 font-semibold">宜人性</span>：我是一个友善、合作、信任他人的人
                </label>
                <p className="text-xs text-gray-500 mb-3">宜人性高的人通常善良、体贴、乐于助人，容易与他人建立良好关系</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">完全不符合</span>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map(value => (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="agreeableness"
                          value={value}
                          checked={formData.personalityTest.agreeableness === value}
                          onChange={(e) => handlePersonalityChange('agreeableness', parseInt(e.target.value))}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                        />
                        <span className="mt-1 text-xs text-gray-600">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">完全符合</span>
                </div>
              </div>

              {/* 尽责性 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="text-rose-600 font-semibold">尽责性</span>：我是一个有组织、负责任、自律的人
                </label>
                <p className="text-xs text-gray-500 mb-3">尽责性高的人通常做事有条理、可靠、有毅力，能够坚持完成目标</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">完全不符合</span>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map(value => (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="conscientiousness"
                          value={value}
                          checked={formData.personalityTest.conscientiousness === value}
                          onChange={(e) => handlePersonalityChange('conscientiousness', parseInt(e.target.value))}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                        />
                        <span className="mt-1 text-xs text-gray-600">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">完全符合</span>
                </div>
              </div>

              {/* 神经质 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="text-rose-600 font-semibold">情绪稳定性</span>：我是一个情绪稳定、不易焦虑的人
                </label>
                <p className="text-xs text-gray-500 mb-3">情绪稳定的人通常冷静、放松、不易受压力影响，能够很好地处理负面情绪</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">完全不符合</span>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map(value => (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="neuroticism"
                          value={value}
                          checked={formData.personalityTest.neuroticism === value}
                          onChange={(e) => handlePersonalityChange('neuroticism', parseInt(e.target.value))}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                        />
                        <span className="mt-1 text-xs text-gray-600">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">完全符合</span>
                </div>
              </div>

              {/* 开放性 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="text-rose-600 font-semibold">开放性</span>：我是一个富有想象力、喜欢新体验的人
                </label>
                <p className="text-xs text-gray-500 mb-3">开放性高的人通常富有创造力、好奇强、喜欢探索新事物和新想法</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">完全不符合</span>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map(value => (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="openness"
                          value={value}
                          checked={formData.personalityTest.openness === value}
                          onChange={(e) => handlePersonalityChange('openness', parseInt(e.target.value))}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                        />
                        <span className="mt-1 text-xs text-gray-600">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">完全符合</span>
                </div>
              </div>

              {/* 测试结果预览 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  当前测试结果预览
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">外向性</div>
                    <div className="text-lg font-semibold text-rose-600">{formData.personalityTest.extroversion}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">宜人性</div>
                    <div className="text-lg font-semibold text-rose-600">{formData.personalityTest.agreeableness}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">尽责性</div>
                    <div className="text-lg font-semibold text-rose-600">{formData.personalityTest.conscientiousness}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">情绪稳定</div>
                    <div className="text-lg font-semibold text-rose-600">{formData.personalityTest.neuroticism}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">开放性</div>
                    <div className="text-lg font-semibold text-rose-600">{formData.personalityTest.openness}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 兴趣爱好调查部分 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Music className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">兴趣爱好调查</h2>
              <span className="ml-2 text-sm text-gray-500">（多选）</span>
            </div>
            
            <div className="space-y-6">
              {/* 兴趣爱好 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  您的兴趣爱好（可多选）
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hobbyOptions.map(hobby => {
                    const IconComponent = hobby.icon;
                    return (
                      <label key={hobby.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.hobbies.includes(hobby.value)}
                          onChange={() => handleArrayToggle('hobbies', hobby.value)}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500"
                        />
                        <IconComponent className="w-4 h-4 ml-2 mr-2 text-gray-600" />
                        <span className="text-sm text-gray-700">{hobby.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 生活方式 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  您的生活方式
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lifestyleOptions.map(lifestyle => (
                    <label key={lifestyle.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="lifestyle"
                        value={lifestyle.value}
                        checked={formData.interests.lifestyle === lifestyle.value}
                        onChange={(e) => handleInterestChange('lifestyle', e.target.value)}
                        className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{lifestyle.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 价值观 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  您的价值观（可多选）
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {valueOptions.map(value => (
                    <label key={value.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.values.includes(value.value)}
                        onChange={() => handleArrayToggle('values', value.value)}
                        className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{value.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 性格特征 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  您的性格特征（可多选）
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {personalityTraitOptions.map(personality => (
                    <label key={personality.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.personalityTraits.includes(personality.value)}
                        onChange={() => handleArrayToggle('personalityTraits', personality.value)}
                        className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{personality.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 择偶要求部分 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">择偶要求</h2>
              <span className="ml-2 text-sm text-gray-500">（选填）</span>
            </div>
            
            <div className="space-y-6">
              {/* 期望对方年龄范围 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  期望对方年龄范围
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={formData.expectedAgeRange.min}
                    onChange={(e) => handleRangeChange('expectedAgeRange', 'min', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="最小"
                    min="18"
                    max="100"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={formData.expectedAgeRange.max}
                    onChange={(e) => handleRangeChange('expectedAgeRange', 'max', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="最大"
                    min="18"
                    max="100"
                  />
                  <span className="text-gray-500">岁</span>
                </div>
                {errors.expectedAgeRange && (
                  <p className="mt-1 text-sm text-red-600">{errors.expectedAgeRange}</p>
                )}
              </div>

              {/* 期望对方身高范围 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  期望对方身高范围
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={formData.expectedHeightRange.min}
                    onChange={(e) => handleRangeChange('expectedHeightRange', 'min', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="最小"
                    min="100"
                    max="250"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={formData.expectedHeightRange.max}
                    onChange={(e) => handleRangeChange('expectedHeightRange', 'max', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="最大"
                    min="100"
                    max="250"
                  />
                  <span className="text-gray-500">厘米</span>
                </div>
                {errors.expectedHeightRange && (
                  <p className="mt-1 text-sm text-red-600">{errors.expectedHeightRange}</p>
                )}
              </div>

              {/* 期望对方学历 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  期望对方学历
                </label>
                <select
                  value={formData.expectedEducation}
                  onChange={(e) => handleInputChange('expectedEducation', e.target.value)}
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {educationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 其他特殊要求 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  其他特殊要求
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="请描述您对对方的其他要求或期望..."
                />
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置表单
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-md hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  生成报告中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  生成智能报告
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatingInvestigation;