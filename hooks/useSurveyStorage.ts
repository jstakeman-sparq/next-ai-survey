"use client";
import { useCallback } from 'react';
import { SurveyAnswers } from '@/types/survey';

const STORAGE_KEYS = {
  ANSWERS: 'aiReadinessAnswers',
  PROGRESS: 'aiReadinessProgress',
  SHORTCODE: 'aiReadinessShortcode',
  SURVEY_ID: 'aiReadinessSurveyId'
} as const;

export const useSurveyStorage = () => {
  const saveAnswers = useCallback((answers: SurveyAnswers) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
    }
  }, []);

  const loadAnswers = useCallback((): SurveyAnswers | null => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Error parsing stored answers:', error);
          return null;
        }
      }
    }
    return null;
  }, []);

  const clearAnswers = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
    }
  }, []);

  const saveProgress = useCallback((questionIndex: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, questionIndex.toString());
    }
  }, []);

  const loadProgress = useCallback((): number => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (stored) {
        const progress = parseInt(stored, 10);
        return isNaN(progress) ? 0 : progress;
      }
    }
    return 0;
  }, []);

  const saveShortcode = useCallback((shortCode: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SHORTCODE, shortCode);
    }
  }, []);

  const loadShortcode = useCallback((): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.SHORTCODE);
    }
    return null;
  }, []);

  const saveSurveyId = useCallback((surveyId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SURVEY_ID, surveyId);
    }
  }, []);

  const loadSurveyId = useCallback((): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.SURVEY_ID);
    }
    return null;
  }, []);

  const clearAll = useCallback(() => {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }, []);

  return {
    saveAnswers,
    loadAnswers,
    clearAnswers,
    saveProgress,
    loadProgress,
    saveShortcode,
    loadShortcode,
    saveSurveyId,
    loadSurveyId,
    clearAll
  };
};