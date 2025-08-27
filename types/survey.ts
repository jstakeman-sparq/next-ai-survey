export interface SurveyQuestion {
  id: number;
  dimension: string;
  question: string;
  options: SurveyOption[];
}

export interface SurveyOption {
  value: 'A' | 'B' | 'C' | 'D';
  text: string;
  description: string;
}

export interface SurveyAnswers {
  [questionId: number]: 'A' | 'B' | 'C' | 'D';
}

export interface SurveyState {
  currentQuestionIndex: number;
  answers: SurveyAnswers;
  isComplete: boolean;
  surveyId?: string;
  shortCode?: string;
}

export interface CohortResult {
  name: 'AI Skeptic' | 'AI Curious' | 'AI Ready' | 'AI User';
  distribution: { [key in 'A' | 'B' | 'C' | 'D']: number };
  predominantAnswer: string;
}

export interface SurveyContext {
  surveyId: string;
  shortCode: string;
  surveyData?: any;
}

export interface ClientInfo {
  clientName: string;
  clientContact: string;
  salespersonName: string;
  assessmentDate: string;
}

export interface CohortDefinition {
  description: string;
  icon: string;
  color: string;
  nextSteps: string[];
  conversationStarters: string[];
}

export type CohortName = 'AI Skeptic' | 'AI Curious' | 'AI Ready' | 'AI User';