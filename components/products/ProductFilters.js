'use client'

import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'

export default function ProductFilters({ filters, onFilterChange, onSearch }) {
  const categories = [
    'All',
    'CivicTech',
    'HealthTech',
    'AI Infrastructure',
    'FinTech',
    'EdTech',
    'AgriTech',
    'ClimateTech',
    'Other',
  ]

  const statuses = [
    'All',
    'Exploring',
    'In Development',
    'MVP',
    'Live',
    'Paused',
    'Archived',
  ]

  return (
    <motion.div
      className="glass-card rounded-xl p-6 border border-stone-200 mb-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Products
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, problem, or solution..."
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                onFilterChange('category', category === 'All' ? '' : category.toUpperCase().replace(/ /g, '_'))
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (category === 'All' && !filters.category) ||
                filters.category === category.toUpperCase().replace(/ /g, '_')
                  ? 'bg-teal text-white'
                  : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() =>
                onFilterChange('status', status === 'All' ? '' : status.toUpperCase().replace(/ /g, '_'))
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (status === 'All' && !filters.status) ||
                filters.status === status.toUpperCase().replace(/ /g, '_')
                  ? 'bg-primary text-white'
                  : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
