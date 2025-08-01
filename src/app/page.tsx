'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ICWorksheet from '@/components/ICWorksheet';
import ManagerWorksheet from '@/components/ManagerWorksheet';
import WeeklyCheckIn from '@/components/WeeklyCheckIn';
import QuarterlyCheckIn from '@/components/QuarterlyCheckIn';
import AICoach from '@/components/AICoach';

type ActivePage = 'dashboard' | 'ic-worksheet' | 'manager-worksheet' | 'weekly-checkin' | 'quarterly-checkin' | 'ai-coach';

export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ic-worksheet':
        return <ICWorksheet />;
      case 'manager-worksheet':
        return <ManagerWorksheet />;
      case 'weekly-checkin':
        return <WeeklyCheckIn />;
      case 'quarterly-checkin':
        return <QuarterlyCheckIn />;
      case 'ai-coach':
        return <AICoach />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
