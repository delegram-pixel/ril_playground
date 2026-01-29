'use client'

import ReactPlayer from 'react-player/lazy'

export default function VideoPlayer({ url, title, description }) {
  return (
    <div className="space-y-3">
      <div className="aspect-video bg-stone-900 rounded-lg overflow-hidden">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }
          }}
        />
      </div>
      {(title || description) && (
        <div>
          {title && <h4 className="font-semibold text-gray-800">{title}</h4>}
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      )}
    </div>
  )
}
