import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.fromTo('.services-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    gsap.fromTo('.service-card',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: { amount: 0.4 },
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  // ✅ Fixed: Added the missing services array
  const services = [
    {
      icon: '🎬',
      title: 'Teaser Film',
      description: 'A 1–2 minute cinematic trailer — short, punchy, and perfect for social media. Designed to build anticipation and share the vibe instantly.',
      features: ['1–2 Minute Edit', 'Cinematic Trailer', 'Optimized for Social Media', 'Fast Delivery']
    },
    {
      icon: '⚡',
      title: 'Short Highlight Film',
      description: 'A 3–6 minute cinematic story cut. Quick, powerful, and emotionally rich — more depth than a teaser, without going long.',
      features: ['3–6 Minute Edit', 'Cinematic Storytelling', 'Licensed Music', 'Perfect for Sharing']
    },
    {
      icon: '🎬',
      title: 'Highlight Film',
      description: 'Our signature 8–12 minute cinematic edit — a complete story arc of your day or event, cut with rhythm and emotion so it feels like a movie.',
      features: ['8–12 Minute Edit', 'Cinematic Story Arc', 'Professional Color Grade', 'Emotion-Driven Cuts']
    },
    {
      icon: '🎯',
      title: 'Highlight + Teaser',
      description: 'The best of both worlds — a cinematic highlight plus a short teaser to share everywhere. Our most requested combo.',
      features: ['Highlight Film Included', 'Teaser Trailer Included', 'Social Media Ready', 'Most Popular Combo']
    },
    {
      icon: '🎥',
      title: 'Feature Film',
      description: 'A 12–25 minute extended cinematic cut. Includes vows, speeches, and more woven into a story-driven film experience.',
      features: ['12–25 Minute Film', 'Vows & Speeches Included', 'Cinematic Narrative', 'Immersive Audio Mix']
    },
    {
      icon: '🔥',
      title: 'Complete Package',
      description: 'Highlight + Teaser + Full Documentary (30–90 minutes). For clients who want it all — cinematic storytelling plus full archival coverage.',
      features: ['Highlight Film', 'Teaser Trailer', '30–90 Min Documentary', 'Comprehensive Coverage']
    },
    {
      icon: '💎',
      title: 'Custom / Premium Projects',
      description: 'Music videos, branded content, multi-cam events, or complex storytelling with advanced effects. If you have a vision, we’ll build it with you.',
      features: ['Music Videos', 'Branded Content', '6+ Multi-Cam Shoots', 'Advanced VFX & Storytelling']
    }
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className='min-h-screen section-dark-alt text-white relative depth-3 section-transition'
    >
      <div className="cinematic-overlay"></div>

      <div className='container mx-auto section-padding'>
        {/* Title + Intro */}
        <div className='flex flex-col items-center justify-center text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8 mx-auto'>
          <h2 className='services-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            Our Services
          </h2>
          <div className='floating-panel-dark max-width-content mx-auto'>
            <p className='font-[font1] text-responsive leading-relaxed text-layer-2'>
              The Services we Provide
            </p>
            <p className='font-[font2] text-accent mt-4 text-lg sm:text-xl glow-accent'>
             
            </p>
            <div className='mt-6 sm:mt-8 flex flex-wrap justify-center gap-6 text-sm sm:text-base font-[font1] text-layer-2'>
              <span>🎞 Post Production Experience: <strong>7+ Years</strong></span>
              <span>💍 Wedding Projects: <strong>1000+</strong></span>
              <span>🎥 Happy Videographers: <strong>74</strong></span>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className='services-grid responsive-grid-2 max-width-wide mt-12'>
          {services.map((service, index) => (
            <div 
              key={index}
              className='service-card group floating-panel-dark glass-hover glass-click gpu-accelerated'
            >
              <div className='text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 micro-bounce glow-accent'>
                {service.icon}
              </div>
              
              <div className='space-y-4 sm:space-y-6 mb-6 sm:mb-8'>
                <h3 className='font-[font2] heading-responsive-md uppercase text-layer-2'>
                  {service.title}
                </h3>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                  {service.description}
                </p>
              </div>

              <ul className='space-y-2 sm:space-y-3 mb-6 sm:mb-8'>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-center font-[font1] text-sm sm:text-base text-layer-1'>
                    <span className='w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#D3FD50] to-[#b8e03e] rounded-full mr-3 sm:mr-4 micro-bounce glow-accent flex-shrink-0'></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className='w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
