'use client';

import { useState, useEffect } from 'react';
import AccountSettings from './AccountSettings';

type ActivePage = 'dashboard';
type UserRole = 'ic' | 'manager';

interface NavigationProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole | null) => void;
}

export default function Navigation({ activePage, setActivePage, userRole, onRoleChange }: NavigationProps) {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [userGrade, setUserGrade] = useState<string>('G7');
  const [userName, setUserName] = useState<string>('');

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      let savedName = localStorage.getItem('userName');
      if (!savedName) {
        // Generate a default name based on role
        savedName = userRole === 'ic' ? 'Individual Contributor' : 'Manager';
        localStorage.setItem('userName', savedName);
      }
      
      // Get actual user level from localStorage or set default
      const savedLevel = localStorage.getItem('userLevel');
      if (savedLevel) {
        setUserGrade(savedLevel);
      } else {
        // Set default level based on role
        const defaultLevel = 'G7';
        setUserGrade(defaultLevel);
        localStorage.setItem('userLevel', defaultLevel);
      }
      setUserName(savedName);
    };

    loadUserData();

    // Listen for localStorage changes to update username and level in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userName') {
        setUserName(e.newValue || '');
      } else if (e.key === 'userLevel') {
        setUserGrade(e.newValue || 'G7');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from AccountSettings
    const handleUserNameUpdate = () => {
      const savedName = localStorage.getItem('userName');
      const savedLevel = localStorage.getItem('userLevel');
      if (savedName) setUserName(savedName);
      if (savedLevel) setUserGrade(savedLevel);
    };
    
    window.addEventListener('userNameUpdated', handleUserNameUpdate);
    window.addEventListener('userLevelUpdated', handleUserNameUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userNameUpdated', handleUserNameUpdate);
      window.removeEventListener('userLevelUpdated', handleUserNameUpdate);
    };
  }, [userRole]);

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
                FY26 Framework
              </p>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <button
              onClick={() => setIsAccountOpen(true)}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {/* User Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                userRole === 'ic' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-br from-green-500 to-blue-600'
              }`}>
                {userName.charAt(0).toUpperCase() || 'U'}
              </div>
              
              {/* User Info */}
              <div className="text-left">
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {userName || 'User'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {userGrade} • {userRole === 'ic' ? 'IC' : 'Manager'}
                </div>
              </div>
            </button>
          </div>
        </div>


      </div>
      
      {/* Account Settings Modal */}
      {isAccountOpen && (
        <AccountSettings 
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          userRole={userRole}
          onRoleChange={onRoleChange}
        />
      )}
    </nav>
  );
}