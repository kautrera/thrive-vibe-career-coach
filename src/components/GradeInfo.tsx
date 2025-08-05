'use client';

interface GradeInfoProps {
  userRole: 'ic' | 'manager';
  selectedGrade: string;
}

export default function GradeInfo({ userRole, selectedGrade }: GradeInfoProps) {
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

  const managerGradeDescriptions: { [key: string]: { title: string; description: string; focus: string[] } } = {
    'G7': {
      title: 'UX Manager',
      description: 'Driving - People management starts here, leading design teams and programs',
      focus: ['Team leadership', 'Program management', 'People development', 'Cross-functional collaboration']
    },
    'G8': {
      title: 'UX Sr Manager',
      description: 'Leading - Senior management role leading multiple teams or complex programs',
      focus: ['Multi-team leadership', 'Advanced people management', 'Strategic program delivery', 'Stakeholder management']
    },
    'G9': {
      title: 'UX Design, Director',
      description: 'Orchestrating - Director-level leadership across cloud and function initiatives',
      focus: ['Organizational leadership', 'Cloud-wide strategy', 'Executive collaboration', 'Design excellence']
    },
    'G10': {
      title: 'UX Design, Sr Director',
      description: 'Shaping - Senior director shaping platform-level design strategy and operations',
      focus: ['Platform strategy', 'Cross-cloud leadership', 'Investment planning', 'Organizational design']
    },
    'G11': {
      title: 'UX Design, VP',
      description: 'Transforming - Vice President transforming design across T&P organization',
      focus: ['VP-level leadership', 'T&P transformation', 'Business strategy', 'Executive team member']
    },
    'G12': {
      title: 'UX Design, SVP',
      description: 'Transforming - Senior Vice President driving cloud product and engineering alignment',
      focus: ['Multi-cloud business pillar', 'Organizational health', 'Design excellence', 'Domain accountability']
    },
    'G13': {
      title: 'UX Design, EVP',
      description: 'Visionary - Executive Vice President driving T&P and experience org strategic vision',
      focus: ['Experience org leadership', 'Corporate strategy alignment', 'Customer experience priority', 'Business growth']
    }
  };

  const gradeDescriptions = userRole === 'ic' ? icGradeDescriptions : managerGradeDescriptions;

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