import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PageWrapper from '../components/common/PageWrapper'
import VideoInquiryForm from '../components/forms/VideoInquiryForm'
import FAQSection from '../components/common/FAQSection'

const Contact = () => {


  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/Amouraworks', icon: '📷' },
    { name: 'Facebook', url: 'https://facebook.com/Amouraworks', icon: '📘' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/Amouraworks', icon: '💼' }
  ]

  return (
    <PageWrapper className='section-dark text-white'>
      <div className="cinematic-overlay"></div>
      {/* Header */}
      <div className='pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 flex flex-col items-center justify-center text-center container mx-auto'>
        <h1 className='contact-content font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
          Contact Us
        </h1>
        <div className='floating-panel-dark max-width-content mx-auto'>
          <p className='contact-content font-[font1] text-responsive leading-relaxed text-layer-2'>
        The first step to your perfect film is a simple hello. Reach out to us today
          </p>
        </div>
      </div>

      <div className='container mx-auto pb-16 sm:pb-24 lg:pb-32'>
        <div className='responsive-grid-2 max-width-wide'>
          {/* Contact Form */}
          <div className='contact-content'>
            <VideoInquiryForm />
          </div>

          {/* Contact Information */}
          <div className='space-y-6 sm:space-y-8 lg:space-y-10'>
            <div className='contact-content floating-panel-dark space-y-4 sm:space-y-6'>
              <h3 className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] text-layer-2 text-glow'>
                Let's Connect
              </h3>
              <div className='space-y-4 sm:space-y-5 font-[font1] text-responsive text-layer-1'>
                <div className='flex items-start sm:items-center space-x-3 sm:space-x-4'>
                  <span className='text-xl sm:text-2xl micro-bounce glow-accent flex-shrink-0'>📧</span>
                  <a href="mailto:contact@amouraworks.com" className='interactive-hover break-all sm:break-normal'>
                    contact@amouraworks.com
                  </a>
                </div>
                <div className='flex items-start sm:items-center space-x-3 sm:space-x-4'>
                  <span className='text-xl sm:text-2xl micro-bounce glow-accent flex-shrink-0'>📍</span>
                  <span>22 ruelle du Clerc, 59126, Linselles (France)</span>
                </div>
                <div className='flex items-start sm:items-center space-x-3 sm:space-x-4'>
                  <span className='text-xl sm:text-2xl micro-bounce glow-accent flex-shrink-0'>🕒</span>
                  <span>M–F: 9am – 7pm (UTC+1)</span>
                </div>
              </div>
            </div>

            <div className='contact-content floating-panel-dark space-y-4 sm:space-y-6'>
              <h3 className='font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow'>
                Follow Our Work
              </h3>
              <div className='flex justify-center sm:justify-start space-x-4 sm:space-x-6'>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 glass glass-hover glass-click rounded-full flex items-center justify-center group glow-accent'
                  >
                    <span className='text-lg sm:text-2xl lg:text-3xl micro-bounce glow-accent'>
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className='contact-content floating-panel-dark'>
              <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'>
                  Response Time
              </h4>
              <p className='font-[font1] text-responsive text-layer-1 leading-relaxed'>
                  Nous répondons à toutes les demandes dans les 24 heures. Pour les urgences, n'hésitez pas à nous appeler directement.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='max-width-wide mx-auto mt-16 sm:mt-20 lg:mt-24'>
          <FAQSection />
        </div>
      </div>
    </PageWrapper>
  )
}

export default Contact