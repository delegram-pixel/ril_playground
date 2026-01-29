'use client'

import { motion } from 'framer-motion'
import { History } from 'lucide-react'
import ChangelogEntry from './ChangelogEntry'

export default function ChangelogTimeline({ changelog = [] }) {
  if (!changelog || changelog.length === 0) {
    return null
  }

  // Sort by date descending (newest first)
  const sortedChangelog = [...changelog].sort(
    (a, b) => new Date(b.milestoneDate) - new Date(a.milestoneDate)
  )

  return (
    <motion.section
      className="glass-card rounded-xl p-8 border border-stone-200"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-teal" />
        <h2 className="text-2xl font-bold text-primary">Product Journey</h2>
      </div>

      <div className="space-y-0">
        {sortedChangelog.map((entry, idx) => (
          <ChangelogEntry key={entry.id} entry={entry} isFirst={idx === 0} />
        ))}
      </div>
    </motion.section>
  )
}
