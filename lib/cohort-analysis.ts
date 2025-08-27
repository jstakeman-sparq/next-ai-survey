import { SurveyAnswers, CohortResult } from '@/types/survey';

export const determineCohort = (answers: SurveyAnswers): CohortResult => {
  const answerCounts: { [key in 'A' | 'B' | 'C' | 'D']: number } = { A: 0, B: 0, C: 0, D: 0 };
  
  // Count answer distribution
  Object.values(answers).forEach((answer: 'A' | 'B' | 'C' | 'D') => {
    answerCounts[answer]++;
  });
  
  // Find the most common answer type
  const predominantAnswer = Object.keys(answerCounts).reduce((a, b) => {
    const aKey = a as keyof typeof answerCounts;
    const bKey = b as keyof typeof answerCounts;
    return answerCounts[aKey] > answerCounts[bKey] ? a : b;
  });
  
  // Map to cohort categories
  const cohortMap = {
    'A': 'AI Skeptic' as const,
    'B': 'AI Curious' as const,
    'C': 'AI Ready' as const,
    'D': 'AI User' as const
  };
  
  return {
    name: cohortMap[predominantAnswer as keyof typeof cohortMap],
    distribution: answerCounts,
    predominantAnswer
  };
};