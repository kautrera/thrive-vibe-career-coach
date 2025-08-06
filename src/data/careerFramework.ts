// UX Career Framework Data Structure
// Based on FY26 UX Career Framework from Salesforce

export interface Competency {
  id: string;
  name: string;
  description: string;
  category: 'shared' | 'role-based';
  pillar: string;
  theme: string;
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

// Shared Competencies (UX CORE, EXECUTION, LEADERSHIP - assessed with proficiency scale)
export const sharedCompetencies: Competency[] = [
  // UX CORE - METHODOLOGY
  {
    id: 'methodology-1',
    name: 'UX Methodology Foundation',
    description: 'Learns and applies UX (Design, Eng, or Marketing) methodologies, principles, and processes to execute projects from discovery to delivery.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'METHODOLOGY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic understanding of UX methodologies',
      2: 'Applies methodologies with guidance',
      3: 'Independently applies standard methodologies',
      4: 'Adapts methodologies for complex problems',
      5: 'Innovates and leads methodology adoption'
    }
  },
  {
    id: 'methodology-2',
    name: 'Process Consistency & Feedback Integration',
    description: 'Applies UX processes consistently and incorporates user and stakeholder feedback to align solutions with objectives.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'METHODOLOGY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic process application',
      2: 'Consistent process application with feedback',
      3: 'Integrates feedback effectively',
      4: 'Optimizes processes based on feedback',
      5: 'Leads process improvement initiatives'
    }
  },
  {
    id: 'methodology-3',
    name: 'Methodology Adaptation & Value Articulation',
    description: 'Adapts and tailors UX methodologies to meet project needs and articulates the value of design across teams.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'METHODOLOGY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic methodology application',
      2: 'Beginning to adapt methodologies',
      3: 'Effectively adapts and articulates value',
      4: 'Masters adaptation and value communication',
      5: 'Leads methodology innovation'
    }
  },
  {
    id: 'methodology-4',
    name: 'Methodology Innovation & Team Enablement',
    description: 'Refines and innovates UX methodologies to achieve business and customer goals, enabling team-wide improvements.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'METHODOLOGY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic methodology understanding',
      2: 'Participates in improvements',
      3: 'Contributes to methodology refinement',
      4: 'Drives methodology innovation',
      5: 'Establishes new methodology standards'
    }
  },

  // UX CORE - ACUMEN
  {
    id: 'acumen-1',
    name: 'Foundational Understanding',
    description: 'Develops foundational understanding of Salesforce customers, products, systems, and architecture by actively learning and seeking guidance.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'ACUMEN',
    assessmentType: 'proficiency',
    levels: {
      1: 'Beginning to learn Salesforce fundamentals',
      2: 'Developing foundational understanding',
      3: 'Solid understanding of core concepts',
      4: 'Deep knowledge across multiple areas',
      5: 'Expert-level comprehensive understanding'
    }
  },
  {
    id: 'acumen-2',
    name: 'Ecosystem Navigation',
    description: 'Effectively navigates the Salesforce ecosystem to get things done, understanding how to operate across complex systems, align with the broader product lifecycle, and deliver business value.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'ACUMEN',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic navigation with support',
      2: 'Independent navigation of core systems',
      3: 'Effective cross-system operation',
      4: 'Optimizes complex ecosystem navigation',
      5: 'Masters and teaches ecosystem expertise'
    }
  },
  {
    id: 'acumen-3',
    name: 'Specialized Knowledge Application',
    description: 'Applies specialized knowledge of specific Salesforce products, customers, or systems, and a strong understanding of the business value of design, to identify patterns, inform decisions, and solve problems across teams.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'ACUMEN',
    assessmentType: 'proficiency',
    levels: {
      1: 'Building specialized knowledge',
      2: 'Applies knowledge to inform decisions',
      3: 'Identifies patterns and solves problems',
      4: 'Leverages expertise strategically',
      5: 'Establishes new knowledge frameworks'
    }
  },
  {
    id: 'acumen-4',
    name: 'Strategic Expertise & Customer Perspective',
    description: 'Leverages deep and broad expertise in Salesforce products, metrics, and emerging innovations to ensure the customer perspective shapes strategic priorities, business decisions, and team activities.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'ACUMEN',
    assessmentType: 'proficiency',
    levels: {
      1: 'Understanding customer perspective basics',
      2: 'Incorporating customer insights',
      3: 'Shaping decisions with expertise',
      4: 'Influencing strategic priorities',
      5: 'Driving organizational strategy'
    }
  },

  // UX CORE - INNOVATION
  {
    id: 'innovation-1',
    name: 'Tool & Technology Application',
    description: 'Grasps and applies new tools, technologies, and systems essential for accomplishing team objectives.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'INNOVATION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning new tools with guidance',
      2: 'Applies tools for team objectives',
      3: 'Effectively utilizes diverse tools',
      4: 'Masters and optimizes tool usage',
      5: 'Leads tool strategy and adoption'
    }
  },
  {
    id: 'innovation-2',
    name: 'Proactive Exploration & Experimentation',
    description: 'Proactively explores and experiments with new tools and technologies to enhance team performance and drive operational efficiency.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'INNOVATION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Beginning to explore new technologies',
      2: 'Experiments with guidance',
      3: 'Proactively explores and implements',
      4: 'Drives innovation initiatives',
      5: 'Establishes innovation practices'
    }
  },
  {
    id: 'innovation-3',
    name: 'Technology Integration & Automation',
    description: 'Integrates new technologies and systems into workflows, identifying and implementing opportunities for automation and improvement.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'INNOVATION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic technology integration',
      2: 'Identifies integration opportunities',
      3: 'Implements technology improvements',
      4: 'Masters workflow optimization',
      5: 'Leads automation strategies'
    }
  },
  {
    id: 'innovation-4',
    name: 'Emerging Technology Leadership',
    description: 'Leads initiatives to apply emerging technologies, guides colleagues in adoption, and elevates the innovative capabilities of the team or organization.',
    category: 'shared',
    theme: 'UX CORE',
    pillar: 'INNOVATION',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning about emerging technologies',
      2: 'Participates in technology initiatives',
      3: 'Contributes to technology adoption',
      4: 'Leads technology initiatives',
      5: 'Drives organizational innovation'
    }
  },

  // EXECUTION - DELIVERY
  {
    id: 'delivery-1',
    name: 'Task Management & Execution',
    description: 'Manages assigned tasks using delivery tools and team processes to meet execution expectations and contribute to team goals.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'DELIVERY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Manages individual tasks with support',
      2: 'Consistently delivers quality work',
      3: 'Manages complex deliverables',
      4: 'Optimizes delivery processes',
      5: 'Establishes delivery excellence'
    }
  },
  {
    id: 'delivery-2',
    name: 'Project Planning & Coordination',
    description: 'Plans and prioritizes work across a project using shared standards and stakeholder inputs to ensure consistent progress and coordination.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'DELIVERY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic project planning',
      2: 'Effective planning and prioritization',
      3: 'Coordinates across projects',
      4: 'Masters complex project coordination',
      5: 'Establishes planning excellence'
    }
  },
  {
    id: 'delivery-3',
    name: 'Cross-Team Coordination',
    description: 'Connects initiatives across teams, tracks dependencies, manages stakeholders, and adapts plans to maintain alignment and accountability in dynamic environments.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'DELIVERY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic team coordination',
      2: 'Tracks dependencies effectively',
      3: 'Manages stakeholders and alignment',
      4: 'Masters dynamic coordination',
      5: 'Leads organizational coordination'
    }
  },
  {
    id: 'delivery-4',
    name: 'Strategic Delivery Alignment',
    description: 'Aligns delivery strategy with business goals by structuring ambiguous efforts, driving decision-making, and measuring progress through shared metrics.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'DELIVERY',
    assessmentType: 'proficiency',
    levels: {
      1: 'Understanding business alignment',
      2: 'Participates in strategic alignment',
      3: 'Structures ambiguous efforts',
      4: 'Drives strategic delivery',
      5: 'Establishes delivery strategy'
    }
  },

  // EXECUTION - CRAFT
  {
    id: 'craft-1',
    name: 'Feedback Application & Standards',
    description: 'Applies feedback and design standards to improve work quality and meet project requirements.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'CRAFT',
    assessmentType: 'proficiency',
    levels: {
      1: 'Applies feedback with guidance',
      2: 'Consistently applies standards',
      3: 'Improves quality through standards',
      4: 'Sets quality benchmarks',
      5: 'Defines industry standards'
    }
  },
  {
    id: 'craft-2',
    name: 'Thoughtful Solution Creation',
    description: 'Produces thoughtful, well-crafted solutions that align with project goals and improve overall team outcomes.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'CRAFT',
    assessmentType: 'proficiency',
    levels: {
      1: 'Creates basic solutions',
      2: 'Produces thoughtful solutions',
      3: 'Aligns with broader outcomes',
      4: 'Optimizes solution impact',
      5: 'Establishes solution excellence'
    }
  },
  {
    id: 'craft-3',
    name: 'Scalable Design Systems',
    description: 'Creates scalable and adaptable design systems that balance quality and efficiency across teams and initiatives.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'CRAFT',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic system understanding',
      2: 'Creates adaptable components',
      3: 'Balances quality and efficiency',
      4: 'Masters scalable systems',
      5: 'Leads system innovation'
    }
  },
  {
    id: 'craft-4',
    name: 'Standards Advocacy & Mentorship',
    description: 'Sets and advocates for high quality design and product standards and mentors others to uplift skills, drive consistency, and foster a culture of excellence.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'CRAFT',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning quality standards',
      2: 'Participates in standard setting',
      3: 'Advocates for standards',
      4: 'Mentors and drives consistency',
      5: 'Establishes culture of excellence'
    }
  },

  // EXECUTION - STORYTELLING
  {
    id: 'storytelling-1',
    name: 'Clear Communication & Active Listening',
    description: 'Shares ideas clearly by tailoring verbal and visual communication to audience needs and confirming understanding through active listening.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'STORYTELLING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic clear communication',
      2: 'Tailors communication effectively',
      3: 'Masters audience-specific communication',
      4: 'Optimizes communication impact',
      5: 'Establishes communication excellence'
    }
  },
  {
    id: 'storytelling-2',
    name: 'Stakeholder Alignment & Trust Building',
    description: 'Presents ideas and perspectives in ways that align stakeholders, build trust, and support collaborative decision-making.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'STORYTELLING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic presentation skills',
      2: 'Builds stakeholder alignment',
      3: 'Masters trust-building communication',
      4: 'Optimizes collaborative outcomes',
      5: 'Leads organizational alignment'
    }
  },
  {
    id: 'storytelling-3',
    name: 'Compelling Narrative Creation',
    description: 'Crafts compelling narratives that connect strategy, context, and user needs to influence direction and drive momentum.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'STORYTELLING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic narrative creation',
      2: 'Connects strategy and context',
      3: 'Crafts compelling narratives',
      4: 'Masters influential storytelling',
      5: 'Drives organizational narrative'
    }
  },
  {
    id: 'storytelling-4',
    name: 'Executive Communication & Vision Translation',
    description: 'Advocates and presents with confidence across all levels, including EVP+, by translating vision into clear, credible communication tailored to diverse technical and non-technical audiences.',
    category: 'shared',
    theme: 'EXECUTION',
    pillar: 'STORYTELLING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning executive communication',
      2: 'Presents to diverse audiences',
      3: 'Translates vision effectively',
      4: 'Masters executive advocacy',
      5: 'Leads organizational communication'
    }
  },

  // LEADERSHIP - PROBLEM SOLVING
  {
    id: 'problem-solving-1',
    name: 'Information Gathering & Challenge Framing',
    description: 'Gathers relevant information and frames challenges clearly to establish a strong foundation for problem-solving and informed decision-making.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'PROBLEM SOLVING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic information gathering',
      2: 'Effectively gathers and frames challenges',
      3: 'Establishes strong problem-solving foundation',
      4: 'Optimizes information strategy',
      5: 'Leads problem-solving methodology'
    }
  },
  {
    id: 'problem-solving-2',
    name: 'Complex Problem Breakdown & Solution Prioritization',
    description: 'Breaks down complex problems, synthesizes inputs, and prioritizes solutions to navigate ambiguity and focus on highest-impact outcomes.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'PROBLEM SOLVING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic problem breakdown',
      2: 'Synthesizes inputs effectively',
      3: 'Navigates ambiguity and prioritizes',
      4: 'Masters complex problem solving',
      5: 'Establishes problem-solving excellence'
    }
  },
  {
    id: 'problem-solving-3',
    name: 'Cross-Team Insight Connection & Organizational Alignment',
    description: 'Generates ideas, reframes challenges, and connects insights across teams to align problem-solving efforts with broader organizational goals, values and vision.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'PROBLEM SOLVING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic idea generation',
      2: 'Connects insights across teams',
      3: 'Aligns with organizational goals',
      4: 'Masters cross-team alignment',
      5: 'Drives organizational problem-solving'
    }
  },
  {
    id: 'problem-solving-4',
    name: 'Future Vision & Team Mobilization',
    description: 'Anticipates future challenges, has clear vision of future possibilities, drives clarity in high-ambiguity environments, and mobilizes teams to deliver sustainable, high-impact solutions.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'PROBLEM SOLVING',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning to anticipate challenges',
      2: 'Develops future vision',
      3: 'Drives clarity in ambiguity',
      4: 'Mobilizes teams for impact',
      5: 'Establishes visionary leadership'
    }
  },

  // LEADERSHIP - OWNERSHIP
  {
    id: 'ownership-1',
    name: 'Reliable Delivery & Relationship Building',
    description: 'Delivers on committments reliably, holds accountability for outcomes, and fosters positive relationships to contribute to a cohesive, collaborative environment.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'OWNERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic commitment delivery',
      2: 'Reliable delivery and accountability',
      3: 'Fosters collaborative environment',
      4: 'Optimizes team dynamics',
      5: 'Establishes ownership culture'
    }
  },
  {
    id: 'ownership-2',
    name: 'Trust Building & Team Enhancement',
    description: 'Drives initiatives that build trust, inclusivity, and collaboration by sharing knowledge, resolving challenges, and enhancing team dynamics.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'OWNERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic trust building',
      2: 'Shares knowledge and resolves challenges',
      3: 'Builds inclusivity and collaboration',
      4: 'Masters team enhancement',
      5: 'Leads trust and inclusion initiatives'
    }
  },
  {
    id: 'ownership-3',
    name: 'Gap Identification & Process Improvement',
    description: 'Identifies and addresses gaps in experiences and processes, taking initiative to drive improvements that benefit teams and organizational outcomes.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'OWNERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic gap identification',
      2: 'Addresses process gaps',
      3: 'Drives team improvements',
      4: 'Masters organizational improvement',
      5: 'Establishes improvement culture'
    }
  },
  {
    id: 'ownership-4',
    name: 'Structure Creation & Team Empowerment',
    description: 'Creates structures, removes barriers, and fosters autonomy to empower individuals and teams to lead, own their work, and deliver lasting business impact.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'OWNERSHIP',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning empowerment principles',
      2: 'Participates in structure creation',
      3: 'Fosters team autonomy',
      4: 'Creates empowering structures',
      5: 'Drives organizational empowerment'
    }
  },

  // LEADERSHIP - INFLUENCE
  {
    id: 'influence-1',
    name: 'Authentic Relationships & Trust Environment',
    description: 'Establishes authentic relationships, listens actively, and understands others\' needs to create an environment of trust and psychological safety.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'INFLUENCE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic relationship building',
      2: 'Establishes authentic relationships',
      3: 'Creates trust and psychological safety',
      4: 'Masters influential relationships',
      5: 'Establishes organizational trust'
    }
  },
  {
    id: 'influence-2',
    name: 'Thoughtful Perspective & Collaborative Outcomes',
    description: 'Provides thoughtful, well-founded perspectives to shape priorities, roadmaps, and collaborative outcomes across teams.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'INFLUENCE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Basic perspective sharing',
      2: 'Provides thoughtful perspectives',
      3: 'Shapes priorities and roadmaps',
      4: 'Masters collaborative influence',
      5: 'Leads organizational perspective'
    }
  },
  {
    id: 'influence-3',
    name: 'Strategic Insight & Cross-Department Influence',
    description: 'Uses experience, trust, credibility, and strategic insight to influence resourcing, roadmaps, and decisions that align initiatives across departments and business units.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'INFLUENCE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning strategic influence',
      2: 'Uses experience for influence',
      3: 'Influences cross-department decisions',
      4: 'Masters strategic influence',
      5: 'Drives organizational alignment'
    }
  },
  {
    id: 'influence-4',
    name: 'Vision Shaping & Transformative Impact',
    description: 'Shapes long-term vision, inspires bold ideas, and drives momentum that achieves ambitious, transformative outcomes and recognition across the organization and broader community.',
    category: 'shared',
    theme: 'LEADERSHIP',
    pillar: 'INFLUENCE',
    assessmentType: 'proficiency',
    levels: {
      1: 'Learning vision development',
      2: 'Participates in vision shaping',
      3: 'Inspires bold ideas',
      4: 'Drives transformative outcomes',
      5: 'Establishes visionary influence'
    }
  }
];

