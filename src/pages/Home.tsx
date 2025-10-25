import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  BarChart3, 
  FileText, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play,
  UserCheck,
  Clock,
  HelpCircle,
  Settings,
  BookOpen,
  MessageCircle,
  Heart
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  // 如果用户已登录，显示引导页面
  if (isAuthenticated && user) {
    return <OnboardingPage user={user} />;
  }

  // 未登录用户显示营销页面
  const features = [
    {
      icon: Search,
      title: '多源数据查询',
      description: '集成征信、教育、工商、社交媒体等多个权威数据源，全面收集背景信息',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'AI智能分析',
      description: '运用GPT-4等先进AI技术，智能分析风险因素和可信度评估',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: '专业调查报告',
      description: '30秒内生成包含基本信息、教育背景、工作经历、信用记录的详细报告',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: '合规安全保障',
      description: '严格遵循GDPR等法规，数据加密传输，完整审计追踪',
      color: 'text-red-600'
    }
  ];

  const steps = [
    {
      step: '01',
      title: '信息录入',
      description: '输入被调查人姓名、身份证号，上传清晰照片'
    },
    {
      step: '02',
      title: '实时查询',
      description: '多数据源并行查询，实时监控进度状态'
    },
    {
      step: '03',
      title: 'AI分析',
      description: 'GPT-4智能分析，生成风险评估和可信度评分'
    },
    {
      step: '04',
      title: '报告导出',
      description: '获取专业报告，支持PDF/HTML格式导出'
    }
  ];

  const testimonials = [
    {
      name: '张总监',
      role: 'HR总监',
      content: '系统大大提升了我们的招聘效率，背景核查准确度高，为企业规避了用人风险。',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: '李律师',
      role: '律师事务所合伙人',
      content: '在尽职调查中经常使用，报告专业详实，为客户提供了有力的法律支持。',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: '王经理',
      role: '风控经理',
      content: '合规性做得很好，数据来源可靠，帮助我们建立了完善的风险评估体系。',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-chinese">
              真实背景调查报告生成系统
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              专业的背景调查平台，为企业HR、金融机构、法律事务所提供全面、准确、合规的背景核查服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/investigation/new"
                className="btn bg-white text-primary-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                开始调查
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/register"
                className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 text-lg font-semibold"
              >
                免费试用
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-chinese">
              核心功能
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              专业的背景调查服务，为企业和机构提供全面、准确、合规的背景核查解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center group hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-chinese">
              使用流程
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              简单四步，30秒内获得专业的背景调查报告
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-800 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-chinese">
              客户评价
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              来自企业客户的真实反馈
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-chinese">
            准备开始您的背景调查了吗？
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            立即注册，获得3次免费查询机会，体验我们专业的背景调查服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn bg-white text-primary-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              免费注册
            </Link>
            <Link
              to="/login"
              className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-800 px-8 py-4 text-lg font-semibold"
            >
              立即登录
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// 引导页面组件
interface OnboardingPageProps {
  user: {
    id: string;
    phone: string;
    email?: string;
    realName: string;
    subscriptionPlan: 'basic' | 'premium' | 'enterprise';
    queryCount: number;
    isVerified: boolean;
    avatar?: string;
  };
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ user }) => {
  const quickStartFeatures = [
    {
      icon: Search,
      title: '开始新的背景调查',
      description: '输入目标人物信息，开始您的第一次背景调查',
      action: '立即开始',
      link: '/investigation/new',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      icon: Heart,
      title: '相亲背景调查',
      description: '专为相亲场景设计的背景调查服务',
      action: '开始相亲调查',
      link: '/investigation/dating',
      color: 'bg-rose-500',
      textColor: 'text-rose-600'
    },
    {
      icon: FileText,
      title: '查看历史报告',
      description: '浏览您之前的调查报告和分析结果',
      action: '查看报告',
      link: '/reports',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      icon: Settings,
      title: '个人设置',
      description: '管理您的账户信息和偏好设置',
      action: '进入设置',
      link: '/profile',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  const usageSteps = [
    {
      step: '1',
      title: '输入基本信息',
      description: '提供目标人物的姓名、照片等基本信息'
    },
    {
      step: '2',
      title: 'AI智能分析',
      description: '系统自动进行多维度背景调查和分析'
    },
    {
      step: '3',
      title: '获取详细报告',
      description: '查看完整的分析报告和可信度评估'
    }
  ];

  const faqs = [
    {
      question: '如何开始我的第一次背景调查？',
      answer: '点击"开始新的背景调查"按钮，按照指引输入目标人物的基本信息即可。'
    },
    {
      question: '调查报告包含哪些内容？',
      answer: '报告包含社交媒体分析、人际关系网络、诚信度评估、风险提示等多个维度。'
    },
    {
      question: '我的查询次数有限制吗？',
      answer: `您当前的${user.subscriptionPlan === 'basic' ? '基础' : user.subscriptionPlan === 'premium' ? '高级' : '企业'}套餐每月有相应的查询额度。`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 欢迎横幅 */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-bold font-chinese">
                  欢迎回来，{user.realName || '用户'}！
                </h1>
                <p className="text-blue-100 mt-2">
                  您的专业背景调查助手已准备就绪
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">{user.queryCount}</div>
                <div className="text-blue-100">已完成调查</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">{user.subscriptionPlan === 'basic' ? '基础' : user.subscriptionPlan === 'premium' ? '高级' : '企业'}</div>
                <div className="text-blue-100">当前套餐</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">{user.isVerified ? '已认证' : '待认证'}</div>
                <div className="text-blue-100">账户状态</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-chinese">
              快速开始
            </h2>
            <p className="text-xl text-gray-600">
              选择您想要进行的操作
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {quickStartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className={`btn ${feature.textColor} border-2 border-current hover:bg-current hover:text-white transition-all duration-300 px-6 py-3 font-semibold`}
                  >
                    {feature.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 使用指南 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-chinese">
              使用指南
            </h2>
            <p className="text-xl text-gray-600">
              三步完成专业背景调查
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {usageSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < usageSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-chinese">
              常见问题
            </h2>
            <p className="text-xl text-gray-600">
              快速了解产品功能
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 帮助与支持 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-chinese">
              需要帮助？
            </h2>
            <p className="text-xl text-gray-600">
              我们随时为您提供支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                使用文档
              </h3>
              <p className="text-gray-600 mb-6">
                查看详细的产品使用说明和最佳实践
              </p>
              <button className="btn btn-secondary">
                查看文档
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                联系客服
              </h3>
              <p className="text-gray-600 mb-6">
                遇到问题？我们的专业客服团队随时为您解答
              </p>
              <button className="btn btn-primary">
                在线客服
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;