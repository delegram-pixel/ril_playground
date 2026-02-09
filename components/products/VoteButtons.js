'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function VoteButtons({ productId }) {
  const { user } = useAuth()
  const [votes, setVotes] = useState({ upvotes: 0, hasVoted: false })
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

    if (!user) {
      alert('Please log in to vote.')
      return
    }

    setIsVoting(true)

    // Optimistic update
    setVotes(prev => ({
      ...prev,
      upvotes: prev.hasVoted ? prev.upvotes - 1 : prev.upvotes + 1,
      hasVoted: !prev.hasVoted,
    }))

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })

      if (response.ok) {
        const data = await response.json()
        setVotes({ upvotes: data.counts.upvotes, hasVoted: data.hasVoted })
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

  const hasVoted = votes.hasVoted

  return (
    <motion.button
      onClick={handleVote}
      disabled={isVoting}
      className={`w-full flex flex-col items-center gap-1 p-4 rounded-xl border transition-all group ${
        hasVoted
          ? 'bg-teal/10 border-teal'
          : 'bg-white border-stone-200 hover:border-teal'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center transition-all
        ${hasVoted
          ? 'bg-teal text-white'
          : 'bg-stone-100 text-stone-600 group-hover:bg-teal group-hover:text-white'
        }
      `}>
        <ChevronUp className="w-6 h-6" />
      </div>
      <span className="text-2xl font-bold text-gray-800">
        {isLoading ? '-' : votes.upvotes}
      </span>
      <span className="text-xs text-gray-500 uppercase tracking-wider">
        {hasVoted ? 'Upvoted' : 'Upvote'}
      </span>
    </motion.button>
  )
}
