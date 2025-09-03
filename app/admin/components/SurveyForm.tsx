"use client"

import { useState, useEffect } from "react"
import { generateShortCode } from "@/lib/short-code"
import { useSession } from "../../hooks/useSession"

interface SurveyFormData {
  shortCode: string
  createdBy: string
  createdFor: string
  companyName: string
}

interface SurveyFormProps {
  onSurveyCreated?: () => void
}

export default function SurveyForm({ onSurveyCreated }: SurveyFormProps) {
  const { session, loading } = useSession()
  const [formData, setFormData] = useState<SurveyFormData>({
    shortCode: '',
    createdBy: '',
    createdFor: '',
    companyName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  console.log('[SurveyForm] Component rendered with session:', session, 'loading:', loading)

  // Generate initial short code and pre-fill createdBy with session email
  useEffect(() => {
    console.log('[SurveyForm] useEffect triggered with session:', session)
    setFormData(prev => ({
      ...prev,
      shortCode: generateShortCode(),
      createdBy: session?.user?.email || ''
    }))
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const { Amplify } = await import('aws-amplify')
      const { generateClient } = await import('aws-amplify/data')
      const outputs = await import('@/amplify_outputs.json')
      
      // Configure Amplify
      Amplify.configure(outputs.default)
      const client = generateClient({
        authMode: 'apiKey',
      })

      const { errors } = await (client.models as any).Survey.create({
        title: '2025 AI Readiness Survey',
        type: '2025AIReadinessSurvey',
        shortCode: formData.shortCode,
        status: 'sent',
        createdBy: formData.createdBy,
        createdFor: formData.createdFor,
        companyName: formData.companyName
      })

      if (errors) {
        console.error('GraphQL errors:', errors)
        setMessage({ type: 'error', text: 'Failed to create survey. Please try again.' })
        return
      }
      
      const surveyUrl = `${window.location.origin}/survey?code=${formData.shortCode}`
      setMessage({ type: 'success', text: `Survey created successfully! Survey URL: ${surveyUrl}` })
      setFormData({
        shortCode: generateShortCode(),
        createdBy: session?.user?.email || '',
        createdFor: '',
        companyName: ''
      })
      
      // Call the callback to refresh the survey list
      onSurveyCreated?.()
    } catch (error) {
      console.error('Error creating survey:', error)
      setMessage({ type: 'error', text: 'Failed to create survey. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegenerateCode = () => {
    setFormData(prev => ({ ...prev, shortCode: generateShortCode() }))
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-1">Survey Details</h3>
          <p className="text-sm text-blue-700">Title: 2025 AI Readiness Survey</p>
          <p className="text-sm text-blue-700">Type: AI Readiness Assessment</p>
          <p className="text-sm text-blue-700">Status: Will be set to "Sent" upon creation</p>
        </div>

        <div>
          <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">
            Created By (Email) *
          </label>
          <input
            type="email"
            id="createdBy"
            required
            value={formData.createdBy}
            onChange={(e) => setFormData(prev => ({ ...prev, createdBy: e.target.value }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            placeholder="admin@company.com"
          />
        </div>

        <div>
          <label htmlFor="createdFor" className="block text-sm font-medium text-gray-700">
            Created For (Email) *
          </label>
          <input
            type="email"
            id="createdFor"
            required
            value={formData.createdFor}
            onChange={(e) => setFormData(prev => ({ ...prev, createdFor: e.target.value }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            placeholder="recipient@company.com"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            required
            maxLength={100}
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700">
            Short Code
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="shortCode"
              value={formData.shortCode}
              readOnly
              className="block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border bg-gray-50 font-mono"
            />
            <button
              type="button"
              onClick={handleRegenerateCode}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-1 text-sm"
            >
              Regenerate
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            6-character alphanumeric code for survey access
          </p>
        </div>


        {message && (
          <div className={`rounded-md p-4 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !formData.createdBy.trim() || !formData.createdFor.trim() || !formData.companyName.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Survey'}
        </button>
      </form>
    </div>
  )
}