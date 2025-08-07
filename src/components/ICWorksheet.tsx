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
  const [selectedLevel, setSelectedLevel] = useState<{ [competencyId: string]: number }>({});
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
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
        // Update progress tracking for existing data (defer to avoid setState during render)
        setTimeout(() => updateProgressTracking(migratedAssessments), 0);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error parsing saved assessments:', error);
        // Fall back to initial state if parsing fails
        initializeEmptyAssessments();
        setIsInitialized(true);
      }
    } else {
      initializeEmptyAssessments();
      setIsInitialized(true);
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
    if (!isInitialized || assessments.length === 0) return; // Don't update if not initialized yet
    
    const updatedAssessments = assessments.map(assessment => ({
      ...assessment,
      gradeExpectation: gradeExpectations[selectedGrade]?.[assessment.competencyId] || 0
    }));
    setAssessments(updatedAssessments);
    // Defer the progress tracking to avoid setState during render
    setTimeout(() => saveToLocalStorage(updatedAssessments), 0);
  }, [selectedGrade, isInitialized]); // Use isInitialized instead of assessments.length

  const saveToLocalStorage = (updatedAssessments: CompetencyAssessment[]) => {
    localStorage.setItem('icAssessments', JSON.stringify(updatedAssessments));
    // Update progress tracking
    updateProgressTracking(updatedAssessments);
  };

  const updateProgressTracking = (updatedAssessments: CompetencyAssessment[]) => {
    const totalCompetencies = competencies.length;
    const completedCompetencies = updatedAssessments.filter(assessment => 
      assessment.selfAssessment > 0
    ).length;
    const progressPercentage = totalCompetencies > 0 ? Math.round((completedCompetencies / totalCompetencies) * 100) : 0;

    // Save progress to localStorage for the Dashboard to read
    const progressData = {
      totalCompetencies,
      completedCompetencies,
      progressPercentage,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('icAssessmentProgress', JSON.stringify(progressData));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('icAssessmentProgressUpdated', { 
      detail: progressData 
    }));
  };

  const exportToCSV = () => {
    // Helper function to get assessment level label
    const getLevelLabel = (value: number, assessmentType: string) => {
      const scale = assessmentType === 'proficiency' ? PROFICIENCY_SCALE : SCOPE_IMPACT_SCALE;
      const level = scale.find(s => s.value === value);
      return level ? `${level.label} (${value})` : `N/A (${value})`;
    };

    // CSV Header
    const header = [
      'Theme',
      'Pillar', 
      'Competency',
      'GRADE 5 EXPECTATION',
      'GRADE 6 EXPECTATION', 
      'GRADE 7 EXPECTATION',
      'GRADE 8 EXPECTATION',
      'GRADE 9 EXPECTATION',
      'GRADE 10 EXPECTATION',
      'GRADE 11 EXPECTATION'
    ];

    // Generate CSV rows
    const rows = competencies.map(comp => {
      const g5 = gradeExpectations['G5']?.[comp.id] || 0;
      const g6 = gradeExpectations['G6']?.[comp.id] || 0;
      const g7 = gradeExpectations['G7']?.[comp.id] || 0;
      const g8 = gradeExpectations['G8']?.[comp.id] || 0;
      const g9 = gradeExpectations['G9']?.[comp.id] || 0;
      const g10 = gradeExpectations['G10']?.[comp.id] || 0;
      const g11 = gradeExpectations['G11']?.[comp.id] || 0;

      return [
        comp.theme || '',
        comp.pillar || '',
        `"${comp.description}"`, // Wrap description in quotes to handle commas
        getLevelLabel(g5, comp.assessmentType),
        getLevelLabel(g6, comp.assessmentType),
        getLevelLabel(g7, comp.assessmentType),
        getLevelLabel(g8, comp.assessmentType),
        getLevelLabel(g9, comp.assessmentType),
        getLevelLabel(g10, comp.assessmentType),
        getLevelLabel(g11, comp.assessmentType)
      ];
    });

    // Combine header and rows
    const csvContent = [header, ...rows]
      .map(row => row.join(','))
      .join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `UX_Career_Framework_Competencies_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateDemonstratedBy = (competencyId: string, value: string) => {
    const updated = assessments.map(assessment => 
      assessment.competencyId === competencyId ? { ...assessment, demonstratedBy: value } : assessment
    );
    setAssessments(updated);
    setTimeout(() => saveToLocalStorage(updated), 0);
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
    setTimeout(() => saveToLocalStorage(updated), 0);
  };

  const selectLevel = (competencyId: string, level: number) => {
    // Only allow one competency to be selected at a time
    setSelectedLevel({ [competencyId]: level });
    // Clear any generate errors when opening a new section
    setGenerateError(null);
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
      // Defer saveToLocalStorage to avoid setState during render
      setTimeout(() => saveToLocalStorage(updated), 0);
      return updated;
    });
  };

  const generateDemonstratedBy = async (competency: Competency, event: React.MouseEvent) => {
    console.log('✅ Generate button clicked for competency:', competency.id, competency.name);
    event.preventDefault();
    setGenerateError(null); // Clear any previous errors
    
    // Directly call the generation function without modal
    console.log('🔄 Calling handleGenerateText...');
    await handleGenerateText(competency.id, '');
    console.log('✅ handleGenerateText completed');
  };

  const handleGenerateText = async (competencyId: string, features: string) => {
    console.log('🔧 handleGenerateText called with:', { competencyId, features });
    console.log('🔧 selectedLevel state:', selectedLevel);
    
    const competency = competencies.find(c => c.id === competencyId);
    if (!competency || !selectedLevel[competencyId]) {
      console.log('❌ No competency or selected level found:', { competency: !!competency, selectedLevel: selectedLevel[competencyId] });
      return;
    }

    const level = selectedLevel[competencyId];
    console.log('🔧 Found competency and level:', competency.name, level);
    
    try {
      // Get AI Coach conversations from localStorage
      const aiCoachHistories = localStorage.getItem('aiCoachChatHistories');
      const aiCoachCurrentChat = localStorage.getItem('aiCoachCurrentChat');
      
      // Get Weekly Check-in data from localStorage
      const weeklyCheckIns = localStorage.getItem('weeklyCheckIns');
      
      const allConversations: string[] = [];
      
      // Parse chat histories
      if (aiCoachHistories) {
        try {
          const histories = JSON.parse(aiCoachHistories);
          if (Array.isArray(histories)) {
            histories.forEach((history: any) => {
              if (history.messages && Array.isArray(history.messages)) {
                history.messages.forEach((msg: any) => {
                  if (msg.role === 'user' && msg.content && msg.content.trim().length > 20) {
                    allConversations.push(msg.content);
                  }
                });
              }
            });
          }
        } catch (error) {
          console.error('Error parsing chat histories:', error);
        }
      }
      
      // Parse current chat
      if (aiCoachCurrentChat) {
        try {
          const currentChat = JSON.parse(aiCoachCurrentChat);
          if (Array.isArray(currentChat)) {
            currentChat.forEach((msg: any) => {
              if (msg.role === 'user' && msg.content && msg.content.trim().length > 20) {
                allConversations.push(msg.content);
              }
            });
          }
        } catch (error) {
          console.error('Error parsing current chat:', error);
        }
      }
      
      // Parse Weekly Check-in data (saved entries)
      if (weeklyCheckIns) {
        try {
          const checkIns = JSON.parse(weeklyCheckIns);
          if (Array.isArray(checkIns)) {
            checkIns.forEach((checkIn: any) => {
              if (checkIn.responses) {
                // Add all response values
                Object.values(checkIn.responses).forEach((response: any) => {
                  if (typeof response === 'string' && response.trim().length > 20) {
                    allConversations.push(response);
                  }
                });
              }
              
              // Add goals, blockers, and wins if they exist
              if (checkIn.goals && Array.isArray(checkIn.goals)) {
                checkIn.goals.forEach((goal: any) => {
                  if (typeof goal === 'string' && goal.trim().length > 20) {
                    allConversations.push(`Goal: ${goal}`);
                  }
                });
              }
              
              if (checkIn.wins && Array.isArray(checkIn.wins)) {
                checkIn.wins.forEach((win: any) => {
                  if (typeof win === 'string' && win.trim().length > 20) {
                    allConversations.push(`Achievement: ${win}`);
                  }
                });
              }
              
              if (checkIn.blockers && Array.isArray(checkIn.blockers)) {
                checkIn.blockers.forEach((blocker: any) => {
                  if (typeof blocker === 'string' && blocker.trim().length > 20) {
                    allConversations.push(`Challenge overcome: ${blocker}`);
                  }
                });
              }
            });
          }
        } catch (error) {
          console.error('Error parsing weekly check-ins:', error);
        }
      }
      
      // Parse current Weekly Check-in data (in-progress entry)
      const weeklyCheckInCurrent = localStorage.getItem('weeklyCheckInCurrent');
      if (weeklyCheckInCurrent) {
        try {
          const currentCheckIn = JSON.parse(weeklyCheckInCurrent);
          if (currentCheckIn) {
            // Add response values from current entry
            if (currentCheckIn.responses) {
              Object.values(currentCheckIn.responses).forEach((response: any) => {
                if (typeof response === 'string' && response.trim().length > 20) {
                  allConversations.push(`Current week: ${response}`);
                }
              });
            }
            
            // Add current goals, wins, blockers
            if (currentCheckIn.goals && Array.isArray(currentCheckIn.goals)) {
              currentCheckIn.goals.forEach((goal: any) => {
                if (typeof goal === 'string' && goal.trim().length > 20) {
                  allConversations.push(`Current Goal: ${goal}`);
                }
              });
            }
            
            if (currentCheckIn.wins && Array.isArray(currentCheckIn.wins)) {
              currentCheckIn.wins.forEach((win: any) => {
                if (typeof win === 'string' && win.trim().length > 20) {
                  allConversations.push(`Current Achievement: ${win}`);
                }
              });
            }
            
            if (currentCheckIn.blockers && Array.isArray(currentCheckIn.blockers)) {
              currentCheckIn.blockers.forEach((blocker: any) => {
                if (typeof blocker === 'string' && blocker.trim().length > 20) {
                  allConversations.push(`Current Challenge: ${blocker}`);
                }
              });
            }
          }
        } catch (error) {
          console.error('Error parsing current weekly check-in:', error);
        }
      }
      
      if (allConversations.length === 0) {
        // Show error message if no conversations found
        setGenerateError('No content found. Start a conversation with the AI Coach or complete Weekly Check-ins to generate content.');
        return;
      }
      
      // Clear any previous errors
      setGenerateError(null);
      
      // Find relevant conversations based on competency keywords
      const competencyKeywords = [
        competency.name.toLowerCase(),
        competency.pillar.toLowerCase(),
        competency.theme.toLowerCase(),
        ...competency.description.toLowerCase().split(' ').filter(word => word.length > 4)
      ];
      
      const relevantConversations = allConversations.filter(conversation => {
        const conversationLower = conversation.toLowerCase();
        return competencyKeywords.some(keyword => 
          conversationLower.includes(keyword) || 
          conversationLower.includes('project') ||
          conversationLower.includes('work') ||
          conversationLower.includes('team') ||
          conversationLower.includes('design') ||
          conversationLower.includes('user') ||
          conversationLower.includes('experience') ||
          conversationLower.includes('delivered') ||
          conversationLower.includes('achieved') ||
          conversationLower.includes('completed') ||
          conversationLower.includes('improved') ||
          conversationLower.includes('collaborated') ||
          conversationLower.includes('stakeholder') ||
          conversationLower.includes('research') ||
          conversationLower.includes('feedback') ||
          conversationLower.includes('goal:') ||
          conversationLower.includes('achievement:') ||
          conversationLower.includes('challenge overcome:')
        );
      });
      
      const conversationsToUse = relevantConversations.length > 0 ? relevantConversations : allConversations;
      
      // Use multiple conversations to create a more comprehensive summary
      const selectedConversations = conversationsToUse
        .slice(0, 3) // Use up to 3 conversations
        .join(' ');
      
              // Generate AI-reworded summary
        const demonstratedText = await generateAISummary(selectedConversations, competency, features);
        
        // Update the level-specific demonstrated by field (level 1 which the textarea uses)
        console.log('🎯 Generated text:', demonstratedText);
        console.log('🔄 Updating level demonstrated by field for:', competencyId, 'level 1');
        updateLevelDemonstratedBy(competencyId, 1, demonstratedText);
        console.log('✅ Level demonstrated by field updated');
      
    } catch (error) {
      console.error('Error generating text from conversations:', error);
      setGenerateError('Error processing saved content. Please try again or add content manually.');
    }
  };

  // AI Summary Generation Function
  const generateAISummary = async (conversationText: string, competency: Competency, features: string): Promise<string> => {
    // This is a simplified AI rewriting function
    // In a real implementation, you'd call an actual AI service
    
    // Extract key themes and actions from the conversation
    const actionWords = ['led', 'managed', 'facilitated', 'delivered', 'implemented', 'designed', 'created', 'developed', 'improved', 'optimized', 'collaborated', 'presented', 'analyzed', 'researched', 'achieved', 'completed'];
    const foundActions = actionWords.filter(action => 
      conversationText.toLowerCase().includes(action)
    );
    
    // Extract project mentions
    const projectPattern = /project|initiative|feature|product|design|system|process|workflow|solution|goal|deliverable/gi;
    const projectMentions = conversationText.match(projectPattern) || [];
    
    // Check if content comes from Weekly Check-ins (has prefixes or contains weekly check-in keywords)
    const isFromWeeklyCheckin = conversationText.includes('Goal:') || 
                                conversationText.includes('Achievement:') || 
                                conversationText.includes('Challenge overcome:') ||
                                conversationText.includes('Current week:') ||
                                conversationText.includes('Current Goal:') ||
                                conversationText.includes('Current Achievement:') ||
                                conversationText.includes('Current Challenge:');
    
    // Generate a professional summary
    const action = foundActions[0] || 'contributed to';
    const context = projectMentions.length > 0 ? `${projectMentions[0]?.toLowerCase()} initiatives` : 'team projects';
    const competencyFocus = competency.name.toLowerCase();
    const featureText = features ? ` with emphasis on ${features}` : '';
    
    // Create different summary templates based on source
    const templates = isFromWeeklyCheckin ? [
      `Throughout recent weeks, ${action} ${context} that demonstrated ${competencyFocus} skills${featureText}, achieving measurable outcomes through consistent execution and strategic thinking.`,
      `Applied ${competencyFocus} expertise across weekly deliverables${featureText}, showing continuous improvement through systematic approach and stakeholder engagement.`,
      `Demonstrated ${competencyFocus} capabilities through weekly achievements and goals${featureText}, focusing on user-centered solutions and iterative development processes.`,
      `Consistently utilized ${competencyFocus} knowledge in weekly work cycles${featureText}, evidencing skill growth through goal achievement and challenge resolution.`
    ] : [
      `Recently ${action} ${context} that required strong ${competencyFocus} skills${featureText}, demonstrating practical application through hands-on problem-solving and stakeholder collaboration.`,
      `Applied ${competencyFocus} expertise in ${context}${featureText}, showing measurable impact through systematic approach and cross-functional partnership.`,
      `Demonstrated ${competencyFocus} capabilities through ${context}${featureText}, focusing on user-centered solutions and iterative improvement processes.`,
      `Utilized ${competencyFocus} knowledge in recent ${context}${featureText}, evidencing skill development through real-world application and feedback integration.`
    ];
    
    // Select template based on conversation content
    let selectedTemplate = templates[0];
    if (conversationText.toLowerCase().includes('user') || conversationText.toLowerCase().includes('customer')) {
      selectedTemplate = templates[2];
    } else if (conversationText.toLowerCase().includes('measure') || conversationText.toLowerCase().includes('impact') || conversationText.toLowerCase().includes('achievement')) {
      selectedTemplate = templates[1];
    } else if (conversationText.toLowerCase().includes('feedback') || conversationText.toLowerCase().includes('improve') || conversationText.toLowerCase().includes('goal')) {
      selectedTemplate = templates[3];
    }
    
    return selectedTemplate;
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
    const completed = assessments.filter(a => a.selfAssessment > 0).length;
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
      setTimeout(() => saveToLocalStorage(updated), 0);
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
          <button 
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
          >
            Export to CSV
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
                        setGenerateError(null);
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
                      
                      {/* Competency Description at top */}
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 text-center">
                        {pillComp.description}
                      </p>
                      
                      {/* Grade Expectation */}
                      <div className="text-xs text-blue-600 dark:text-blue-400 text-center font-medium mb-3">
                        Grade Expectation: {gradeExpectation === 0 ? 'N/A (0)' : `${assessmentScale.find(scale => scale.value === gradeExpectation)?.label || 'Level'} (${gradeExpectation})`}
                      </div>
                      
                      {/* Spacer to push dropdown to bottom */}
                      <div className="flex-grow"></div>
                      
                      {/* Assessment Dropdown at bottom */}
                      <div className="mt-auto">
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
                      </div>
                      
                      {pillAssessment.selfAssessment > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {assessmentScale.find(s => s.value === pillAssessment.selfAssessment)?.description}
                        </div>
                      )}
                      
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
                  
                  {/* Error message display */}
                  {generateError && (
                    <div className="mt-2 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                      <p className="text-sm text-red-700 dark:text-red-300">{generateError}</p>
                    </div>
                  )}
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




    </div>
  );
}