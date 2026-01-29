'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import StatusBadge from './StatusBadge'
import CategoryBadge from './CategoryBadge'

export default function ProductCard({ product, index = 0, variant = 'horizontal' }) {
  // Handle both camelCase and snake_case from different data sources
  const heroImage = product.heroImageUrl || product.hero_image_url
  const productUrl = product.productUrl || product.product_url
  const ctaLabel = product.ctaLabel || product.cta_label

  const getCategoryImage = (category) => {
    const images = {
      CIVIC_TECH: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      HEALTH_TECH: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      AI_INFRASTRUCTURE: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      FINTECH: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      EDTECH: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      AGRITECH: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
      CLIMATE_TECH: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=800&q=80',
      OTHER: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    }
    return images[category] || images.OTHER
  }

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <Link href={`/products/${product.id}`}>
          <div className="group bg-white border border-stone-200 rounded-lg p-4 hover:border-teal hover:shadow-md transition-all">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-md bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${heroImage || getCategoryImage(product.category)})`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-primary group-hover:text-teal transition-colors mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {product.tagline}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <CategoryBadge category={product.category} />
                      <StatusBadge status={product.status} />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {productUrl && (
                      <a
                        href={productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-teal hover:bg-teal/10 rounded-md transition-all"
                        title="Visit site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-teal transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Original vertical card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="glass-card rounded-xl overflow-hidden border border-stone-200 card-hover h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${heroImage || getCategoryImage(product.category)})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <CategoryBadge category={product.category} />
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <StatusBadge status={product.status} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-teal transition-colors">
              {product.name}
            </h3>

            {product.codename && (
              <p className="text-sm text-gray-500 mb-2 font-mono">
                {product.codename}
              </p>
            )}

            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.tagline}
            </p>

            {/* CTA Button */}
            {productUrl && (
              <div className="mt-auto">
                <a
                  href={productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-teal font-medium hover:text-teal-dark transition-colors"
                >
                  {ctaLabel || 'Visit Site'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
