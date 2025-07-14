import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Bell, Download, Settings, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: BarChart3 },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/alerts', label: 'Alerts & Export', icon: Bell },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-gray-300 shadow-sm">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-12"></div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Walmart SourceSafe</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-gray-600 font-medium">SOURCING INTELLIGENCE</span>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Right side - Search and User */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search SKUs..."
                className="w-64 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700 font-medium">Sourcing Team</span>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-white">W</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-200">
          <nav className="flex space-x-1 py-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
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