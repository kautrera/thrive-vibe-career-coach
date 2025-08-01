// UX Career Framework Data Structure
// Based on FY26 UX Career Framework from Salesforce

export interface Competency {
  id: string;
  name: string;
  description: string;
  category: 'shared' | 'role-based';
  pillar: string;
  assessmentType: 'proficiency' | 'scope-impact';
  levels: {
    [key: number]: string;
  };
}

export interface CompetencyAssessment {
  competencyId: string;
  selfAssessment: number;
  managerAssessment?: number;
  gradeExpectation: number;
  demonstratedBy: string;
  managerNotes?: string;
}

// Shared Competencies (assessed with proficiency scale)
export const sharedCompetencies: Competency[] = [
  // UX CORE Pillar
  {
    id: 'methodology',
    name: 'Methodology',
    description: 'Application of design thinking, research methods, and UX processes',
    category: 'shared',
    pillar: 'UX CORE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Applies basic UX methodologies with guidance',
      2: 'Independently applies standard UX methodologies',
      3: 'Adapts and combines methodologies for complex problems',
      4: 'Innovates and leads methodology adoption across teams',
      5: 'Defines and evolves organizational UX methodology standards'
    }
  },
  {
    id: 'acumen',
    name: 'Acumen',
    description: 'Business understanding and strategic thinking in UX decisions',
    category: 'shared',
    pillar: 'UX CORE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Understands basic business context for design decisions',
      2: 'Connects design work to business objectives',
      3: 'Influences product strategy through UX insights',
      4: 'Drives business outcomes through strategic design leadership',
      5: 'Shapes organizational strategy through design thinking'
    }
  },
  {
    id: 'innovation',
    name: 'Innovation',
    description: 'Creative problem-solving and forward-thinking design approaches',
    category: 'shared',
    pillar: 'UX CORE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Explores creative solutions with guidance',
      2: 'Generates innovative ideas independently',
      3: 'Leads innovation initiatives and inspires creative thinking',
      4: 'Establishes innovation practices across multiple teams',
      5: 'Drives industry-leading innovation and thought leadership'
    }
  },

  // EXECUTION Pillar
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'Consistent execution and delivery of design work',
    category: 'shared',
    pillar: 'EXECUTION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Delivers individual tasks on time with support',
      2: 'Consistently delivers quality work independently',
      3: 'Manages complex deliverables and dependencies',
      4: 'Optimizes delivery processes for multiple teams',
      5: 'Establishes organizational delivery excellence standards'
    }
  },
  {
    id: 'craft',
    name: 'Craft',
    description: 'Quality and sophistication of design execution',
    category: 'shared',
    pillar: 'EXECUTION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Produces work that meets basic quality standards',
      2: 'Creates polished, high-quality design work',
      3: 'Sets craft standards and mentors others',
      4: 'Elevates craft quality across multiple teams',
      5: 'Defines industry-leading craft standards'
    }
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    description: 'Communication and presentation of design work and rationale',
    category: 'shared',
    pillar: 'EXECUTION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Clearly presents design work to immediate team',
      2: 'Effectively communicates design decisions to stakeholders',
      3: 'Influences through compelling design storytelling',
      4: 'Builds organizational alignment through strategic narratives',
      5: 'Shapes industry conversations through thought leadership'
    }
  },

  // LEADERSHIP Pillar
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Analytical thinking and systematic approach to complex challenges',
    category: 'shared',
    pillar: 'LEADERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Solves well-defined problems with guidance',
      2: 'Independently tackles complex design problems',
      3: 'Breaks down ambiguous challenges into actionable solutions',
      4: 'Solves systemic problems affecting multiple teams',
      5: 'Addresses industry-wide challenges through innovative solutions'
    }
  },
  {
    id: 'ownership',
    name: 'Ownership',
    description: 'Accountability and proactive responsibility for outcomes',
    category: 'shared',
    pillar: 'LEADERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Takes responsibility for assigned tasks and outcomes',
      2: 'Proactively owns end-to-end project success',
      3: 'Takes ownership of team outcomes and cross-functional success',
      4: 'Drives accountability and ownership culture across organization',
      5: 'Models ownership at industry level and influences best practices'
    }
  },
  {
    id: 'influence',
    name: 'Influence',
    description: 'Ability to persuade, inspire, and drive change through others',
    category: 'shared',
    pillar: 'LEADERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Influences immediate team members and collaborators',
      2: 'Persuades stakeholders and drives project alignment',
      3: 'Influences cross-functional teams and senior stakeholders',
      4: 'Drives organizational change and strategic alignment',
      5: 'Influences industry practices and thought leadership'
    }
  }
];

// Role-based Competencies for UX Design (assessed with scope & impact scale)
export const uxDesignCompetencies: Competency[] = [
  {
    id: 'user-centered-design',
    name: 'User Centered Design',
    description: 'Deep understanding and advocacy for user needs throughout the design process',
    category: 'role-based',
    pillar: 'UX DESIGN',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Conducts basic user research and applies findings to simple features',
      2: 'Designs complete user experiences based on research insights',
      3: 'Leads user-centered design across multiple features/products',
      4: 'Establishes user-centered practices across product organization',
      5: 'Drives industry standards for user-centered design'
    }
  },
  {
    id: 'composable-systems-thinking',
    name: 'Composable Systems Thinking',
    description: 'Designing scalable, modular systems that work cohesively',
    category: 'role-based',
    pillar: 'UX DESIGN',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Uses existing design system components effectively',
      2: 'Contributes to and extends design system capabilities',
      3: 'Designs scalable systems for complex product ecosystems',
      4: 'Leads design system strategy across multiple products',
      5: 'Defines industry practices for design system architecture'
    }
  },
  {
    id: 'experience-harmony',
    name: 'Experience Harmony',
    description: 'Creating cohesive, integrated experiences across touchpoints',
    category: 'role-based',
    pillar: 'UX DESIGN',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Ensures consistency within individual features',
      2: 'Designs cohesive experiences across related features',
      3: 'Orchestrates seamless experiences across multiple products',
      4: 'Drives experience strategy across entire product ecosystem',
      5: 'Sets industry standards for integrated experience design'
    }
  }
];

