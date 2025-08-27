"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ErrorPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shortCode = searchParams.get('code');
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    switch (error) {
      case 'invalid_shortcode':
        return {
          title: 'Invalid Survey Code',
          message: shortCode 
            ? `The survey code "${shortCode}" was not found or has expired.`
            : 'The survey code was not found or has expired.',
          suggestions: [
            'Please verify the survey code with your administrator',
            'Check that you have the complete survey URL',
            'Contact support if you continue to experience issues'
          ]
        };
      case 'survey_completed':
        return {
          title: 'Survey Already Completed',
          message: 'This survey has already been completed and cannot be accessed again.',
          suggestions: [
            'Contact your administrator if you need to view the results',
            'Check if you have a different survey code to use'
          ]
        };
      case 'survey_expired':
        return {
          title: 'Survey Expired',
          message: 'This survey has expired and is no longer accepting responses.',
          suggestions: [
            'Contact your administrator about extending the survey deadline',
            'Request a new survey code if available'
          ]
        };
      default:
        return {
          title: 'Survey Error',
          message: 'An error occurred while loading the survey.',
          suggestions: [
            'Try refreshing the page',
            'Check your internet connection',
            'Contact support if the problem persists'
          ]
        };
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <h1 className="text-2xl md:text-3xl font-semibold">AI Readiness Assessment</h1>
        </div>
      </div>

      {/* Error Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg 
                className="h-8 w-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
              {errorInfo.title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              {errorInfo.message}
            </p>
          </div>

          {errorInfo.suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                What you can do:
              </h3>
              <ul className="space-y-2">
                {errorInfo.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2 text-blue-800">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Return to Home
              </button>
              
              <button
                onClick={() => router.refresh()}
                className="border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SurveyErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorPageContent />
    </Suspense>
  );
}