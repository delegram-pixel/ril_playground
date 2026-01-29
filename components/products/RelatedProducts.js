'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Link as LinkIcon } from 'lucide-react'
import StatusBadge from './StatusBadge'
import CategoryBadge from './CategoryBadge'

export default function RelatedProducts({ relatedProducts = [] }) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null
  }

  const getRelationshipLabel = (type) => {
    const labels = {
      complementary: 'Complementary Product',
      similar: 'Similar Product',
      dependency: 'Dependency',
    }
    return labels[type] || 'Related Product'
  }

  const getRelationshipColor = (type) => {
    const colors = {
      complementary: 'bg-purple-100 text-purple-700',
      similar: 'bg-blue-100 text-blue-700',
      dependency: 'bg-orange-100 text-orange-700',
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  return (
    <motion.section
      className="glass-card rounded-xl p-8 border border-stone-200"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <LinkIcon className="w-6 h-6 text-teal" />
        <h2 className="text-2xl font-bold text-primary">Related Products</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedProducts.map((item) => {
          const product = item.relatedProduct || item
          return (
            <Link key={item.id} href={`/products/${product.id}`}>
              <motion.div
                className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:border-teal hover:shadow-md transition-all group h-full"
                whileHover={{ y: -4 }}
              >
                {/* Hero Image */}
                {product.heroImageUrl && (
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={product.heroImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                <div className="p-4">
                  {/* Relationship Type */}
                  {item.relationshipType && (
                    <div className="mb-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRelationshipColor(
                          item.relationshipType
                        )}`}
                      >
                        {getRelationshipLabel(item.relationshipType)}
                      </span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <CategoryBadge category={product.category} size="sm" />
                    <StatusBadge status={product.status} size="sm" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-teal transition-colors">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.tagline}
                  </p>

                  {/* Description (if available) */}
                  {item.description && (
                    <p className="text-xs text-gray-500 italic mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* View Link */}
                  <div className="flex items-center gap-2 text-sm text-teal font-medium group-hover:gap-3 transition-all">
                    View Product
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.section>
  )
}