// Manager-specific competencies (additions to shared competencies)
export const managerCompetencies: Competency[] = [
  {
    id: 'people-development',
    name: 'People Development',
    description: 'Growing and developing team members and their careers',
    category: 'shared',
    pillar: 'LEADERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Provides basic feedback and support to team members',
      2: 'Actively coaches and develops individual contributors',
      3: 'Builds high-performing teams and develops other managers',
      4: 'Establishes talent development practices across organization',
      5: 'Shapes industry standards for design talent development'
    }
  },
  {
    id: 'strategic-leadership',
    name: 'Strategic Leadership',
    description: 'Setting vision, strategy, and direction for design teams',
    category: 'shared',
    pillar: 'LEADERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Communicates team vision and aligns with strategy',
      2: 'Develops strategic initiatives for team/product area',
      3: 'Influences organizational strategy through design leadership',
      4: 'Shapes business strategy and drives organizational transformation',
      5: 'Defines industry direction and thought leadership'
    }
  },
  {
    id: 'operational-excellence',
    name: 'Operational Excellence',
    description: 'Building efficient processes and systems for team success',
    category: 'shared',
    pillar: 'EXECUTION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Manages team processes and workflows effectively',
      2: 'Optimizes operations and scales team capabilities',
      3: 'Establishes operational excellence across multiple teams',
      4: 'Drives organizational operational transformation',
      5: 'Sets industry benchmarks for design operations'
    }
  }
];

// Grade expectations (1-5 scale mapping)
export const gradeExpectations: { [grade: string]: { [competencyId: string]: number } } = {
  'IC1': {
    'methodology': 1,
    'acumen': 1,
    'innovation': 1,
    'delivery': 1,
    'craft': 1,
    'storytelling': 1,
    'problem-solving': 1,
    'ownership': 1,
    'influence': 1,
    'user-centered-design': 1,
    'composable-systems-thinking': 1,
    'experience-harmony': 1
  },
  'IC2': {
    'methodology': 2,
    'acumen': 2,
    'innovation': 1,
    'delivery': 2,
    'craft': 2,
    'storytelling': 2,
    'problem-solving': 2,
    'ownership': 2,
    'influence': 1,
    'user-centered-design': 2,
    'composable-systems-thinking': 1,
    'experience-harmony': 2
  },
  'IC3': {
    'methodology': 3,
    'acumen': 2,
    'innovation': 2,
    'delivery': 3,
    'craft': 3,
    'storytelling': 3,
    'problem-solving': 3,
    'ownership': 3,
    'influence': 2,
    'user-centered-design': 3,
    'composable-systems-thinking': 2,
    'experience-harmony': 3
  },
  'IC4': {
    'methodology': 4,
    'acumen': 3,
    'innovation': 3,
    'delivery': 4,
    'craft': 4,
    'storytelling': 4,
    'problem-solving': 4,
    'ownership': 4,
    'influence': 3,
    'user-centered-design': 4,
    'composable-systems-thinking': 3,
    'experience-harmony': 4
  },
  'IC5': {
    'methodology': 5,
    'acumen': 4,
    'innovation': 4,
    'delivery': 5,
    'craft': 5,
    'storytelling': 5,
    'problem-solving': 5,
    'ownership': 5,
    'influence': 4,
    'user-centered-design': 5,
    'composable-systems-thinking': 4,
    'experience-harmony': 5
  }
};

// Weekly check-in questions (derived from Column C framework)
export const weeklyCheckInQuestions = [
  {
    id: 'methodology-growth',
    category: 'UX Core',
    question: 'How did you apply or strengthen your UX methodology this week?',
    competencyIds: ['methodology'],
    placeholder: 'Describe methodologies used, research conducted, or process improvements...'
  },
  {
    id: 'business-impact',
    category: 'UX Core', 
    question: 'What business impact did your design work create this week?',
    competencyIds: ['acumen'],
    placeholder: 'Connect your design decisions to business outcomes or user metrics...'
  },
  {
    id: 'execution-delivery',
    category: 'Execution',
    question: 'What did you deliver this week and how did you ensure quality?',
    competencyIds: ['delivery', 'craft'],
    placeholder: 'Describe deliverables, quality measures, and any process improvements...'
  },
  {
    id: 'collaboration-influence',
    category: 'Leadership',
    question: 'How did you collaborate and influence stakeholders this week?',
    competencyIds: ['influence', 'storytelling'],
    placeholder: 'Describe stakeholder interactions, presentations, or consensus building...'
  },
  {
    id: 'problem-ownership',
    category: 'Leadership',
    question: 'What problems did you solve and how did you take ownership?',
    competencyIds: ['problem-solving', 'ownership'],
    placeholder: 'Describe challenges faced, solutions implemented, and accountability taken...'
  }
];

export const getAllCompetencies = () => [...sharedCompetencies, ...uxDesignCompetencies];
export const getManagerCompetencies = () => [...sharedCompetencies, ...managerCompetencies, ...uxDesignCompetencies];