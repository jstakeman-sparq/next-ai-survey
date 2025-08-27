import { CohortDefinition, CohortName } from '@/types/survey';

export const cohortDefinitions: Record<CohortName, CohortDefinition> = {
  'AI Skeptic': {
    description: 'This client is cautious, has limited or no official tool usage, and lacks the foundational readiness across data, tech, talent, and governance.',
    icon: `<svg class="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
    </svg>`,
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
    icon: `<svg class="w-16 h-16 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>`,
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
    icon: `<svg class="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>`,
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
    icon: `<svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>`,
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