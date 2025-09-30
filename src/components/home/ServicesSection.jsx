import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.fromTo('.services-title',
      {
        opacity: 0,
        y: 50
      },
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
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 0.4
        },
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

 Post prod exp- 7+ years
Wedding project - 1000+
Happy Videographers - 74

Our Services - change 


Teaser Film

A 1–2 minute cinematic trailer. Short, punchy, and made for social media. Perfect for building anticipation and sharing the vibe.

⚡ Short Highlight Film

A 3–6 minute cinematic story cut. For couples or brands who want something quick and powerful — more depth than a teaser, without going long.

🎬 Highlight Film

Our signature 8–12 minute cinematic edit. A complete story arc of your day or event, cut with rhythm and emotion so it feels like a movie, not a montage.

🎯 Highlight + Teaser

The best of both worlds. A cinematic highlight plus a short teaser you can share everywhere. Our most requested combo.

🎥 Feature Film

A 12–25 minute extended cinematic cut. Includes vows, speeches, and more of the day woven into a story-driven film.

🔥 Complete Package

Highlight + Teaser + Full Documentary (30–90 minutes). For clients who want it all — cinematic storytelling and a full archival film to relive every detail. Our most popular choice.

💎 Custom / Premium Projects

Music videos, branded content, multi-cam events (6+ multicams), or complex storytelling with advanced effects. If you have a vision that doesn’t fit a box, we’ll build it with you.



You do the work we do the stitches - change to - “We Keep The Edits, You Keep the Calm"

  return (
    <section id="services" ref={sectionRef} className='min-h-screen section-dark-alt text-white relative depth-3 section-transition'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        <div className='flex flex-col items-center justify-center text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8 mx-auto'>
          <h2 className='services-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            Services
          </h2>
          <div className='floating-panel-dark max-width-content mx-auto'>
            <p className='font-[font1] text-responsive leading-relaxed text-layer-2'>
            Everything you need to relive your wedding. beautifully filmed, thoughtfully crafted, and made just for you.
            </p>
          </div>
        </div>

        <div className='services-grid responsive-grid-2 max-width-wide'>
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