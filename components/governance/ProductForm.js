'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, GripVertical, Image, Video } from 'lucide-react'

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
      heroImageUrl: '',
      productUrl: '',
      ctaLabel: 'Visit Site',
      startDate: new Date().toISOString().split('T')[0],
      usersReached: '',
      problemsSolved: '',
      geographicReach: '',
      country: '',
      region: '',
      impactScore: '',
      fundingStage: '',
      fundingAmount: '',
      techStack: '',
      teamMembers: '',
      mediaItems: [], // Array of { url, type, title }
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

  const fundingStages = [
    { value: '', label: 'Not specified' },
    { value: 'PRE_SEED', label: 'Pre-Seed' },
    { value: 'SEED', label: 'Seed' },
    { value: 'SERIES_A', label: 'Series A' },
    { value: 'SERIES_B', label: 'Series B' },
    { value: 'SERIES_C', label: 'Series C' },
    { value: 'BOOTSTRAPPED', label: 'Bootstrapped' },
    { value: 'GRANT_FUNDED', label: 'Grant Funded' },
    { value: 'NOT_SEEKING', label: 'Not Seeking Funding' },
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
          className="fixed inset-0 bg-black/50 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="min-h-screen px-4 py-20 flex items-center justify-center">
            <motion.div
              className="glass-card rounded-xl max-w-4xl w-full my-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 sm:px-8 py-4 sm:py-6 rounded-t-xl border-b border-stone-200 flex justify-between items-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                  {isEditing ? 'Edit Product' : 'New Product'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="px-6 sm:px-8 py-6 space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Basic Information</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
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

                    <div className="sm:col-span-2">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      />
                    </div>
                  </div>
                </div>

                  {/* Problem & Context */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Problem & Context</h4>
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
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Solution</h4>
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
                        Key Differentiators *
                      </label>
                      <textarea
                        required
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

                  {/* Hero Image */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Hero Image</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.heroImageUrl}
                        onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional: URL to a hero image for the product page. Leave blank to use category default.
                      </p>
                    </div>
                  </div>

                  {/* Product Link */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Product Link</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
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

                  {/* Metrics & Impact */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Metrics & Impact</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Users Reached
                        </label>
                        <input
                          type="number"
                          value={formData.usersReached}
                          onChange={(e) => setFormData({ ...formData, usersReached: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="e.g., 10000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Problems Solved
                        </label>
                        <input
                          type="number"
                          value={formData.problemsSolved}
                          onChange={(e) => setFormData({ ...formData, problemsSolved: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="e.g., 500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Impact Score (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.impactScore}
                          onChange={(e) => setFormData({ ...formData, impactScore: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="0-100"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Geographic Reach
                        </label>
                        <input
                          type="text"
                          value={formData.geographicReach}
                          onChange={(e) => setFormData({ ...formData, geographicReach: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="e.g., Nationwide, East Africa, Global"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location & Funding */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Location & Funding</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="e.g., Kenya"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Region
                        </label>
                        <input
                          type="text"
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="e.g., East Africa"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Funding Stage
                        </label>
                        <select
                          value={formData.fundingStage}
                          onChange={(e) => setFormData({ ...formData, fundingStage: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        >
                          {fundingStages.map((stage) => (
                            <option key={stage.value} value={stage.value}>
                              {stage.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Funding Amount (USD)
                        </label>
                        <input
                          type="number"
                          value={formData.fundingAmount}
                          onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
                          className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="e.g., 500000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Technology Stack</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technologies Used
                      </label>
                      <textarea
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={3}
                        placeholder="e.g., React, Node.js, PostgreSQL, AWS (comma-separated)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        List technologies separated by commas
                      </p>
                    </div>
                  </div>

                  {/* Media Gallery */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Media Gallery</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Add screenshots, images, or video URLs. These will appear in a carousel on the product page.
                    </p>

                    {/* Media Items List */}
                    <div className="space-y-3 mb-4">
                      {(Array.isArray(formData.mediaItems) ? formData.mediaItems : []).map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 items-start p-3 bg-stone-50 rounded-lg border border-stone-200"
                        >
                          <div className="text-gray-400 cursor-move mt-2">
                            <GripVertical className="w-4 h-4" />
                          </div>

                          {/* Preview */}
                          <div className="w-20 h-14 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                            {item.url ? (
                              item.type === 'VIDEO' ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                  <Video className="w-6 h-6 text-white" />
                                </div>
                              ) : (
                                <img
                                  src={item.url}
                                  alt={item.title || 'Media preview'}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                  }}
                                />
                              )
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Image className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Fields */}
                          <div className="flex-1 space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={item.url}
                                onChange={(e) => {
                                  const newMedia = [...formData.mediaItems]
                                  newMedia[index].url = e.target.value
                                  setFormData({ ...formData, mediaItems: newMedia })
                                }}
                                className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none text-sm"
                                placeholder="https://example.com/image.jpg"
                              />
                              <select
                                value={item.type}
                                onChange={(e) => {
                                  const newMedia = [...formData.mediaItems]
                                  newMedia[index].type = e.target.value
                                  setFormData({ ...formData, mediaItems: newMedia })
                                }}
                                className="px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none text-sm"
                              >
                                <option value="IMAGE">Image</option>
                                <option value="SCREENSHOT">Screenshot</option>
                                <option value="VIDEO">Video</option>
                              </select>
                            </div>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => {
                                const newMedia = [...formData.mediaItems]
                                newMedia[index].title = e.target.value
                                setFormData({ ...formData, mediaItems: newMedia })
                              }}
                              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none text-sm"
                              placeholder="Caption (optional)"
                            />
                          </div>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => {
                              const newMedia = formData.mediaItems.filter((_, i) => i !== index)
                              setFormData({ ...formData, mediaItems: newMedia })
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Media Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const currentMedia = Array.isArray(formData.mediaItems) ? formData.mediaItems : []
                        setFormData({
                          ...formData,
                          mediaItems: [
                            ...currentMedia,
                            { url: '', type: 'IMAGE', title: '' }
                          ]
                        })
                      }}
                      className="w-full py-3 border-2 border-dashed border-stone-300 rounded-lg text-gray-500 hover:border-teal hover:text-teal transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Media Item
                    </button>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Team Members</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team Members (Optional)
                      </label>
                      <textarea
                        value={formData.teamMembers}
                        onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                        rows={4}
                        placeholder="Enter team members, one per line:&#10;John Doe - Lead Developer&#10;Jane Smith - Designer"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        List team members in format: Name - Role (one per line)
                      </p>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Product Owner</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
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

                <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 border-t border-stone-200 rounded-b-xl flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:flex-1 px-6 py-3 border border-stone-300 rounded-lg text-gray-700 font-medium hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
