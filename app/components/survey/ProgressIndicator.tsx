"use client";
import React from 'react';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
  progress
}) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};