// Role-based Competencies (UX DESIGN ROLE - assessed with scope-impact scale)
export const roleBasedCompetencies: Competency[] = [
  // USER CENTERED DESIGN
  {
    id: 'design-theory',
    name: 'Design Theory',
    description: 'Create intuitive, user-centered experiences using design principles, patterns, and artifacts like flows, journeys, and wireframes.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'USER CENTERED DESIGN',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Creates basic user-centered designs',
      2: 'Applies design principles effectively',
      3: 'Masters intuitive experience creation',
      4: 'Optimizes design pattern usage',
      5: 'Establishes design theory leadership'
    }
  },
  {
    id: 'consistency-quality',
    name: 'Consistency & Quality',
    description: 'Ensure quality and consistency by aligning designs to usability heuristics, accessibility standards, and the design system.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'USER CENTERED DESIGN',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic quality standards',
      2: 'Aligns to usability heuristics',
      3: 'Ensures accessibility compliance',
      4: 'Masters system consistency',
      5: 'Establishes quality leadership'
    }
  },
  {
    id: 'insight-artifacts',
    name: 'Insight Artifacts / Design Production',
    description: 'Translate research insights into foundational artifacts—such as personas and journey maps—to guide product direction.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'USER CENTERED DESIGN',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Creates basic research artifacts',
      2: 'Translates insights effectively',
      3: 'Guides product direction',
      4: 'Masters insight application',
      5: 'Establishes artifact excellence'
    }
  },

  // COMPOSABLE SYSTEMS THINKING
  {
    id: 'design-architecture',
    name: 'Design Architecture',
    description: 'Define the structure and flow of user experiences—through experience maps, system models, and flow diagrams—to ensure consistency, scalability, and seamless handoff across products.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'COMPOSABLE SYSTEMS THINKING',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic experience structure',
      2: 'Creates effective system models',
      3: 'Ensures consistency and scalability',
      4: 'Masters seamless handoffs',
      5: 'Establishes architecture leadership'
    }
  },
  {
    id: 'platform-mindset',
    name: 'Platform Mindset',
    description: 'Design flexible, modular solutions that support reuse, extensibility, and long-term platform growth.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'COMPOSABLE SYSTEMS THINKING',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic modular design',
      2: 'Creates flexible solutions',
      3: 'Supports reuse and extensibility',
      4: 'Masters platform growth design',
      5: 'Establishes platform leadership'
    }
  },
  {
    id: 'accessible-inclusive',
    name: 'Accessible & Inclusive Design',
    description: 'Ensure all designs meet accessibility standards and deliver inclusive experiences for diverse users and contexts.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'COMPOSABLE SYSTEMS THINKING',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic accessibility awareness',
      2: 'Meets accessibility standards',
      3: 'Delivers inclusive experiences',
      4: 'Masters diverse user needs',
      5: 'Establishes accessibility leadership'
    }
  },

  // EXPERIENCE HARMONY
  {
    id: 'product-development',
    name: 'Product Development Engagement',
    description: 'Collaborate with cross-functional partners to align on goals, timelines, and requirements, using demos and design reviews to drive clarity, accelerate decision-making, and connect design work to measurable business outcome.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'EXPERIENCE HARMONY',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic cross-functional collaboration',
      2: 'Aligns on goals and timelines',
      3: 'Drives clarity and decision-making',
      4: 'Connects to business outcomes',
      5: 'Establishes collaboration excellence'
    }
  },
  {
    id: 'design-feedback',
    name: 'Design Feedback',
    description: 'Engage in critique and shareouts to exchange feedback, refine ideas, and ensure cohesive, high-quality user experiences.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'EXPERIENCE HARMONY',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic feedback participation',
      2: 'Engages in critique effectively',
      3: 'Refines ideas through feedback',
      4: 'Ensures cohesive experiences',
      5: 'Establishes feedback excellence'
    }
  },
  {
    id: 'iterative-development',
    name: 'Iterative Development',
    description: 'Use feedback, testing, and data to iteratively improve flows and prototypes in response to evolving user needs.',
    category: 'role-based',
    theme: 'UX DESIGN ROLE',
    pillar: 'EXPERIENCE HARMONY',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Basic iterative improvement',
      2: 'Uses feedback and testing effectively',
      3: 'Improves flows iteratively',
      4: 'Masters user-driven iteration',
      5: 'Establishes iterative excellence'
    }
  }
];

