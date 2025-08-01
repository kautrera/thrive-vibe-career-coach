'use client';

import { useState } from 'react';

type ActivePage = 'dashboard' | 'assessment' | 'weekly-checkin' | 'quarterly-checkin' | 'ai-coach';
type UserRole = 'ic' | 'manager';

interface NavigationProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole | null) => void;
}

export default function Navigation({ activePage, setActivePage, userRole, onRoleChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { 
      id: 'assessment', 
      label: userRole === 'ic' ? 'IC Assessment' : 'Manager Assessment', 
      icon: userRole === 'ic' ? '👤' : '👥' 
    },
    { id: 'weekly-checkin', label: 'Weekly Check-in', icon: '📅' },
    { id: 'quarterly-checkin', label: 'Quarterly Review', icon: '📈' },
    { id: 'ai-coach', label: 'AI Career Coach', icon: '🤖' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🚀</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Thrive Vibe Career Coach
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {userRole === 'ic' ? 'Individual Contributor' : 'Manager'} • FY26 Framework
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as ActivePage)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Role Switch & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onRoleChange(null)}
              className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span>🔄</span>
              <span>Switch Role</span>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as ActivePage);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Mobile Role Switch */}
            <button
              onClick={() => {
                onRoleChange(null);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span>🔄</span>
              <span className="text-sm font-medium">Switch Role</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}