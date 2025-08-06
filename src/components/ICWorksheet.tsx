'use client';

import { useState, useEffect } from 'react';
import { getAllCompetencies, gradeExpectations, type Competency } from '@/data/careerFramework';
import GradeInfo from './GradeInfo';

interface CompetencyAssessment {
  competencyId: string;
  selfAssessment: number;
  gradeExpectation: number;
  demonstratedBy: string; // Legacy field for backwards compatibility
  levelDemonstratedBy: { [level: number]: string }; // New field for level-specific content
  levelAssessments: { [level: number]: number }; // Assessment rating for each level
  managerAssessment?: number;
  managerNotes?: string;
}

// Assessment scales
const PROFICIENCY_SCALE = [
  { value: 0, label: 'N/A', description: 'No skill required' },
  { value: 2, label: 'Emergent', description: 'Demonstrates a basic understanding of the skill, requires support to apply it effectively' },
  { value: 4, label: 'Competent', description: 'Applies foundational knowledge of the skill independently with growing confidence' },
  { value: 6, label: 'Proficient', description: 'Applies in-depth knowledge of the skill independently and effectively in most relevant contexts.' },
  { value: 8, label: 'Advanced', description: 'Demonstrates a comprehensive and confident command of the skill.' },
  { value: 10, label: 'Expert', description: 'Exemplifies deep expertise and guides others with authority in the skill' }
];

const SCOPE_IMPACT_SCALE = [
  { value: 0, label: 'N/A', description: 'Not Required at Level or Role' },
  { value: 2, label: 'Foundational', description: 'foundationally supports defined team efforts and deliverables with localized, contained impact.' },
  { value: 4, label: 'Tactical', description: 'tactically drives execution of team- or function-level deliverables, creating focused and targeted impact.' },
  { value: 6, label: 'Strategic', description: 'strategically advances cross-functional programs and deliverables, delivering measurable business and user impact.' },
  { value: 8, label: 'Innovative', description: 'innovatively enhances programs, systems and deliverables driving scalable impact across the organization or cloud.' },
  { value: 10, label: 'Transformative', description: 'transformatively rearchitects systems, culture, or business processes, driving material and enduring org-wide and enterprise-level impact.' }
];

