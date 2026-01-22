'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, UserX, Plus, Edit, Trash2 } from 'lucide-react'
import { sampleProducts } from '@/lib/sampleData'
import StatusBadge from '@/components/products/StatusBadge'
import CategoryBadge from '@/components/products/CategoryBadge'

export default function GovernancePage() {
  const [view, setView] = useState('overview') // overview, create, edit

  // Calculate governance metrics
  const staleProducts = sampleProducts.filter((p) => {
    const daysSinceUpdate = Math.floor(
      (new Date() - new Date(p.lastUpdated)) / (1000 * 60 * 60 * 24)
    )
    return daysSinceUpdate > 90
  })

  const productHealth = sampleProducts.map((product) => {
    const daysSinceUpdate = Math.floor(
      (new Date() - new Date(product.lastUpdated)) / (1000 * 60 * 60 * 24)
    )
    let health = 'healthy'
    if (daysSinceUpdate > 90) health = 'stale'
    if (!product.owner) health = 'critical'
    return { ...product, health, daysSinceUpdate }
  })

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-2">Governance Dashboard</h1>
              <p className="text-gray-600">Internal portfolio management and oversight</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-dark transition-all hover:shadow-lg">
              <Plus className="w-5 h-5" />
              New Product
            </button>
          </div>

          {/* Governance Alerts */}
          {staleProducts.length > 0 && (
            <motion.div
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg flex items-start gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Attention Required</h4>
                <p className="text-sm text-yellow-700">
                  {staleProducts.length} product{staleProducts.length !== 1 ? 's' : ''} haven't been
                  updated in over 90 days. Please review and update.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="glass-card rounded-xl p-6 border border-stone-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl font-bold text-primary mb-1">{sampleProducts.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </motion.div>

          <motion.div
            className="glass-card rounded-xl p-6 border border-stone-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-1">
              {productHealth.filter((p) => p.health === 'healthy').length}
            </div>
            <div className="text-sm text-gray-600">Healthy</div>
          </motion.div>

          <motion.div
            className="glass-card rounded-xl p-6 border border-stone-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {productHealth.filter((p) => p.health === 'stale').length}
            </div>
            <div className="text-sm text-gray-600">Needs Update</div>
          </motion.div>

          <motion.div
            className="glass-card rounded-xl p-6 border border-stone-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl font-bold text-red-600 mb-1">
              {productHealth.filter((p) => p.health === 'critical').length}
            </div>
            <div className="text-sm text-gray-600">Critical Issues</div>
          </motion.div>
        </div>

        {/* Products Table */}
        <motion.div
          className="glass-card rounded-xl border border-stone-200 overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-2xl font-bold text-primary">All Products</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {productHealth.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-primary">{product.name}</div>
                      {product.codename && (
                        <div className="text-sm text-gray-500 font-mono">{product.codename}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <CategoryBadge category={product.category} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.owner ? (
                        <div className="flex items-center gap-2">
                          {product.owner.avatarUrl && (
                            <img
                              src={product.owner.avatarUrl}
                              alt={product.owner.name}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.owner.name}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <UserX className="w-4 h-4" />
                          <span className="text-sm">No Owner</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(product.lastUpdated)}</div>
                      <div className="text-xs text-gray-500">{product.daysSinceUpdate} days ago</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.health === 'healthy' && (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          Healthy
                        </span>
                      )}
                      {product.health === 'stale' && (
                        <span className="inline-flex items-center gap-1 text-yellow-600 text-sm">
                          <Clock className="w-4 h-4" />
                          Stale
                        </span>
                      )}
                      {product.health === 'critical' && (
                        <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Critical
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-gray-600 hover:text-teal hover:bg-stone-100 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Archive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Governance Rules */}
        <motion.div
          className="mt-8 bg-white rounded-xl p-6 border border-stone-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-primary mb-4">Governance Rules</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-teal mt-0.5">✓</span>
              <span>Every product must have a named owner</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-0.5">✓</span>
              <span>Products must be updated at least every 90 days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-0.5">✓</span>
              <span>Status must accurately reflect current state</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-0.5">✓</span>
              <span>Archived products remain visible but marked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal mt-0.5">✓</span>
              <span>All products must be registered (no exceptions)</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
