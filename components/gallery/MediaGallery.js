'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Play, Image as ImageIcon, FileText } from 'lucide-react'

export default function MediaGallery({ media = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!media || media.length === 0) {
    return null
  }

  const images = media.filter((m) => m.type === 'IMAGE' || m.type === 'SCREENSHOT')
  const videos = media.filter((m) => m.type === 'VIDEO')
  const diagrams = media.filter((m) => m.type === 'DIAGRAM')

  const lightboxSlides = images.map((img) => ({
    src: img.url,
    title: img.title,
    description: img.description,
  }))

  const getMediaIcon = (type) => {
    switch (type) {
      case 'VIDEO':
        return <Play className="w-6 h-6" />
      case 'DIAGRAM':
        return <FileText className="w-6 h-6" />
      default:
        return <ImageIcon className="w-6 h-6" />
    }
  }

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <motion.section
      className="glass-card rounded-xl p-8 border border-stone-200"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Media Gallery</h2>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Screenshots & Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                className="relative aspect-video bg-stone-100 rounded-lg overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.thumbnailUrl || img.url}
                  alt={img.title || 'Product screenshot'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">{img.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Demo Videos</h3>
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-stone-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Play className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{video.title}</h4>
                  {video.description && (
                    <p className="text-sm text-gray-600">{video.description}</p>
                  )}
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors text-sm font-medium"
                >
                  Watch
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagrams */}
      {diagrams.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Architecture & Diagrams</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {diagrams.map((diagram) => (
              <div
                key={diagram.id}
                className="bg-stone-50 rounded-lg p-4 flex flex-col gap-3"
              >
                <div className="aspect-video bg-white rounded-lg overflow-hidden">
                  <img
                    src={diagram.url}
                    alt={diagram.title || 'System diagram'}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{diagram.title}</h4>
                  {diagram.description && (
                    <p className="text-sm text-gray-600 mt-1">{diagram.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
      />
    </motion.section>
  )
}
