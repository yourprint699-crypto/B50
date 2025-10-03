import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Film, Zap, Clapperboard, Target, Video, Flame, Diamond } from 'lucide-react'

const ServiceIcon = ({ type, className }) => {
  const icons = {
    film: Film,
    zap: Zap,
    clapperboard: Clapperboard,
    target: Target,
    video: Video,
    flame: Flame,
    diamond: Diamond
  }
  const Icon = icons[type]
  return <Icon className={className} strokeWidth={1.5} />
}

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo('.services-title',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.services-title',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.utils.toArray('.service-card').forEach((card, index) => {
        const direction = index % 2 === 0 ? -80 : 80

        gsap.fromTo(card,
          {
            opacity: 0,
            x: direction,
            y: 40,
            rotateY: direction > 0 ? 15 : -15,
            scale: 0.85
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            delay: index * 0.1
          }
        )
      })
    })

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo('.services-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.services-title',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo('.service-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    })
  })

  const services = [
    {
      icon: 'film',
      title: 'Teaser Film',
      description: 'A 1–2 minute cinematic trailer — short, punchy, and perfect for social media. Designed to build anticipation and share the vibe instantly.',
      features: ['1–2 Minute Edit', 'Cinematic Trailer', 'Optimized for Social Media', 'Fast Delivery'],
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: 'zap',
      title: 'Short Highlight Film',
      description: 'A 3–6 minute cinematic story cut. Quick, powerful, and emotionally rich — more depth than a teaser, without going long.',
      features: ['3–6 Minute Edit', 'Cinematic Storytelling', 'Licensed Music', 'Perfect for Sharing'],
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: 'clapperboard',
      title: 'Highlight Film',
      description: 'Our signature 8–12 minute cinematic edit — a complete story arc of your day or event, cut with rhythm and emotion so it feels like a movie.',
      features: ['8–12 Minute Edit', 'Cinematic Story Arc', 'Professional Color Grade', 'Emotion-Driven Cuts'],
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: 'target',
      title: 'Highlight + Teaser',
      description: 'The best of both worlds — a cinematic highlight plus a short teaser to share everywhere. Our most requested combo.',
      features: ['Highlight Film Included', 'Teaser Trailer Included', 'Social Media Ready', 'Most Popular Combo'],
      gradient: 'from-red-500/20 to-rose-500/20'
    },
    {
      icon: 'video',
      title: 'Feature Film',
      description: 'A 12–25 minute extended cinematic cut. Includes vows, speeches, and more woven into a story-driven film experience.',
      features: ['12–25 Minute Film', 'Vows & Speeches Included', 'Cinematic Narrative', 'Immersive Audio Mix'],
      gradient: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      icon: 'flame',
      title: 'Complete Package',
      description: 'Highlight + Teaser + Full Documentary (30–90 minutes). For clients who want it all — cinematic storytelling plus full archival coverage.',
      features: ['Highlight Film', 'Teaser Trailer', '30–90 Min Documentary', 'Comprehensive Coverage'],
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: 'diamond',
      title: 'Custom / Premium Projects',
      description: 'Music videos, branded content, multi-cam events, or complex storytelling with advanced effects. If you have a vision, we\'ll build it with you.',
      features: ['Music Videos', 'Branded Content', '6+ Multi-Cam Shoots', 'Advanced VFX & Storytelling'],
      gradient: 'from-emerald-500/20 to-teal-500/20'
    }
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className='min-h-screen section-dark-alt text-white relative overflow-hidden'
      style={{
        paddingTop: 'clamp(60px, 12vw, 120px)',
        paddingBottom: 'clamp(60px, 12vw, 120px)'
      }}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center text-center mb-12 sm:mb-16 lg:mb-20'>
          <div className='services-title-wrapper relative inline-block'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#D3FD50]/20 via-transparent to-[#D3FD50]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
            <h2 className='services-title font-[font2] text-[clamp(2.5rem,8vw,5rem)] uppercase leading-tight relative z-10 bg-gradient-to-b from-white via-white to-[#D3FD50] bg-clip-text text-transparent'>
              Services
            </h2>
          </div>
          <div className='mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#D3FD50] to-transparent rounded-full opacity-60'></div>
        </div>

        <div className='services-grid responsive-grid-2 max-width-wide gap-6 sm:gap-8 lg:gap-10' style={{ perspective: '2000px' }}>
          {services.map((service, index) => (
            <div
              key={index}
              className='service-card group relative'
              style={{
                transformStyle: 'preserve-3d',
                willChange: hoveredCard === index ? 'transform' : 'auto',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className='absolute inset-0 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:bg-black/60'></div>

              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 blur-xl`}></div>

              <div className='absolute -inset-[1px] bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

              <div className='relative z-10 p-6 sm:p-8 lg:p-10'>
                <div className='flex items-start justify-between mb-6'>
                  <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#D3FD50]/20 to-transparent border border-[#D3FD50]/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-[#D3FD50]/30'>
                    <ServiceIcon type={service.icon} className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#D3FD50]' />
                  </div>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#D3FD50]/20 to-transparent border border-[#D3FD50]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-180'>
                    <div className='w-6 h-6 rounded-full bg-[#D3FD50]/40'></div>
                  </div>
                </div>

                <div className='space-y-4 sm:space-y-5 mb-8'>
                  <h3 className='font-[font2] text-[clamp(1.5rem,4vw,2rem)] uppercase text-white leading-tight tracking-tight transform transition-all duration-300 group-hover:text-[#D3FD50]'>
                    {service.title}
                  </h3>
                  <p className='font-[font1] text-[clamp(0.9rem,2.5vw,1.1rem)] leading-relaxed text-white/70 group-hover:text-white/90 transition-colors duration-300'>
                    {service.description}
                  </p>
                </div>

                <div className='space-y-3 mb-8'>
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className='flex items-center gap-3 transform transition-all duration-300'
                      style={{
                        transitionDelay: `${featureIndex * 50}ms`
                      }}
                    >
                      <div className='relative w-5 h-5 flex-shrink-0'>
                        <div className='absolute inset-0 bg-[#D3FD50] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 group-hover:animate-ping'></div>
                        <div className='relative w-full h-full bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full shadow-lg shadow-[#D3FD50]/30 transform transition-all duration-300 group-hover:scale-110'></div>
                      </div>
                      <span className='font-[font1] text-sm sm:text-base text-white/80 group-hover:text-white transition-colors duration-300'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className='relative h-px overflow-hidden rounded-full'>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[#D3FD50] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out'></div>
                </div>

                <div className='absolute top-0 right-0 w-32 h-32 bg-[#D3FD50]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#D3FD50]/5 rounded-full blur-3xl animate-pulse' style={{ animationDuration: '8s' }}></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse' style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}

export default ServicesSection
