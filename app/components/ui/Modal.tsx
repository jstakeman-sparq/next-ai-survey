"use client"

import { useEffect, useRef } from 'react'
import { ContactForm, ContactFormData } from '../forms/ContactForm'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: ContactFormData) => void
}

export function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  const handleFormSuccess = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-brand-dark bg-opacity-75 transition-opacity"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          ref={modalRef}
          className="bg-brand-light rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative border border-neutral-light-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-brand-dark hover:text-brand-orange text-3xl font-bold z-10 transition-colors duration-200"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Modal Header */}
          <div className="px-8 pt-8 pb-6 border-b border-neutral-light-300">
            <h2
              id="modal-title"
              className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-dark mb-4 leading-tight"
            >
              Let's Connect
            </h2>
            <p className="text-lg text-brand-dark opacity-80">
              Ready to accelerate your product development? Let's discuss how Sparq
              can help you ship smarter, not just faster.
            </p>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-6">
            <ContactForm onSubmit={onSubmit} onSuccess={handleFormSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}