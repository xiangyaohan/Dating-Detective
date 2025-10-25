import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  CreditCard, 
  Settings, 
  Edit3, 
  Save, 
  X,
  Eye,
  EyeOff,
  Camera,
  Download,
  Trash2,
  Star,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: '张明',
    email: 'zhangming@example.com',
    phone: '138****5678',
    location: '北京市朝阳区',
    joinDate: '2023-06-15',
    avatar: '',
    bio: '专业的背景调查服务用户，注重隐私保护和数据安全。'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    reportReady: true,
    securityAlerts: true,
    marketingEmails: false
  });

  const [subscription] = useState({
    plan: 'premium',
    expiryDate: '2024-06-15',
    reportsUsed: 15,
    reportsLimit: 50,
    features: [
      '高级背景调查',
      '详细分析报告',
      '24/7 客户支持',
      '数据导出功能',
      '优先处理'
    ]
  });

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'report_generated',
      description: '生成了张三的背景调查报告',
      timestamp: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: '2',
      type: 'profile_updated',
      description: '更新了个人资料',
      timestamp: '2024-01-14 09:15',
      status: 'completed'
    },
    {
      id: '3',
      type: 'subscription_renewed',
      description: '续费了高级会员',
      timestamp: '2024-01-10 16:45',
      status: 'completed'
    }
  ]);

  const handleSaveProfile = () => {
    // TODO: 实现保存逻辑
    console.log('Saving profile:', userInfo);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新密码和确认密码不匹配');
      return;
    }
    // TODO: 实现密码修改逻辑
    console.log('Changing password');
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    // TODO: 实现通知设置保存逻辑
    console.log('Notification settings updated:', { [key]: value });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report_generated':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'profile_updated':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'subscription_renewed':
        return <CreditCard className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'profile', name: '个人资料', icon: User },
    { id: 'subscription', name: '订阅管理', icon: CreditCard },
    { id: 'notifications', name: '通知设置', icon: Bell },
    { id: 'security', name: '安全设置', icon: Shield },
    { id: 'activity', name: '活动记录', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-chinese">
              用户中心
            </h1>
            <p className="text-gray-600">
              管理您的个人信息和账户设置
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              <div className="card">
                {/* 用户头像和基本信息 */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                      {userInfo.avatar ? (
                        <img
                          src={userInfo.avatar}
                          alt="头像"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-gray-500" />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900">{userInfo.username}</h3>
                  <p className="text-sm text-gray-600">{userInfo.email}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Award className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">高级会员</span>
                  </div>
                </div>

                {/* 导航菜单 */}
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* 主内容区 */}
            <div className="lg:col-span-3">
              {/* 个人资料 */}
              {activeTab === 'profile' && (
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">个人资料</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn btn-secondary"
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          取消
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          编辑
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        用户名
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="input"
                          value={userInfo.username}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, username: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          className="input"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        手机号码
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          className="input"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        所在地区
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="input"
                          value={userInfo.location}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, location: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.location}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        个人简介
                      </label>
                      {isEditing ? (
                        <textarea
                          className="input"
                          rows={3}
                          value={userInfo.bio}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, bio: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.bio}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        注册时间
                      </label>
                      <p className="text-gray-900">{new Date(userInfo.joinDate).toLocaleDateString('zh-CN')}</p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        className="btn btn-primary"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        保存更改
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 订阅管理 */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  <div className="card">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">当前订阅</h2>
                    
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">高级会员</h3>
                          <p className="text-primary-100">享受全功能服务</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">¥299</div>
                          <div className="text-primary-100">/ 月</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          到期时间
                        </label>
                        <p className="text-gray-900">{new Date(subscription.expiryDate).toLocaleDateString('zh-CN')}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          使用情况
                        </label>
                        <div className="flex items-center">
                          <span className="text-gray-900">{subscription.reportsUsed} / {subscription.reportsLimit}</span>
                          <div className="ml-3 flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${(subscription.reportsUsed / subscription.reportsLimit) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">包含功能</h4>
                      <ul className="space-y-2">
                        {subscription.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-3">
                      <button className="btn btn-primary">续费订阅</button>
                      <button className="btn btn-secondary">升级套餐</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 通知设置 */}
              {activeTab === 'notifications' && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">通知设置</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">邮件通知</h3>
                        <p className="text-sm text-gray-600">接收重要更新和报告完成通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">短信通知</h3>
                        <p className="text-sm text-gray-600">接收紧急安全警报</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">报告完成通知</h3>
                        <p className="text-sm text-gray-600">背景调查报告生成完成时通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.reportReady}
                          onChange={(e) => handleNotificationChange('reportReady', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">安全警报</h3>
                        <p className="text-sm text-gray-600">账户安全相关的重要通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.securityAlerts}
                          onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">营销邮件</h3>
                        <p className="text-sm text-gray-600">产品更新和优惠信息</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 安全设置 */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="card">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">密码设置</h2>
                    
                    {!showPasswordChange ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">登录密码</h3>
                          <p className="text-sm text-gray-600">上次修改：2023-12-01</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordChange(true)}
                          className="btn btn-secondary"
                        >
                          修改密码
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            当前密码
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? 'text' : 'password'}
                              className="input pr-10"
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            新密码
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              className="input pr-10"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            确认新密码
                          </label>
                          <input
                            type="password"
                            className="input"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          />
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={handlePasswordChange}
                            className="btn btn-primary"
                          >
                            保存密码
                          </button>
                          <button
                            onClick={() => {
                              setShowPasswordChange(false);
                              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            }}
                            className="btn btn-secondary"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">账户安全</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">两步验证</h3>
                          <p className="text-sm text-gray-600">为您的账户添加额外的安全保护</p>
                        </div>
                        <button className="btn btn-secondary">启用</button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">登录设备管理</h3>
                          <p className="text-sm text-gray-600">查看和管理已登录的设备</p>
                        </div>
                        <button className="btn btn-secondary">管理设备</button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">数据导出</h3>
                          <p className="text-sm text-gray-600">下载您的个人数据副本</p>
                        </div>
                        <button className="btn btn-secondary">
                          <Download className="w-4 h-4 mr-2" />
                          导出数据
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 text-red-600">删除账户</h3>
                          <p className="text-sm text-gray-600">永久删除您的账户和所有数据</p>
                        </div>
                        <button className="btn bg-red-50 text-red-600 hover:bg-red-100">
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除账户
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 活动记录 */}
              {activeTab === 'activity' && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">活动记录</h2>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <button className="btn btn-secondary">查看更多记录</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;