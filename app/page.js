'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/products/ProductCard'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, archived

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

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Renaissance HAVEN
          </h1>
          <p className="text-gray-600 text-base">
            A living registry of systems, signals, and solutions built by the Innovation Lab
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-teal text-white'
                : 'bg-white text-gray-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active'
                ? 'bg-teal text-white'
                : 'bg-white text-gray-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'archived'
                ? 'bg-teal text-white'
                : 'bg-white text-gray-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Archived
          </button>
          <span className="ml-auto text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        {/* Products List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-teal animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
