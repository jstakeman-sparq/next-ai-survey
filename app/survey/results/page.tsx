"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSurveyStorage } from '@/hooks/useSurveyStorage';
import { determineCohort } from '@/lib/cohort-analysis';
import { cohortDefinitions, getDimensionNames } from '@/lib/cohort-definitions';
import { SurveyAnswers, CohortResult } from '@/types/survey';

const ResultsPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shortCode = searchParams.get('code');
  
  const [cohortResult, setCohortResult] = useState<CohortResult | null>(null);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { loadAnswers, clearAll } = useSurveyStorage();

  useEffect(() => {
    console.log('Results page useEffect running...', Date.now());
    
    // Add a small delay to ensure localStorage is fully synced
    const timeoutId = setTimeout(() => {
      const storedAnswers = loadAnswers();
      console.log('Loaded answers from localStorage:', storedAnswers);
      console.log('Number of answers:', storedAnswers ? Object.keys(storedAnswers).length : 0);
      
      // Additional debugging - check raw localStorage
      if (typeof window !== 'undefined') {
        const rawAnswers = localStorage.getItem('aiReadinessAnswers');
        console.log('Raw localStorage value:', rawAnswers);
      }
      
      if (!storedAnswers || Object.keys(storedAnswers).length === 0) {
        console.log('No answers found, redirecting to survey');
        // No answers found, redirect to survey
        const url = shortCode ? `/survey?code=${shortCode}` : '/survey';
        router.push(url);
        return;
      }

      console.log('Answers found, processing results...');

      try {
        const result = determineCohort(storedAnswers);
        setCohortResult(result);
        setAnswers(storedAnswers);
        
        // Clear localStorage after successfully loading answers
        clearAll();
        
        setLoading(false);
      } catch (err) {
        console.error('Error analyzing cohort:', err);
        setError('Failed to analyze survey results');
        setLoading(false);
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timeoutId);
  }, [shortCode]); // Simplified dependencies


  const handleBackToSurvey = () => {
    const url = shortCode ? `/survey/question/6?code=${shortCode}` : '/survey/question/6';
    router.push(url);
  };

  const handleGeneratePDF = () => {
    // TODO: Implement PDF generation
    alert('PDF generation will be implemented in the next phase');
  };

  const handleEmailReport = () => {
    // TODO: Implement email functionality
    alert('Email functionality will be implemented in the next phase');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your responses...</p>
          <p className="text-sm text-gray-500 mt-2">
            Debug: Checking localStorage for answers...
          </p>
        </div>
      </div>
    );
  }

  if (error || !cohortResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || 'Failed to load results'}
          </div>
          <button
            onClick={() => router.push(shortCode ? `/survey?code=${shortCode}` : '/survey')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Return to Survey
          </button>
        </div>
      </div>
    );
  }

  const cohortInfo = cohortDefinitions[cohortResult.name];
  const dimensions = getDimensionNames();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToSurvey}
              className="text-orange-500 hover:text-orange-400 transition-colors"
              title="Back to Survey"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl md:text-2xl font-semibold">Assessment Results</h1>
          </div>
          <div className="text-sm text-gray-300">
            Assessment Complete
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {/* AI Cohort Result */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              AI Readiness Assessment Result
            </h2>
            <p className="text-lg text-gray-600">
              Based on the responses across six key dimensions
            </p>
          </div>

          {/* Cohort Display */}
          <div className="text-center mb-8">
            <div className={`bg-${cohortInfo.color}-50 border-2 border-${cohortInfo.color}-200 rounded-2xl p-8 mb-6`}>
              <div className="flex flex-col items-center">
                <div dangerouslySetInnerHTML={{ __html: cohortInfo.icon }} />
                <h3 className={`text-3xl font-bold text-${cohortInfo.color}-700 mt-4 mb-2`}>
                  {cohortResult.name}
                </h3>
                <p className={`text-lg text-${cohortInfo.color}-600 text-center max-w-2xl`}>
                  {cohortInfo.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{cohortResult.distribution.A}</div>
                <div className="text-sm text-gray-500">A Responses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{cohortResult.distribution.B}</div>
                <div className="text-sm text-gray-500">B Responses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{cohortResult.distribution.C}</div>
                <div className="text-sm text-gray-500">C Responses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{cohortResult.distribution.D}</div>
                <div className="text-sm text-gray-500">D Responses</div>
              </div>
            </div>
          </div>

          {/* Response Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {dimensions.map((dimension, index) => {
                const questionId = index + 1;
                const answer = answers[questionId];
                return (
                  <div key={dimension} className="p-4 bg-white rounded-lg">
                    <div className="font-semibold text-sm text-gray-600 mb-1">{dimension}</div>
                    <div className="text-lg font-bold text-gray-900">Answer {answer}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-orange-500 text-white rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Recommended Next Steps</h3>
            <ul className="space-y-3 mb-6">
              {cohortInfo.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-xl font-semibold mb-3">Conversation Starters</h4>
            <ul className="space-y-2">
              {cohortInfo.conversationStarters.map((starter, index) => (
                <li key={index} className="italic text-gray-100">{starter}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Next Steps</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={handleGeneratePDF}
              className="flex items-center justify-center bg-orange-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate PDF Report
            </button>
            
            <button
              onClick={handleEmailReport}
              className="flex items-center justify-center border-2 border-orange-500 text-orange-500 px-6 py-4 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Report
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push(shortCode ? `/survey?code=${shortCode}` : '/survey')}
                className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Take Another Assessment
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultsPageWrapper: React.FC = () => {
  // Results page doesn't need SurveyProvider since it gets data from localStorage
  // But we still need to pass shortCode to ResultsPageContent
  return <ResultsPageContent />;
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsPageWrapper />
    </Suspense>
  );
}