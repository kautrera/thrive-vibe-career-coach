'use client';

import { useState, useEffect } from 'react';
import { getAllCompetencies, gradeExpectations, type Competency } from '@/data/careerFramework';

interface CompetencyAssessment {
  competencyId: string;
  selfAssessment: number;
  gradeExpectation: number;
  demonstratedBy: string;
  managerAssessment?: number;
  managerNotes?: string;
}

export default function ICWorksheet() {
  const [assessments, setAssessments] = useState<CompetencyAssessment[]>([]);
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('IC3');
  const competencies = getAllCompetencies();

  // Initialize assessments based on framework data
  useEffect(() => {
    const savedData = localStorage.getItem('icAssessments');
    if (savedData) {
      setAssessments(JSON.parse(savedData));
    } else {
      // Initialize with framework data
      const initialAssessments: CompetencyAssessment[] = competencies.map(comp => ({
        competencyId: comp.id,
        selfAssessment: 0,
        gradeExpectation: gradeExpectations[selectedGrade]?.[comp.id] || 0,
        demonstratedBy: '',
        managerAssessment: 0,
        managerNotes: ''
      }));
      setAssessments(initialAssessments);
    }
  }, []);

  // Update grade expectations when grade changes
  useEffect(() => {
    const updatedAssessments = assessments.map(assessment => ({
      ...assessment,
      gradeExpectation: gradeExpectations[selectedGrade]?.[assessment.competencyId] || 0
    }));
    setAssessments(updatedAssessments);
    saveToLocalStorage(updatedAssessments);
  }, [selectedGrade]);

  const saveToLocalStorage = (updatedAssessments: CompetencyAssessment[]) => {
    localStorage.setItem('icAssessments', JSON.stringify(updatedAssessments));
  };

  const updateDemonstratedBy = (competencyId: string, value: string) => {
    const updated = assessments.map(assessment => 
      assessment.competencyId === competencyId ? { ...assessment, demonstratedBy: value } : assessment
    );
    setAssessments(updated);
    saveToLocalStorage(updated);
  };

  const updateSelfAssessment = (competencyId: string, level: number) => {
    const updated = assessments.map(assessment => 
      assessment.competencyId === competencyId ? { ...assessment, selfAssessment: level } : assessment
    );
    setAssessments(updated);
    saveToLocalStorage(updated);
  };

  const generateDemonstratedBy = async (competency: Competency) => {
    // AI-powered suggestions based on competency type
    const suggestions = [
      `Led ${competency.name.toLowerCase()} initiative for Q3 product launch with measurable user impact`,
      `Facilitated cross-functional ${competency.name.toLowerCase()} workshops improving team alignment by 40%`,
      `Delivered ${competency.name.toLowerCase()} improvements resulting in 15% increase in user satisfaction scores`,
      `Mentored 3 junior designers on ${competency.name.toLowerCase()} best practices with 100% skill improvement`,
      `Presented ${competency.name.toLowerCase()} insights to executive stakeholders, influencing product roadmap`,
      `Established ${competency.name.toLowerCase()} standards adopted across 5 product teams`,
      `Optimized ${competency.name.toLowerCase()} processes reducing design delivery time by 30%`
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    updateDemonstratedBy(competency.id, randomSuggestion);
  };

  const pillars = ['all', ...Array.from(new Set(competencies.map(c => c.pillar)))];
  const filteredCompetencies = selectedPillar === 'all' 
    ? competencies 
    : competencies.filter(c => c.pillar === selectedPillar);

  const getProgressPercentage = () => {
    const completed = assessments.filter(a => a.demonstratedBy && a.selfAssessment > 0).length;
    return Math.round((completed / assessments.length) * 100);
  };

  const getAssessment = (competencyId: string) => {
    return assessments.find(a => a.competencyId === competencyId) || {
      competencyId,
      selfAssessment: 0,
      gradeExpectation: 0,
      demonstratedBy: '',
      managerAssessment: 0,
      managerNotes: ''
    };
  };

  const grades = ['IC1', 'IC2', 'IC3', 'IC4', 'IC5'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">IC Self-Assessment Worksheet</h1>
            <p className="text-gray-600 dark:text-gray-400">FY26 UX Career Framework - Individual Contributor Assessment</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
              <span className="text-blue-800 dark:text-blue-200 font-semibold">
                Progress: {getProgressPercentage()}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Selection & Framework Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Your Current Grade:
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Grade expectations will auto-populate based on your selection
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Framework Overview</h3>
          <div className="text-sm opacity-90">
            <p>• <strong>Shared Competencies:</strong> 9 core UX skills (proficiency scale)</p>
            <p>• <strong>Role-Based:</strong> 3 UX Design specialties (scope & impact scale)</p>
            <p>• Total: 12 competencies across 4 pillars</p>
          </div>
        </div>
      </div>

      {/* Pillar Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {pillars.map(pillar => (
            <button
              key={pillar}
              onClick={() => setSelectedPillar(pillar)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPillar === pillar
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {pillar === 'all' ? 'All Pillars' : pillar}
            </button>
          ))}
        </div>
      </div>

      {/* Competencies */}
      <div className="space-y-6">
        {filteredCompetencies.map((competency) => {
          const assessment = getAssessment(competency.id);
          return (
            <div key={competency.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              {/* Competency Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {competency.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      competency.category === 'shared' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    }`}>
                      {competency.pillar}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      competency.assessmentType === 'proficiency'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                    }`}>
                      {competency.assessmentType === 'proficiency' ? 'Proficiency' : 'Scope & Impact'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {competency.description}
                </p>
                {assessment.gradeExpectation > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900 p-2 rounded text-sm">
                    <span className="text-yellow-800 dark:text-yellow-200">
                      <strong>{selectedGrade} Expectation:</strong> Level {assessment.gradeExpectation}
                    </span>
                  </div>
                )}
              </div>

              {/* Level Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {[1, 2, 3, 4, 5].map(level => (
                  <div key={level} className="relative">
                    <div className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      assessment.selfAssessment === level
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : assessment.gradeExpectation === level
                          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => updateSelfAssessment(competency.id, level)}
                    >
                      <div className="text-center mb-2">
                        <span className={`inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center ${
                          assessment.selfAssessment === level 
                            ? 'bg-blue-500' 
                            : assessment.gradeExpectation === level
                              ? 'bg-yellow-500'
                              : 'bg-gray-400'
                        }`}>
                          {level}
                        </span>
                        {assessment.gradeExpectation === level && (
                          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Expected</div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {competency.levels[level]}
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
                  value={assessment.demonstratedBy}
                  onChange={(e) => updateDemonstratedBy(competency.id, e.target.value)}
                  placeholder="Describe specific examples, projects, or achievements that demonstrate this competency..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              {/* Assessment Summary */}
              {assessment.selfAssessment > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Self-Assessment:</strong> Level {assessment.selfAssessment}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {competency.levels[assessment.selfAssessment]}
                    </p>
                  </div>
                  {assessment.gradeExpectation > 0 && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Grade Expectation:</strong> Level {assessment.gradeExpectation}
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                        {competency.levels[assessment.gradeExpectation]}
                      </p>
                    </div>
                  )}
                  {assessment.selfAssessment !== assessment.gradeExpectation && assessment.gradeExpectation > 0 && (
                    <div className={`p-3 rounded-lg ${
                      assessment.selfAssessment > assessment.gradeExpectation
                        ? 'bg-green-50 dark:bg-green-900'
                        : 'bg-orange-50 dark:bg-orange-900'
                    }`}>
                      <p className={`text-sm ${
                        assessment.selfAssessment > assessment.gradeExpectation
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-orange-800 dark:text-orange-200'
                      }`}>
                        <strong>Gap:</strong> {assessment.selfAssessment > assessment.gradeExpectation ? '+' : ''}{assessment.selfAssessment - assessment.gradeExpectation}
                      </p>
                      <p className={`text-xs mt-1 ${
                        assessment.selfAssessment > assessment.gradeExpectation
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-orange-600 dark:text-orange-400'
                      }`}>
                        {assessment.selfAssessment > assessment.gradeExpectation 
                          ? 'Exceeding expectations' 
                          : 'Development opportunity'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
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