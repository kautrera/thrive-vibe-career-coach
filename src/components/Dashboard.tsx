'use client';

import { useEffect, useState } from 'react';
import ICWorksheet from './ICWorksheet';
import ManagerWorksheet from './ManagerWorksheet';
import WeeklyCheckIn from './WeeklyCheckIn';
import QuarterlyCheckIn from './QuarterlyCheckIn';
import AICoach from './AICoach';
import V2MOM from './V2MOM';

interface ProgressData {
  icProgress: number;
  managerProgress: number;
  weeklyCheckIns: number;
  quarterlyCheckIns: number;
  lastActivity: string;
  v2momProgress?: number;
}

interface DashboardProps {
  userRole: 'ic' | 'manager';
  onRoleChange: (role: 'ic' | 'manager' | null) => void;
}

export default function Dashboard({ userRole, onRoleChange }: DashboardProps) {
  const [progressData, setProgressData] = useState<ProgressData>({
    icProgress: 0,
    managerProgress: 0,
    weeklyCheckIns: 0,
    quarterlyCheckIns: 0,
    lastActivity: 'Never',
    v2momProgress: 72 // Strategic framework implementation progress
  });

  useEffect(() => {
    // Load progress data from localStorage
    const savedData = localStorage.getItem('careerProgressData');
    if (savedData) {
      setProgressData(JSON.parse(savedData));
    }

    // Load IC assessment progress
    const icProgressData = localStorage.getItem('icAssessmentProgress');
    if (icProgressData) {
      try {
        const icProgress = JSON.parse(icProgressData);
        setProgressData(prev => ({
          ...prev,
          icProgress: icProgress.progressPercentage
        }));
      } catch (error) {
        console.error('Error parsing IC progress data:', error);
      }
    }

    // Listen for IC assessment progress updates
    const handleProgressUpdate = (event: CustomEvent) => {
      setProgressData(prev => ({
        ...prev,
        icProgress: event.detail.progressPercentage,
        lastActivity: new Date().toLocaleDateString()
      }));
    };

    window.addEventListener('icAssessmentProgressUpdated', handleProgressUpdate as EventListener);

    return () => {
      window.removeEventListener('icAssessmentProgressUpdated', handleProgressUpdate as EventListener);
    };
  }, []);

  const [activeSection, setActiveSection] = useState<'dashboard' | 'assessment' | 'weekly-checkin' | 'quarterly-checkin' | 'v2mom' | 'ai-coach'>('dashboard');



  const insights = [
    "Focus on strengthening your design systems knowledge for the next level",
    "Consider completing the UX Research certification course",
    "Your stakeholder communication skills show strong improvement",
    "Schedule more regular 1:1s with cross-functional partners"
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'assessment':
        return userRole === 'ic' ? <ICWorksheet /> : <ManagerWorksheet />;
      case 'weekly-checkin':
        return <WeeklyCheckIn userRole={userRole} onBackToDashboard={() => setActiveSection('dashboard')} />;
      case 'quarterly-checkin':
        return <QuarterlyCheckIn userRole={userRole} onBackToDashboard={() => setActiveSection('dashboard')} />;
      case 'v2mom':
        return <V2MOM onBackToDashboard={() => setActiveSection('dashboard')} />;
      case 'ai-coach':
        return <AICoach />;
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className={`bg-gradient-to-r ${userRole === 'ic' ? 'from-blue-600 to-purple-600' : 'from-green-600 to-blue-600'} rounded-lg p-6 text-white`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className={`${userRole === 'ic' ? 'text-blue-100' : 'text-green-100'}`}>
            Let's continue your {userRole === 'ic' ? 'IC career growth' : 'leadership'} journey at Salesforce UX
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => setActiveSection('assessment')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all text-left w-full"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {userRole === 'ic' ? 'Self Assessment' : 'Manager Assessment'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {userRole === 'ic' ? progressData.icProgress : progressData.managerProgress}%
              </p>
            </div>
            <div className="text-3xl">{userRole === 'ic' ? '👤' : '👥'}</div>
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`${userRole === 'ic' ? 'bg-blue-600' : 'bg-green-600'} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${userRole === 'ic' ? progressData.icProgress : progressData.managerProgress}%` }}
            ></div>
          </div>
        </button>

        {/* V2MOM Progress */}
        <button 
          onClick={() => setActiveSection('v2mom')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all text-left w-full"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">V2MOM</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {progressData.v2momProgress || 0}%
              </p>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressData.v2momProgress || 0}%` }}
            ></div>
          </div>
        </button>

        <button 
          onClick={() => setActiveSection('weekly-checkin')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all text-left w-full"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weekly Check-ins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.weeklyCheckIns}</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This quarter</p>
        </button>

        <button 
          onClick={() => setActiveSection('quarterly-checkin')}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all text-left w-full"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quarterly Reviews</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.quarterlyCheckIns}</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Completed</p>
        </button>
      </div>



      {/* Insights & Recommendations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Career Insights</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-yellow-500 mt-1">💡</div>
                <p className="text-gray-700 dark:text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">Completed weekly check-in</p>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">Updated IC self-assessment</p>
              <span className="text-sm text-gray-500">1 week ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">Chatted with AI Career Coach</p>
              <span className="text-sm text-gray-500">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {renderActiveSection()}
    </div>
  );
}