'use client'

import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/products/ProductCard'

export default function FeaturedProducts() {
  // Get the 3 most recently updated products
  const featuredProducts = sampleProducts
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 3)

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {featuredProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
