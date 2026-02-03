'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, GripVertical, Image, Video, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Basic Info', description: 'Name and category' },
  { id: 2, title: 'Problem', description: 'Context and users' },
  { id: 3, title: 'Solution', description: 'Your approach' },
  { id: 4, title: 'Media', description: 'Images and links' },
  { id: 5, title: 'Impact', description: 'Metrics and reach' },
  { id: 6, title: 'Team', description: 'Owner and members' },
]

export default function ProductForm({ isOpen, onClose, product = null }) {
  const isEditing = !!product
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)

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
      mediaItems: [],
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

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    setDirection(step > currentStep ? 1 : -1)
    setCurrentStep(step)
  }

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
          ? 'Product updated successfully!'
          : 'Product created successfully!'
      )
      onClose()
      window.location.reload()
    } catch (error) {
      console.error('Error submitting product:', error)
      alert(error.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
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
            </div>

            <div>
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

            <div className="grid sm:grid-cols-3 gap-4">
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
        )

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Statement *
              </label>
              <textarea
                required
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                rows={4}
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
                rows={3}
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
                rows={4}
                placeholder="What is the local/regional context for this problem?"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solution Overview *
              </label>
              <textarea
                required
                value={formData.solutionOverview}
                onChange={(e) => setFormData({ ...formData, solutionOverview: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                rows={4}
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
                onChange={(e) => setFormData({ ...formData, keyDifferentiators: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                rows={3}
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
                placeholder="Brief technical description (optional)"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-5">
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
                Leave blank to use category default image.
              </p>
            </div>

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

            {/* Media Gallery */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Gallery
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Add screenshots, images, or video URLs.
              </p>

              <div className="space-y-3 mb-4">
                {(Array.isArray(formData.mediaItems) ? formData.mediaItems : []).map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start p-3 bg-stone-50 rounded-lg border border-stone-200"
                  >
                    <div className="w-16 h-12 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                      {item.url ? (
                        item.type === 'VIDEO' ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <Video className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <img
                            src={item.url}
                            alt={item.title || 'Media preview'}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

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
                          placeholder="URL"
                        />
                        <select
                          value={item.type}
                          onChange={(e) => {
                            const newMedia = [...formData.mediaItems]
                            newMedia[index].type = e.target.value
                            setFormData({ ...formData, mediaItems: newMedia })
                          }}
                          className="px-2 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none text-sm"
                        >
                          <option value="IMAGE">Image</option>
                          <option value="VIDEO">Video</option>
                        </select>
                      </div>
                    </div>

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

              <button
                type="button"
                onClick={() => {
                  const currentMedia = Array.isArray(formData.mediaItems) ? formData.mediaItems : []
                  setFormData({
                    ...formData,
                    mediaItems: [...currentMedia, { url: '', type: 'IMAGE', title: '' }]
                  })
                }}
                className="w-full py-2.5 border-2 border-dashed border-stone-300 rounded-lg text-gray-500 hover:border-teal hover:text-teal transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Media
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-5">
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
            </div>

            <div>
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
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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
        )

      case 6:
        return (
          <div className="space-y-5">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <textarea
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                rows={2}
                placeholder="e.g., React, Node.js, PostgreSQL (comma-separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Members
              </label>
              <textarea
                value={formData.teamMembers}
                onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                rows={4}
                placeholder="Enter team members, one per line:&#10;John Doe - Lead Developer&#10;Jane Smith - Designer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: Name - Role (one per line)
              </p>
            </div>
          </div>
        )

      default:
        return null
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
          <div className="min-h-screen px-4 py-10 flex items-center justify-center">
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full relative overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-stone-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isEditing ? 'Edit Product' : 'New Product'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
                <div className="flex items-center justify-between">
                  {STEPS.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => goToStep(step.id)}
                      className="flex flex-col items-center group"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          currentStep === step.id
                            ? 'bg-teal text-white'
                            : currentStep > step.id
                            ? 'bg-teal/20 text-teal'
                            : 'bg-stone-200 text-gray-500'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span
                        className={`text-xs mt-1.5 hidden sm:block ${
                          currentStep === step.id
                            ? 'text-teal font-medium'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content with Animation */}
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-6 min-h-[380px] overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      currentStep === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-stone-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 text-gray-600 hover:bg-stone-100 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>

                    {currentStep < STEPS.length ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create Product'}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
