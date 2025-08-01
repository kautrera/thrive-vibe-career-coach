'use client';

interface RoleSelectionProps {
  onRoleSelect: (role: 'ic' | 'manager') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Thrive Vibe Career Coach
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            FY26 UX Career Framework - Salesforce
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Let's start by identifying your role to customize your career development experience
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Individual Contributor */}
          <button
            onClick={() => onRoleSelect('ic')}
            className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 hover:scale-105"
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👤</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Individual Contributor
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                UX Designer, Researcher, or other IC role focused on hands-on design work and personal growth
              </p>
              
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="mr-2">✓</span>
                  <span>12 core competencies assessment</span>
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="mr-2">✓</span>
                  <span>Grade-based expectations (IC1-IC5)</span>
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="mr-2">✓</span>
                  <span>Craft and execution focus</span>
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="mr-2">✓</span>
                  <span>Personal skill development</span>
                </div>
              </div>
            </div>
          </button>

          {/* Manager */}
          <button
            onClick={() => onRoleSelect('manager')}
            className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 hover:scale-105"
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👥</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Manager
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Design Manager, Director, or other leadership role focused on team development and strategic impact
              </p>
              
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  <span>15 competencies (IC + leadership)</span>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  <span>Management levels (M1-M4, Principal)</span>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  <span>People and team development</span>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  <span>Strategic leadership focus</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Framework Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎯 What You'll Get
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Assessment Tools</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Self-assessment worksheet</li>
                <li>• Progress tracking dashboard</li>
                <li>• Gap analysis vs grade expectations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Career Support</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• AI career coaching</li>
                <li>• Weekly & quarterly check-ins</li>
                <li>• Personalized development insights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <span className="mr-2">🔒</span>
            <span>All your data stays private and is stored locally on your device</span>
          </div>
        </div>
      </div>
    </div>
  );
}