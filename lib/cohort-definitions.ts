import { CohortDefinition, CohortName } from '@/types/survey';

export const cohortDefinitions: Record<CohortName, CohortDefinition> = {
  'AI Skeptic': {
    description: 'This client is cautious, has limited or no official tool usage, and lacks the foundational readiness across data, tech, talent, and governance.',
    icon: '/images/skeptic.png',
    color: 'red',
    nextSteps: [
      'Explore a small, low-risk Proof-of-Concept focused on a specific pain point to demonstrate tangible productivity gains.',
      'Address the biggest questions or doubts about the value of introducing AI tools to teams.',
      'Start with educational workshops to build AI literacy and comfort.'
    ],
    conversationStarters: [
      '"What is the biggest question or doubt you have about the value of introducing AI tools to your teams?"',
      '"Could we explore a small, low-risk Proof-of-Concept focused on a specific pain point to demonstrate tangible productivity gains?"'
    ]
  },
  'AI Curious': {
    description: 'This client is exploring tools informally and thinking about use cases. They are aware of what\'s needed but have not yet committed resources or established formal plans.',
    icon: '/images/curious.png',
    color: 'yellow',
    nextSteps: [
      'Build a business case around a formal pilot with the most promising tools.',
      'Conduct a workshop to prioritize use cases and develop implementation roadmap.',
      'Establish formal testing protocols and success metrics for AI initiatives.'
    ],
    conversationStarters: [
      '"Of the tools you\'re exploring, which ones show the most promise? What feedback are you hearing from the early users?"',
      '"A common next step is to build a business case around a formal pilot. Would a workshop to prioritize these use cases be helpful?"'
    ]
  },
  'AI Ready': {
    description: 'This client has moved beyond exploration into active, formal pilots. They have identified specific use cases, organized initial resources, and are building the foundations for broader adoption.',
    icon: '/images/ready.png',
    color: 'blue',
    nextSteps: [
      'Support the transition from pilot to broader rollout with change management strategies.',
      'Address challenges in user adoption, technical integration, or change management.',
      'Develop success metrics and measurement frameworks for pilot programs.'
    ],
    conversationStarters: [
      '"As you move from a pilot to a broader rollout, what do you see as the biggest challenge—user adoption, technical integration, or change management?"',
      '"How can we best support your team to ensure this pilot is successful and demonstrates clear value to your stakeholders?"'
    ]
  },
  'AI User': {
    description: 'This client is actively and widely deploying AI tools. They have an established ecosystem for data, tech, talent, and governance and are focused on scaling value and impact.',
    icon: '/images/user.png',
    color: 'green',
    nextSteps: [
      'Focus on measuring ROI and impact on productivity and business outcomes.',
      'Explore next-generation AI capabilities to build on top of current toolset.',
      'Develop strategies for scaling successful AI solutions across the organization.'
    ],
    conversationStarters: [
      '"Now that you have a suite of AI tools, how are you thinking about measuring their ROI and impact on productivity and business outcomes?"',
      '"What are the next-generation AI capabilities you are exploring to build on top of your current toolset?"'
    ]
  }
};

export const getDimensionNames = (): string[] => [
  'AI Tooling & Current Usage',
  'Use Cases & Business Value', 
  'Data Readiness',
  'Technology & Infrastructure',
  'People & Culture',
  'Guidance & Controls for AI Use'
];