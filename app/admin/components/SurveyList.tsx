"use client"

import { useState, useEffect } from "react"

interface Survey {
  id: string
  title: string
  shortCode: string
  status: 'active' | 'inactive'
  createdAt: string
}

export default function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading surveys
    // TODO: Replace with actual Amplify GraphQL query
    const loadSurveys = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data for now
      setSurveys([
        {
          id: '1',
          title: 'AI Readiness Assessment Q1 2025',
          shortCode: 'ABC123',
          status: 'active',
          createdAt: '2025-01-15T10:00:00Z'
        },
        {
          id: '2', 
          title: 'Digital Transformation Survey',
          shortCode: 'XYZ789',
          status: 'inactive',
          createdAt: '2025-01-10T14:30:00Z'
        }
      ])
      setIsLoading(false)
    }

    loadSurveys()
  }, [])

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
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Surveys</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {surveys.map((survey) => (
          <li key={survey.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {survey.title}
                </h4>
                <p className="text-sm text-gray-500">
                  Short Code: <span className="font-mono font-medium">{survey.shortCode}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(survey.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  survey.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {survey.status}
                </span>
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