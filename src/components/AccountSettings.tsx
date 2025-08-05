'use client';

import { useState, useEffect } from 'react';

interface AccountSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'ic' | 'manager';
  onRoleChange: (role: 'ic' | 'manager' | null) => void;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  aiPersona: string;
  notifications: boolean;
  autoSave: boolean;
  language: string;
}

export default function AccountSettings({ isOpen, onClose, userRole, onRoleChange }: AccountSettingsProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'system',
    aiPersona: 'liz',
    notifications: true,
    autoSave: true,
    language: 'en'
  });

  const [activeTab, setActiveTab] = useState('general');
  const [userName, setUserName] = useState<string>('');
  const [userLevel, setUserLevel] = useState<string>('G7');

  // Load preferences and username on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
    
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
    
    const savedLevel = localStorage.getItem('userLevel');
    if (savedLevel) {
      setUserLevel(savedLevel);
    } else {
      // Set default level based on role
      setUserLevel(userRole === 'ic' ? 'G7' : 'G7');
    }
  }, []);

  // Save preferences when they change
  const updatePreference = (key: keyof UserPreferences, value: any) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
    
    // Apply theme immediately
    if (key === 'theme') {
      applyTheme(value);
    }
    
    // Dispatch custom event for AI persona changes
    if (key === 'aiPersona') {
      window.dispatchEvent(new CustomEvent('aiPersonaUpdated'));
    }
  };

  // Update username
  const updateUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    // Dispatch custom event to update navigation
    window.dispatchEvent(new CustomEvent('userNameUpdated'));
  };

  // Update user level
  const updateUserLevel = (level: string) => {
    setUserLevel(level);
    localStorage.setItem('userLevel', level);
    // Dispatch custom event to update navigation and other components
    window.dispatchEvent(new CustomEvent('userLevelUpdated'));
  };

  // Apply theme to document
  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  // Apply theme on mount
  useEffect(() => {
    applyTheme(preferences.theme);
  }, [preferences.theme]);

  const aiPersonas = [
    { id: 'liz', name: 'Empathetic', description: 'Human-centered career reinvention', avatar: '👩‍💼' },
    { id: 'lakrisha', name: 'Polished', description: 'Personal branding & LinkedIn', avatar: '💫' },
    { id: 'madeline', name: 'Strategic', description: 'Job search & interview tips', avatar: '🎯' },
    { id: 'margaret', name: 'Assertive', description: 'Promotion & salary negotiation', avatar: '💪' }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'role', label: 'Role & Profile', icon: userRole === 'ic' ? '👤' : '👥' },
    { id: 'ai', label: 'AI Coach', icon: '🤖' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'light', label: 'Light', icon: '☀️' },
                    { value: 'dark', label: 'Dark', icon: '🌙' },
                    { value: 'system', label: 'System', icon: '💻' }
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => updatePreference('theme', theme.value)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                        preferences.theme === theme.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl mb-1">{theme.icon}</span>
                      <span className="text-sm font-medium">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Application</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Auto-save progress</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save your assessment progress</p>
                  </div>
                  <button
                    onClick={() => updatePreference('autoSave', !preferences.autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.autoSave ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Get reminders for check-ins and reviews</p>
                  </div>
                  <button
                    onClick={() => updatePreference('notifications', !preferences.notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'role':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => updateUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This name will appear in the navigation header.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Role</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{userRole === 'ic' ? '👤' : '👥'}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userRole === 'ic' ? 'Individual Contributor' : 'Manager'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {userRole === 'ic' 
                          ? 'Focus on personal skill development and craft excellence'
                          : 'Focus on team leadership and strategic impact'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onRoleChange(null);
                      onClose();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Change Role
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Level</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select your current grade level
                  </label>
                  <select
                    value={userLevel}
                    onChange={(e) => updateUserLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {userRole === 'ic' ? (
                      <>
                        <option value="G5">G5 - Associate Designer</option>
                        <option value="G6">G6 - UX Designer</option>
                        <option value="G7">G7 - Senior UX Designer</option>
                        <option value="G8">G8 - Lead UX Designer</option>
                        <option value="G9">G9 - Principal UX Designer</option>
                        <option value="G10">G10 - UX Architect</option>
                        <option value="G11">G11 - Principal UX Architect</option>
                      </>
                    ) : (
                      <>
                        <option value="G7">G7 - UX Manager</option>
                        <option value="G8">G8 - UX Sr Manager</option>
                        <option value="G9">G9 - UX Design, Director</option>
                        <option value="G10">G10 - UX Design, Sr Director</option>
                        <option value="G11">G11 - UX Design, VP</option>
                        <option value="G12">G12 - UX Design, SVP</option>
                        <option value="G13">G13 - UX Design, EVP</option>
                      </>
                    )}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This level will be used for grade expectations in assessments.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assessment Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Competencies</h4>
                  <p className="text-2xl font-bold text-blue-600">{userRole === 'ic' ? '12' : '15'}</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Total to assess</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Completion</h4>
                  <p className="text-2xl font-bold text-green-600">0%</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Assessment progress</p>
                </div>
              </div>
            </div>


          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default AI Coach Persona</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Choose your preferred coach for new conversations.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {aiPersonas.map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => updatePreference('aiPersona', persona.id)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors text-left ${
                      preferences.aiPersona === persona.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{persona.avatar}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{persona.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{persona.description}</p>
                    </div>
                    {preferences.aiPersona === persona.id && (
                      <span className="ml-auto text-purple-600 dark:text-purple-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Conversation memory</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Remember context across sessions</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Personalized suggestions</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI suggestions based on your assessment data</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Storage</h3>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 dark:text-green-400">🔒</span>
                  <p className="font-semibold text-green-900 dark:text-green-100">Your data stays private</p>
                </div>
                <p className="text-sm text-green-800 dark:text-green-200">
                  All your assessment data, conversations, and preferences are stored locally on your device. 
                  Nothing is sent to external servers or shared with third parties.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Export my data</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Download all your data as JSON</p>
                  </div>
                  <span className="text-gray-400">📤</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Import data</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Restore from exported file</p>
                  </div>
                  <span className="text-gray-400">📥</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">Clear all data</p>
                    <p className="text-xs text-red-700 dark:text-red-300">Permanently delete all stored data</p>
                  </div>
                  <span className="text-red-400">🗑️</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What's Stored</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Assessment responses and self-ratings</p>
                <p>• Weekly and quarterly check-in entries</p>
                <p>• AI chat conversation history</p>
                <p>• User preferences and settings</p>
                <p>• Role selection and grade information</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>←</span>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}