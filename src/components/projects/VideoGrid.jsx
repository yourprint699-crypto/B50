import React from 'react'
import VideoCard from './VideoCard'

const VideoGrid = ({ videos, gridCols, aspectRatio }) => {
  // Ensure we have videos to display
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-[font1] text-responsive text-layer-1">No videos available</p>
      </div>
    )
  }

  // Parse grid columns for proper CSS classes
  const getGridClasses = () => {
    if (gridCols.includes('grid-cols-1')) {
      return 'grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8'
    } else if (gridCols.includes('grid-cols-2')) {
      return 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'
    } else if (gridCols.includes('grid-cols-3')) {
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
    } else if (gridCols.includes('grid-cols-4')) {
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
    }
    // Default fallback
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
  }

  return (
    <div className={getGridClasses()}>
      {videos.map((video, index) => {
        // Ensure video has videoId property
        if (!video || !video.videoId) {
          console.warn(`Video at index ${index} is missing videoId:`, video)
          return null
        }

        return (
          <VideoCard 
            key={`${video.videoId}-${index}`}
            videoId={video.videoId}
            aspectRatio={aspectRatio}
            index={index}
          />
        )
      })}
    </div>
  )
}

export default VideoGrid
