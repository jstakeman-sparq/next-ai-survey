"use client";
import React from 'react';

interface SurveyNavigationProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isSubmitting?: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const SurveyNavigation: React.FC<SurveyNavigationProps> = ({
  canGoBack,
  canGoNext,
  isLastQuestion,
  isSubmitting = false,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <button 
        onClick={onPrevious}
        disabled={!canGoBack}
        className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <button 
        onClick={onNext}
        disabled={!canGoNext || isSubmitting}
        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            {isLastQuestion ? 'View Results' : 'Next'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};