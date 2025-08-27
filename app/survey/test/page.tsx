"use client";
import React, { useState } from 'react';
import { createSurvey } from '@/lib/amplify-client';

export default function TestSurveyCreation() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateTestSurvey = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const testSurvey = {
        title: "AI Readiness Assessment Test",
        shortCode: "TEST123",
        createdBy: "test@example.com",
        createdFor: "testclient@example.com", 
        companyName: "Test Company Inc"
      };

      const result = await createSurvey(testSurvey);
      setMessage(`Test survey created successfully! Survey ID: ${result?.id}`);
      console.log('Created survey:', result);
    } catch (error) {
      console.error('Error creating test survey:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Test Survey Creation</h1>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Click the button below to create a test survey with shortcode &quot;TEST123&quot;.
            </p>
            
            <button
              onClick={handleCreateTestSurvey}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Creating...' : 'Create Test Survey'}
            </button>
            
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('Error') 
                  ? 'bg-red-100 text-red-700 border border-red-300' 
                  : 'bg-green-100 text-green-700 border border-green-300'
              }`}>
                {message}
              </div>
            )}
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Test URLs:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Survey with shortcode:</strong>{' '}
                  <a 
                    href="/survey?code=TEST123" 
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /survey?code=TEST123
                  </a>
                </li>
                <li>
                  <strong>Direct to question:</strong>{' '}
                  <a 
                    href="/survey/question/1?code=TEST123" 
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /survey/question/1?code=TEST123
                  </a>
                </li>
                <li>
                  <strong>Survey without shortcode:</strong>{' '}
                  <a 
                    href="/survey" 
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /survey
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}