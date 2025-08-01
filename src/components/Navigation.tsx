'use client';

import { useState } from 'react';
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

          {/* Account Settings */}
          <div className="flex items-center">
            <button
              onClick={() => setIsAccountOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>⚙️</span>
              <span className="text-sm font-medium">Account</span>
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