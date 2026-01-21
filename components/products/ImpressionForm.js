'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Flame, Handshake, DollarSign, AlertTriangle, Target, X } from 'lucide-react'

export default function ImpressionForm({ productId, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [explanation, setExplanation] = useState('')
  const [anonymous, setAnonymous] = useState(true)

  const impressionTypes = [
    {
      type: 'INSIGHTFUL',
      label: 'Insightful',
      icon: Brain,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      hoverColor: 'hover:bg-purple-100',
    },
    {
      type: 'HIGH_POTENTIAL',
      label: 'High Potential',
      icon: Flame,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      hoverColor: 'hover:bg-orange-100',
    },
    {
      type: 'INTERESTED_PARTNERING',
      label: 'Interested in Partnering',
      icon: Handshake,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      type: 'INTERESTED_SPONSORING',
      label: 'Interested in Sponsoring',
      icon: DollarSign,
      color: 'text-green-600 bg-green-50 border-green-200',
      hoverColor: 'hover:bg-green-100',
    },
    {
      type: 'CONCERNS',
      label: 'Concerns / Questions',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50 border-red-200',
      hoverColor: 'hover:bg-red-100',
    },
    {
      type: 'SPECIFIC_EXPERTISE',
      label: 'Specific Expertise',
      icon: Target,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      hoverColor: 'hover:bg-teal-100',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedType) return

    onSubmit({
      productId,
      type: selectedType,
      explanation: explanation.trim() || null,
      anonymous,
    })

    // Reset form
    setSelectedType(null)
    setExplanation('')
    setIsOpen(false)
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200">
      <h3 className="text-xl font-bold text-primary mb-4">Leave Your Impression</h3>
      <p className="text-gray-600 mb-6 text-sm">
        Share structured feedback to help us understand what resonates and what needs attention.
      </p>

      {/* Quick Impression Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {impressionTypes.map((impression) => {
          const Icon = impression.icon
          return (
            <motion.button
              key={impression.type}
              onClick={() => {
                setSelectedType(impression.type)
                setIsOpen(true)
              }}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${impression.color} ${impression.hoverColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium text-center">{impression.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-primary">
                  {impressionTypes.find((i) => i.type === selectedType)?.label}
                </h4>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation (Optional, max 200 characters)
                  </label>
                  <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value.slice(0, 200))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none resize-none"
                    rows={3}
                    placeholder="Add context to your impression..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{explanation.length}/200</p>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-4 h-4 text-teal rounded focus:ring-teal"
                    />
                    <span className="text-sm text-gray-700">Submit anonymously</span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 border border-stone-300 rounded-lg text-gray-700 font-medium hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-dark transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
