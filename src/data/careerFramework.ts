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
  // UX CORE Pillar - Methodology Competencies (exactly 4 as per CSV)
  {
    id: 'methodology-1',
    name: 'UX Methodology Foundation',
    description: 'Learns and applies UX (Design, Eng, or Marketing) methodologies, principles, and processes to execute projects from discovery to delivery.',
    category: 'shared',
    pillar: 'Methodology',
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
    id: 'methodology-2',
    name: 'Process Consistency & Feedback Integration',
    description: 'Applies UX processes consistently and incorporates user and stakeholder feedback to align solutions with objectives.',
    category: 'shared',
    pillar: 'Methodology',
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
    id: 'methodology-3',
    name: 'Methodology Adaptation & Value Articulation',
    description: 'Adapts and tailors UX methodologies to meet project needs and articulates the value of design across teams.',
    category: 'shared',
    pillar: 'Methodology',
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
    id: 'methodology-4',
    name: 'Methodology Innovation & Team Enablement',
    description: 'Refines and innovates UX methodologies to achieve business and customer goals, enabling team-wide improvements.',
    category: 'shared',
    pillar: 'Methodology',
    assessmentType: 'proficiency',
    levels: {
      1: 'Applies basic UX methodologies with guidance',
      2: 'Independently applies standard UX methodologies',
      3: 'Adapts and combines methodologies for complex problems',
      4: 'Innovates and leads methodology adoption across teams',
      5: 'Defines and evolves organizational UX methodology standards'
    }
  },
  // Acumen Pillar - 4 competencies
  {
    id: 'acumen-1',
    name: 'Foundational Understanding',
    description: 'Develops foundational understanding of Salesforce customers, products, systems, and architecture by actively learning and seeking guidance.',
    category: 'shared',
    pillar: 'Acumen',
    assessmentType: 'proficiency',
    levels: {
      1: 'Develops basic understanding with guidance',
      2: 'Actively learns Salesforce ecosystem fundamentals',
      3: 'Demonstrates solid understanding of customers and products',
      4: 'Applies deep knowledge across multiple domains',
      5: 'Masters comprehensive Salesforce ecosystem knowledge'
    }
  },
  {
    id: 'acumen-2',
    name: 'Ecosystem Navigation',
    description: 'Effectively navigates the Salesforce ecosystem to get things done, understanding how to operate across complex systems, align with the broader product lifecycle, and deliver business value.',
    category: 'shared',
    pillar: 'Acumen',
    assessmentType: 'proficiency',
    levels: {
      1: 'Navigates basic systems with support',
      2: 'Independently operates across Salesforce systems',
      3: 'Aligns work with product lifecycle effectively',
      4: 'Optimizes navigation across complex systems',
      5: 'Leads ecosystem navigation best practices'
    }
  },
  {
    id: 'acumen-3',
    name: 'Specialized Knowledge Application',
    description: 'Applies specialized knowledge of specific Salesforce products, customers, or systems, and a strong understanding of the business value of design, to identify patterns, inform decisions, and solve problems across teams.',
    category: 'shared',
    pillar: 'Acumen',
    assessmentType: 'proficiency',
    levels: {
      1: 'Applies basic specialized knowledge',
      2: 'Independently uses product knowledge to inform decisions',
      3: 'Identifies patterns and solves cross-team problems',
      4: 'Leverages expertise to drive strategic outcomes',
      5: 'Establishes new knowledge frameworks'
    }
  },
  {
    id: 'acumen-4',
    name: 'Strategic Expertise & Customer Perspective',
    description: 'Leverages deep and broad expertise in Salesforce products, metrics, and emerging innovations to ensure the customer perspective shapes strategic priorities, business decisions, and team activities.',
    category: 'shared',
    pillar: 'Acumen',
    assessmentType: 'proficiency',
    levels: {
      1: 'Understands customer perspective basics',
      2: 'Incorporates customer insights into decisions',
      3: 'Shapes team priorities with customer perspective',
      4: 'Influences strategic decisions through expertise',
      5: 'Drives organizational strategy through customer-centricity'
    }
  },

  // Innovation Pillar - 4 competencies
  {
    id: 'innovation-1',
    name: 'Tool & Technology Application',
    description: 'Grasps and applies new tools, technologies, and systems essential for accomplishing team objectives.',
    category: 'shared',
    pillar: 'Innovation',
    assessmentType: 'proficiency',
    levels: {
      1: 'Explores creative solutions with guidance',
      2: 'Generates innovative ideas independently',
      3: 'Leads innovation initiatives and inspires creative thinking',
      4: 'Establishes innovation practices across multiple teams',
      5: 'Drives industry-leading innovation and thought leadership'
    }
  },
  {
    id: 'innovation-2',
    name: 'Proactive Exploration & Experimentation',
    description: 'Proactively explores and experiments with new tools and technologies to enhance team performance and drive operational efficiency.',
    category: 'shared',
    pillar: 'Innovation',
    assessmentType: 'proficiency',
    levels: {
      1: 'Explores creative solutions with guidance',
      2: 'Generates innovative ideas independently',
      3: 'Leads innovation initiatives and inspires creative thinking',
      4: 'Establishes innovation practices across multiple teams',
      5: 'Drives industry-leading innovation and thought leadership'
    }
  },
  {
    id: 'innovation-3',
    name: 'Technology Integration & Automation',
    description: 'Integrates new technologies and systems into workflows, identifying and implementing opportunities for automation and improvement.',
    category: 'shared',
    pillar: 'Innovation',
    assessmentType: 'proficiency',
    levels: {
      1: 'Explores creative solutions with guidance',
      2: 'Generates innovative ideas independently',
      3: 'Leads innovation initiatives and inspires creative thinking',
      4: 'Establishes innovation practices across multiple teams',
      5: 'Drives industry-leading innovation and thought leadership'
    }
  },
  {
    id: 'innovation-4',
    name: 'Emerging Technology Leadership',
    description: 'Leads initiatives to apply emerging technologies, guides colleagues in adoption, and elevates the innovative capabilities of the team or organization.',
    category: 'shared',
    pillar: 'Innovation',
    assessmentType: 'proficiency',
    levels: {
      1: 'Explores creative solutions with guidance',
      2: 'Generates innovative ideas independently',
      3: 'Leads innovation initiatives and inspires creative thinking',
      4: 'Establishes innovation practices across multiple teams',
      5: 'Drives industry-leading innovation and thought leadership'
    }
  },

  // Delivery Pillar - 4 competencies
  {
    id: 'delivery-1',
    name: 'Task Execution',
    description: 'Delivers individual tasks on time with support and manages personal workload effectively.',
    category: 'shared',
    pillar: 'Delivery',
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
    id: 'delivery-2',
    name: 'Quality Consistency',
    description: 'Consistently delivers quality work independently and maintains high standards.',
    category: 'shared',
    pillar: 'Delivery',
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
    id: 'delivery-3',
    name: 'Complex Project Management',
    description: 'Manages complex deliverables and dependencies across multiple projects and teams.',
    category: 'shared',
    pillar: 'Delivery',
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
    id: 'delivery-4',
    name: 'Process Optimization',
    description: 'Optimizes delivery processes for multiple teams and establishes organizational excellence standards.',
    category: 'shared',
    pillar: 'Delivery',
    assessmentType: 'proficiency',
    levels: {
      1: 'Delivers individual tasks on time with support',
      2: 'Consistently delivers quality work independently',
      3: 'Manages complex deliverables and dependencies',
      4: 'Optimizes delivery processes for multiple teams',
      5: 'Establishes organizational delivery excellence standards'
    }
  },

  // Craft Pillar - 4 competencies
  {
    id: 'craft-1',
    name: 'Feedback Application & Standards Adherence',
    description: 'Applies feedback and design standards to improve work quality and meet project requirements.',
    category: 'shared',
    pillar: 'Craft',
    assessmentType: 'proficiency',
    levels: {
      1: 'Applies feedback with guidance to meet basic standards',
      2: 'Independently applies feedback and design standards',
      3: 'Consistently improves work quality through standards',
      4: 'Sets quality benchmarks across multiple teams',
      5: 'Defines industry standards for design quality'
    }
  },
  {
    id: 'craft-2',
    name: 'Thoughtful Solution Creation',
    description: 'Produces thoughtful, well-crafted solutions that align with project goals and improve overall team outcomes.',
    category: 'shared',
    pillar: 'Craft',
    assessmentType: 'proficiency',
    levels: {
      1: 'Creates basic solutions that meet project goals',
      2: 'Produces thoughtful, well-crafted solutions independently',
      3: 'Aligns solutions with broader team outcomes',
      4: 'Elevates solution quality across multiple teams',
      5: 'Sets industry standards for solution craftsmanship'
    }
  },
  {
    id: 'craft-3',
    name: 'Scalable Design Systems',
    description: 'Creates scalable and adaptable design systems that balance quality and efficiency across teams and initiatives.',
    category: 'shared',
    pillar: 'Craft',
    assessmentType: 'proficiency',
    levels: {
      1: 'Uses existing design systems effectively',
      2: 'Creates scalable solutions for project needs',
      3: 'Builds adaptable systems across teams',
      4: 'Establishes design system standards organization-wide',
      5: 'Defines industry practices for scalable design systems'
    }
  },
  {
    id: 'craft-4',
    name: 'Standards Advocacy & Excellence Culture',
    description: 'Sets and advocates for high quality design and product standards and mentors others to uplift skills, drive consistency, and foster a culture of excellence.',
    category: 'shared',
    pillar: 'Craft',
    assessmentType: 'proficiency',
    levels: {
      1: 'Follows established quality standards',
      2: 'Advocates for quality standards within team',
      3: 'Mentors others and drives consistency across teams',
      4: 'Establishes culture of excellence organization-wide',
      5: 'Shapes industry standards for design excellence'
    }
  },
  // Storytelling Pillar - 4 competencies
  {
    id: 'storytelling-1',
    name: 'Clear Communication & Active Listening',
    description: 'Shares ideas clearly by tailoring verbal and visual communication to audience needs and confirming understanding through active listening.',
    category: 'shared',
    pillar: 'Storytelling',
    assessmentType: 'proficiency',
    levels: {
      1: 'Shares ideas clearly with guidance',
      2: 'Tailors communication to audience needs independently',
      3: 'Confirms understanding through active listening',
      4: 'Masters audience-specific communication strategies',
      5: 'Sets organizational standards for clear communication'
    }
  },
  {
    id: 'storytelling-2',
    name: 'Stakeholder Alignment & Trust Building',
    description: 'Presents ideas and perspectives in ways that align stakeholders, build trust, and support collaborative decision-making.',
    category: 'shared',
    pillar: 'Storytelling',
    assessmentType: 'proficiency',
    levels: {
      1: 'Presents ideas clearly to immediate team',
      2: 'Aligns stakeholders through effective presentation',
      3: 'Builds trust and supports collaborative decisions',
      4: 'Masters stakeholder alignment across complex initiatives',
      5: 'Drives organizational alignment through communication'
    }
  },
  {
    id: 'storytelling-3',
    name: 'Strategic Narrative & Influence',
    description: 'Crafts compelling narratives that connect strategy, context, and user needs to influence direction and drive momentum.',
    category: 'shared',
    pillar: 'Storytelling',
    assessmentType: 'proficiency',
    levels: {
      1: 'Crafts basic narratives with support',
      2: 'Connects strategy and context in storytelling',
      3: 'Influences direction through compelling narratives',
      4: 'Drives momentum through strategic storytelling',
      5: 'Transforms organizational direction through narrative'
    }
  },
  {
    id: 'storytelling-4',
    name: 'Executive Communication & Vision Translation',
    description: 'Advocates and presents with confidence across all levels, including EVP+, by translating vision into clear, credible communication tailored to diverse technical and non-technical audiences.',
    category: 'shared',
    pillar: 'Storytelling',
    assessmentType: 'proficiency',
    levels: {
      1: 'Presents to immediate team with confidence',
      2: 'Communicates effectively to diverse audiences',
      3: 'Translates vision for technical and non-technical groups',
      4: 'Advocates confidently at executive levels',
      5: 'Shapes industry conversations through thought leadership'
    }
  },

  // Problem Solving Pillar - 4 competencies
  {
    id: 'problem-solving-1',
    name: 'Information Gathering & Challenge Framing',
    description: 'Gathers relevant information and frames challenges clearly to establish a strong foundation for problem-solving and informed decision-making.',
    category: 'shared',
    pillar: 'Problem Solving',
    assessmentType: 'proficiency',
    levels: {
      1: 'Gathers basic information with guidance',
      2: 'Independently gathers relevant information and frames challenges',
      3: 'Establishes strong foundations for problem-solving across teams',
      4: 'Drives informed decision-making at organizational level',
      5: 'Sets industry standards for systematic problem-solving'
    }
  },
  {
    id: 'problem-solving-2',
    name: 'Complex Problem Breakdown',
    description: 'Breaks down complex problems, synthesizes inputs, and prioritizes solutions to navigate ambiguity and focus on highest-impact outcomes.',
    category: 'shared',
    pillar: 'Problem Solving',
    assessmentType: 'proficiency',
    levels: {
      1: 'Breaks down simple problems with support',
      2: 'Independently synthesizes inputs and prioritizes solutions',
      3: 'Navigates ambiguity and focuses on highest-impact outcomes',
      4: 'Establishes systematic approaches across multiple teams',
      5: 'Transforms organizational problem-solving capabilities'
    }
  },
  {
    id: 'problem-solving-3',
    name: 'Idea Generation & Organizational Alignment',
    description: 'Generates ideas, reframes challenges, and connects insights across teams to align problem-solving efforts with broader organizational goals, values and vision.',
    category: 'shared',
    pillar: 'Problem Solving',
    assessmentType: 'proficiency',
    levels: {
      1: 'Generates ideas with guidance',
      2: 'Independently reframes challenges and generates insights',
      3: 'Connects insights across teams for organizational alignment',
      4: 'Aligns problem-solving with organizational goals and vision',
      5: 'Shapes industry approach to strategic problem-solving'
    }
  },
  {
    id: 'problem-solving-4',
    name: 'Future Vision & Team Mobilization',
    description: 'Anticipates future challenges, has clear vision of future possibilities, drives clarity in high-ambiguity environments, and mobilizes teams to deliver sustainable, high-impact solutions.',
    category: 'shared',
    pillar: 'Problem Solving',
    assessmentType: 'proficiency',
    levels: {
      1: 'Identifies immediate challenges with support',
      2: 'Anticipates future challenges and drives clarity',
      3: 'Mobilizes teams in high-ambiguity environments',
      4: 'Delivers sustainable, high-impact organizational solutions',
      5: 'Transforms industry standards for future-focused problem solving'
    }
  },

  // Ownership Pillar - 4 competencies
  {
    id: 'ownership-1',
    name: 'Commitment & Accountability',
    description: 'Delivers on commitments reliably, holds accountability for outcomes, and fosters positive relationships to contribute to a cohesive, collaborative environment.',
    category: 'shared',
    pillar: 'Ownership',
    assessmentType: 'proficiency',
    levels: {
      1: 'Delivers on commitments with support',
      2: 'Reliably holds accountability for individual outcomes',
      3: 'Fosters collaborative environment and team accountability',
      4: 'Drives organizational accountability culture',
      5: 'Models industry-leading ownership practices'
    }
  },
  {
    id: 'ownership-2',
    name: 'Trust & Collaboration Building',
    description: 'Drives initiatives that build trust, inclusivity, and collaboration by sharing knowledge, resolving challenges, and enhancing team dynamics.',
    category: 'shared',
    pillar: 'Ownership',
    assessmentType: 'proficiency',
    levels: {
      1: 'Contributes to team trust with guidance',
      2: 'Independently builds trust and enhances collaboration',
      3: 'Drives initiatives that improve team dynamics',
      4: 'Establishes trust and collaboration across organization',
      5: 'Transforms organizational culture through ownership'
    }
  },
  {
    id: 'ownership-3',
    name: 'Gap Identification & Process Improvement',
    description: 'Identifies and addresses gaps in experiences and processes, taking initiative to drive improvements that benefit teams and organizational outcomes.',
    category: 'shared',
    pillar: 'Ownership',
    assessmentType: 'proficiency',
    levels: {
      1: 'Identifies gaps with guidance and support',
      2: 'Independently addresses gaps and drives improvements',
      3: 'Takes initiative for team and cross-functional improvements',
      4: 'Drives organizational process improvements',
      5: 'Establishes industry standards for proactive ownership'
    }
  },
  {
    id: 'ownership-4',
    name: 'Empowerment & Autonomy Creation',
    description: 'Creates structures, removes barriers, and fosters autonomy to empower individuals and teams to lead, own their work, and deliver lasting business impact.',
    category: 'shared',
    pillar: 'Ownership',
    assessmentType: 'proficiency',
    levels: {
      1: 'Supports team autonomy with guidance',
      2: 'Independently removes barriers and empowers others',
      3: 'Creates structures that foster team ownership',
      4: 'Empowers organization-wide autonomy and ownership',
      5: 'Transforms industry standards for empowerment'
    }
  },

  // Influence Pillar - 4 competencies
  {
    id: 'influence-1',
    name: 'Relationship Building & Trust',
    description: 'Establishes authentic relationships, listens actively, and understands others\' needs to create an environment of trust and psychological safety.',
    category: 'shared',
    pillar: 'Influence',
    assessmentType: 'proficiency',
    levels: {
      1: 'Builds authentic relationships with immediate team',
      2: 'Independently creates trust and psychological safety',
      3: 'Establishes trust across cross-functional teams',
      4: 'Creates organizational culture of trust and safety',
      5: 'Models industry-leading relationship building'
    }
  },
  {
    id: 'influence-2',
    name: 'Strategic Perspective & Collaboration',
    description: 'Provides thoughtful, well-founded perspectives to shape priorities, roadmaps, and collaborative outcomes across teams.',
    category: 'shared',
    pillar: 'Influence',
    assessmentType: 'proficiency',
    levels: {
      1: 'Provides perspectives to immediate team',
      2: 'Independently shapes team priorities and roadmaps',
      3: 'Influences collaborative outcomes across teams',
      4: 'Shapes organizational strategic perspectives',
      5: 'Influences industry strategic thinking'
    }
  },
  {
    id: 'influence-3',
    name: 'Strategic Insight & Resource Influence',
    description: 'Uses experience, trust, credibility, and strategic insight to influence resourcing, roadmaps, and decisions that align initiatives across departments and business units.',
    category: 'shared',
    pillar: 'Influence',
    assessmentType: 'proficiency',
    levels: {
      1: 'Influences team-level resource decisions',
      2: 'Uses credibility to influence cross-team roadmaps',
      3: 'Aligns initiatives across departments through influence',
      4: 'Influences organizational resourcing and strategic decisions',
      5: 'Shapes industry standards for strategic influence'
    }
  },
  {
    id: 'influence-4',
    name: 'Vision & Transformative Leadership',
    description: 'Shapes long-term vision, inspires bold ideas, and drives momentum that achieves ambitious, transformative outcomes and recognition across the organization and broader community.',
    category: 'shared',
    pillar: 'Influence',
    assessmentType: 'proficiency',
    levels: {
      1: 'Contributes to team vision with support',
      2: 'Independently inspires bold ideas and drives momentum',
      3: 'Shapes transformative outcomes across teams',
      4: 'Achieves organizational and community recognition',
      5: 'Transforms industry through visionary leadership'
    }
  }
];

