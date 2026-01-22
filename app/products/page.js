'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'

export default function ProductsPage() {
  const [filters, setFilters] = useState({ category: '', status: '' })
  const [searchQuery, setSearchQuery] = useState('')

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase())
  }

  // Filter products
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = !filters.category || product.category === filters.category
    const matchesStatus = !filters.status || product.status === filters.status
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.tagline.toLowerCase().includes(searchQuery) ||
      product.problemStatement.toLowerCase().includes(searchQuery) ||
      product.solutionOverview.toLowerCase().includes(searchQuery)

    return matchesCategory && matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-primary mb-4">Product Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete portfolio of solutions addressing systemic challenges across Nigeria
          </p>
        </motion.div>

        {/* Filters */}
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold">{sampleProducts.length}</span> products
          </p>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
