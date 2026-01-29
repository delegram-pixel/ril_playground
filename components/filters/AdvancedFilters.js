'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import TechStackFilter from './TechStackFilter'
import Select from 'react-select'

const countryOptions = [
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'Rwanda', label: 'Rwanda' },
]

const fundingStageOptions = [
  { value: 'PRE_SEED', label: 'Pre-Seed' },
  { value: 'SEED', label: 'Seed' },
  { value: 'SERIES_A', label: 'Series A' },
  { value: 'SERIES_B', label: 'Series B' },
  { value: 'BOOTSTRAPPED', label: 'Bootstrapped' },
  { value: 'GRANT_FUNDED', label: 'Grant Funded' },
  { value: 'NOT_SEEKING', label: 'Not Seeking' },
]

export default function AdvancedFilters({ filters, onFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#e7e5e4',
      '&:hover': {
        borderColor: '#0d9488',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#0d9488' : state.isFocused ? '#ccfbf1' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
    }),
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-teal" />
          <span className="font-semibold text-gray-800">Advanced Filters</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-stone-200"
          >
            <div className="p-4 space-y-4">
              {/* Tech Stack */}
              <TechStackFilter
                selectedTech={filters.techStack || []}
                onChange={(selected) => onFilterChange('techStack', selected)}
              />

              {/* Geography */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Geography
                </label>
                <Select
                  options={countryOptions}
                  value={
                    filters.country
                      ? countryOptions.find((opt) => opt.value === filters.country)
                      : null
                  }
                  onChange={(selected) =>
                    onFilterChange('country', selected ? selected.value : null)
                  }
                  placeholder="Select country..."
                  isClearable
                  styles={customStyles}
                  className="text-sm"
                />
              </div>

              {/* Funding Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Funding Stage
                </label>
                <Select
                  options={fundingStageOptions}
                  value={
                    filters.fundingStage
                      ? fundingStageOptions.find((opt) => opt.value === filters.fundingStage)
                      : null
                  }
                  onChange={(selected) =>
                    onFilterChange('fundingStage', selected ? selected.value : null)
                  }
                  placeholder="Select funding stage..."
                  isClearable
                  styles={customStyles}
                  className="text-sm"
                />
              </div>

              {/* Impact Score Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Impact Score
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minImpactScore || 0}
                  onChange={(e) => onFilterChange('minImpactScore', parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span className="font-semibold text-teal">
                    {filters.minImpactScore || 0}
                  </span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