// Role-based Competencies for UX Design (assessed with scope & impact scale)
export const uxDesignCompetencies: Competency[] = [
  // User Centered Design Pillar - 3 competencies
  {
    id: 'user-centered-design-1',
    name: 'Design Theory',
    description: 'Create intuitive, user-centered experiences using design principles, patterns, and artifacts like flows, journeys, and wireframes.',
    category: 'role-based',
    pillar: 'User Centered Design',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Applies basic design principles with guidance',
      2: 'Tactical: Creates user flows and wireframes independently', 
      3: 'Strategic: Designs intuitive experiences across features',
      4: 'Innovative: Establishes design theory standards across teams',
      5: 'Transformative: Defines industry standards for user-centered design'
    }
  },
  {
    id: 'user-centered-design-2',
    name: 'Consistency & Quality',
    description: 'Ensure quality and consistency by aligning designs to usability heuristics, accessibility standards, and the design system.',
    category: 'role-based',
    pillar: 'User Centered Design',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Applies design system with guidance',
      2: 'Tactical: Ensures consistency across features independently',
      3: 'Strategic: Aligns designs to heuristics and standards across products',
      4: 'Innovative: Establishes quality standards across organization',
      5: 'Transformative: Sets industry benchmarks for design quality'
    }
  },
  {
    id: 'user-centered-design-3',
    name: 'Insight Artifacts & Design Production',
    description: 'Translate research insights into foundational artifacts—such as personas and journey maps—to guide product direction.',
    category: 'role-based',
    pillar: 'User Centered Design',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Creates basic artifacts with support',
      2: 'Tactical: Translates research into foundational artifacts',
      3: 'Strategic: Guides product direction through insight artifacts',
      4: 'Innovative: Establishes artifact standards across organization',
      5: 'Transformative: Shapes industry practices for insight translation'
    }
  },
  
  // Composable Systems Thinking Pillar - 3 competencies
  {
    id: 'composable-systems-thinking-1',
    name: 'Design Architecture',
    description: 'Define the structure and flow of user experiences—through experience maps, system models, and flow diagrams—to ensure consistency, scalability, and seamless handoff across products.',
    category: 'role-based',
    pillar: 'Composable Systems Thinking',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Creates basic experience maps with guidance',
      2: 'Tactical: Defines structure and flow independently',
      3: 'Strategic: Ensures scalability and consistency across products',
      4: 'Innovative: Establishes architecture standards across organization',
      5: 'Transformative: Defines industry practices for design architecture'
    }
  },
  {
    id: 'composable-systems-thinking-2',
    name: 'Platform Mindset',
    description: 'Design flexible, modular solutions that support reuse, extensibility, and long-term platform growth.',
    category: 'role-based',
    pillar: 'Composable Systems Thinking',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Uses modular components with guidance',
      2: 'Tactical: Designs flexible solutions independently',
      3: 'Strategic: Supports platform growth across products',
      4: 'Innovative: Establishes platform standards across organization',
      5: 'Transformative: Shapes industry approach to platform design'
    }
  },
  {
    id: 'composable-systems-thinking-3',
    name: 'Accessible & Inclusive Design',
    description: 'Ensure all designs meet accessibility standards and deliver inclusive experiences for diverse users and contexts.',
    category: 'role-based',
    pillar: 'Composable Systems Thinking',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Applies accessibility standards with guidance',
      2: 'Tactical: Ensures inclusive experiences independently',
      3: 'Strategic: Delivers accessible experiences across products',
      4: 'Innovative: Establishes accessibility standards across organization',
      5: 'Transformative: Drives industry standards for inclusive design'
    }
  },
  
  // Experience Harmony Pillar - 3 competencies  
  {
    id: 'experience-harmony-1',
    name: 'Product Development Engagement',
    description: 'Collaborate with cross-functional partners to align on goals, timelines, and requirements, using demos and design reviews to drive clarity, accelerate decision-making, and connect design work to measurable business outcome.',
    category: 'role-based',
    pillar: 'Experience Harmony',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Collaborates with immediate team',
      2: 'Tactical: Aligns cross-functional goals independently',
      3: 'Strategic: Drives clarity and decision-making across products',
      4: 'Innovative: Establishes collaboration standards across organization',
      5: 'Transformative: Shapes industry practices for product collaboration'
    }
  },
  {
    id: 'experience-harmony-2',
    name: 'Design Feedback',
    description: 'Engage in critique and shareouts to exchange feedback, refine ideas, and ensure cohesive, high-quality user experiences.',
    category: 'role-based',
    pillar: 'Experience Harmony',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Participates in feedback with guidance',
      2: 'Tactical: Engages in critique independently',
      3: 'Strategic: Ensures cohesive experiences through feedback',
      4: 'Innovative: Establishes feedback culture across organization',
      5: 'Transformative: Sets industry standards for design critique'
    }
  },
  {
    id: 'experience-harmony-3',
    name: 'Iterative Development',
    description: 'Use feedback, testing, and data to iteratively improve flows and prototypes in response to evolving user needs.',
    category: 'role-based',
    pillar: 'Experience Harmony',
    assessmentType: 'scope-impact',
    levels: {
      1: 'Foundational: Uses feedback with guidance',
      2: 'Tactical: Iteratively improves designs independently',
      3: 'Strategic: Responds to evolving needs across products',
      4: 'Innovative: Establishes iterative practices across organization',
      5: 'Transformative: Drives industry standards for iterative design'
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
  'G5': {
    'methodology-1': 2,
    'methodology-2': 2,
    'methodology-3': 0,
    'methodology-4': 0,
    'acumen-1': 2,
    'acumen-2': 2,
    'acumen-3': 0,
    'acumen-4': 0,
    'innovation-1': 2,
    'innovation-2': 2,
    'innovation-3': 0,
    'innovation-4': 0,
    'delivery-1': 2,
    'delivery-2': 2,
    'delivery-3': 0,
    'delivery-4': 0,
    'craft-1': 2,
    'craft-2': 2,
    'craft-3': 0,
    'craft-4': 0,
    'storytelling-1': 2,
    'storytelling-2': 2,
    'storytelling-3': 0,
    'storytelling-4': 0,
    'problem-solving-1': 2,
    'problem-solving-2': 2,
    'problem-solving-3': 0,
    'problem-solving-4': 0,
    'ownership-1': 2,
    'ownership-2': 2,
    'ownership-3': 0,
    'ownership-4': 0,
    'influence-1': 2,
    'influence-2': 2,
    'influence-3': 0,
    'influence-4': 0,
    'user-centered-design-1': 2,
    'user-centered-design-2': 2,
    'user-centered-design-3': 0,
    'composable-systems-thinking-1': 2,
    'composable-systems-thinking-2': 2,
    'composable-systems-thinking-3': 0,
    'experience-harmony-1': 2,
    'experience-harmony-2': 2,
    'experience-harmony-3': 0
  },
  'G6': {
    'methodology-1': 2,
    'methodology-2': 2,
    'methodology-3': 2,
    'methodology-4': 0,
    'acumen-1': 2,
    'acumen-2': 2,
    'acumen-3': 2,
    'acumen-4': 0,
    'innovation-1': 2,
    'innovation-2': 2,
    'innovation-3': 2,
    'innovation-4': 0,
    'delivery-1': 2,
    'delivery-2': 2,
    'delivery-3': 2,
    'delivery-4': 0,
    'craft-1': 2,
    'craft-2': 2,
    'craft-3': 2,
    'craft-4': 0,
    'storytelling-1': 2,
    'storytelling-2': 2,
    'storytelling-3': 0,
    'storytelling-4': 0,
    'problem-solving-1': 2,
    'problem-solving-2': 2,
    'problem-solving-3': 2,
    'problem-solving-4': 0,
    'ownership-1': 2,
    'ownership-2': 2,
    'ownership-3': 2,
    'ownership-4': 0,
    'influence-1': 2,
    'influence-2': 2,
    'influence-3': 2,
    'influence-4': 0,
    'user-centered-design-1': 2,
    'user-centered-design-2': 2,
    'user-centered-design-3': 2,
    'composable-systems-thinking-1': 2,
    'composable-systems-thinking-2': 2,
    'composable-systems-thinking-3': 2,
    'experience-harmony-1': 2,
    'experience-harmony-2': 2,
    'experience-harmony-3': 2
  },
  'G7': {
    'methodology-1': 4,
    'methodology-2': 4,
    'methodology-3': 2,
    'methodology-4': 0,
    'acumen-1': 4,
    'acumen-2': 4,
    'acumen-3': 2,
    'acumen-4': 0,
    'innovation-1': 4,
    'innovation-2': 4,
    'innovation-3': 2,
    'innovation-4': 0,
    'delivery-1': 4,
    'delivery-2': 4,
    'delivery-3': 2,
    'delivery-4': 0,
    'craft-1': 4,
    'craft-2': 4,
    'craft-3': 2,
    'craft-4': 0,
    'storytelling-1': 2,
    'storytelling-2': 2,
    'storytelling-3': 2,
    'storytelling-4': 0,
    'problem-solving-1': 4,
    'problem-solving-2': 4,
    'problem-solving-3': 2,
    'problem-solving-4': 2,
    'ownership-1': 4,
    'ownership-2': 4,
    'ownership-3': 2,
    'ownership-4': 2,
    'influence-1': 4,
    'influence-2': 4,
    'influence-3': 2,
    'influence-4': 2,
    'user-centered-design': 2,
    'composable-systems-thinking': 2,
    'experience-harmony': 2
  },
  'G8': {
    'methodology-1': 3,
    'methodology-2': 2,
    'methodology-3': 2,
    'methodology-4': 1,
    'acumen': 2,
    'innovation': 2,
    'delivery': 3,
    'craft': 3,
    'storytelling': 3,
    'problem-solving-1': 4,
    'problem-solving-2': 4,
    'problem-solving-3': 4,
    'problem-solving-4': 2,
    'ownership-1': 4,
    'ownership-2': 4,
    'ownership-3': 4,
    'ownership-4': 2,
    'influence-1': 4,
    'influence-2': 4,
    'influence-3': 4,
    'influence-4': 2,
    'user-centered-design': 3,
    'composable-systems-thinking': 2,
    'experience-harmony': 3
  },
  'G9': {
    'methodology-1': 3,
    'methodology-2': 3,
    'methodology-3': 2,
    'methodology-4': 2,
    'acumen': 3,
    'innovation': 3,
    'delivery': 3,
    'craft': 3,
    'storytelling': 3,
    'problem-solving-1': 6,
    'problem-solving-2': 6,
    'problem-solving-3': 4,
    'problem-solving-4': 4,
    'ownership-1': 6,
    'ownership-2': 6,
    'ownership-3': 4,
    'ownership-4': 4,
    'influence-1': 6,
    'influence-2': 6,
    'influence-3': 4,
    'influence-4': 4,
    'user-centered-design': 3,
    'composable-systems-thinking': 3,
    'experience-harmony': 3
  },
  'G10': {
    'methodology-1': 4,
    'methodology-2': 3,
    'methodology-3': 3,
    'methodology-4': 2,
    'acumen': 3,
    'innovation': 3,
    'delivery': 4,
    'craft': 4,
    'storytelling': 4,
    'problem-solving-1': 6,
    'problem-solving-2': 6,
    'problem-solving-3': 6,
    'problem-solving-4': 4,
    'ownership-1': 6,
    'ownership-2': 6,
    'ownership-3': 6,
    'ownership-4': 4,
    'influence-1': 6,
    'influence-2': 6,
    'influence-3': 6,
    'influence-4': 4,
    'user-centered-design': 4,
    'composable-systems-thinking': 3,
    'experience-harmony': 4
  },
  'G11': {
    'methodology-1': 4,
    'methodology-2': 4,
    'methodology-3': 3,
    'methodology-4': 3,
    'acumen': 4,
    'innovation': 4,
    'delivery': 4,
    'craft': 4,
    'storytelling': 4,
    'problem-solving-1': 8,
    'problem-solving-2': 8,
    'problem-solving-3': 6,
    'problem-solving-4': 6,
    'ownership-1': 8,
    'ownership-2': 8,
    'ownership-3': 6,
    'ownership-4': 6,
    'influence-1': 8,
    'influence-2': 8,
    'influence-3': 6,
    'influence-4': 6,
    'user-centered-design': 4,
    'composable-systems-thinking': 4,
    'experience-harmony': 4
  },
  // Manager grades (G7-G13 - Management starts at G7)
  'G12': {
    'methodology-1': 5,
    'methodology-2': 4,
    'methodology-3': 4,
    'methodology-4': 3,
    'acumen': 4,
    'innovation': 4,
    'delivery': 5,
    'craft': 4,
    'storytelling': 5,
    'problem-solving-1': 8,
    'problem-solving-2': 8,
    'problem-solving-3': 8,
    'problem-solving-4': 6,
    'ownership-1': 8,
    'ownership-2': 8,
    'ownership-3': 8,
    'ownership-4': 6,
    'influence-1': 8,
    'influence-2': 8,
    'influence-3': 8,
    'influence-4': 6,
    'user-centered-design': 5,
    'composable-systems-thinking': 4,
    'experience-harmony': 5,
    'people-development': 4,
    'strategic-leadership': 4,
    'operational-excellence': 4
  },
  'G13': {
    'methodology-1': 5,
    'methodology-2': 5,
    'methodology-3': 4,
    'methodology-4': 4,
    'acumen': 5,
    'innovation': 5,
    'delivery': 5,
    'craft': 5,
    'storytelling': 5,
    'problem-solving-1': 10,
    'problem-solving-2': 10,
    'problem-solving-3': 8,
    'problem-solving-4': 8,
    'ownership-1': 10,
    'ownership-2': 10,
    'ownership-3': 8,
    'ownership-4': 8,
    'influence-1': 10,
    'influence-2': 10,
    'influence-3': 8,
    'influence-4': 8,
    'user-centered-design': 5,
    'composable-systems-thinking': 5,
    'experience-harmony': 5,
    'people-development': 5,
    'strategic-leadership': 5,
    'operational-excellence': 5
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
    competencyIds: ['influence-1', 'storytelling-1'],
    placeholder: 'Describe stakeholder interactions, presentations, or consensus building...'
  },
  {
    id: 'problem-ownership',
    category: 'Leadership',
    question: 'What problems did you solve and how did you take ownership?',
    competencyIds: ['problem-solving-1', 'ownership-1'],
    placeholder: 'Describe challenges faced, solutions implemented, and accountability taken...'
  }
];

export const getAllCompetencies = () => [...sharedCompetencies, ...uxDesignCompetencies];
export const getManagerCompetencies = () => [...sharedCompetencies, ...managerCompetencies, ...uxDesignCompetencies];