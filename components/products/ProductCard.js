'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Calendar, Users } from 'lucide-react'
import StatusBadge from './StatusBadge'
import CategoryBadge from './CategoryBadge'

export default function ProductCard({ product, index = 0 }) {
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-white rounded-xl overflow-hidden border border-stone-200 card-hover h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${product.heroImageUrl || getCategoryImage(product.category)})`,
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

            {/* Metadata */}
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Started {formatDate(product.startDate)}</span>
              </div>

              {product.owner && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{product.owner.name}</span>
                </div>
              )}

              {/* CTA Button */}
              {product.productUrl && (
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 text-teal font-medium hover:text-teal-dark transition-colors">
                    {product.ctaLabel || 'Visit Site'}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
