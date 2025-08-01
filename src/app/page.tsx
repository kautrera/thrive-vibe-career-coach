'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ICWorksheet from '@/components/ICWorksheet';
import ManagerWorksheet from '@/components/ManagerWorksheet';
import WeeklyCheckIn from '@/components/WeeklyCheckIn';
import QuarterlyCheckIn from '@/components/QuarterlyCheckIn';
import AICoach from '@/components/AICoach';
import RoleSelection from '@/components/RoleSelection';

type ActivePage = 'dashboard';
type UserRole = 'ic' | 'manager' | null;

export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Load saved role on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Save role to localStorage when it changes
  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  };

  // If no role selected, show role selection
  if (!userRole) {
    return <RoleSelection onRoleSelect={handleRoleChange} />;
  }

  // Since we removed navigation, always show dashboard
  const renderContent = () => {
    return <Dashboard userRole={userRole} onRoleChange={handleRoleChange} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage} 
        userRole={userRole}
        onRoleChange={handleRoleChange}
      />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
