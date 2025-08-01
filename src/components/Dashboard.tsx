'use client';

import { useEffect, useState } from 'react';

interface ProgressData {
  icProgress: number;
  managerProgress: number;
  weeklyCheckIns: number;
  quarterlyCheckIns: number;
  lastActivity: string;
}

export default function Dashboard() {
  const [progressData, setProgressData] = useState<ProgressData>({
    icProgress: 0,
    managerProgress: 0,
    weeklyCheckIns: 0,
    quarterlyCheckIns: 0,
    lastActivity: 'Never'
  });

  useEffect(() => {
    // Load progress data from localStorage
    const savedData = localStorage.getItem('careerProgressData');
    if (savedData) {
      setProgressData(JSON.parse(savedData));
    }
  }, []);

  const quickActions = [
    { title: 'Complete Self-Assessment', description: 'Fill out your IC or Manager worksheet', icon: '📝', color: 'bg-blue-500' },
    { title: 'Weekly Check-in', description: 'Quick weekly progress update', icon: '📅', color: 'bg-green-500' },
    { title: 'Talk to AI Coach', description: 'Get personalized career advice', icon: '🤖', color: 'bg-purple-500' },
    { title: 'Quarterly Review', description: 'Comprehensive performance review', icon: '📈', color: 'bg-orange-500' },
  ];

  const insights = [
    "Focus on strengthening your design systems knowledge for the next level",
    "Consider completing the UX Research certification course",
    "Your stakeholder communication skills show strong improvement",
    "Schedule more regular 1:1s with cross-functional partners"
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-blue-100">Let's continue your career growth journey at Salesforce UX</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">IC Assessment</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.icProgress}%</p>
            </div>
            <div className="text-3xl">👤</div>
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressData.icProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Manager Assessment</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.managerProgress}%</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressData.managerProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weekly Check-ins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.weeklyCheckIns}</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This quarter</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quarterly Reviews</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.quarterlyCheckIns}</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Completed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
}