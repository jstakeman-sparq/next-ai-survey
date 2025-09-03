"use client"

import { useState, useEffect } from "react"
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '@/amplify/data/resource'
import outputs from '@/amplify_outputs.json'
import { useSession } from "../../hooks/useSession"
import { determineCohort } from "@/lib/cohort-analysis"
import type { SurveyAnswers } from "@/types/survey"

// Configure Amplify
Amplify.configure(outputs)
const client = generateClient<Schema>()

// Debug logging for configuration
console.log('🔧 Amplify Configuration:', {
  dataUrl: outputs.data?.url,
  region: outputs.data?.aws_region,
  hasApiKey: !!outputs.data?.api_key,
  defaultAuthType: outputs.data?.default_authorization_type
})

interface Survey {
  id: string
  title: string
  type?: string
  shortCode: string
  status: 'sent' | 'started' | 'completed'
  createdAt: string
  createdBy: string
  createdFor: string
  companyName: string
  cohortResult?: string
}

export default function SurveyList() {
  const { session } = useSession()
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingSurveyId, setDeletingSurveyId] = useState<string | null>(null)
  
  const adminEmails = ['jackson.stakeman@teamsparq.com', 'derek.perry@teamsparq.com']
  const userEmail = session?.user?.email?.toLowerCase()
  const isAdmin = userEmail && adminEmails.map(email => email.toLowerCase()).includes(userEmail)
  const listTitle = isAdmin ? "Recent Surveys" : "Your Recent Surveys"

  const deleteSurvey = async (surveyId: string) => {
    if (!window.confirm('Are you sure you want to delete this survey? This action cannot be undone.')) {
      return
    }

    try {
      setDeletingSurveyId(surveyId)
      console.log('🗑️ Deleting survey:', surveyId)
      
      const { errors } = await client.models.Survey.delete({ id: surveyId })
      
      if (errors) {
        console.error('❌ Error deleting survey:', errors)
        alert('Failed to delete survey. Please try again.')
        return
      }
      
      console.log('✅ Survey deleted successfully')
      // Remove the survey from the local state
      setSurveys(prev => prev.filter(survey => survey.id !== surveyId))
      
    } catch (err) {
      console.error('💥 Error deleting survey:', err)
      alert('Failed to delete survey. Please try again.')
    } finally {
      setDeletingSurveyId(null)
    }
  }

  const loadSurveys = async () => {
    try {
      console.log('🔍 Starting survey fetch...')
      console.log('🔍 Session state:', { session, userEmail, isAdmin, adminEmails })
      setIsLoading(true)
      setError(null)
      
      console.log('📡 Calling client.models.Survey.list()...')
      console.log('🌐 Network connectivity check...', navigator.onLine ? 'Online' : 'Offline')
      
      const startTime = Date.now()
      const { data: surveyData, errors } = await client.models.Survey.list()
      const endTime = Date.now()
      
      console.log('⏱️ API call took:', endTime - startTime, 'ms')
      
      console.log('📊 Raw survey data received:', {
        dataCount: surveyData?.length || 0,
        hasErrors: !!errors,
        errors: errors
      })
      
      if (errors) {
        console.error('❌ GraphQL errors:', errors)
        setError('Failed to load surveys')
        return
      }

      console.log('📋 Full survey data:', surveyData)

      // Transform the data to match our interface
      const transformedSurveys: Survey[] = await Promise.all(
        surveyData.map(async (survey) => {
          let cohortResult: string | undefined;
          
          // For completed surveys, fetch responses and calculate cohort
          if (survey.status === 'completed') {
            try {
              const { data: responses } = await client.models.SurveyResponse.list({
                filter: { surveyId: { eq: survey.id } }
              });
              
              if (responses && responses.length > 0) {
                const responseData = responses[0];
                const answers = responseData.responses as SurveyAnswers;
                const cohort = determineCohort(answers);
                cohortResult = cohort.name;
                console.log('📊 Calculated cohort for survey:', survey.id, cohortResult);
              }
            } catch (error) {
              console.error('❌ Error fetching responses for survey:', survey.id, error);
            }
          }
          
          return {
            id: survey.id,
            title: survey.title || '',
            type: survey.type || undefined,
            shortCode: survey.shortCode || '',
            status: (survey.status as 'sent' | 'started' | 'completed') || 'sent',
            createdAt: survey.createdAt,
            createdBy: survey.createdBy || 'Unknown',
            createdFor: survey.createdFor || 'Unknown',
            companyName: survey.companyName || 'Unknown',
            cohortResult
          };
        })
      )

      console.log('✅ Transformed surveys:', {
        count: transformedSurveys.length,
        surveys: transformedSurveys
      })

      // Filter surveys by user email unless user is admin
      const filteredSurveys = isAdmin 
        ? transformedSurveys 
        : transformedSurveys.filter(survey => survey.createdBy?.toLowerCase() === userEmail)

      console.log('🔍 Filtered surveys:', {
        isAdmin,
        userEmail,
        adminEmails,
        originalCount: transformedSurveys.length,
        filteredCount: filteredSurveys.length,
        allCreatedByValues: transformedSurveys.map(s => s.createdBy),
        filteredSurveys: filteredSurveys
      })

      setSurveys(filteredSurveys)
    } catch (err) {
      console.error('💥 Error loading surveys:', err)
      setError('Failed to load surveys')
    } finally {
      setIsLoading(false)
      console.log('🏁 Survey fetch complete')
    }
  }

  useEffect(() => {
    if (session) {
      loadSurveys()
    }
  }, [session])

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 14.5c-.77.833-.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading surveys</h3>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    )
  }

  if (surveys.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No surveys</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating your first survey.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{listTitle}</h3>
        <button
          onClick={() => loadSurveys()}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <svg
            className={`-ml-0.5 mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {surveys.map((survey) => (
          <li key={survey.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {survey.title}
                </h4>
                <p className="text-sm font-medium text-blue-700">
                  {survey.companyName}
                </p>
                {survey.type && (
                  <p className="text-sm text-gray-600">
                    Type: {survey.type}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Short Code: <span className="font-mono font-medium">{survey.shortCode}</span>
                </p>
                {survey.status === 'completed' && survey.cohortResult && (
                  <p className="text-sm font-medium text-indigo-700">
                    Result: {survey.cohortResult}
                  </p>
                )}
                <div className="flex space-x-4 text-xs text-gray-400">
                  <span>From: {survey.createdBy}</span>
                  <span>To: {survey.createdFor}</span>
                </div>
                <p className="text-xs text-gray-400">
                  Created: {new Date(survey.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  survey.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : survey.status === 'started'
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {survey.status}
                </span>
                {isAdmin && (
                  <button
                    onClick={() => deleteSurvey(survey.id)}
                    disabled={deletingSurveyId === survey.id}
                    className="text-red-400 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete survey"
                  >
                    {deletingSurveyId === survey.id ? (
                      <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}