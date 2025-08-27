"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SurveyContext as SurveyContextType } from '@/types/survey';
import { useSurveyContext } from '@/hooks/useSurveyContext';

const SurveyContext = createContext<SurveyContextType | null>(null);

export const useSurveyContextProvider = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurveyContextProvider must be used within a SurveyProvider');
  }
  return context;
};

interface SurveyProviderProps {
  children: React.ReactNode;
  shortCode?: string;
}

const SurveyLoadingState: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
      <p className="text-gray-600">Loading survey...</p>
    </div>
  </div>
);

const SurveyErrorState: React.FC<{ error: string }> = ({ error }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        Return to Home
      </button>
    </div>
  </div>
);

const InvalidShortcodeError: React.FC<{ shortCode: string }> = ({ shortCode }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Survey Code Not Ready: </strong>
        <span className="block sm:inline">
          The survey code &quot;{shortCode}&quot; was not found. This might be because the survey hasn&apos;t been created yet.
        </span>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => window.location.href = '/survey/test'}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Test Survey
        </button>
        <button
          onClick={() => window.location.href = '/survey'}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Take Survey Without Code
        </button>
        <p className="text-sm text-gray-600">
          You can create a test survey or proceed without a survey code.
        </p>
      </div>
    </div>
  </div>
);

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ 
  children, 
  shortCode 
}) => {
  const { 
    surveyContext, 
    loading, 
    error, 
    initializeSurveyFromShortCode 
  } = useSurveyContext();
  
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (shortCode && !initialized) {
      initializeSurveyFromShortCode(shortCode).then(() => {
        setInitialized(true);
      });
    } else if (!shortCode) {
      setInitialized(true);
    }
  }, [shortCode, initializeSurveyFromShortCode, initialized]);

  if (!initialized || loading) {
    return <SurveyLoadingState />;
  }

  if (error) {
    return <SurveyErrorState error={error} />;
  }

  if (shortCode && !surveyContext) {
    return <InvalidShortcodeError shortCode={shortCode} />;
  }

  return (
    <SurveyContext.Provider value={surveyContext}>
      {children}
    </SurveyContext.Provider>
  );
};