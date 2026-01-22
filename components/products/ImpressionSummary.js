'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, HandHelping, DollarSign, AlertTriangle, Target } from 'lucide-react'

export default function ImpressionSummary({ impressions }) {
  const impressionConfig = {
    INSIGHTFUL: {
      label: 'Insightful',
      icon: Brain,
      color: 'text-purple-600 bg-purple-50',
    },
    HIGH_POTENTIAL: {
      label: 'High Potential',
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-50',
    },
    INTERESTED_PARTNERING: {
      label: 'Interested in Partnering',
      icon: HandHelping,
      color: 'text-blue-600 bg-blue-50',
    },
    INTERESTED_SPONSORING: {
      label: 'Interested in Sponsoring',
      icon: DollarSign,
      color: 'text-green-600 bg-green-50',
    },
    CONCERNS: {
      label: 'Concerns / Questions',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
    },
    SPECIFIC_EXPERTISE: {
      label: 'Specific Expertise',
      icon: Target,
      color: 'text-teal-600 bg-teal-50',
    },
  }

  const totalImpressions = impressions.reduce((sum, imp) => sum + (imp.count || 0), 0)

  if (impressions.length === 0) {
    return null
  }

  return (
    <motion.section
      className="glass-card rounded-xl p-8 border border-stone-200"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-primary mb-2">Community Signals</h2>
      <p className="text-gray-600 mb-6 text-sm">
        {totalImpressions} impression{totalImpressions !== 1 ? 's' : ''} from the community
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {impressions.map((impression, index) => {
          const config = impressionConfig[impression.type]
          if (!config) return null

          const Icon = config.icon

          return (
            <motion.div
              key={impression.type}
              className={`flex items-center gap-4 p-4 rounded-lg border border-stone-200 ${config.color}`}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">{config.label}</div>
                <div className="text-2xl font-bold">{impression.count}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
