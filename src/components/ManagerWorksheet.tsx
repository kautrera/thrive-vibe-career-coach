'use client';

import { useState, useEffect } from 'react';

interface ManagerCompetency {
  id: string;
  category: string;
  competency: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  demonstratedBy: string;
  selfAssessment: number;
}

export default function ManagerWorksheet() {
  const [competencies, setCompetencies] = useState<ManagerCompetency[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const managerCompetencies: ManagerCompetency[] = [
      {
        id: '1',
        category: 'People Leadership',
        competency: 'Team Development',
        level1: 'Supports individual contributors',
        level2: 'Coaches team members effectively',
        level3: 'Develops high-performing teams',
        level4: 'Builds organizational capability',
        level5: 'Shapes talent strategy',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '2',
        category: 'People Leadership',
        competency: 'Performance Management',
        level1: 'Conducts regular 1:1s',
        level2: 'Provides constructive feedback',
        level3: 'Manages performance issues',
        level4: 'Optimizes team performance',
        level5: 'Drives organizational performance',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '3',
        category: 'Strategic Leadership',
        competency: 'Vision & Strategy',
        level1: 'Communicates team vision',
        level2: 'Aligns team with strategy',
        level3: 'Develops strategic initiatives',
        level4: 'Influences organizational strategy',
        level5: 'Shapes industry direction',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '4',
        category: 'Operational Excellence',
        competency: 'Process & Execution',
        level1: 'Manages team processes',
        level2: 'Optimizes workflows',
        level3: 'Scales operations',
        level4: 'Drives organizational efficiency',
        level5: 'Transforms operations',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '5',
        category: 'Design Leadership',
        competency: 'Design Quality & Standards',
        level1: 'Maintains design quality',
        level2: 'Establishes design standards',
        level3: 'Drives design excellence',
        level4: 'Influences design culture',
        level5: 'Shapes design industry',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '6',
        category: 'Cross-functional Leadership',
        competency: 'Stakeholder Influence',
        level1: 'Collaborates with partners',
        level2: 'Manages stakeholder expectations',
        level3: 'Influences key decisions',
        level4: 'Drives organizational alignment',
        level5: 'Shapes business strategy',
        demonstratedBy: '',
        selfAssessment: 0
      }
    ];

    const savedData = localStorage.getItem('managerCompetencies');
    if (savedData) {
      setCompetencies(JSON.parse(savedData));
    } else {
      setCompetencies(managerCompetencies);
    }
  }, []);

  const saveToLocalStorage = (updatedCompetencies: ManagerCompetency[]) => {
    localStorage.setItem('managerCompetencies', JSON.stringify(updatedCompetencies));
  };

  const updateDemonstratedBy = (id: string, value: string) => {
    const updated = competencies.map(comp => 
      comp.id === id ? { ...comp, demonstratedBy: value } : comp
    );
    setCompetencies(updated);
    saveToLocalStorage(updated);
  };

  const updateSelfAssessment = (id: string, level: number) => {
    const updated = competencies.map(comp => 
      comp.id === id ? { ...comp, selfAssessment: level } : comp
    );
    setCompetencies(updated);
    saveToLocalStorage(updated);
  };

  const generateDemonstratedBy = async (competency: ManagerCompetency) => {
    const managerSuggestions = [
      `Successfully grew team from 3 to 8 designers while maintaining quality`,
      `Implemented new performance review process resulting in 90% team satisfaction`,
      `Led cross-functional initiative impacting 5 product teams`,
      `Developed design standards adopted across 3 business units`,
      `Mentored 2 ICs to promotion to senior level`,
      `Established design ops processes reducing project delivery time by 30%`,
      `Built partnership with engineering leadership improving collaboration by 40%`,
      `Created team development program with 95% completion rate`
    ];
    
    const randomSuggestion = managerSuggestions[Math.floor(Math.random() * managerSuggestions.length)];
    updateDemonstratedBy(competency.id, randomSuggestion);
  };

  const categories = ['all', ...Array.from(new Set(competencies.map(c => c.category)))];
  const filteredCompetencies = selectedCategory === 'all' 
    ? competencies 
    : competencies.filter(c => c.category === selectedCategory);

  const getProgressPercentage = () => {
    const completed = competencies.filter(c => c.demonstratedBy && c.selfAssessment > 0).length;
    return Math.round((completed / competencies.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manager Self-Assessment Worksheet</h1>
            <p className="text-gray-600 dark:text-gray-400">Evaluate your leadership competencies and management skills</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-semibold">
                Progress: {getProgressPercentage()}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Management Focus Areas */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">Key Manager Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">👥 People First</h3>
            <p className="text-sm">Develop, coach, and grow your team members</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">🎯 Strategic Vision</h3>
            <p className="text-sm">Align team goals with business objectives</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">🤝 Cross-functional Impact</h3>
            <p className="text-sm">Influence stakeholders and drive outcomes</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Competencies */}
      <div className="space-y-6">
        {filteredCompetencies.map((competency) => (
          <div key={competency.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {/* Competency Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {competency.competency}
                </h3>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  {competency.category}
                </span>
              </div>
            </div>

            {/* Level Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} className="relative">
                  <div className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    competency.selfAssessment === level
                      ? 'border-green-500 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updateSelfAssessment(competency.id, level)}
                  >
                    <div className="text-center mb-2">
                      <span className={`inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center ${
                        competency.selfAssessment === level ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(competency as any)[`level${level}`]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Demonstrated By Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Leadership Examples & Impact:
                </label>
                <button
                  onClick={() => generateDemonstratedBy(competency)}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                >
                  🤖 AI Suggest
                </button>
              </div>
              <textarea
                value={competency.demonstratedBy}
                onChange={(e) => updateDemonstratedBy(competency.id, e.target.value)}
                placeholder="Describe leadership initiatives, team outcomes, and measurable impact..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            {/* Current Assessment Display */}
            {competency.selfAssessment > 0 && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Current Self-Assessment:</strong> Level {competency.selfAssessment} - {(competency as any)[`level${competency.selfAssessment}`]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Manager-specific Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
          Save Manager Assessment
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Compare with IC Assessment
        </button>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
          Generate Team Development Plan
        </button>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Get Leadership Coaching
        </button>
      </div>
    </div>
  );
}