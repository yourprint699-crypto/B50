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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 lg:gap-20 mb-12 sm:mb-16 lg:mb-20 relative' style={{ opacity: 1, visibility: 'visible' }}>
          {/* Vertical dividers for desktop */}
          <div className='hidden lg:block absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent'></div>
          <div className='hidden lg:block absolute inset-y-0 left-2/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent'></div>
          <div className='hidden lg:block absolute inset-y-0 left-3/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent'></div>

          {/* Quick Links */}
          <div className='footer-content space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] tracking-wider font-bold'>
              Quick Links
            </h3>
            <ul className='space-y-4 sm:space-y-5 w-full'>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('portfolio')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className='footer-link font-[font1] text-base sm:text-lg lg:text-xl text-white/80 hover:text-[#D3FD50] transition-colors duration-300 relative group w-full text-center lg:text-left'
                >
                  Our Portfolio
                </button>
              </li>
              <li>
                <Link
                  to="/contact"
                  className='footer-link font-[font1] text-base sm:text-lg lg:text-xl text-white/80 hover:text-[#D3FD50] transition-colors duration-300 relative group block'
                >
                  <span className='relative'>
                    Contact
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#D3FD50] group-hover:w-full transition-all duration-300'></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className='footer-link font-[font1] text-base sm:text-lg lg:text-xl text-white/80 hover:text-[#D3FD50] transition-colors duration-300 relative group block'
                >
                  <span className='relative'>
                    Privacy Policy
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#D3FD50] group-hover:w-full transition-all duration-300'></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className='footer-link font-[font1] text-base sm:text-lg lg:text-xl text-white/80 hover:text-[#D3FD50] transition-colors duration-300 relative group block'
                >
                  <span className='relative'>
                    Terms & Conditions
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#D3FD50] group-hover:w-full transition-all duration-300'></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate-program"
                  className='footer-link font-[font1] text-base sm:text-lg lg:text-xl text-white/80 hover:text-[#D3FD50] transition-colors duration-300 relative group block'
                >
                  <span className='relative'>
                    Affiliate Program
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#D3FD50] group-hover:w-full transition-all duration-300'></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Address */}
          <div className='footer-content space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] tracking-wider font-bold'>
              Address
            </h3>
            <div className='font-[font1] text-base sm:text-lg lg:text-xl text-white/80 leading-loose space-y-2 sm:space-y-3'>
              <p>22 ruelle du Clerc</p>
              <p>59126, Linselles</p>
              <p>(France)</p>
            </div>
          </div>

          {/* Hours of Operation */}
          <div className='footer-content space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] tracking-wider font-bold'>
              Hours
            </h3>
            <div className='font-[font1] text-base sm:text-lg lg:text-xl text-white/80 leading-loose space-y-3 sm:space-y-4'>
              <p>M–F: 9am – 7pm (UTC+1)</p>
              <p>Saturday & Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className='footer-content space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left' style={{ opacity: 1, visibility: 'visible' }}>
            <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] tracking-wider font-bold'>
              Contact
            </h3>
            <div className='font-[font1] text-base sm:text-lg lg:text-xl text-white/80 leading-loose'>
              <a
                href="mailto:contact@amouraworks.com"
                target="_blank"
                rel="noopener noreferrer"
                className='footer-link hover:text-[#D3FD50] transition-colors duration-300 relative group break-all sm:break-normal'
              >
                <span className='relative'>
                  contact@amouraworks.com
                  <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#D3FD50] group-hover:w-full transition-all duration-300'></span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className='text-center pt-8 sm:pt-10 lg:pt-12 border-t border-white/10' style={{ opacity: 1, visibility: 'visible' }}>
          <p className='font-[font1] text-sm sm:text-base lg:text-lg text-white/60 leading-loose'>
            ©️ 2025 Amoura Works. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
