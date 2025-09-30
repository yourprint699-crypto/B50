import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const StatsSection = () => {
  const sectionRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Configurable stats data for easy editing
  const statsData = [
    {
      number: 500,
      suffix: '+',
      label: 'Wedding projects completed',
      icon: '⚘'
    },
    {
      number: 99,
      suffix: '%',
      label: 'Happy Videographers',
      icon: '◉'
    },
    {
      number: 8,
      suffix: '',
      label: 'Editors in our team',
      icon: '✎'
    },
    {
      number: 5,
      suffix: ' yrs',
      label: 'Post-production experience',
      icon: '⚝'
    }
  ]

  gsap.registerPlugin(ScrollTrigger)

  // Counter animation function
  const animateCounter = (element, finalNumber, duration = 2) => {
    const counter = { value: 0 }
    
    gsap.to(counter, {
      value: finalNumber,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.floor(counter.value).toLocaleString()
      }
    })
  }

  useGSAP(() => {
    // Animate section title
    gsap.fromTo('.stats-title',
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
          trigger: '.stats-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Animate stat cards with stagger
    gsap.fromTo('.stat-card',
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
          amount: 0.3
        },
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
          onEnter: () => {
            if (!hasAnimated) {
              // Trigger counter animations
              setTimeout(() => {
                document.querySelectorAll('.counter-number').forEach((counter, index) => {
                  animateCounter(counter, statsData[index].number, 2.5)
                })
                setHasAnimated(true)
              }, 400)
            }
          }
        }
      }
    )
  }, [hasAnimated])

  return (
    <section id="stats" ref={sectionRef} className='min-h-screen section-dark text-white relative depth-3 section-transition' style={{ border: 'none', boxShadow: 'none' }}>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        {/* Section Header */}
        <div className='flex flex-col items-center justify-center text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8 mx-auto'>
          <h2 className='stats-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            A Few Stats About Us
          </h2>
        </div>

        {/* Stats Grid */}
        <div className='stats-grid responsive-grid-2 max-width-content'>
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className='stat-card group floating-panel-dark glass-hover glass-click text-center gpu-accelerated'
            >
              {/* Icon */}
              <div className='text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 micro-bounce glow-accent'>
                {stat.icon}
              </div>
              
              {/* Number */}
              <div className='mb-4 sm:mb-6'>
                <span className='counter-number font-[font2] text-layer-2 glow-accent text-glow-strong' style={{background: 'none', backgroundColor: 'transparent'}}>
                  0
                </span>
                <span className='font-[font2] text-3xl sm:text-4xl lg:text-5xl text-layer-2 glow-accent text-glow-strong' style={{background: 'none', backgroundColor: 'transparent'}}>
                  {stat.suffix}
                </span>
              </div>
              
              {/* Label */}
              <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                {stat.label}
              </p>

              {/* Hover accent line */}
              <div className='w-full accent-line mt-6 sm:mt-8 rounded-full mx-auto glow-accent'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection