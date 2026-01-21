'use client'

import { motion } from 'framer-motion'
import { Package, Rocket, CheckCircle, Archive } from 'lucide-react'
import { sampleProducts } from '@/lib/sampleData'

export default function PortfolioStats() {
  const stats = {
    total: sampleProducts.length,
    active: sampleProducts.filter((p) =>
      ['IN_DEVELOPMENT', 'MVP', 'LIVE'].includes(p.status)
    ).length,
    live: sampleProducts.filter((p) => p.status === 'LIVE').length,
    archived: sampleProducts.filter((p) => p.status === 'ARCHIVED').length,
  }

  const statCards = [
    {
      label: 'Total Products',
      value: stats.total,
      icon: Package,
      color: 'bg-primary/10 text-primary',
      iconColor: 'text-primary',
    },
    {
      label: 'Active Development',
      value: stats.active,
      icon: Rocket,
      color: 'bg-orange-100 text-orange-600',
      iconColor: 'text-orange-600',
    },
    {
      label: 'Live Products',
      value: stats.live,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      iconColor: 'text-green-600',
    },
    {
      label: 'Archived',
      value: stats.archived,
      icon: Archive,
      color: 'bg-gray-100 text-gray-600',
      iconColor: 'text-gray-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            className="bg-stone-50 rounded-xl p-6 border border-stone-200 card-hover"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
