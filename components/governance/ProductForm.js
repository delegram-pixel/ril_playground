'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function ProductForm({ isOpen, onClose, product = null }) {
  const isEditing = !!product

  const [formData, setFormData] = useState(
    product || {
      name: '',
      codename: '',
      tagline: '',
      category: 'CIVIC_TECH',
      status: 'EXPLORING',
      problemStatement: '',
      targetUsers: '',
      localContext: '',
      solutionOverview: '',
      keyDifferentiators: '',
      systemLogic: '',
      productUrl: '',
      ctaLabel: 'Visit Site',
      owner: {
        name: '',
        email: '',
      },
    }
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'CIVIC_TECH', label: 'CivicTech' },
    { value: 'HEALTH_TECH', label: 'HealthTech' },
    { value: 'AI_INFRASTRUCTURE', label: 'AI Infrastructure' },
    { value: 'FINTECH', label: 'FinTech' },
    { value: 'EDTECH', label: 'EdTech' },
    { value: 'AGRITECH', label: 'AgriTech' },
    { value: 'CLIMATE_TECH', label: 'ClimateTech' },
    { value: 'OTHER', label: 'Other' },
  ]

  const statuses = [
    { value: 'EXPLORING', label: 'Exploring' },
    { value: 'IN_DEVELOPMENT', label: 'In Development' },
    { value: 'MVP', label: 'MVP' },
    { value: 'LIVE', label: 'Live' },
    { value: 'PAUSED', label: 'Paused' },
    { value: 'ARCHIVED', label: 'Archived' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = isEditing ? `/api/products/${product.id}` : '/api/products'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startDate: formData.startDate || new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save product')
      }

      alert(
        isEditing
          ? '✓ Product updated successfully!'
          : '✓ Product created successfully!'
      )
      onClose()

      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      console.error('Error submitting product:', error)
      alert(error.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card rounded-xl p-8 max-w-4xl w-full my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-primary">
                {isEditing ? 'Edit Product' : 'New Product'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="e.g., HealthBridge"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Codename
                      </label>
                      <input
                        type="text"
                        value={formData.codename}
                        onChange={(e) => setFormData({ ...formData, codename: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="e.g., Project Apollo"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tagline *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="One-line description of the product"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Problem & Context */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Problem & Context</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Problem Statement *
                      </label>
                      <textarea
                        required
                        value={formData.problemStatement}
                        onChange={(e) =>
                          setFormData({ ...formData, problemStatement: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={3}
                        placeholder="What problem does this product solve?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Users *
                      </label>
                      <textarea
                        required
                        value={formData.targetUsers}
                        onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={2}
                        placeholder="Who are the primary users?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Local Context *
                      </label>
                      <textarea
                        required
                        value={formData.localContext}
                        onChange={(e) => setFormData({ ...formData, localContext: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={3}
                        placeholder="What is the local/regional context for this problem?"
                      />
                    </div>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Solution</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Solution Overview *
                      </label>
                      <textarea
                        required
                        value={formData.solutionOverview}
                        onChange={(e) =>
                          setFormData({ ...formData, solutionOverview: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={3}
                        placeholder="How does this product solve the problem?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Differentiators
                      </label>
                      <textarea
                        value={formData.keyDifferentiators}
                        onChange={(e) =>
                          setFormData({ ...formData, keyDifferentiators: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={2}
                        placeholder="What makes this solution unique?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        System Logic
                      </label>
                      <textarea
                        value={formData.systemLogic}
                        onChange={(e) => setFormData({ ...formData, systemLogic: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none font-mono text-sm"
                        rows={3}
                        placeholder="Brief technical description"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Link */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Product Link</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product URL
                      </label>
                      <input
                        type="url"
                        value={formData.productUrl}
                        onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={formData.ctaLabel}
                        onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="Visit Site"
                      />
                    </div>
                  </div>
                </div>

                {/* Owner Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Product Owner</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.owner.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            owner: { ...formData.owner, name: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="Full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.owner.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            owner: { ...formData.owner, email: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-stone-300 rounded-lg text-gray-700 font-medium hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
