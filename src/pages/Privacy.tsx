import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Users, 
  Globe, 
  FileText, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';

const Privacy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: '隐私政策概述', icon: Shield },
    { id: 'collection', title: '信息收集', icon: Database },
    { id: 'usage', title: '信息使用', icon: Eye },
    { id: 'sharing', title: '信息共享', icon: Users },
    { id: 'security', title: '数据安全', icon: Lock },
    { id: 'rights', title: '用户权利', icon: FileText },
    { id: 'contact', title: '联系我们', icon: Mail }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 font-chinese">
                隐私政策
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              我们致力于保护您的隐私和个人信息安全
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              最后更新：2024年1月15日
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 侧边导航 */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-4">目录</h3>
                  <nav className="space-y-1">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                            activeSection === section.id
                              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                          {section.title}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* 主内容 */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* 概述 */}
                <section id="overview" className="card">
                  <div className="flex items-center mb-6">
                    <Shield className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">隐私政策概述</h2>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      欢迎使用相亲对象背调AI服务。我们深知个人信息的重要性，并会尽全力保护用户的个人信息安全可靠。
                      我们致力于维持用户对我们的信任，恪守以下原则，保护用户个人信息：
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="font-medium text-green-900">权责一致原则</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          我们只会收集、使用、存储、共享、转让您授权的个人信息
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Lock className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-medium text-blue-900">目的明确原则</h4>
                        </div>
                        <p className="text-sm text-blue-700">
                          所有的个人信息处理都具有明确、合理的目的
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Eye className="w-5 h-5 text-purple-600 mr-2" />
                          <h4 className="font-medium text-purple-900">选择同意原则</h4>
                        </div>
                        <p className="text-sm text-purple-700">
                          我们会充分尊重您的选择，您有权拒绝或撤回授权
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Database className="w-5 h-5 text-orange-600 mr-2" />
                          <h4 className="font-medium text-orange-900">最少够用原则</h4>
                        </div>
                        <p className="text-sm text-orange-700">
                          我们只处理实现产品功能所必需的个人信息
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-900 mb-1">重要提醒</h4>
                          <p className="text-sm text-yellow-800">
                            请您仔细阅读本隐私政策，特别是以粗体标识的条款，确保充分理解和同意后再使用我们的服务。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 信息收集 */}
                <section id="collection" className="card">
                  <div className="flex items-center mb-6">
                    <Database className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">我们收集的信息</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">1. 您主动提供的信息</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>账户信息：</strong>用户名、邮箱地址、手机号码、密码等注册信息</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>调查目标信息：</strong>姓名、联系方式、社交媒体账号、照片等</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>支付信息：</strong>订单信息、支付方式（不包括完整的银行卡号）</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>客服沟通：</strong>与客服交流时提供的信息和反馈</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">2. 自动收集的信息</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>设备信息：</strong>设备型号、操作系统、浏览器类型和版本</span>
                        </li>
                        <li className="flex items-start">
                          <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>使用信息：</strong>访问时间、页面浏览记录、功能使用情况</span>
                        </li>
                        <li className="flex items-start">
                          <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>网络信息：</strong>IP地址、网络类型、地理位置信息</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Cookie 和类似技术</h4>
                          <p className="text-sm text-blue-800">
                            我们使用Cookie和类似技术来改善用户体验、分析网站使用情况。您可以通过浏览器设置管理Cookie偏好。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 信息使用 */}
                <section id="usage" className="card">
                  <div className="flex items-center mb-6">
                    <Eye className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">信息使用目的</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">服务提供</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 提供背景调查服务</li>
                          <li>• 生成分析报告</li>
                          <li>• 账户管理和认证</li>
                          <li>• 客户支持服务</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">服务改进</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 分析使用模式</li>
                          <li>• 优化产品功能</li>
                          <li>• 个性化推荐</li>
                          <li>• 技术故障排除</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">安全保障</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 防范安全威胁</li>
                          <li>• 检测异常行为</li>
                          <li>• 保护账户安全</li>
                          <li>• 防止欺诈行为</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">法律合规</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 遵守法律法规</li>
                          <li>• 配合执法调查</li>
                          <li>• 维护合法权益</li>
                          <li>• 履行监管义务</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 信息共享 */}
                <section id="sharing" className="card">
                  <div className="flex items-center mb-6">
                    <Users className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">信息共享与披露</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-red-900 mb-1">重要声明</h4>
                          <p className="text-sm text-red-800">
                            我们不会向第三方出售、出租或以其他方式披露您的个人信息，除非获得您的明确同意或法律法规要求。
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">可能的共享情况</h3>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">服务提供商</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            为了提供更好的服务，我们可能与以下类型的服务提供商共享必要信息：
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 云服务提供商（数据存储和处理）</li>
                            <li>• 支付服务提供商（交易处理）</li>
                            <li>• 数据分析服务商（匿名化数据分析）</li>
                            <li>• 客服系统提供商（客户支持）</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">法律要求</h4>
                          <p className="text-sm text-gray-700">
                            在以下情况下，我们可能需要披露您的个人信息：
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1 mt-2">
                            <li>• 遵守适用的法律法规</li>
                            <li>• 响应政府部门的合法要求</li>
                            <li>• 保护我们的权利和财产</li>
                            <li>• 在紧急情况下保护用户安全</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 数据安全 */}
                <section id="security" className="card">
                  <div className="flex items-center mb-6">
                    <Lock className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">数据安全保护</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Lock className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="font-medium text-green-900">技术保护措施</h4>
                        </div>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• SSL/TLS 加密传输</li>
                          <li>• 数据库加密存储</li>
                          <li>• 访问权限控制</li>
                          <li>• 定期安全审计</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Shield className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-medium text-blue-900">管理保护措施</h4>
                        </div>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 员工安全培训</li>
                          <li>• 数据访问审批</li>
                          <li>• 安全事件响应</li>
                          <li>• 第三方安全评估</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-900 mb-1">安全事件处理</h4>
                          <p className="text-sm text-yellow-800">
                            如发生个人信息安全事件，我们将立即启动应急预案，阻止安全事件扩大，并按照法律法规要求及时告知您。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 用户权利 */}
                <section id="rights" className="card">
                  <div className="flex items-center mb-6">
                    <FileText className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">您的权利</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      根据相关法律法规，您对自己的个人信息享有以下权利：
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">访问权</h4>
                        <p className="text-sm text-gray-700">
                          您有权了解我们收集、使用您个人信息的情况，并可以要求我们提供相关信息的副本。
                        </p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">更正权</h4>
                        <p className="text-sm text-gray-700">
                          当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。
                        </p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">删除权</h4>
                        <p className="text-sm text-gray-700">
                          在特定情况下，您有权要求我们删除关于您的个人信息。
                        </p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">撤回同意</h4>
                        <p className="text-sm text-gray-700">
                          您有权撤回之前给予我们的个人信息处理同意。
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">如何行使权利</h4>
                          <p className="text-sm text-blue-800">
                            您可以通过用户中心的设置页面或联系我们的客服来行使上述权利。我们将在15个工作日内回复您的请求。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 联系我们 */}
                <section id="contact" className="card">
                  <div className="flex items-center mb-6">
                    <Mail className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">联系我们</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">邮箱地址</div>
                            <div className="text-sm text-gray-600">privacy@detective.com</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">客服电话</div>
                            <div className="text-sm text-gray-600">400-123-4567</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">在线客服</div>
                            <div className="text-sm text-gray-600">工作日 9:00-18:00</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">公司信息</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div>公司名称：相亲背调科技有限公司</div>
                          <div>注册地址：北京市朝阳区xxx街道xxx号</div>
                          <div>统一社会信用代码：91110000XXXXXXXXXX</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">政策更新</h4>
                      <p className="text-sm text-gray-700">
                        我们可能会不时更新本隐私政策。当我们对隐私政策进行重大变更时，我们会通过网站公告、邮件或其他方式通知您。
                        请您定期查看本政策，以了解我们如何保护您的信息。
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;