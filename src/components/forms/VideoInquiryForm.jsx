import { useState } from 'react'

const VideoInquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    location: '',
    projectType: '',
    projectDetails: '',
    sampleVideoLink: '',
    preferredTimeline: '',
    budget: '',
    consentGiven: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const projectTypes = [
    'Wedding',
    'Event',
    'Short Film',
    'Social Media / Marketing Video',
    'Other'
  ]

  const timelines = [
    'ASAP',
    '1–2 weeks',
    '3–4 weeks',
    'Flexible'
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type'
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required'
    }

    if (formData.sampleVideoLink.trim()) {
      try {
        new URL(formData.sampleVideoLink)
      } catch {
        newErrors.sampleVideoLink = 'Please enter a valid URL'
      }
    }

    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must agree to share your project details'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          location: '',
          projectType: '',
          projectDetails: '',
          sampleVideoLink: '',
          preferredTimeline: '',
          budget: '',
          consentGiven: false
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='floating-panel-dark'>
      <h2 className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] mb-6 sm:mb-8 lg:mb-10 text-layer-2 text-glow'>
        Inquire Now
      </h2>

      {submitStatus === 'success' && (
        <div className='success-state mb-6 sm:mb-8'>
          <p className='font-[font2] text-base sm:text-lg'>
            Thank you for your inquiry! We will review your project details and provide a custom quote within 24-48 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className='error-state mb-6 sm:mb-8'>
          <p className='font-[font2] text-base sm:text-lg'>
            Sorry, there was an error sending your inquiry. Please try again or contact us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
        {/* Full Name */}
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full input-inset text-white placeholder:text-gray-400 ${
              errors.fullName ? 'border-red-500' : ''
            }`}
            aria-label="Full Name"
            aria-required="true"
          />
          {errors.fullName && (
            <p className='text-red-400 text-sm mt-2 font-[font1]'>{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full input-inset text-white placeholder:text-gray-400 ${
              errors.email ? 'border-red-500' : ''
            }`}
            aria-label="Email Address"
            aria-required="true"
          />
          {errors.email && (
            <p className='text-red-400 text-sm mt-2 font-[font1]'>{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400'
          aria-label="Phone Number"
        />

        {/* Company / Brand Name */}
        <input
          type="text"
          name="companyName"
          placeholder="Company / Brand Name"
          value={formData.companyName}
          onChange={handleChange}
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400'
          aria-label="Company or Brand Name"
        />

        {/* Location */}
        <div>
          <input
            type="text"
            name="location"
            placeholder="City, State / County (e.g., Windham, ME or London, Greater London)"
            value={formData.location}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full input-inset text-white placeholder:text-gray-400 ${
              errors.location ? 'border-red-500' : ''
            }`}
            aria-label="Location"
            aria-required="true"
          />
          {errors.location && (
            <p className='text-red-400 text-sm mt-2 font-[font1]'>{errors.location}</p>
          )}
        </div>

        {/* Project Type */}
        <div>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full input-inset text-white ${
              !formData.projectType ? 'text-gray-400' : ''
            } ${errors.projectType ? 'border-red-500' : ''}`}
            aria-label="Project Type"
            aria-required="true"
          >
            <option value="">Project Type *</option>
            {projectTypes.map(type => (
              <option key={type} value={type} className='text-white bg-[#0a0f1c]'>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className='text-red-400 text-sm mt-2 font-[font1]'>{errors.projectType}</p>
          )}
        </div>

        {/* Project Details / Vision */}
        <div>
          <textarea
            name="projectDetails"
            placeholder="Describe your footage, style, preferred edit type, and any inspiration references."
            value={formData.projectDetails}
            onChange={handleChange}
            rows="5"
            disabled={isSubmitting}
            className={`w-full input-inset text-white placeholder:text-gray-400 resize-none ${
              errors.projectDetails ? 'border-red-500' : ''
            }`}
            aria-label="Project Details and Vision"
            aria-required="true"
          />
          {errors.projectDetails && (
            <p className='text-red-400 text-sm mt-2 font-[font1]'>{errors.projectDetails}</p>
          )}
        </div>

        {/* Sample Video Link */}
        <div>
          <input
            type="url"
            name="sampleVideoLink"
            placeholder="Paste your video link (YouTube, Vimeo, Google Drive, etc.)"
            value={formData.sampleVideoLink}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full input-inset text-white placeholder:text-gray-400 ${
              errors.sampleVideoLink ? 'border-red-500' : ''
            }`}
            aria-label="Sample Video Link"
          />
          {errors.sampleVideoLink && (
            <p className='text-red-400 text-sm mt-2 font-[font1]'>{errors.sampleVideoLink}</p>
          )}
        </div>

        {/* Preferred Timeline */}
        <select
          name="preferredTimeline"
          value={formData.preferredTimeline}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full input-inset text-white ${
            !formData.preferredTimeline ? 'text-gray-400' : ''
          }`}
          aria-label="Preferred Timeline"
        >
          <option value="">Preferred Timeline</option>
          {timelines.map(timeline => (
            <option key={timeline} value={timeline} className='text-white bg-[#0a0f1c]'>
              {timeline}
            </option>
          ))}
        </select>

        {/* Budget */}
        <input
          type="text"
          name="budget"
          placeholder="Budget (Optional)"
          value={formData.budget}
          onChange={handleChange}
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400'
          aria-label="Budget"
        />

        {/* Consent Checkbox */}
        <div className='space-y-2'>
          <label className='flex items-start gap-3 cursor-pointer group'>
            <input
              type="checkbox"
              name="consentGiven"
              checked={formData.consentGiven}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`mt-1 w-5 h-5 rounded border-2 ${
                errors.consentGiven ? 'border-red-500' : 'border-white/20'
              } bg-white/5 checked:bg-[#D3FD50] checked:border-[#D3FD50] transition-all cursor-pointer focus:ring-2 focus:ring-[#D3FD50] focus:ring-offset-2 focus:ring-offset-black`}
              aria-required="true"
            />
            <span className='font-[font1] text-sm sm:text-base text-white/80 leading-relaxed flex-1'>
              I agree to share my footage and project details for review. I understand we will provide a custom quote after reviewing my submission. *
            </span>
          </label>
          {errors.consentGiven && (
            <p className='text-red-400 text-sm font-[font1] ml-8'>{errors.consentGiven}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className='w-full btn-pill btn-primary h-12 sm:h-14 lg:h-16 font-[font2] text-base sm:text-xl lg:text-2xl disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label="Send Inquiry"
        >
          <span className='pointer-events-none'>
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </span>
        </button>
      </form>
    </div>
  )
}

export default VideoInquiryForm
