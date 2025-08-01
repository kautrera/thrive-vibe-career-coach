'use client';

interface GradeInfoProps {
  userRole: 'ic' | 'manager';
  selectedGrade: string;
}

export default function GradeInfo({ userRole, selectedGrade }: GradeInfoProps) {
  const gradeDescriptions: { [key: string]: { title: string; description: string; focus: string[] } } = {
    // IC Grades G5-G11
    'G5': {
      title: 'Associate UX Designer',
      description: 'Entry-level UX professional learning foundational skills',
      focus: ['Basic design principles', 'Tool proficiency', 'Learning methodologies', 'Following guidance']
    },
    'G6': {
      title: 'UX Designer I',
      description: 'Developing UX professional with growing independence',
      focus: ['Design execution', 'Basic research skills', 'Component-level thinking', 'Team collaboration']
    },
    'G7': {
      title: 'UX Designer II',
      description: 'Competent UX professional working independently',
      focus: ['Feature-level design', 'User research', 'Cross-functional collaboration', 'Quality standards']
    },
    'G8': {
      title: 'Senior UX Designer',
      description: 'Experienced designer leading complex projects',
      focus: ['Product-level thinking', 'Advanced research', 'Stakeholder management', 'Mentoring others']
    },
    'G9': {
      title: 'Staff UX Designer',
      description: 'Expert designer influencing multiple products',
      focus: ['System-level design', 'Strategic thinking', 'Cross-team influence', 'Innovation leadership']
    },
    'G10': {
      title: 'Principal UX Designer',
      description: 'Senior expert shaping design direction',
      focus: ['Platform-level impact', 'Design strategy', 'Organizational influence', 'Industry expertise']
    },
    'G11': {
      title: 'Distinguished UX Designer',
      description: 'Top-tier individual contributor with broad impact',
      focus: ['Industry leadership', 'Organizational transformation', 'Innovation pioneer', 'Thought leadership']
    },
    
    // Manager Grades G5-G13 (start managing at G8 typically)
    'G12': {
      title: 'Senior Design Manager',
      description: 'Experienced leader managing multiple teams or complex organizations',
      focus: ['Multi-team leadership', 'Strategic planning', 'Organizational design', 'Talent development']
    },
    'G13': {
      title: 'Design Director / VP',
      description: 'Executive leader shaping design at organizational scale',
      focus: ['Executive leadership', 'Business strategy', 'Organizational transformation', 'Industry influence']
    }
  };

  const managerTransition = ['G8', 'G9', 'G10', 'G11'];
  
  const currentGrade = gradeDescriptions[selectedGrade];
  
  if (!currentGrade) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
        {selectedGrade}: {currentGrade.title}
      </h4>
      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
        {currentGrade.description}
      </p>
      
      <div className="space-y-2">
        <p className="text-xs font-medium text-blue-900 dark:text-blue-100">Key Focus Areas:</p>
        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
          {currentGrade.focus.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {userRole === 'ic' && managerTransition.includes(selectedGrade) && (
        <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900 rounded border-l-4 border-yellow-400">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            <strong>Career Path Note:</strong> At {selectedGrade}, you may consider management track opportunities alongside continued IC growth.
          </p>
        </div>
      )}
    </div>
  );
}