'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'

export default function ShareButtons({ product }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `Check out ${product.name} - ${product.tagline}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareTitle
    )}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`
    window.open(linkedinUrl, '_blank', 'width=550,height=420')
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share:
      </span>

      <motion.button
        onClick={shareOnTwitter}
        className="p-2 rounded-lg bg-stone-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </motion.button>

      <motion.button
        onClick={shareOnLinkedIn}
        className="p-2 rounded-lg bg-stone-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </motion.button>

      <motion.button
        onClick={copyToClipboard}
        className={`p-2 rounded-lg transition-colors ${
          copied
            ? 'bg-green-100 text-green-600'
            : 'bg-stone-100 hover:bg-stone-200 text-gray-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
      </motion.button>
    </div>
  )
}
