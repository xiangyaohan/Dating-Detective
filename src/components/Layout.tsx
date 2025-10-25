import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import MobileNavigation from './MobileNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // 不显示导航的页面
  const hideNavigation = ['/login', '/register'].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {!hideNavigation && <Header />}
      
      {/* Main Content */}
      <main className={`flex-1 ${!hideNavigation ? 'pt-16 pb-20 md:pb-8' : ''}`}>
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      {/* Mobile Navigation */}
      {!hideNavigation && (
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      )}
    </div>
  );
};

export default Layout;