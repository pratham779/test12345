import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Bell, Download, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: BarChart3 },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/alerts', label: 'Alerts & Export', icon: Bell },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <div className="relative">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm transform rotate-45"></div>
                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">SourceSafe</h1>
            </div>
            
            <nav className="hidden sm:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden sm:block text-sm text-gray-600">Walmart Sourcing Team</span>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-900">W</span>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="sm:hidden border-t border-gray-200">
          <nav className="flex space-x-1 py-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;