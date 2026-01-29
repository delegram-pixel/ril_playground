'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'

export default function MediaGallery({ media = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const carouselRef = useRef(null)

  if (!media || media.length === 0) {
    return null
  }

  const allMedia = media.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
  const totalSlides = allMedia.length
  const visibleSlides = Math.min(2, totalSlides) // Show 2 at a time on desktop

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth / visibleSlides
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const next = currentIndex + 1
    if (next < totalSlides) {
      scrollToIndex(next)
    }
  }

  const prevSlide = () => {
    const prev = currentIndex - 1
    if (prev >= 0) {
      scrollToIndex(prev)
    }
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const isVideo = (item) => item.type === 'VIDEO' || item.url?.includes('youtube') || item.url?.includes('vimeo')

  return (
    <motion.section
      className="mb-8"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Carousel Container */}
      <div className="relative group">
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentIndex < totalSlides - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allMedia.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex-shrink-0 w-full md:w-[calc(50%-8px)] snap-start cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 rounded-2xl overflow-hidden">
                {isVideo(item) ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={item.thumbnail_url || item.thumbnailUrl || item.url}
                      alt={item.title || 'Video thumbnail'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title || 'Product screenshot'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Caption overlay */}
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {allMedia.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-red-500 w-2'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex - 1)
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {lightboxIndex < totalSlides - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex + 1)
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          <div className="max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            {isVideo(allMedia[lightboxIndex]) ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={allMedia[lightboxIndex].url}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={allMedia[lightboxIndex].url}
                alt={allMedia[lightboxIndex].title || 'Product screenshot'}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
            {allMedia[lightboxIndex].title && (
              <p className="text-white text-center mt-4 text-lg">
                {allMedia[lightboxIndex].title}
              </p>
            )}
          </div>

          {/* Lightbox dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {allMedia.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(idx)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === lightboxIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.section>
  )
}