// Combine all competencies
export const getAllCompetencies = (): Competency[] => {
  return [...sharedCompetencies, ...roleBasedCompetencies];
};

// Grade expectations based on CSV data
export const gradeExpectations: { [grade: string]: { [competencyId: string]: number } } = {
  'G5': {
    // UX CORE - METHODOLOGY
    'methodology-1': 2, // Emergent
    'methodology-2': 2, // Emergent
    'methodology-3': 0, // N/A
    'methodology-4': 0, // N/A
    // UX CORE - ACUMEN
    'acumen-1': 2, // Emergent
    'acumen-2': 2, // Emergent
    'acumen-3': 0, // N/A
    'acumen-4': 0, // N/A
    // UX CORE - INNOVATION
    'innovation-1': 2, // Emergent
    'innovation-2': 2, // Emergent
    'innovation-3': 0, // N/A
    'innovation-4': 0, // N/A
    // EXECUTION - DELIVERY
    'delivery-1': 4, // Competent
    'delivery-2': 2, // Emergent
    'delivery-3': 0, // N/A
    'delivery-4': 0, // N/A
    // EXECUTION - CRAFT
    'craft-1': 4, // Competent
    'craft-2': 2, // Emergent
    'craft-3': 0, // N/A
    'craft-4': 0, // N/A
    // EXECUTION - STORYTELLING
    'storytelling-1': 2, // Emergent
    'storytelling-2': 2, // Emergent
    'storytelling-3': 0, // N/A
    'storytelling-4': 0, // N/A
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 4, // Competent
    'problem-solving-2': 2, // Emergent
    'problem-solving-3': 0, // N/A
    'problem-solving-4': 0, // N/A
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 4, // Competent
    'ownership-2': 2, // Emergent
    'ownership-3': 0, // N/A
    'ownership-4': 0, // N/A
    // LEADERSHIP - INFLUENCE
    'influence-1': 2, // Emergent
    'influence-2': 0, // N/A
    'influence-3': 0, // N/A
    'influence-4': 0, // N/A
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 2, // Foundational
    'consistency-quality': 2, // Foundational
    'insight-artifacts': 0, // N/A
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 2, // Foundational
    'platform-mindset': 2, // Foundational
    'accessible-inclusive': 0, // N/A
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 2, // Foundational
    'design-feedback': 0, // N/A
    'iterative-development': 0, // N/A
  },
  'G6': {
    // UX CORE - METHODOLOGY
    'methodology-1': 4, // Competent
    'methodology-2': 4, // Competent
    'methodology-3': 2, // Emergent
    'methodology-4': 0, // N/A
    // UX CORE - ACUMEN
    'acumen-1': 4, // Competent
    'acumen-2': 4, // Competent
    'acumen-3': 2, // Emergent
    'acumen-4': 0, // N/A
    // UX CORE - INNOVATION
    'innovation-1': 4, // Competent
    'innovation-2': 2, // Emergent
    'innovation-3': 2, // Emergent
    'innovation-4': 0, // N/A
    // EXECUTION - DELIVERY
    'delivery-1': 6, // Proficient
    'delivery-2': 4, // Competent
    'delivery-3': 2, // Emergent
    'delivery-4': 0, // N/A
    // EXECUTION - CRAFT
    'craft-1': 6, // Proficient
    'craft-2': 4, // Competent
    'craft-3': 2, // Emergent
    'craft-4': 0, // N/A
    // EXECUTION - STORYTELLING
    'storytelling-1': 4, // Competent
    'storytelling-2': 2, // Emergent
    'storytelling-3': 0, // N/A
    'storytelling-4': 0, // N/A
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 6, // Proficient
    'problem-solving-2': 4, // Competent
    'problem-solving-3': 2, // Emergent
    'problem-solving-4': 0, // N/A
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 6, // Proficient
    'ownership-2': 4, // Competent
    'ownership-3': 2, // Emergent
    'ownership-4': 0, // N/A
    // LEADERSHIP - INFLUENCE
    'influence-1': 4, // Competent
    'influence-2': 2, // Emergent
    'influence-3': 0, // N/A
    'influence-4': 0, // N/A
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 4, // Tactical
    'consistency-quality': 4, // Tactical
    'insight-artifacts': 2, // Foundational
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 4, // Tactical
    'platform-mindset': 4, // Tactical
    'accessible-inclusive': 0, // N/A
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 4, // Tactical
    'design-feedback': 2, // Foundational
    'iterative-development': 0, // N/A
  },
  'G7': {
    // UX CORE - METHODOLOGY
    'methodology-1': 6, // Proficient
    'methodology-2': 6, // Proficient
    'methodology-3': 4, // Competent
    'methodology-4': 0, // N/A
    // UX CORE - ACUMEN
    'acumen-1': 6, // Proficient
    'acumen-2': 6, // Proficient
    'acumen-3': 4, // Competent
    'acumen-4': 0, // N/A
    // UX CORE - INNOVATION
    'innovation-1': 6, // Proficient
    'innovation-2': 4, // Competent
    'innovation-3': 4, // Competent
    'innovation-4': 0, // N/A
    // EXECUTION - DELIVERY
    'delivery-1': 6, // Proficient
    'delivery-2': 6, // Proficient
    'delivery-3': 6, // Proficient
    'delivery-4': 4, // Competent
    // EXECUTION - CRAFT
    'craft-1': 6, // Proficient
    'craft-2': 6, // Proficient
    'craft-3': 4, // Competent
    'craft-4': 4, // Competent
    // EXECUTION - STORYTELLING
    'storytelling-1': 6, // Proficient
    'storytelling-2': 6, // Proficient
    'storytelling-3': 4, // Competent
    'storytelling-4': 0, // N/A
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 6, // Proficient
    'problem-solving-2': 6, // Proficient
    'problem-solving-3': 4, // Competent
    'problem-solving-4': 2, // Emergent
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 6, // Proficient
    'ownership-2': 6, // Proficient
    'ownership-3': 4, // Competent
    'ownership-4': 0, // N/A
    // LEADERSHIP - INFLUENCE
    'influence-1': 6, // Proficient
    'influence-2': 4, // Competent
    'influence-3': 2, // Emergent
    'influence-4': 0, // N/A
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 4, // Tactical
    'consistency-quality': 4, // Tactical
    'insight-artifacts': 4, // Tactical
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 6, // Strategic
    'platform-mindset': 4, // Tactical
    'accessible-inclusive': 2, // Foundational
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 4, // Tactical
    'design-feedback': 4, // Tactical
    'iterative-development': 2, // Foundational
  },
  'G8': {
    // UX CORE - METHODOLOGY
    'methodology-1': 6, // Proficient
    'methodology-2': 6, // Proficient
    'methodology-3': 6, // Proficient
    'methodology-4': 4, // Competent
    // UX CORE - ACUMEN
    'acumen-1': 8, // Advanced
    'acumen-2': 8, // Advanced
    'acumen-3': 6, // Proficient
    'acumen-4': 4, // Competent
    // UX CORE - INNOVATION
    'innovation-1': 6, // Proficient
    'innovation-2': 6, // Proficient
    'innovation-3': 4, // Competent
    'innovation-4': 4, // Competent
    // EXECUTION - DELIVERY
    'delivery-1': 8, // Advanced
    'delivery-2': 8, // Advanced
    'delivery-3': 6, // Proficient
    'delivery-4': 6, // Proficient
    // EXECUTION - CRAFT
    'craft-1': 8, // Advanced
    'craft-2': 8, // Advanced
    'craft-3': 6, // Proficient
    'craft-4': 6, // Proficient
    // EXECUTION - STORYTELLING
    'storytelling-1': 8, // Advanced
    'storytelling-2': 6, // Proficient
    'storytelling-3': 6, // Proficient
    'storytelling-4': 4, // Competent
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 8, // Advanced
    'problem-solving-2': 8, // Advanced
    'problem-solving-3': 6, // Proficient
    'problem-solving-4': 6, // Proficient
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 8, // Advanced
    'ownership-2': 8, // Advanced
    'ownership-3': 6, // Proficient
    'ownership-4': 6, // Proficient
    // LEADERSHIP - INFLUENCE
    'influence-1': 8, // Advanced
    'influence-2': 6, // Proficient
    'influence-3': 4, // Competent
    'influence-4': 4, // Competent
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 6, // Strategic
    'consistency-quality': 6, // Strategic
    'insight-artifacts': 6, // Strategic
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 8, // Innovative
    'platform-mindset': 6, // Strategic
    'accessible-inclusive': 4, // Tactical
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 6, // Strategic
    'design-feedback': 6, // Strategic
    'iterative-development': 4, // Tactical
  },
  'G9': {
    // UX CORE - METHODOLOGY
    'methodology-1': 8, // Advanced
    'methodology-2': 8, // Advanced
    'methodology-3': 8, // Advanced
    'methodology-4': 6, // Proficient
    // UX CORE - ACUMEN
    'acumen-1': 8, // Advanced
    'acumen-2': 8, // Advanced
    'acumen-3': 8, // Advanced
    'acumen-4': 6, // Proficient
    // UX CORE - INNOVATION
    'innovation-1': 8, // Advanced
    'innovation-2': 8, // Advanced
    'innovation-3': 6, // Proficient
    'innovation-4': 6, // Proficient
    // EXECUTION - DELIVERY
    'delivery-1': 10, // Expert
    'delivery-2': 8, // Advanced
    'delivery-3': 8, // Advanced
    'delivery-4': 8, // Advanced
    // EXECUTION - CRAFT
    'craft-1': 10, // Expert
    'craft-2': 8, // Advanced
    'craft-3': 8, // Advanced
    'craft-4': 8, // Advanced
    // EXECUTION - STORYTELLING
    'storytelling-1': 10, // Expert
    'storytelling-2': 8, // Advanced
    'storytelling-3': 6, // Proficient
    'storytelling-4': 6, // Proficient
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 10, // Expert
    'problem-solving-2': 8, // Advanced
    'problem-solving-3': 8, // Advanced
    'problem-solving-4': 8, // Advanced
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 10, // Expert
    'ownership-2': 8, // Advanced
    'ownership-3': 8, // Advanced
    'ownership-4': 8, // Advanced
    // LEADERSHIP - INFLUENCE
    'influence-1': 10, // Expert
    'influence-2': 8, // Advanced
    'influence-3': 6, // Proficient
    'influence-4': 6, // Proficient
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 8, // Innovative
    'consistency-quality': 8, // Innovative
    'insight-artifacts': 8, // Innovative
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 8, // Innovative
    'platform-mindset': 8, // Innovative
    'accessible-inclusive': 6, // Strategic
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 8, // Innovative
    'design-feedback': 8, // Innovative
    'iterative-development': 6, // Strategic
  },
  'G10': {
    // UX CORE - METHODOLOGY
    'methodology-1': 10, // Expert
    'methodology-2': 10, // Expert
    'methodology-3': 10, // Expert
    'methodology-4': 8, // Advanced
    // UX CORE - ACUMEN
    'acumen-1': 10, // Expert
    'acumen-2': 10, // Expert
    'acumen-3': 8, // Advanced
    'acumen-4': 6, // Proficient
    // UX CORE - INNOVATION
    'innovation-1': 10, // Expert
    'innovation-2': 10, // Expert
    'innovation-3': 8, // Advanced
    'innovation-4': 8, // Advanced
    // EXECUTION - DELIVERY
    'delivery-1': 10, // Expert
    'delivery-2': 10, // Expert
    'delivery-3': 10, // Expert
    'delivery-4': 8, // Advanced
    // EXECUTION - CRAFT
    'craft-1': 10, // Expert
    'craft-2': 10, // Expert
    'craft-3': 10, // Expert
    'craft-4': 8, // Advanced
    // EXECUTION - STORYTELLING
    'storytelling-1': 10, // Expert
    'storytelling-2': 10, // Expert
    'storytelling-3': 8, // Advanced
    'storytelling-4': 8, // Advanced
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 10, // Expert
    'problem-solving-2': 10, // Expert
    'problem-solving-3': 8, // Advanced
    'problem-solving-4': 8, // Advanced
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 10, // Expert
    'ownership-2': 10, // Expert
    'ownership-3': 8, // Advanced
    'ownership-4': 8, // Advanced
    // LEADERSHIP - INFLUENCE
    'influence-1': 10, // Expert
    'influence-2': 10, // Expert
    'influence-3': 8, // Advanced
    'influence-4': 8, // Advanced
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 10, // Transformative
    'consistency-quality': 10, // Transformative
    'insight-artifacts': 8, // Innovative
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 10, // Transformative
    'platform-mindset': 8, // Innovative
    'accessible-inclusive': 8, // Innovative
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 10, // Transformative
    'design-feedback': 8, // Innovative
    'iterative-development': 8, // Innovative
  },
  'G11': {
    // UX CORE - METHODOLOGY
    'methodology-1': 10, // Expert
    'methodology-2': 10, // Expert
    'methodology-3': 10, // Expert
    'methodology-4': 10, // Expert
    // UX CORE - ACUMEN
    'acumen-1': 10, // Expert
    'acumen-2': 10, // Expert
    'acumen-3': 10, // Expert
    'acumen-4': 10, // Expert
    // UX CORE - INNOVATION
    'innovation-1': 10, // Expert
    'innovation-2': 10, // Expert
    'innovation-3': 10, // Expert
    'innovation-4': 10, // Expert
    // EXECUTION - DELIVERY
    'delivery-1': 10, // Expert
    'delivery-2': 10, // Expert
    'delivery-3': 10, // Expert
    'delivery-4': 10, // Expert
    // EXECUTION - CRAFT
    'craft-1': 10, // Expert
    'craft-2': 10, // Expert
    'craft-3': 10, // Expert
    'craft-4': 10, // Expert
    // EXECUTION - STORYTELLING
    'storytelling-1': 10, // Expert
    'storytelling-2': 10, // Expert
    'storytelling-3': 10, // Expert
    'storytelling-4': 10, // Expert
    // LEADERSHIP - PROBLEM SOLVING
    'problem-solving-1': 10, // Expert
    'problem-solving-2': 10, // Expert
    'problem-solving-3': 10, // Expert
    'problem-solving-4': 10, // Expert
    // LEADERSHIP - OWNERSHIP
    'ownership-1': 10, // Expert
    'ownership-2': 10, // Expert
    'ownership-3': 10, // Expert
    'ownership-4': 10, // Expert
    // LEADERSHIP - INFLUENCE
    'influence-1': 10, // Expert
    'influence-2': 10, // Expert
    'influence-3': 10, // Expert
    'influence-4': 10, // Expert
    // UX DESIGN ROLE - USER CENTERED DESIGN
    'design-theory': 10, // Transformative
    'consistency-quality': 10, // Transformative
    'insight-artifacts': 10, // Transformative
    // UX DESIGN ROLE - COMPOSABLE SYSTEMS THINKING
    'design-architecture': 10, // Transformative
    'platform-mindset': 10, // Transformative
    'accessible-inclusive': 10, // Transformative
    // UX DESIGN ROLE - EXPERIENCE HARMONY
    'product-development': 10, // Transformative
    'design-feedback': 10, // Transformative
    'iterative-development': 10, // Transformative
  }
};

// Get all unique themes
export const getAllThemes = (): string[] => {
  const competencies = getAllCompetencies();
  return [...new Set(competencies.map(comp => comp.theme))];
};

// Get all unique pillars by theme
export const getPillarsByTheme = (theme: string): string[] => {
  const competencies = getAllCompetencies();
  return [...new Set(competencies
    .filter(comp => comp.theme === theme)
    .map(comp => comp.pillar))];
};

// Get competencies by pillar
export const getCompetenciesByPillar = (pillar: string): Competency[] => {
  const competencies = getAllCompetencies();
  return competencies.filter(comp => comp.pillar === pillar);
};