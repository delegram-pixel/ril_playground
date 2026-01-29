'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function FilterChips({ filters, onRemove, onClearAll }) {
  const activeFilters = []

  if (filters.category && filters.category !== 'ALL') {
    activeFilters.push({ type: 'category', value: filters.category })
  }
  if (filters.status && filters.status !== 'ALL') {
    activeFilters.push({ type: 'status', value: filters.status })
  }
  if (filters.country) {
    activeFilters.push({ type: 'country', value: filters.country })
  }
  if (filters.fundingStage) {
    activeFilters.push({ type: 'fundingStage', value: filters.fundingStage })
  }
  if (filters.techStack && filters.techStack.length > 0) {
    filters.techStack.forEach((tech) => {
      activeFilters.push({ type: 'techStack', value: tech.label || tech })
    })
  }

  if (activeFilters.length === 0) {
    return null
  }

  const getFilterLabel = (type) => {
    const labels = {
      category: 'Category',
      status: 'Status',
      country: 'Country',
      fundingStage: 'Funding',
      techStack: 'Tech',
    }
    return labels[type] || type
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-stone-50 rounded-lg border border-stone-200">
      <span className="text-sm font-semibold text-gray-600">Active Filters:</span>

      <AnimatePresence>
        {activeFilters.map((filter, idx) => (
          <motion.div
            key={`${filter.type}-${filter.value}-${idx}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-teal text-white rounded-full text-sm font-medium"
          >
            <span className="text-xs opacity-75">{getFilterLabel(filter.type)}:</span>
            <span>{filter.value}</span>
            <button
              onClick={() => onRemove(filter.type, filter.value)}
              className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 underline font-medium ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
