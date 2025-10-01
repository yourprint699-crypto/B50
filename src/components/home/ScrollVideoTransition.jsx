import React, { useRef, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const ScrollVideoTransition = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const targetTimeRef = useRef(0)
  const lastUpdateRef = useRef(0)

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Advanced video optimization for all devices
    video.muted = true
    video.volume = 0
    video.playsInline = true
    video.preload = 'auto'

    // Force hardware acceleration
    video.style.transform = 'translateZ(0)'
    video.style.backfaceVisibility = 'hidden'
    video.style.willChange = 'transform'

    // Pre-buffer video for smooth playback
    const preloadVideo = async () => {
      try {
        await video.load()
        // Force full decode for smoother scrubbing
        if (video.readyState >= 2) {
          video.currentTime = 0.1
          await video.pause()
          video.currentTime = 0
        }
      } catch (err) {
        console.warn('Video preload error:', err)
      }
    }

    preloadVideo()

    const handleCanPlay = () => {
      // Pause immediately to prevent autoplay
      video.pause()
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleCanPlay)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleCanPlay)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Ultra-smooth RAF-based video scrubbing
  const smoothVideoScrub = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return

    const now = performance.now()
    const deltaTime = now - lastUpdateRef.current

    // Throttle to 60fps max for performance
    if (deltaTime < 16) {
      rafRef.current = requestAnimationFrame(smoothVideoScrub)
      return
    }

    lastUpdateRef.current = now
    const currentTime = video.currentTime
    const targetTime = targetTimeRef.current
    const diff = targetTime - currentTime

    // Ultra-smooth easing with adaptive lerp factor
    const lerpFactor = Math.min(0.15 + Math.abs(diff) * 0.05, 0.35)

    if (Math.abs(diff) > 0.016) {
      // Smooth interpolation
      video.currentTime = currentTime + diff * lerpFactor
      rafRef.current = requestAnimationFrame(smoothVideoScrub)
    } else if (Math.abs(diff) > 0.001) {
      // Snap to target when very close
      video.currentTime = targetTime
      rafRef.current = requestAnimationFrame(smoothVideoScrub)
    }
  }, [])

  useGSAP(() => {
    const container = containerRef.current
    const video = videoRef.current
    const videoWrapper = container?.querySelector('.video-wrapper')

    if (!container || !video || !videoWrapper) return

    let isActive = false

    // Main scroll-driven timeline with smooth transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onEnter: () => {
          isActive = true
          video.pause()
          rafRef.current = requestAnimationFrame(smoothVideoScrub)
        },
        onLeave: () => {
          isActive = false
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          video.pause()
        },
        onEnterBack: () => {
          isActive = true
          video.pause()
          rafRef.current = requestAnimationFrame(smoothVideoScrub)
        },
        onLeaveBack: () => {
          isActive = false
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          video.pause()
        }
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

    // High-performance scroll-synced video with RAF
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (video.duration && isActive) {
          const progress = self.progress
          targetTimeRef.current = video.duration * progress
        }
      }
    })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }

  }, [smoothVideoScrub])

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
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            objectFit: 'cover',
            imageRendering: 'high-quality'
          }}
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
