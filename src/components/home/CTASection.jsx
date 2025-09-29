import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'

const CTASection = () => {
  const sectionRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  // Memoize animation configuration for better performance
  const animationConfig = useMemo(() => ({
    from: { opacity: 0, y: 40, visibility: 'hidden' },
    to: {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
    },
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }), [])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.cta-fade')
      if (!elements.length) return

      gsap.fromTo(elements, animationConfig.from, {
        ...animationConfig.to,
        scrollTrigger: {
          ...animationConfig.scrollTrigger,
          trigger: sectionRef.current,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animationConfig])

  // Optimized refresh handling with debouncing
  useLayoutEffect(() => {
    let refreshTimeout

    const debouncedRefresh = () => {
      clearTimeout(refreshTimeout)
      refreshTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }, 100)
    }

    const handleLoad = () => debouncedRefresh()
    const handleResize = () => debouncedRefresh()

    window.addEventListener('load', handleLoad, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Initial refresh
    debouncedRefresh()

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
      clearTimeout(refreshTimeout)
    }
  }, [])

  // Memoized stats data for performance
  const statsData = useMemo(() => [
    { value: '24h', label: 'Response Time' },
    { value: '100%', label: 'Satisfaction Rate' },
    { value: 'Free', label: 'Initial Consultation' }
  ], [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="min-h-screen section-dark-alt text-white relative depth-3 flex items-center section-transition"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto text-center w-full">
        <div className="max-width-wide mx-auto">
          {/* Content removed */}
        </div>
      </div>
    </section>
  )
}

export default CTASection