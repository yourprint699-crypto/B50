import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const VideoCard = ({ videoId, aspectRatio, index }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
  const cardRef = useRef(null)

  // Generate proper YouTube embed URL and thumbnail
  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0`
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1
        }
      )
    }
  }, [index])

  const handleIframeLoad = () => {
    setIsLoaded(true)
  }

  const handleIframeError = () => {
    setHasError(true)
    console.warn(`Failed to load video: ${videoId}`)
  }

  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true)
  }

  const handleThumbnailError = (e) => {
    // Try fallback thumbnail
    if (e.target.src !== fallbackThumbnail) {
      e.target.src = fallbackThumbnail
    }
  }

  return (
    <div 
      ref={cardRef}
      className={`video-container group relative ${aspectRatio || 'aspect-video'} video-glass gpu-accelerated w-full overflow-hidden rounded-lg sm:rounded-xl`}
    >
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center z-10">
          <div className="loading-spinner w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state with thumbnail fallback */}
      {hasError && (
        <div className="absolute inset-0 z-10">
          <img
            src={thumbnailUrl}
            alt={`Video ${index + 1} thumbnail`}
            className="w-full h-full object-cover"
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
              </div>
              <p className="text-sm">Click to watch on YouTube</p>
            </div>
          </div>
        </div>
      )}

      {/* YouTube iframe embed */}
      {!hasError && (
        <iframe
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={embedUrl}
          title={`Project Video ${index + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}

      {/* Click handler for error state */}
      {hasError && (
        <button
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
          aria-label={`Watch video ${index + 1} on YouTube`}
        />
      )}
      
      {/* Subtle hover effect overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg sm:rounded-xl' />
    </div>
  )
}

export default VideoCard
