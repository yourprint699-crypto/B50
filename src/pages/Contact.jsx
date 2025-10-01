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
        {/* Two Column Grid - Perfect Symmetry */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-width-wide'>
          {/* Left Column - Contact Form */}
          <div className='contact-content flex flex-col'>
            <VideoInquiryForm />
          </div>

          {/* Right Column - Contact Information */}
          <div className='contact-content flex flex-col space-y-6 sm:space-y-8'>
            {/* Let's Connect Section */}
            <div className='floating-panel-dark flex-1 flex flex-col justify-between space-y-6'>
              <div>
                <h3 className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] text-layer-2 text-glow mb-6'>
                  Let's Connect
                </h3>
                <div className='space-y-5 font-[font1] text-responsive text-layer-1'>
                  <div className='flex items-center space-x-4 group transition-all duration-300 hover:translate-x-2'>
                    <span className='text-2xl micro-bounce glow-accent flex-shrink-0'>📧</span>
                    <a href="mailto:contact@amouraworks.com" className='interactive-hover break-all sm:break-normal'>
                      contact@amouraworks.com
                    </a>
                  </div>
                  <div className='flex items-center space-x-4 group transition-all duration-300 hover:translate-x-2'>
                    <span className='text-2xl micro-bounce glow-accent flex-shrink-0'>📍</span>
                    <span>22 ruelle du Clerc, 59126, Linselles (France)</span>
                  </div>
                  <div className='flex items-center space-x-4 group transition-all duration-300 hover:translate-x-2'>
                    <span className='text-2xl micro-bounce glow-accent flex-shrink-0'>🕒</span>
                    <span>M–F: 9am – 7pm (UTC+1)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Our Work Section */}
            <div className='floating-panel-dark space-y-6'>
              <h3 className='font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow text-center'>
                Follow Our Work
              </h3>
              <div className='flex justify-center space-x-6'>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='w-16 h-16 glass glass-hover glass-click rounded-2xl flex items-center justify-center group glow-accent transition-all duration-300 hover:scale-110 hover:rotate-6'
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className='text-3xl micro-bounce glow-accent'>
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time Section */}
            <div className='floating-panel-dark space-y-4'>
              <h4 className='font-[font2] text-xl uppercase text-[#D3FD50] text-layer-2 text-glow text-center'>
                Response Time
              </h4>
              <p className='font-[font1] text-responsive text-layer-1 leading-relaxed text-center'>
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