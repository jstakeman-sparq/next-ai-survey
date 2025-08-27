"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SurveyProvider } from '@/app/components/survey/SurveyProvider';

const SurveyLandingContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shortCode, setShortCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    setShortCode(code);
  }, [searchParams]);

  const handleStartSurvey = () => {
    const url = shortCode 
      ? `/survey/question/1?code=${shortCode}`
      : '/survey/question/1';
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <h1 className="text-2xl md:text-3xl font-semibold">AI Readiness Assessment</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Discover Your AI Readiness
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our 6-question assessment to understand where your organization stands 
              on the AI readiness spectrum and get personalized recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">What You&apos;ll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Your current AI readiness cohort</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Specific areas for improvement</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Actionable next steps</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Conversation starters for your team</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Assessment Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>6 questions across key dimensions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Takes 5-8 minutes to complete</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Progress saved automatically</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Detailed results with PDF export</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartSurvey}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Start Assessment
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Your responses will be saved securely and can be resumed at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SurveyLanding() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SurveyLandingContent />
    </Suspense>
  );
}