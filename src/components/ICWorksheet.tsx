'use client';

import { useState, useEffect } from 'react';

interface Competency {
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

export default function ICWorksheet() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample UX competencies data structure
  useEffect(() => {
    const sampleCompetencies: Competency[] = [
      {
        id: '1',
        category: 'Design Process & Methods',
        competency: 'Design Thinking',
        level1: 'Understands basic design thinking principles',
        level2: 'Applies design thinking to simple problems',
        level3: 'Facilitates design thinking sessions',
        level4: 'Coaches others in design thinking',
        level5: 'Innovates new design thinking approaches',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '2',
        category: 'Design Process & Methods',
        competency: 'User Research',
        level1: 'Understands research basics',
        level2: 'Conducts basic user interviews',
        level3: 'Designs and executes research plans',
        level4: 'Synthesizes insights across studies',
        level5: 'Establishes research strategy',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '3',
        category: 'Technical Skills',
        competency: 'Prototyping',
        level1: 'Creates low-fidelity prototypes',
        level2: 'Builds interactive prototypes',
        level3: 'Creates high-fidelity prototypes',
        level4: 'Optimizes prototype for testing',
        level5: 'Innovates prototyping methods',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '4',
        category: 'Collaboration & Communication',
        competency: 'Stakeholder Management',
        level1: 'Communicates with immediate team',
        level2: 'Presents to stakeholders',
        level3: 'Manages stakeholder expectations',
        level4: 'Influences stakeholder decisions',
        level5: 'Builds strategic partnerships',
        demonstratedBy: '',
        selfAssessment: 0
      },
      {
        id: '5',
        category: 'Business & Strategy',
        competency: 'Business Acumen',
        level1: 'Understands basic business metrics',
        level2: 'Connects design to business goals',
        level3: 'Influences product strategy',
        level4: 'Drives business outcomes',
        level5: 'Shapes organizational strategy',
        demonstratedBy: '',
        selfAssessment: 0
      }
    ];

    // Load saved data from localStorage
    const savedData = localStorage.getItem('icCompetencies');
    if (savedData) {
      setCompetencies(JSON.parse(savedData));
    } else {
      setCompetencies(sampleCompetencies);
    }
  }, []);

  const saveToLocalStorage = (updatedCompetencies: Competency[]) => {
    localStorage.setItem('icCompetencies', JSON.stringify(updatedCompetencies));
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

  const generateDemonstratedBy = async (competency: Competency) => {
    // AI-powered suggestion for "Demonstrated By" field
    const suggestions = [
      `Led ${competency.competency.toLowerCase()} project for Q3 product launch`,
      `Facilitated ${competency.competency.toLowerCase()} workshops with cross-functional team`,
      `Delivered ${competency.competency.toLowerCase()} improvements resulting in 15% user satisfaction increase`,
      `Mentored junior designers on ${competency.competency.toLowerCase()} best practices`,
      `Presented ${competency.competency.toLowerCase()} insights to executive leadership team`
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">IC Self-Assessment Worksheet</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete your competency assessment and track your career growth</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
              <span className="text-blue-800 dark:text-blue-200 font-semibold">
                Progress: {getProgressPercentage()}%
              </span>
            </div>
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
                  ? 'bg-blue-600 text-white'
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
                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-600 dark:text-gray-400">
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
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updateSelfAssessment(competency.id, level)}
                  >
                    <div className="text-center mb-2">
                      <span className={`inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center ${
                        competency.selfAssessment === level ? 'bg-blue-500' : 'bg-gray-400'
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
                  Demonstrated By (Evidence/Examples):
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
                placeholder="Describe specific examples, projects, or achievements that demonstrate this competency..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Assessment
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
          Export to PDF
        </button>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Get AI Career Recommendations
        </button>
      </div>
    </div>
  );
}