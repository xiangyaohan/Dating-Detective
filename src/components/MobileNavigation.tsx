import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  FileText, 
  User,
  Plus,
  Brain
} from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: '首页',
      exact: true
    },
    {
      path: '/investigation',
      icon: Plus,
      label: '新建',
      exact: false
    },
    {
      path: '/reports',
      icon: FileText,
      label: '报告',
      exact: false
    },
    {
      path: '/ai-config',
      icon: Brain,
      label: 'AI',
      exact: false
    },
    {
      path: '/profile',
      icon: User,
      label: '我的',
      exact: false
    }
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar-mobile safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors duration-200 touch-target ${
                active 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${active ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className={`text-xs font-medium ${active ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;