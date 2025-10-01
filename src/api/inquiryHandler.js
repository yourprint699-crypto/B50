/**
 * Video Inquiry API Handler
 *
 * This module provides functions to handle video editing inquiry submissions.
 * When Supabase is configured, it will store inquiries in the database.
 * For now, it provides a demonstration endpoint structure.
 */

export const submitInquiry = async (inquiryData) => {
  try {
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'location', 'projectType', 'projectDetails', 'consentGiven']

    for (const field of requiredFields) {
      if (!inquiryData[field]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inquiryData.email)) {
      throw new Error('Invalid email format')
    }

    // Validate sample video link if provided
    if (inquiryData.sampleVideoLink) {
      try {
        new URL(inquiryData.sampleVideoLink)
      } catch {
        throw new Error('Invalid video link URL')
      }
    }

    // Validate consent
    if (!inquiryData.consentGiven) {
      throw new Error('Consent is required')
    }

    // TODO: When Supabase is configured, insert into database:
    // const { data, error } = await supabase
    //   .from('video_inquiries')
    //   .insert([{
    //     full_name: inquiryData.fullName,
    //     email: inquiryData.email,
    //     phone: inquiryData.phone || '',
    //     company_name: inquiryData.companyName || '',
    //     location: inquiryData.location,
    //     project_type: inquiryData.projectType,
    //     project_details: inquiryData.projectDetails,
    //     sample_video_link: inquiryData.sampleVideoLink || '',
    //     preferred_timeline: inquiryData.preferredTimeline || 'Flexible',
    //     budget: inquiryData.budget || '',
    //     consent_given: inquiryData.consentGiven,
    //   }])
    //
    // if (error) throw error

    // For now, log the inquiry data (in production, this would be saved to database)
    console.log('Video Inquiry Received:', {
      timestamp: new Date().toISOString(),
      ...inquiryData
    })

    return {
      success: true,
      message: 'Inquiry submitted successfully'
    }
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return {
      success: false,
      message: error.message || 'Failed to submit inquiry'
    }
  }
}

/**
 * Retrieve all inquiries (admin only)
 * TODO: Implement when Supabase auth is configured
 */
export const getInquiries = async () => {
  // TODO: When Supabase is configured:
  // const { data, error } = await supabase
  //   .from('video_inquiries')
  //   .select('*')
  //   .order('created_at', { ascending: false })
  //
  // if (error) throw error
  // return data

  return []
}

/**
 * Update inquiry status (admin only)
 * TODO: Implement when Supabase auth is configured
 */
export const updateInquiryStatus = async (inquiryId, status) => {
  // TODO: When Supabase is configured:
  // const { data, error } = await supabase
  //   .from('video_inquiries')
  //   .update({ status })
  //   .eq('id', inquiryId)
  //
  // if (error) throw error
  // return data

  console.log(`Inquiry ${inquiryId} status updated to: ${status}`)
  return { success: true }
}
