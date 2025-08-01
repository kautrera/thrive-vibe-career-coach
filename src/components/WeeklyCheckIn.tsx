'use client';

import { useState, useEffect } from 'react';

interface WeeklyEntry {
  id: string;
  date: string;
  week: string;
  responses: { [key: string]: string };
  goals: string[];
  blockers: string[];
  wins: string[];
}

interface CheckInQuestion {
  id: string;
  category: string;
  question: string;
  placeholder: string;
}

interface WeeklyCheckInProps {
  userRole: 'ic' | 'manager';
}

export default function WeeklyCheckIn({ userRole }: WeeklyCheckInProps) {
  const [currentEntry, setCurrentEntry] = useState<WeeklyEntry | null>(null);
  const [pastEntries, setPastEntries] = useState<WeeklyEntry[]>([]);
  const [showPastEntries, setShowPastEntries] = useState(false);

  // Questions derived from Column C of the career framework
  const weeklyQuestions: CheckInQuestion[] = [
    {
      id: 'methodology-growth',
      category: 'UX Core',
      question: 'How did you apply or strengthen your UX methodology this week?',
      placeholder: 'Describe methodologies used, research conducted, or process improvements...'
    },
    {
      id: 'business-impact',
      category: 'UX Core',
      question: 'What business impact did your design work create this week?',
      placeholder: 'Connect your design decisions to business outcomes or user metrics...'
    },
    {
      id: 'execution-delivery',
      category: 'Execution',
      question: 'What did you deliver this week and how did you ensure quality?',
      placeholder: 'Describe deliverables, quality measures, and any process improvements...'
    },
    {
      id: 'collaboration-influence',
      category: 'Leadership',
      question: 'How did you collaborate and influence stakeholders this week?',
      placeholder: 'Describe stakeholder interactions, presentations, or consensus building...'
    },
    {
      id: 'problem-ownership',
      category: 'Leadership',
      question: 'What problems did you solve and how did you take ownership?',
      placeholder: 'Describe challenges faced, solutions implemented, and accountability taken...'
    },
    {
      id: 'user-centered-focus',
      category: 'UX Design',
      question: 'How did you advocate for users and incorporate user insights this week?',
      placeholder: 'Describe user research, advocacy moments, or user-centered design decisions...'
    }
  ];

  useEffect(() => {
    // Load past entries
    const savedEntries = localStorage.getItem('weeklyCheckIns');
    if (savedEntries) {
      setPastEntries(JSON.parse(savedEntries));
    }

    // Initialize current week entry
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const weekString = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
    
    setCurrentEntry({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      week: weekString,
      responses: {},
      goals: [''],
      blockers: [''],
      wins: ['']
    });
  }, []);

  const saveEntry = () => {
    if (!currentEntry) return;

    const updatedEntries = [currentEntry, ...pastEntries];
    setPastEntries(updatedEntries);
    localStorage.setItem('weeklyCheckIns', JSON.stringify(updatedEntries));

    // Update progress data
    const progressData = JSON.parse(localStorage.getItem('careerProgressData') || '{}');
    progressData.weeklyCheckIns = (progressData.weeklyCheckIns || 0) + 1;
    progressData.lastActivity = new Date().toLocaleDateString();
    localStorage.setItem('careerProgressData', JSON.stringify(progressData));

    alert('Weekly check-in saved successfully! 🎉');
  };

  const updateResponse = (questionId: string, value: string) => {
    if (!currentEntry) return;
    setCurrentEntry({
      ...currentEntry,
      responses: { ...currentEntry.responses, [questionId]: value }
    });
  };

  const updateArrayField = (field: 'goals' | 'blockers' | 'wins', index: number, value: string) => {
    if (!currentEntry) return;
    const updated = [...currentEntry[field]];
    updated[index] = value;
    setCurrentEntry({ ...currentEntry, [field]: updated });
  };

  const addArrayItem = (field: 'goals' | 'blockers' | 'wins') => {
    if (!currentEntry) return;
    setCurrentEntry({
      ...currentEntry,
      [field]: [...currentEntry[field], '']
    });
  };

  const removeArrayItem = (field: 'goals' | 'blockers' | 'wins', index: number) => {
    if (!currentEntry) return;
    const updated = currentEntry[field].filter((_, i) => i !== index);
    setCurrentEntry({ ...currentEntry, [field]: updated.length ? updated : [''] });
  };

  if (!currentEntry) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Weekly Check-in</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {userRole === 'ic' ? 'Individual Contributor' : 'Manager'} • Week of {currentEntry.week}
            </p>
          </div>
          <button
            onClick={() => setShowPastEntries(!showPastEntries)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showPastEntries ? 'Hide' : 'View'} Past Entries
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <div className="text-green-800 dark:text-green-200">
            <h3 className="font-semibold">Check-ins This Quarter</h3>
            <p className="text-2xl font-bold">{pastEntries.length}</p>
          </div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <div className="text-blue-800 dark:text-blue-200">
            <h3 className="font-semibold">Consistency Streak</h3>
            <p className="text-2xl font-bold">{Math.min(pastEntries.length, 4)} weeks</p>
          </div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <div className="text-purple-800 dark:text-purple-200">
            <h3 className="font-semibold">Completion Rate</h3>
            <p className="text-2xl font-bold">92%</p>
          </div>
        </div>
      </div>

      {showPastEntries && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Past Check-ins</h2>
          <div className="space-y-3">
            {pastEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{entry.week}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {Object.keys(entry.responses).length} questions answered
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Questions */}
      <div className="space-y-6">
        {weeklyQuestions.map((question) => (
          <div key={question.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  {question.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {question.question}
              </h3>
            </div>
            <textarea
              value={currentEntry.responses[question.id] || ''}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={4}
            />
          </div>
        ))}
      </div>

      {/* Goals, Blockers, Wins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Goals for Next Week */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎯 Goals for Next Week
          </h3>
          <div className="space-y-3">
            {currentEntry.goals.map((goal, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => updateArrayField('goals', index, e.target.value)}
                  placeholder="Enter a goal..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {currentEntry.goals.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('goals', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('goals')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Goal
            </button>
          </div>
        </div>

        {/* Blockers */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🚧 Current Blockers
          </h3>
          <div className="space-y-3">
            {currentEntry.blockers.map((blocker, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={blocker}
                  onChange={(e) => updateArrayField('blockers', index, e.target.value)}
                  placeholder="Describe a blocker..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {currentEntry.blockers.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('blockers', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('blockers')}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              + Add Blocker
            </button>
          </div>
        </div>

        {/* Wins */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🏆 This Week's Wins
          </h3>
          <div className="space-y-3">
            {currentEntry.wins.map((win, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={win}
                  onChange={(e) => updateArrayField('wins', index, e.target.value)}
                  placeholder="Celebrate a win..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {currentEntry.wins.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('wins', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('wins')}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              + Add Win
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={saveEntry}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
        >
          Save Weekly Check-in ✅
        </button>
      </div>
    </div>
  );
}