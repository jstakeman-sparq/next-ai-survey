"use client";
import { useState, useEffect, useCallback } from 'react';
import { SurveyState, SurveyAnswers } from '@/types/survey';
import { TOTAL_QUESTIONS, isValidQuestionIndex } from '@/lib/survey-data';
import { useSurveyStorage } from './useSurveyStorage';

const initialState: SurveyState = {
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false
};

export const useSurvey = (initialShortCode?: string, initialSurveyId?: string) => {
  const [surveyState, setSurveyState] = useState<SurveyState>(() => ({
    ...initialState,
    shortCode: initialShortCode,
    surveyId: initialSurveyId
  }));

  const { 
    saveAnswers, 
    loadAnswers, 
    saveProgress, 
    loadProgress,
    loadShortcode,
    loadSurveyId
  } = useSurveyStorage();

  // Initialize survey state from localStorage on mount
  useEffect(() => {
    const storedAnswers = loadAnswers();
    const storedProgress = loadProgress();
    const storedShortcode = loadShortcode();
    const storedSurveyId = loadSurveyId();

    if (storedAnswers || storedProgress > 0 || storedShortcode || storedSurveyId) {
      setSurveyState(prev => ({
        ...prev,
        answers: storedAnswers || {},
        currentQuestionIndex: storedProgress,
        shortCode: initialShortCode || storedShortcode || undefined,
        surveyId: initialSurveyId || storedSurveyId || undefined,
        isComplete: Object.keys(storedAnswers || {}).length === TOTAL_QUESTIONS
      }));
    }
  }, [initialShortCode, initialSurveyId, loadAnswers, loadProgress, loadShortcode, loadSurveyId]);

  const updateAnswer = useCallback((questionId: number, answer: 'A' | 'B' | 'C' | 'D') => {
    setSurveyState(prev => {
      const newAnswers = { ...prev.answers, [questionId]: answer };
      const isComplete = Object.keys(newAnswers).length === TOTAL_QUESTIONS;
      
      // Save to localStorage
      saveAnswers(newAnswers);
      
      return {
        ...prev,
        answers: newAnswers,
        isComplete
      };
    });
  }, [saveAnswers]);

  const navigateToQuestion = useCallback((index: number) => {
    if (isValidQuestionIndex(index)) {
      setSurveyState(prev => {
        const newState = { ...prev, currentQuestionIndex: index };
        
        // Save progress to localStorage
        saveProgress(index);
        
        return newState;
      });
    }
  }, [saveProgress]);

  const nextQuestion = useCallback(() => {
    setSurveyState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex < TOTAL_QUESTIONS) {
        saveProgress(nextIndex);
        return { ...prev, currentQuestionIndex: nextIndex };
      }
      return prev;
    });
  }, [saveProgress]);

  const previousQuestion = useCallback(() => {
    setSurveyState(prev => {
      const prevIndex = prev.currentQuestionIndex - 1;
      if (prevIndex >= 0) {
        saveProgress(prevIndex);
        return { ...prev, currentQuestionIndex: prevIndex };
      }
      return prev;
    });
  }, [saveProgress]);

  const canNavigateNext = useCallback((): boolean => {
    const currentQuestionId = surveyState.currentQuestionIndex + 1;
    const currentAnswer = surveyState.answers[currentQuestionId];
    return !!currentAnswer;
  }, [surveyState.answers, surveyState.currentQuestionIndex]);

  const canNavigatePrevious = useCallback((): boolean => {
    return surveyState.currentQuestionIndex > 0;
  }, [surveyState.currentQuestionIndex]);

  const isLastQuestion = useCallback((): boolean => {
    return surveyState.currentQuestionIndex === TOTAL_QUESTIONS - 1;
  }, [surveyState.currentQuestionIndex]);

  const resetSurvey = useCallback(() => {
    setSurveyState(initialState);
  }, []);

  const setSurveyContext = useCallback((shortCode: string, surveyId: string) => {
    setSurveyState(prev => ({
      ...prev,
      shortCode,
      surveyId
    }));
  }, []);

  return {
    surveyState,
    updateAnswer,
    navigateToQuestion,
    nextQuestion,
    previousQuestion,
    canNavigateNext,
    canNavigatePrevious,
    isLastQuestion,
    resetSurvey,
    setSurveyContext
  };
};