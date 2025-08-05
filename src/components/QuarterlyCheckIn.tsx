'use client';

import { useState, useEffect } from 'react';

interface QuarterlyReview {
  id: string;
  quarter: string;
  year: number;
  goalProgress: { [key: string]: number };
  competencyGrowth: string[];
  achievements: string[];
  challenges: string[];
  learnings: string[];
  feedbackReceived: string[];
  feedbackGiven: string[];
  nextQuarterGoals: string[];
  careerGoals: string[];
  developmentNeeds: string[];
  managerNotes: string;
  selfReflection: string;
  overallRating: number;
}

interface QuarterlyCheckInProps {
  userRole: 'ic' | 'manager';
  onBackToDashboard?: () => void;
}

export default function QuarterlyCheckIn({ userRole, onBackToDashboard }: QuarterlyCheckInProps) {
  const [currentReview, setCurrentReview] = useState<QuarterlyReview | null>(null);
  const [pastReviews, setPastReviews] = useState<QuarterlyReview[]>([]);
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'goals', label: 'Goal Progress', icon: '🎯' },
    { id: 'growth', label: 'Growth & Learning', icon: '📈' },
    { id: 'feedback', label: 'Feedback', icon: '💬' },
    { id: 'planning', label: 'Future Planning', icon: '🗓️' },
    { id: 'reflection', label: 'Self-Reflection', icon: '🤔' }
  ];

  useEffect(() => {
    // Load past reviews
    const savedReviews = localStorage.getItem('quarterlyReviews');
    if (savedReviews) {
      setPastReviews(JSON.parse(savedReviews));
    }

    // Initialize current quarter review
    const today = new Date();
    const currentQuarter = Math.floor((today.getMonth() + 3) / 3);
    const quarterNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    setCurrentReview({
      id: Date.now().toString(),
      quarter: quarterNames[currentQuarter - 1],
      year: today.getFullYear(),
      goalProgress: {},
      competencyGrowth: [''],
      achievements: [''],
      challenges: [''],
      learnings: [''],
      feedbackReceived: [''],
      feedbackGiven: [''],
      nextQuarterGoals: [''],
      careerGoals: [''],
      developmentNeeds: [''],
      managerNotes: '',
      selfReflection: '',
      overallRating: 0
    });
  }, []);

  const saveReview = () => {
    if (!currentReview) return;

    const updatedReviews = [currentReview, ...pastReviews];
    setPastReviews(updatedReviews);
    localStorage.setItem('quarterlyReviews', JSON.stringify(updatedReviews));

    // Update progress data
    const progressData = JSON.parse(localStorage.getItem('careerProgressData') || '{}');
    progressData.quarterlyCheckIns = (progressData.quarterlyCheckIns || 0) + 1;
    progressData.lastActivity = new Date().toLocaleDateString();
    localStorage.setItem('careerProgressData', JSON.stringify(progressData));

    alert('Quarterly review saved successfully! 🎉');
  };

  const updateArrayField = (field: keyof QuarterlyReview, index: number, value: string) => {
    if (!currentReview) return;
    const fieldValue = currentReview[field] as string[];
    const updated = [...fieldValue];
    updated[index] = value;
    setCurrentReview({ ...currentReview, [field]: updated });
  };

  const addArrayItem = (field: keyof QuarterlyReview) => {
    if (!currentReview) return;
    const fieldValue = currentReview[field] as string[];
    setCurrentReview({
      ...currentReview,
      [field]: [...fieldValue, '']
    });
  };

  const removeArrayItem = (field: keyof QuarterlyReview, index: number) => {
    if (!currentReview) return;
    const fieldValue = currentReview[field] as string[];
    const updated = fieldValue.filter((_, i) => i !== index);
    setCurrentReview({ 
      ...currentReview, 
      [field]: updated.length ? updated : [''] 
    });
  };

  if (!currentReview) return <div>Loading...</div>;

  const renderArraySection = (
    title: string, 
    field: keyof QuarterlyReview, 
    placeholder: string, 
    color: string = 'blue'
  ) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {(currentReview[field] as string[]).map((item, index) => (
          <div key={index} className="flex space-x-2">
            <textarea
              value={item}
              onChange={(e) => updateArrayField(field, index, e.target.value)}
              placeholder={placeholder}
              className={`flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
              rows={2}
            />
            {(currentReview[field] as string[]).length > 1 && (
              <button
                onClick={() => removeArrayItem(field, index)}
                className="text-red-600 hover:text-red-800 px-2"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem(field)}
          className={`text-${color}-600 hover:text-${color}-800 text-sm font-medium`}
        >
          + Add Item
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${userRole === 'ic' ? 'from-purple-600 to-blue-600' : 'from-green-600 to-blue-600'} p-6 rounded-lg text-white`}>
              <h2 className="text-2xl font-bold mb-2">{currentReview.quarter} {currentReview.year} Performance Review</h2>
              <p className="opacity-90">
                {userRole === 'ic' ? 'Individual Contributor' : 'Manager'} • Comprehensive quarterly assessment and planning
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overall Self-Rating</h3>
                <div className="flex space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setCurrentReview({ ...currentReview, overallRating: rating })}
                      className={`w-12 h-12 rounded-full text-white font-bold ${
                        currentReview.overallRating === rating ? 'bg-purple-600' : 'bg-gray-400'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rate your overall performance this quarter (1-5)
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Self-Assessment</span>
                    <span className="text-orange-600">In Progress</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manager Review</span>
                    <span className="text-gray-400">Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Goal Setting</span>
                    <span className="text-gray-400">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quarter Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Major Achievements</h4>
                  <p className="text-2xl font-bold text-green-600">{currentReview.achievements.filter(a => a.trim()).length}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Key Learnings</h4>
                  <p className="text-2xl font-bold text-blue-600">{currentReview.learnings.filter(l => l.trim()).length}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200">Future Goals</h4>
                  <p className="text-2xl font-bold text-purple-600">{currentReview.nextQuarterGoals.filter(g => g.trim()).length}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Goal Progress Assessment</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Evaluate progress on quarterly and annual goals</p>
              
              {/* This would typically pull from saved goals */}
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Sample Goal: Improve design system adoption</h3>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress:</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </div>

            {renderArraySection(
              '🏆 Major Achievements This Quarter',
              'achievements',
              'Describe a significant accomplishment, project completion, or milestone...',
              'green'
            )}

            {renderArraySection(
              '⚡ Challenges Overcome',
              'challenges',
              'Describe a challenge you faced and how you addressed it...',
              'orange'
            )}
          </div>
        );

      case 'growth':
        return (
          <div className="space-y-6">
            {renderArraySection(
              '📈 Competency Growth Areas',
              'competencyGrowth',
              'Which competencies did you strengthen this quarter? Provide specific examples...',
              'blue'
            )}

            {renderArraySection(
              '📚 Key Learnings & Insights',
              'learnings',
              'What new knowledge, skills, or insights did you gain?',
              'purple'
            )}

            {renderArraySection(
              '🎯 Development Needs for Next Quarter',
              'developmentNeeds',
              'What areas would you like to focus on developing further?',
              'indigo'
            )}
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6">
            {renderArraySection(
              '📥 Feedback Received',
              'feedbackReceived',
              'What feedback did you receive from peers, managers, or stakeholders?',
              'green'
            )}

            {renderArraySection(
              '📤 Feedback Given',
              'feedbackGiven',
              'What feedback did you provide to others? How did you contribute to their growth?',
              'blue'
            )}

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manager Notes</h3>
              <textarea
                value={currentReview.managerNotes}
                onChange={(e) => setCurrentReview({ ...currentReview, managerNotes: e.target.value })}
                placeholder="Space for manager feedback and notes (to be completed during review meeting)..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows={4}
              />
            </div>
          </div>
        );

      case 'planning':
        return (
          <div className="space-y-6">
            {renderArraySection(
              '🎯 Goals for Next Quarter',
              'nextQuarterGoals',
              'What specific goals do you want to achieve next quarter?',
              'green'
            )}

            {renderArraySection(
              '🚀 Long-term Career Goals',
              'careerGoals',
              'What are your longer-term career aspirations and development goals?',
              'purple'
            )}
          </div>
        );

      case 'reflection':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🤔 Quarter Self-Reflection
              </h3>
              <textarea
                value={currentReview.selfReflection}
                onChange={(e) => setCurrentReview({ ...currentReview, selfReflection: e.target.value })}
                placeholder="Take time to reflect on your growth, challenges, successes, and learnings this quarter. What patterns do you notice? What would you do differently? What are you most proud of?"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows={8}
              />
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-4">💡 Reflection Prompts</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• What moments made you feel most energized and engaged?</li>
                <li>• What challenges helped you grow the most?</li>
                <li>• How has your perspective on your role/career evolved?</li>
                <li>• What patterns do you notice in your feedback?</li>
                <li>• What support or resources would be most helpful?</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back to Dashboard */}
      {onBackToDashboard && (
        <button 
          onClick={onBackToDashboard}
          className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      )}

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{section.icon}</span>
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Save Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={saveReview}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
        >
          Save Quarterly Review 📋
        </button>
      </div>
    </div>
  );
}