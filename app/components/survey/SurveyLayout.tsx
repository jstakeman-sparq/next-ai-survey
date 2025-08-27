"use client";
import React from 'react';
import { ProgressIndicator } from './ProgressIndicator';

interface SurveyLayoutProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  children: React.ReactNode;
  onBackToHome?: () => void;
}

export const SurveyLayout: React.FC<SurveyLayoutProps> = ({
  currentQuestion,
  totalQuestions,
  progress,
  children,
  onBackToHome
}) => {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="text-orange-500 hover:text-orange-400 transition-colors"
                title="Back to Home"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-semibold">AI Readiness Assessment</h1>
          </div>
          <div className="text-sm text-gray-300">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressIndicator 
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        progress={progress}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {children}
      </div>
    </section>
  );
};