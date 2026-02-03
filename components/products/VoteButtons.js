'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export default function VoteButtons({ productId }) {
  const [votes, setVotes] = useState({ upvotes: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)

  useEffect(() => {
    fetchVotes()
  }, [productId])

  const fetchVotes = async () => {
    try {
      const response = await fetch(`/api/votes?productId=${productId}`)
      if (response.ok) {
        const data = await response.json()
        setVotes(data)
      }
    } catch (error) {
      console.error('Error fetching votes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async () => {
    if (isVoting) return

    setIsVoting(true)

    // Optimistic update
    setVotes(prev => ({
      ...prev,
      upvotes: prev.upvotes + 1
    }))

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, type: 'UPVOTE' }),
      })

      if (response.ok) {
        const data = await response.json()
        setVotes(data.counts)
      } else {
        // Revert optimistic update on failure
        fetchVotes()
      }
    } catch (error) {
      console.error('Error submitting vote:', error)
      fetchVotes()
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <motion.button
      onClick={handleVote}
      disabled={isVoting}
      className="w-full flex flex-col items-center gap-1 p-4 bg-white rounded-xl border border-stone-200 hover:border-teal transition-all group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center transition-all
        ${isVoting
          ? 'bg-teal text-white'
          : 'bg-stone-100 text-stone-600 group-hover:bg-teal group-hover:text-white'
        }
      `}>
        <ChevronUp className="w-6 h-6" />
      </div>
      <span className="text-2xl font-bold text-gray-800">
        {isLoading ? '-' : votes.upvotes}
      </span>
      <span className="text-xs text-gray-500 uppercase tracking-wider">Upvote</span>
    </motion.button>
  )
}
