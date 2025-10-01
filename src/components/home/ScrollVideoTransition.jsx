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
    const videoWrapper = container?.querySelector('.video-wrapper')

    if (!container || !video || !videoWrapper) return

    // Framer-inspired spring configuration
    const springConfig = {
      duration: 1.2,
      ease: 'power3.out'
    }

    // Smooth video playback management
    let isPlaying = false
    const smoothPlay = () => {
      if (!isPlaying) {
        isPlaying = true
        video.play().catch(err => console.warn('Play failed:', err))
      }
    }

    const smoothPause = () => {
      if (isPlaying) {
        isPlaying = false
        video.pause()
      }
    }

    // Main scroll-driven timeline with smooth transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onEnter: smoothPlay,
        onLeave: smoothPause,
        onEnterBack: smoothPlay,
        onLeaveBack: smoothPause
      }
    })

    // Entrance: Slide in from right with scale and blur effect
    tl.fromTo(container,
      {
        x: '120%',
        opacity: 0
      },
      {
        x: '0%',
        opacity: 1,
        duration: 0.35,
        ease: 'power4.out'
      }
    )
    .fromTo(videoWrapper,
      {
        scale: 0.85,
        rotateY: 12,
        filter: 'blur(10px)'
      },
      {
        scale: 1,
        rotateY: 0,
        filter: 'blur(0px)',
        duration: 0.35,
        ease: 'power4.out'
      },
      '<'
    )

    // Hold: Keep centered while video plays
    .to([container, videoWrapper], {
      x: '0%',
      scale: 1,
      rotateY: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.3
    })

    // Exit: Slide out to left with scale and blur
    .to(videoWrapper,
      {
        scale: 0.85,
        rotateY: -12,
        filter: 'blur(10px)',
        duration: 0.35,
        ease: 'power4.in'
      }
    )
    .to(container,
      {
        x: '-120%',
        opacity: 0,
        duration: 0.35,
        ease: 'power4.in'
      },
      '<'
    )

    // Smooth scroll-synced video playback with easing
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (video.duration && isPlaying) {
          const progress = self.progress
          const targetTime = video.duration * progress
          const currentTime = video.currentTime
          const timeDiff = Math.abs(currentTime - targetTime)

          // Smooth interpolation for fluid playback
          if (timeDiff > 0.05) {
            const smoothTarget = currentTime + (targetTime - currentTime) * 0.3
            video.currentTime = smoothTarget
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
        willChange: 'transform, opacity',
        perspective: '1200px'
      }}
    >
      <div
        className='video-wrapper w-[90%] sm:w-[85%] lg:w-[75%] max-w-6xl h-full flex items-center justify-center bg-black rounded-lg overflow-hidden shadow-2xl'
        style={{
          willChange: 'transform, filter',
          transformStyle: 'preserve-3d'
        }}
      >
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
