'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Loader2, ExternalLink, ArrowUpRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import StatusBadge from '@/components/products/StatusBadge'
import CategoryBadge from '@/components/products/CategoryBadge'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          owner:users!owner_id(id, name, email, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    if (filter === 'active') return product.status !== 'ARCHIVED'
    if (filter === 'archived') return product.status === 'ARCHIVED'
    return true
  })

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const featuredProduct = products.find(p => p.status === 'LIVE') || products[0]

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

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-100 via-teal-50/30 to-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-teal uppercase mb-4">
                Innovation Lab Registry
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Building the{' '}
                <span className="text-teal">Future of Systems</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                A living registry of systems, signals, and solutions engineered by the Innovation Lab to tackle tomorrow's most complex challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Explore Registry
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors"
                >
                  View Roadmap
                </Link>
              </div>
            </motion.div>

            {/* Abstract Shape */}
            <motion.div
              className="hidden lg:flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-teal-400 rounded-full opacity-20 blur-3xl" />
                <div className="absolute inset-8 bg-gradient-to-br from-teal-100 to-teal-300 rounded-full opacity-40" />
                <div className="absolute inset-16 bg-gradient-to-br from-white to-teal-50 rounded-full shadow-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 space-y-6">
            {/* Latest Updates */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
                <Sparkles className="w-4 h-4 text-teal" />
                Latest Updates
              </h3>
              <div className="space-y-3">
                {products.slice(0, 2).map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="p-3 bg-white rounded-lg border border-stone-200 hover:border-teal/50 transition-colors">
                      <span className="text-xs font-semibold text-teal uppercase tracking-wide">
                        {product.status === 'LIVE' ? 'New Release' : 'Announcement'}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Innovation */}
            {featuredProduct && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
                  <Sparkles className="w-4 h-4 text-teal" />
                  Featured Innovation
                </h3>
                <Link href={`/products/${featuredProduct.id}`}>
                  <div className="relative rounded-xl overflow-hidden group">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${featuredProduct.hero_image_url || getCategoryImage(featuredProduct.category)})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block px-2 py-1 bg-teal text-white text-xs font-semibold rounded mb-2">
                        Spotlight
                      </span>
                      <h4 className="text-white font-semibold line-clamp-1">
                        {featuredProduct.name}
                      </h4>
                      <p className="text-white/80 text-sm mt-1 line-clamp-2">
                        {featuredProduct.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                {['all', 'active', 'archived'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === f
                        ? 'bg-teal text-white'
                        : 'bg-white text-gray-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {f === 'all' ? 'All Products' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> innovative products
              </span>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-teal animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {visibleProducts.map((product, index) => (
                    <ProductGridCard
                      key={product.id}
                      product={product}
                      index={index}
                      getCategoryImage={getCategoryImage}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-medium border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors"
                    >
                      Load More Projects
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-stone-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-white font-bold text-sm">
                RH
              </div>
              <span className="font-semibold text-gray-800">Renaissance HAVEN</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-teal transition-colors">Privacy Policy</Link>
              <Link href="/about" className="hover:text-teal transition-colors">Terms of Use</Link>
              <Link href="/about" className="hover:text-teal transition-colors">Documentation</Link>
              <Link href="/sponsors" className="hover:text-teal transition-colors">Contact Lab</Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 Renaissance HAVEN Innovation Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

// Product Grid Card Component
function ProductGridCard({ product, index, getCategoryImage }) {
  const heroImage = product.heroImageUrl || product.hero_image_url
  const productUrl = product.productUrl || product.product_url

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-teal/50 hover:shadow-lg transition-all">
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${heroImage || getCategoryImage(product.category)})`,
              }}
            />
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              {productUrl && (
                <a
                  href={productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-teal hover:bg-white transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 group-hover:text-teal transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal transition-colors line-clamp-1">
                {product.name}
              </h3>
              <StatusBadge status={product.status} />
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {product.tagline}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={product.category} />
              {product.codename && (
                <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full">
                  {product.status === 'EXPLORING' ? 'Exploring' : product.status === 'IN_DEVELOPMENT' ? 'In Dev' : product.status}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
