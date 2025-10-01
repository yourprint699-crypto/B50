import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ScrollVideoTransition = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // iOS video setup
    video.muted = true
    video.volume = 0
    video.playsInline = true

    // Attempt initial load
    video.load()

    const handleCanPlay = () => {
      video.play().catch(err => {
        console.warn('Initial autoplay prevented:', err)
      })
    }

    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  useGSAP(() => {
    const container = containerRef.current
    const video = videoRef.current

    if (!container || !video) return

    // Create timeline for video entrance and scroll-sync
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onEnter: () => {
          video.play().catch(err => console.warn('Play on scroll failed:', err))
        },
        onLeave: () => {
          video.pause()
        },
        onEnterBack: () => {
          video.play().catch(err => console.warn('Play on scroll back failed:', err))
        },
        onLeaveBack: () => {
          video.pause()
        }
      }
    })

    // Animate container from right to center
    tl.fromTo(container,
      {
        x: '100vw',
        opacity: 0
      },
      {
        x: '0vw',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }
    )
    .to(container, {
      x: '0vw',
      opacity: 1,
      duration: 0.4
    })
    .to(container, {
      x: '-100vw',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })

    // Scroll-sync video playback
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (video.duration) {
          const progress = self.progress
          const targetTime = video.duration * progress

          // Only update if difference is significant (prevents jitter)
          if (Math.abs(video.currentTime - targetTime) > 0.1) {
            video.currentTime = targetTime
          }
        }
      }
    })

  }, [])

  return (
    <div
      ref={containerRef}
      className='h-[60vh] sm:h-[70vh] w-full flex items-center justify-center overflow-visible relative py-12 sm:py-16 lg:py-20'
      style={{
        willChange: 'transform, opacity'
      }}
    >
      <div className='w-[90%] sm:w-[85%] lg:w-[75%] max-w-6xl h-full flex items-center justify-center bg-black rounded-lg overflow-hidden shadow-2xl'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover'
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
        >
          <source src="/gemini.webm" type="video/webm" />
          <source src="/gemini.mp4" type="video/mp4" />
          <source src="/gemini.ogv" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default ScrollVideoTransition
