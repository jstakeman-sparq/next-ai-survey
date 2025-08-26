"use client"

import { useState, useEffect } from "react"
import { generateShortCode } from "@/lib/short-code"

interface SurveyFormData {
  title: string
  description: string
  shortCode: string
  status: 'active' | 'inactive'
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<SurveyFormData>({
    title: '',
    description: '',
    shortCode: '',
    status: 'active'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Generate initial short code
  useEffect(() => {
    setFormData(prev => ({ ...prev, shortCode: generateShortCode() }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // For now, we'll just simulate the API call
      // TODO: Replace with actual Amplify GraphQL mutation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage({ type: 'success', text: 'Survey created successfully!' })
      setFormData({
        title: '',
        description: '',
        shortCode: generateShortCode(),
        status: 'active'
      })
    } catch (error) {
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
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Survey Title *
          </label>
          <input
            type="text"
            id="title"
            required
            minLength={3}
            maxLength={100}
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            placeholder="Enter survey title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            maxLength={500}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
            placeholder="Optional description for the survey"
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.description.length}/500 characters
          </p>
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

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
          disabled={isSubmitting || !formData.title.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Survey'}
        </button>
      </form>
    </div>
  )
}