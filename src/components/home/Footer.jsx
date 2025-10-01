import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'

const Footer = () => {
  const footerRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    // Ensure footer content is visible by default, then animate
    gsap.set('.footer-content', { opacity: 1, y: 0 })
    
    // Simple fade-in animation that doesn't interfere with visibility
    gsap.fromTo('.footer-content',
      {
        opacity: 0.7,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
    
    // Fallback: ensure content is visible if ScrollTrigger doesn't fire
    const fallbackTimer = setTimeout(() => {
      gsap.set('.footer-content', { opacity: 1, y: 0 })
    }, 100)
    
    return () => clearTimeout(fallbackTimer)
  })

  const quickLinks = [
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms & Conditions', href: '#terms' },
    { name: 'Affiliates', href: '#affiliates' }
  ]

  return (
    <footer ref={footerRef} className='section-dark text-white relative depth-3'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-10 lg:pb-12'>
        {/* Footer Information Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-10 lg:mb-12' style={{ opacity: 1, visibility: 'visible' }}>
          {/* Quick Links */}
          <div className='footer-content floating-panel-dark space-y-4 sm:space-y-6' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2'>
              Quick Links
            </h3>
            <ul className='space-y-3 sm:space-y-4'>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('portfolio')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover text-left micro-bounce w-full text-left'
                >
                  Our Portfolio
                </button>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block'
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/affiliate-program"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block'
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Address */}
          <div className='footer-content floating-panel-dark space-y-4 sm:space-y-6' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'>
              Address
            </h3>
            <div className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 leading-relaxed space-y-1 sm:space-y-2'>
              <p>22 ruelle du Clerc</p>
              <p>59126, Linselles</p>
              <p>(France)</p>
            </div>
          </div>

          {/* Hours of Operation */}
          <div className='footer-content floating-panel-dark space-y-4 sm:space-y-6' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'>
              Hours
            </h3>
            <div className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 space-y-2 sm:space-y-3'>
              <p>M–F: 9am – 7pm (UTC+1)</p>
              <p>Saturday & Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className='footer-content floating-panel-dark space-y-4 sm:space-y-6' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'>
              Contact
            </h3>
            <div className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1'>
              <a 
                href="mailto:contact@amouraworks.com"
                target="_blank"
                rel="noopener noreferrer"
                className='interactive-hover micro-bounce break-all sm:break-normal'
              >
                contact@amouraworks.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className='floating-panel-dark text-center' style={{ opacity: 1, visibility: 'visible' }}>
          <div className='text-center'>
            <p className='font-[font1] text-xs sm:text-sm lg:text-base text-layer-1'>
              ©️ 2025 Amoura Works. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
