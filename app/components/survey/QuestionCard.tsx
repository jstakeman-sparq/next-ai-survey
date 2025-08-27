"use client";
import React from 'react';
import { SurveyQuestion } from '@/types/survey';

interface QuestionCardProps {
  question: SurveyQuestion;
  selectedValue?: 'A' | 'B' | 'C' | 'D';
  onAnswerSelect: (value: 'A' | 'B' | 'C' | 'D') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedValue,
  onAnswerSelect
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
      <div className="mb-8">
        <div className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3">
          {question.dimension}
        </div>
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
          {question.question}
        </h2>
      </div>
      
      <div className="space-y-4">
        {question.options.map(option => {
          const isSelected = selectedValue === option.value;
          
          return (
            <label 
              key={option.value}
              className={`block p-6 border-2 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <input 
                  type="radio" 
                  name={`question-${question.id}`} 
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onAnswerSelect(option.value)}
                  className="mt-1 h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-900 mb-2">
                    ({option.value}) {option.text}
                  </div>
                  <div className="text-gray-600">
                    {option.description}
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};