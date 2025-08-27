import { SurveyQuestion } from '@/types/survey';
import surveyQuestions from '@/reference/surveyQuestions.json';

export const SURVEY_QUESTIONS: SurveyQuestion[] = surveyQuestions.questions as SurveyQuestion[];

export const TOTAL_QUESTIONS = SURVEY_QUESTIONS.length;

export const getQuestionById = (id: number): SurveyQuestion | undefined => {
  return SURVEY_QUESTIONS.find(q => q.id === id);
};

export const getQuestionByIndex = (index: number): SurveyQuestion | undefined => {
  return SURVEY_QUESTIONS[index];
};

export const isValidQuestionId = (id: number): boolean => {
  return id >= 1 && id <= TOTAL_QUESTIONS;
};

export const isValidQuestionIndex = (index: number): boolean => {
  return index >= 0 && index < TOTAL_QUESTIONS;
};

export const getNextQuestionId = (currentId: number): number | null => {
  return currentId < TOTAL_QUESTIONS ? currentId + 1 : null;
};

export const getPreviousQuestionId = (currentId: number): number | null => {
  return currentId > 1 ? currentId - 1 : null;
};

export const calculateProgress = (currentQuestionIndex: number): number => {
  return ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
};