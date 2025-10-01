import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ProcessSection = () => {
  const sectionRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.fromTo('.process-title',
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
          trigger: '.process-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    gsap.fromTo('.process-step',
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 0.6
        },
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  const processSteps = [
    {
      step: '01',
      title: 'Let’s Talk',
      description: 'We start with a quick chat to understand your story and the style of film you want.',
      duration: '1-2 hours'
    },
    {
      step: '02',
      title: 'Share Your Footage',
      description: 'Send us a short 2–3 minute sample of your raw footage. This helps us gauge the quality and flow so we can give you the fairest quote and a plan that fits.',
      duration: '2-3 weeks'
    },
    {
      step: '03',
      title: 'Plan the Edit',
      description: 'We work with you to choose the right format: teaser, highlight, feature, or full film so we can meet your expectations and deliver exactly what you’ve imagined.'
    },
    {
      step: '04',
      title: 'Crafting the Masterpiece',
      description: 'This is where our team pours in the hours. We cut with rhythm, grade every frame for tone and color, mix the audio for depth, and weave the footage into a film that feels alive. Every detail is shaped with care until it becomes something unforgettable.',
      duration: '4-6 weeks'
    },
    {
      step: '05',
      title: 'First Draft & Revisions',
      description: 'You’ll receive the first cut online. Two rounds of revisions are included, and we listen closely, understand what feels off, and refine until the next version lands exactly where it should.',
      duration: '1-2 weeks'
    },
    {
      step: '06',
      title: 'Final Delivery',
      description: 'When everything feels just right, we send over your films in high quality (upto 4k). They’re yours to keep, share, and come back to whenever you want a piece of your story you’ll always have with you.',
      duration: 'Digital delivery'
    }
  ]

  return (
    <section id="process" ref={sectionRef} className='min-h-screen section-dark text-white relative depth-3 section-transition'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-[clamp(3rem,12vw,8rem)]'>
        <div className='flex flex-col items-center justify-center text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8 mx-auto'>
          <h2 className='process-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow'>
            Our Process
          </h2>
          <div className='floating-panel-dark max-width-content mx-auto'>
            <p className='font-[font1] text-responsive leading-relaxed text-layer-2'>
            A clear, simple journey that makes sure your memories are turned into films worth keeping for a lifetime.
            </p>
          </div>
        </div>

        <div className='process-timeline max-width-content space-y-6 sm:space-y-8'>
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className='process-step group relative'
            >
              <div className='floating-panel-dark glass-hover flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8'>
                {/* Step Number */}
                <div className='flex-shrink-0 self-center sm:self-start'>
                  <div className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center micro-bounce glow-accent animate-glow-pulse'>
                    <span className='font-[font2] text-lg sm:text-xl lg:text-2xl text-black'>
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Step Content */}
                <div className='flex-1 space-y-3 sm:space-y-4 text-center sm:text-left'>
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 space-y-2 sm:space-y-0'>
                    <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>
                      {step.title}
                    </h3>
                    <span className='font-[font1] text-xs sm:text-sm lg:text-base text-layer-1 glass px-3 sm:px-4 py-1 sm:py-2 rounded-full micro-bounce self-center sm:self-auto'>
                      {step.duration}
                    </span>
                  </div>
                  <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Progress line */}
              {index < processSteps.length - 1 && (
                <div className='absolute left-1/2 sm:left-6 lg:left-10 -bottom-3 sm:-bottom-4 accent-line-vertical h-6 sm:h-8 bg-gradient-to-b from-[#D3FD50] to-transparent rounded-full glow-accent transform -translate-x-1/2 sm:translate-x-0'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection