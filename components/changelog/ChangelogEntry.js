'use client'

import { motion } from 'framer-motion'
import { Calendar, Star, GitCommit } from 'lucide-react'
import { format } from 'date-fns'

export default function ChangelogEntry({ entry, isFirst = false }) {
  const getCategoryColor = (category) => {
    const colors = {
      feature: 'bg-green-100 text-green-700',
      bugfix: 'bg-red-100 text-red-700',
      milestone: 'bg-purple-100 text-purple-700',
      announcement: 'bg-blue-100 text-blue-700',
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  const getCategoryIcon = (category) => {
    if (category === 'milestone') return <Star className="w-4 h-4" />
    return <GitCommit className="w-4 h-4" />
  }

  return (
    <motion.div
      className="relative pl-8 pb-8 border-l-2 border-stone-200 last:border-l-0 last:pb-0"
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full border-2 ${
          entry.isMajor
            ? 'bg-teal border-teal'
            : 'bg-white border-stone-300'
        }`}
      />

      {/* Content */}
      <div className="bg-white rounded-lg border border-stone-200 p-5 hover:border-teal/50 transition-colors">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-800 text-lg">{entry.title}</h3>
              {entry.isMajor && (
                <span className="px-2 py-1 bg-teal text-white text-xs font-semibold rounded">
                  MAJOR
                </span>
              )}
            </div>
            {entry.version && (
              <div className="text-sm text-gray-500 font-mono mb-2">v{entry.version}</div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {format(new Date(entry.milestoneDate), 'MMM d, yyyy')}
          </div>
        </div>

        <p className="text-gray-600 mb-3">{entry.description}</p>

        {entry.category && (
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              entry.category
            )}`}
          >
            {getCategoryIcon(entry.category)}
            {entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
          </span>
        )}
      </div>
    </motion.div>
  )
}
