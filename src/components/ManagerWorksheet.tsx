'use client';

import { useState, useEffect } from 'react';
import { getManagerCompetencies, gradeExpectations, type Competency } from '@/data/careerFramework';
import GradeInfo from './GradeInfo';

interface ManagerAssessment {
  competencyId: string;
  selfAssessment: number;
  gradeExpectation: number;
  demonstratedBy: string;
  teamImpact?: string;
  managerNotes?: string;
}

export default function ManagerWorksheet() {
  const [assessments, setAssessments] = useState<ManagerAssessment[]>([]);
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('G8');
  const competencies = getManagerCompetencies();

  // Initialize assessments based on framework data
  useEffect(() => {
    const savedData = localStorage.getItem('managerAssessments');
    if (savedData) {
      setAssessments(JSON.parse(savedData));
    } else {
      // Initialize with framework data
      const initialAssessments: ManagerAssessment[] = competencies.map(comp => ({
        competencyId: comp.id,
        selfAssessment: 0,
        gradeExpectation: 0, // Managers don't have grade expectations in same way
        demonstratedBy: '',
        teamImpact: '',
        managerNotes: ''
      }));
      setAssessments(initialAssessments);
    }
  }, []);

  // Update grade expectations when grade changes (if applicable)
  useEffect(() => {
    const updatedAssessments = assessments.map(assessment => ({
      ...assessment,
      gradeExpectation: 0 // Manager grades TBD in framework
    }));
    setAssessments(updatedAssessments);
    saveToLocalStorage(updatedAssessments);
  }, [selectedGrade]);

  const saveToLocalStorage = (updatedAssessments: ManagerAssessment[]) => {
    localStorage.setItem('managerAssessments', JSON.stringify(updatedAssessments));
  };

  const updateDemonstratedBy = (competencyId: string, value: string) => {
    const updated = assessments.map(assessment => 
      assessment.competencyId === competencyId ? { ...assessment, demonstratedBy: value } : assessment
    );
    setAssessments(updated);
    saveToLocalStorage(updated);
  };

  const updateTeamImpact = (competencyId: string, value: string) => {
    const updated = assessments.map(assessment => 
      assessment.competencyId === competencyId ? { ...assessment, teamImpact: value } : assessment
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
    const managerSuggestions = [
      `Successfully grew team from 3 to 8 designers while maintaining ${competency.name.toLowerCase()} quality`,
      `Implemented new ${competency.name.toLowerCase()} process resulting in 90% team satisfaction`,
      `Led cross-functional ${competency.name.toLowerCase()} initiative impacting 5 product teams`,
      `Developed ${competency.name.toLowerCase()} standards adopted across 3 business units`,
      `Mentored 2 ICs to promotion through focused ${competency.name.toLowerCase()} development`,
      `Established ${competency.name.toLowerCase()} practices reducing delivery time by 30%`,
      `Built ${competency.name.toLowerCase()} partnership with engineering improving collaboration by 40%`,
      `Created ${competency.name.toLowerCase()} development program with 95% completion rate`
    ];
    
    const randomSuggestion = managerSuggestions[Math.floor(Math.random() * managerSuggestions.length)];
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
      teamImpact: '',
      managerNotes: ''
    };
  };

  const grades = ['G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manager Self-Assessment Worksheet</h1>
            <p className="text-gray-600 dark:text-gray-400">FY26 UX Career Framework - Leadership & Management Assessment</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
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

      {/* Grade Selection & Manager Framework Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Your Management Level:
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Management expectations vary by level and team size
          </p>
        </div>

        <GradeInfo userRole="manager" selectedGrade={selectedGrade} />
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
                  ? 'bg-green-600 text-white'
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