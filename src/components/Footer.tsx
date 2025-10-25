import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-chinese">
                相亲对象背调AI
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              基于AI技术的智能背景调查平台，为现代婚恋提供科技化解决方案，帮助用户更好地了解相亲对象，降低交往风险。
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@detective.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>400-123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                  开始调查
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-400 hover:text-white transition-colors">
                  报告管理
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  用户中心
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">法律信息</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">
                  免责声明
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 相亲对象背调AI. 保留所有权利.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400 mt-4 md:mt-0">
              <MapPin className="w-4 h-4" />
              <span>中国 · 北京</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;