export default function ICWorksheet() {
  const [assessments, setAssessments] = useState<CompetencyAssessment[]>([]);
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('G7');

  // Load user's actual grade from localStorage
  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel');
    if (savedLevel) {
      setSelectedGrade(savedLevel);
    }
  }, []);
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<{ [competencyId: string]: number }>({});
  const [generatePopupPosition, setGeneratePopupPosition] = useState<{ top: number; left: number } | null>(null);
  const competencies = getAllCompetencies();

  // Initialize assessments based on framework data
  useEffect(() => {
    const savedData = localStorage.getItem('icAssessments');
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        
        // Migrate old data to new structure if needed
        const migratedAssessments = parsed.map((assessment: any) => ({
          ...assessment,
          levelDemonstratedBy: assessment.levelDemonstratedBy || { 1: '', 2: '', 3: '', 4: '', 5: '' },
          levelAssessments: assessment.levelAssessments || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }));
        setAssessments(migratedAssessments);
      } catch (error) {
        console.error('Error parsing saved assessments:', error);
        // Fall back to initial state if parsing fails
        initializeEmptyAssessments();
      }
    } else {
      initializeEmptyAssessments();
    }
  }, []);

  const initializeEmptyAssessments = () => {
    const initialAssessments: CompetencyAssessment[] = competencies.map(comp => ({
      competencyId: comp.id,
      selfAssessment: 0,
      gradeExpectation: gradeExpectations[selectedGrade]?.[comp.id] || 0,
      demonstratedBy: '',
      levelDemonstratedBy: { 1: '', 2: '', 3: '', 4: '', 5: '' },
      levelAssessments: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      managerAssessment: 0,
      managerNotes: ''
    }));
    setAssessments(initialAssessments);
  };

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

  const updateLevelDemonstratedBy = (competencyId: string, level: number, value: string) => {
    const updated = assessments.map(assessment => 
      assessment.competencyId === competencyId 
        ? { 
            ...assessment, 
            levelDemonstratedBy: { ...assessment.levelDemonstratedBy, [level]: value }
          } 
        : assessment
    );
    setAssessments(updated);
    saveToLocalStorage(updated);
  };

  const selectLevel = (competencyId: string, level: number) => {
    // Only allow one competency to be selected at a time
    setSelectedLevel({ [competencyId]: level });
  };

  const getLevelContent = (competencyId: string, level: number): string => {
    const assessment = getAssessment(competencyId);
    return assessment.levelDemonstratedBy?.[level] || '';
  };

  const hasLevelContent = (competencyId: string, level: number): boolean => {
    const content = getLevelContent(competencyId, level);
    return content.trim().length > 0;
  };

  const updateSelfAssessment = (competencyId: string, level: number) => {
    console.log('updateSelfAssessment called with:', competencyId, level);
    setAssessments(prevAssessments => {
      // Check if assessment exists, if not create it
      const existingIndex = prevAssessments.findIndex(a => a.competencyId === competencyId);
      let updated;
      
      if (existingIndex >= 0) {
        // Update existing assessment
        updated = prevAssessments.map(assessment => 
          assessment.competencyId === competencyId 
            ? { ...assessment, selfAssessment: level }
            : assessment
        );
      } else {
        // Create new assessment
        const newAssessment: CompetencyAssessment = {
          competencyId,
          selfAssessment: level,
          gradeExpectation: gradeExpectations[selectedGrade]?.[competencyId] || 0,
          demonstratedBy: '',
          levelDemonstratedBy: {},
          levelAssessments: {}
        };
        updated = [...prevAssessments, newAssessment];
      }
      
      console.log('Updated assessments:', updated);
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const generateDemonstratedBy = async (competency: Competency, event: React.MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    
    setGeneratePopupPosition({
      top: rect.bottom + window.scrollY + 8, // 8px below the button
      left: rect.left + window.scrollX
    });
    setShowGenerateModal(competency.id);
  };

  const handleGenerateText = async (competencyId: string, features: string) => {
    const competency = competencies.find(c => c.id === competencyId);
    if (!competency || !selectedLevel[competencyId]) return;

    const level = selectedLevel[competencyId];
    const levelDescription = competency.levels[level];

    // AI-powered suggestions based on competency type, level, and features
    const suggestions = [
      `Led ${competency.name.toLowerCase()} initiative ${features ? `focusing on ${features}` : ''} demonstrating "${levelDescription}" for Q3 product launch with measurable user impact`,
      `Facilitated cross-functional ${competency.name.toLowerCase()} workshops ${features ? `emphasizing ${features}` : ''} showing "${levelDescription}" improving team alignment by 40%`,
      `Delivered ${competency.name.toLowerCase()} improvements ${features ? `incorporating ${features}` : ''} exemplifying "${levelDescription}" resulting in 15% increase in user satisfaction scores`,
      `Mentored 3 junior designers on ${competency.name.toLowerCase()} best practices ${features ? `with focus on ${features}` : ''} demonstrating "${levelDescription}" with 100% skill improvement`,
      `Presented ${competency.name.toLowerCase()} insights ${features ? `highlighting ${features}` : ''} showing "${levelDescription}" to executive stakeholders, influencing product roadmap`,
      `Established ${competency.name.toLowerCase()} standards ${features ? `including ${features}` : ''} exemplifying "${levelDescription}" adopted across 5 product teams`,
      `Optimized ${competency.name.toLowerCase()} processes ${features ? `leveraging ${features}` : ''} demonstrating "${levelDescription}" reducing design delivery time by 30%`
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    updateLevelDemonstratedBy(competencyId, level, randomSuggestion);
    setShowGenerateModal(null);
  };

  // Voice recording functionality
  const startRecording = (competencyId: string) => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(competencyId);
      };
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // Check if this is for a specific level
            if (competencyId.includes('-')) {
              const [actualCompetencyId, levelStr] = competencyId.split('-');
              const level = parseInt(levelStr);
              const currentContent = getLevelContent(actualCompetencyId, level);
              updateLevelDemonstratedBy(actualCompetencyId, level, currentContent + transcript);
            } else {
              const currentAssessment = getAssessment(competencyId);
              updateDemonstratedBy(competencyId, currentAssessment.demonstratedBy + transcript);
            }
          } else {
            interimTranscript += transcript;
          }
        }
      };
      
      recognition.onerror = () => {
        setIsRecording(null);
      };
      
      recognition.onend = () => {
        setIsRecording(null);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopRecording = () => {
    setIsRecording(null);
  };

  // Define the 4 main themes and their corresponding pillars
  const themes = {
    'UX CORE': ['Methodology', 'Acumen', 'Innovation'],
    'EXECUTION': ['Delivery', 'Craft', 'Storytelling'],
    'LEADERSHIP': ['Problem Solving', 'Ownership', 'Influence'],
    'UX DESIGN ROLE': ['User Centered Design', 'Composable Systems Thinking', 'Experience Harmony']
  };

  const pillars = ['all', ...Object.keys(themes)];
  
  const filteredCompetencies = selectedPillar === 'all' 
    ? competencies 
    : competencies.filter(c => c.theme === selectedPillar);

  const getProgressPercentage = () => {
    const completed = assessments.filter(a => a.demonstratedBy && a.selfAssessment > 0).length;
    if (assessments.length === 0) return 0;
    return Math.round((completed / assessments.length) * 100);
  };

  const getAssessment = (competencyId: string) => {
    return assessments.find(a => a.competencyId === competencyId) || {
      competencyId,
      selfAssessment: 0,
      gradeExpectation: 0,
      demonstratedBy: '',
      levelDemonstratedBy: { 1: '', 2: '', 3: '', 4: '', 5: '' },
      levelAssessments: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      managerAssessment: 0,
      managerNotes: ''
    };
  };

  const updateLevelAssessment = (competencyId: string, level: number, value: number) => {
    setAssessments(prevAssessments => {
      const updated = prevAssessments.map(assessment => 
        assessment.competencyId === competencyId 
          ? { 
              ...assessment, 
              levelAssessments: { 
                ...assessment.levelAssessments, 
                [level]: value 
              }
            } 
          : assessment
      );
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const getLevelAssessment = (competencyId: string, level: number): number => {
    const assessment = getAssessment(competencyId);
    return assessment.levelAssessments?.[level] || 0;
  };

  // Color scheme for level circles
  const getLevelCircleColor = (competencyId: string, level: number, isSelected: boolean, isExpected: boolean, hasContent: boolean) => {
    if (isSelected) return 'bg-blue-500';
    if (isExpected) return 'bg-yellow-500';
    if (hasContent) return 'bg-green-500';
    
    // Color based on assessment level
    const assessment = getLevelAssessment(competencyId, level);
    if (assessment >= 8) return 'bg-purple-500'; // Advanced/Expert
    if (assessment >= 6) return 'bg-indigo-500'; // Proficient/Strategic
    if (assessment >= 4) return 'bg-teal-500'; // Competent/Tactical
    if (assessment >= 2) return 'bg-orange-500'; // Emergent/Foundational
    return 'bg-gray-400'; // N/A or no assessment
  };

  // Get appropriate scale based on competency category
  const getAssessmentScale = (competency: Competency) => {
    // Use scope & impact scale for role-based competencies, proficiency scale for shared competencies
    return competency.category === 'shared' ? PROFICIENCY_SCALE : SCOPE_IMPACT_SCALE;
  };

  // IC Grade options matching AccountSettings exactly
  const grades = [
    { value: 'G5', label: 'G5 - Associate Designer' },
    { value: 'G6', label: 'G6 - UX Designer' },
    { value: 'G7', label: 'G7 - Senior UX Designer' },
    { value: 'G8', label: 'G8 - Lead UX Designer' },
    { value: 'G9', label: 'G9 - Principal UX Designer' },
    { value: 'G10', label: 'G10 - UX Architect' },
    { value: 'G11', label: 'G11 - Principal UX Architect' }
  ];

  // Grade descriptions data
  const icGradeDescriptions: { [key: string]: { title: string; description: string; focus: string[] } } = {
    'G5': {
      title: 'Associate Designer',
      description: 'Developing - Supports small to medium-sized projects or workstreams within a team',
      focus: ['Emergent UX Core skills', 'Basic design principles', 'Learning methodologies', 'Following guidance']
    },
    'G6': {
      title: 'UX Designer',
      description: 'Delivering - Delivers scoped projects or workstreams independently across a triad or team',
      focus: ['Competent execution', 'Independent project delivery', 'Cross-functional collaboration', 'Core UX skills']
    },
    'G7': {
      title: 'Senior UX Designer',
      description: 'Driving - Drives medium- to large-scale programs across multiple teams or product areas',
      focus: ['Proficient across all areas', 'Multi-team programs', 'Strategic thinking', 'Program influence']
    },
    'G8': {
      title: 'Lead UX Designer',
      description: 'Leading - Leads multiple large-scale, cross-functional programs across a product or function',
      focus: ['Advanced leadership', 'Cross-functional programs', 'Product-level decisions', 'Senior stakeholder partnership']
    },
    'G9': {
      title: 'Principal UX Designer',
      description: 'Orchestrating - Orchestrates large-scale, complex initiatives across clouds and functions',
      focus: ['Expert-level impact', 'Cloud-wide initiatives', 'Executive partnership', 'Organizational influence']
    },
    'G10': {
      title: 'UX Architect',
      description: 'Shaping - Shapes strategic platform-level initiatives across organizations and clouds',
      focus: ['Strategic platform impact', 'Cross-cloud strategy', 'Investment decisions', 'Organizational transformation']
    },
    'G11': {
      title: 'Principal UX Architect',
      description: 'Transforming - Transforms mission-critical priorities across T&P and the company',
      focus: ['Enterprise-wide vision', 'C-suite partnership', 'Company strategy', 'Industry leadership']
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation and Action Buttons - aligned horizontally */}
      <div className="flex justify-between items-center">
        {/* Back to Dashboard Link */}
        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            Save Assessment
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
            Export to PDF
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
            Get AI Recommendations
          </button>
        </div>
      </div>

      {/* Header - With White Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">IC Self-Assessment Worksheet</h1>
            <p className="text-gray-600 dark:text-gray-400">FY26 UX Career Framework - Individual Contributor Assessment</p>
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

      {/* Current Grade and Key Focus Areas - With White Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Grade Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Grade</h2>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg"
            >
              {grades.map(grade => (
                <option key={grade.value} value={grade.value}>{grade.label}</option>
              ))}
            </select>
            
            {/* Grade Level Description */}
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                IC Level {selectedGrade.replace('G', '')}: {icGradeDescriptions[selectedGrade]?.description.split(' - ')[0] || 'Orchestrating'}
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {icGradeDescriptions[selectedGrade]?.description.split(' - ')[1] || 'As a Principal Designer you orchestrate large-scale, complex initiatives across clouds and functions'}
              </p>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg border-l-4 border-yellow-400">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Key Focus Areas</h3>
            <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
              {(icGradeDescriptions[selectedGrade]?.focus || ['Expert-level impact', 'Cloud-wide initiatives', 'Executive partnership', 'Organizational influence']).map((focus, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  {focus}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Theme Filter Buttons - With White Container */}
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
              {pillar === 'all' ? 'All Themes' : pillar}
            </button>
          ))}
        </div>
      </div>

      {/* Self Assessment Instructions - With White Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 dark:text-blue-300">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Self-Assessment Guide</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Each card represents a specific competency. Click on a card to rate your proficiency and provide evidence for that competency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Competencies - Group by pillars */}
      <div className="space-y-6">
        {/* Group competencies by pillar */}
        {Object.entries(
          filteredCompetencies.reduce((acc, comp) => {
            if (!acc[comp.pillar]) acc[comp.pillar] = [];
            acc[comp.pillar].push(comp);
            return acc;
          }, {} as Record<string, typeof filteredCompetencies>)
        ).map(([pillarName, pillarCompetencies]) => (
          <div key={pillarName} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500">
            {/* Pillar Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {pillarName}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    pillarCompetencies[0].theme === 'UX CORE'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : pillarCompetencies[0].theme === 'EXECUTION'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : pillarCompetencies[0].theme === 'LEADERSHIP'
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                          : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}>
                    {pillarCompetencies[0].theme}
                  </span>
                </div>
              </div>
            </div>



            {/* Competency Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {pillarCompetencies.map((pillComp, index) => {
                  const pillAssessment = getAssessment(pillComp.id);
                  const isSelected = selectedLevel[pillComp.id] !== undefined;
                  const hasContent = hasLevelContent(pillComp.id, 1);
                  const content = getLevelContent(pillComp.id, 1);
                  const assessmentScale = getAssessmentScale(pillComp);
                  const gradeExpectation = gradeExpectations[selectedGrade]?.[pillComp.id] || 0;
                  
                  return (
                    <div key={pillComp.id} className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative h-full flex flex-col min-h-[200px] ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 bg-white dark:bg-gray-800'
                    }`}
                    onClick={() => {
                      updateSelfAssessment(pillComp.id, pillAssessment.selfAssessment);
                      if (isSelected) {
                        // If already selected, close the section
                        setSelectedLevel({});
                      } else {
                        // If not selected, open the section
                        selectLevel(pillComp.id, 1);
                      }
                    }}
                    >
                      {/* Content indicator */}
                      {hasContent && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" 
                             title="Has demonstrated content"></div>
                      )}
                      
                      <div className="text-center mb-2">
                        <div className="inline-flex w-10 h-10 rounded-full text-white text-lg font-bold items-center justify-center bg-blue-500 shadow-lg">
                          {index + 1}
                        </div>

                      </div>
                      
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 text-center">
                        {pillComp.name}
                      </h4>
                      
                      <div className="text-xs text-blue-600 dark:text-blue-400 mb-2 text-center font-medium">
                        Grade Expectation: {gradeExpectation === 0 ? 'N/A (0)' : `${assessmentScale.find(scale => scale.value === gradeExpectation)?.label || 'Level'} (${gradeExpectation})`}
                      </div>
                      
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 flex-grow text-center">
                        {pillComp.description}
                      </p>
                      
                      {/* Assessment Dropdown */}
                      <div className="mt-auto space-y-1">
                        <select
                          key={`${pillComp.id}-dropdown`}
                          value={pillAssessment.selfAssessment || 0}
                          onChange={(e) => {
                            e.stopPropagation();
                            const newValue = parseInt(e.target.value);
                            console.log('Updating assessment for', pillComp.id, 'to value', newValue);
                            updateSelfAssessment(pillComp.id, newValue);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          {assessmentScale.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label} ({option.value})
                            </option>
                          ))}
                        </select>
                        {pillAssessment.selfAssessment > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {assessmentScale.find(s => s.value === pillAssessment.selfAssessment)?.description}
                          </div>
                        )}
                      </div>
                      
                      {/* Content summary */}
                      {content && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                          <div className="font-medium mb-1">Evidence:</div>
                          <div className="line-clamp-2" title={content}>
                            {content.substring(0, 80)}{content.length > 80 ? '...' : ''}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            {/* Conditional Demonstrated By Section */}
            {Object.keys(selectedLevel).find(compId => 
              pillarCompetencies.some(comp => comp.id === compId)
            ) && (() => {
              const selectedCompId = Object.keys(selectedLevel).find(compId => 
                pillarCompetencies.some(comp => comp.id === compId)
              );
              const selectedComp = pillarCompetencies.find(comp => comp.id === selectedCompId);
                
                if (!selectedComp) return null;
                
                return (
                <div className="space-y-4 bg-purple-50 dark:bg-purple-900 p-4 rounded-lg border-2 border-purple-300 dark:border-purple-600">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-purple-700 dark:text-purple-300">
                      demonstrated by
                    </label>
                    <button
                      onClick={(e) => generateDemonstratedBy(selectedComp, e)}
                      className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center space-x-1"
                    >
                      <span>✨</span>
                      <span>Generate Text</span>
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      value={getLevelContent(selectedComp.id, 1)}
                      onChange={(e) => updateLevelDemonstratedBy(selectedComp.id, 1, e.target.value)}
                      placeholder={`Describe specific examples and achievements that demonstrate your proficiency in ${selectedComp.name}...`}
                      className="w-full p-3 pr-12 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      rows={4}
                    />
                    <button
                      onClick={() => isRecording === `${selectedComp.id}-1` ? stopRecording() : startRecording(`${selectedComp.id}-1`)}
                      className={`absolute right-2 top-2 p-2 rounded-lg transition-colors ${
                        isRecording === `${selectedComp.id}-1`
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title={isRecording === `${selectedComp.id}-1` ? 'Stop recording' : 'Start voice input'}
                    >
                      {isRecording === `${selectedComp.id}-1` ? '⏹️' : '🎤'}
                    </button>
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">
                    💡 Click on a competency card above to add evidence for that specific competency
                  </div>
                </div>
                );
              })()}

            {/* Instruction when no competency selected */}
            {!Object.keys(selectedLevel).some(compId => 
              pillarCompetencies.some(comp => comp.id === compId)
            ) && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    👆 Click on a competency card above to add evidence and examples for that specific competency
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>



      {/* Generate Text Popup */}
      {showGenerateModal && generatePopupPosition && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => {
            setShowGenerateModal(null);
            setGeneratePopupPosition(null);
          }}></div>
          
          {/* Popup */}
          <div 
            className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 w-80"
            style={{
              top: `${generatePopupPosition.top}px`,
              left: `${generatePopupPosition.left}px`
            }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Text</h3>
                <button
                  onClick={() => {
                    setShowGenerateModal(null);
                    setGeneratePopupPosition(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features and keywords
                  </label>
                  <input
                    id="features-input"
                    type="text"
                    placeholder="e.g. design systems, user research, accessibility"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tone: Expert
                  </label>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => {
                      setShowGenerateModal(null);
                      setGeneratePopupPosition(null);
                    }}
                    className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const featuresInput = document.getElementById('features-input') as HTMLInputElement;
                      handleGenerateText(showGenerateModal, featuresInput?.value || '');
                      setGeneratePopupPosition(null);
                    }}
                    className="px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <span>✨</span>
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}