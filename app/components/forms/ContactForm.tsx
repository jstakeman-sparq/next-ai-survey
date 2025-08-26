"use client"

import { useState } from 'react'

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
  onSuccess?: () => void
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  jobTitle?: string
  company?: string
  phoneNumber?: string
  state: string
  message?: string
}

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
]

export function ContactForm({ onSubmit, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    company: '',
    phoneNumber: '',
    state: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default behavior - log data and show success message
        console.log('Form data:', formData)
        alert('Thank you for your message! We\'ll get back to you soon.')
      }

      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        company: '',
        phoneNumber: '',
        state: '',
        message: ''
      })

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClassName = "w-full px-4 py-3 border-2 border-neutral-light-300 rounded-lg text-sm transition-all duration-300 bg-white text-brand-dark placeholder-neutral-dark-100 focus:outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          value={formData.firstName}
          onChange={handleChange}
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          value={formData.lastName}
          onChange={handleChange}
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={inputClassName}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <select
          name="state"
          required
          value={formData.state}
          onChange={handleChange}
          className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e')] bg-[length:14px_14px] bg-[position:right_10px_center] bg-no-repeat`}
          disabled={isSubmitting}
        >
          <option value="" disabled>Select Your State</option>
          {US_STATES.map(state => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Tell us about your project or how we can help..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClassName} resize-y min-h-[80px]`}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="flex justify-center">
          {/* Space for future reCAPTCHA integration */}
        </div>

        <div className="w-full sm:w-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 disabled:bg-neutral-light-400 disabled:cursor-not-allowed text-white border-none py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 min-w-[140px]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  )
}