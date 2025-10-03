import React, { useRef, useEffect } from 'react'

const LogoVideo = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(err => {
        console.log('Autoplay prevented:', err)
      })
    }
  }, [])

  return (
    <section className="w-full bg-black relative overflow-hidden">
      <div className="w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          style={{ display: 'block' }}
        >
          <source src="/logovideo.webm" type="video/webm" />
          <source src="/logovideo.mp4" type="video/mp4" />
          <source src="/logovideo.ogv" type="video/ogg" />
        </video>
      </div>
    </section>
  )
}

export default LogoVideo
