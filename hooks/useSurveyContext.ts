"use client";
import { useState, useEffect } from 'react';
import { SurveyContext } from '@/types/survey';
import { getSurveyByShortCode, updateSurveyStatus } from '@/lib/amplify-client';
import { useSurveyStorage } from './useSurveyStorage';

export const useSurveyContext = () => {
  const [surveyContext, setSurveyContext] = useState<SurveyContext | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveSurveyId, saveShortcode } = useSurveyStorage();

  const initializeSurveyFromShortCode = async (shortCode: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const surveyData = await getSurveyByShortCode(shortCode);
      
      if (!surveyData) {
        setError(`Survey with shortcode "${shortCode}" not found`);
        return false;
      }
      
      const context: SurveyContext = {
        surveyId: surveyData.id,
        shortCode: shortCode,
        surveyData: surveyData
      };
      
      setSurveyContext(context);
      
      // Save to localStorage for persistence
      saveSurveyId(surveyData.id);
      saveShortcode(shortCode);
      
      // Update survey status to 'started' if it's still 'sent'
      if (surveyData.status === 'sent') {
        await updateSurveyStatus(surveyData.id, 'started');
      }
      
      return true;
    } catch (err) {
      console.error('Error initializing survey:', err);
      setError('Failed to load survey data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearSurveyContext = () => {
    setSurveyContext(null);
    setError(null);
  };

  return {
    surveyContext,
    loading,
    error,
    initializeSurveyFromShortCode,
    clearSurveyContext
  };
};