'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Users,
  TrendingUp,
  MapPin,
  ExternalLink,

  Clock,
} from 'lucide-react'
import {
  sampleProducts,
  sampleImpressions,
  getProductMedia,
  getProductLinks,
  getProductChangelog,
  getProductTechStack,
  getProductRelated,
} from '@/lib/sampleData'
import StatusBadge from '@/components/products/StatusBadge'
import CategoryBadge from '@/components/products/CategoryBadge'
import ImpressionForm from '@/components/products/ImpressionForm'
import ImpressionSummary from '@/components/products/ImpressionSummary'
import MediaGallery from '@/components/gallery/MediaGallery'
import ChangelogTimeline from '@/components/changelog/ChangelogTimeline'
import TeamSection from '@/components/team/TeamSection'
import ShareButtons from '@/components/share/ShareButtons'
import PDFExport from '@/components/share/PDFExport'
import RelatedProducts from '@/components/products/RelatedProducts'
import { Github, ExternalLink as LinkIcon, FileText } from 'lucide-react'

export default function ProductProfilePage({ params }) {
  const product = sampleProducts.find((p) => p.id === params.id)
  const impressions = sampleImpressions.filter((i) => i.productId === params.id)

  // Get related data
  const media = getProductMedia(params.id)
  const links = getProductLinks(params.id)
  const changelog = getProductChangelog(params.id)
  const techStack = getProductTechStack(params.id)
  const relatedProducts = getProductRelated(params.id)

  const [userImpressions, setUserImpressions] = useState([])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-teal hover:underline">
            Return to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleImpressionSubmit = async (impression) => {
    try {
      const response = await fetch('/api/impressions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(impression),
      })

      if (response.ok) {
        setUserImpressions([...userImpressions, impression])
        alert('✓ Thank you for your impression! Your feedback has been recorded.')
      } else {
        alert('Failed to submit impression. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting impression:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const getCategoryImage = (category) => {
    const images = {
      CIVIC_TECH: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
      HEALTH_TECH: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80',
      AI_INFRASTRUCTURE: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80',
      FINTECH: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80',
      EDTECH: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80',
      AGRITECH: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80',
      CLIMATE_TECH: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=1920&q=80',
      OTHER: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    }
    return images[category] || images.OTHER
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const daysSinceUpdate = Math.floor(
    (new Date() - new Date(product.lastUpdated)) / (1000 * 60 * 60 * 24)
  )


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${product.heroImageUrl || getCategoryImage(product.category)})`,
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white hover:text-brown-light mb-6 w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>

          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="flex flex-wrap gap-3 mb-4">
              <CategoryBadge category={product.category} />
              <StatusBadge status={product.status} />
            </div>

            <h1 className="text-5xl font-bold text-white mb-3">{product.name}</h1>
            {product.codename && (
              <p className="text-xl text-stone-200 font-mono mb-3">{product.codename}</p>
            )}
            <p className="text-2xl text-stone-100 max-w-3xl">{product.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Warnings */}


            {/* Problem & Context */}
            <motion.section
              className="glass-card rounded-xl p-8 border border-stone-200"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-primary mb-4">Problem & Context</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Problem Statement</h3>
                  <p className="text-gray-600">{product.problemStatement}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Target Users</h3>
                  <p className="text-gray-600">{product.targetUsers}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Local Context</h3>
                  <p className="text-gray-600">{product.localContext}</p>
                </div>
              </div>
            </motion.section>

            {/* Solution Overview */}
            <motion.section
              className="glass-card rounded-xl p-8 border border-stone-200"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-primary mb-4">Solution Overview</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Core Approach</h3>
                  <p className="text-gray-600">{product.solutionOverview}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Key Differentiators</h3>
                  <p className="text-gray-600">{product.keyDifferentiators}</p>
                </div>
                {product.systemLogic && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">System Logic</h3>
                    <p className="text-gray-600 font-mono text-sm bg-stone-50 p-4 rounded-lg">
                      {product.systemLogic}
                    </p>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Media Gallery */}
            <MediaGallery media={media} />

            {/* Product Links */}
            {links.length > 0 && (
              <motion.section
                className="glass-card rounded-xl p-8 border border-stone-200"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Links & Resources</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {link.type === 'GITHUB' ? (
                          <Github className="w-6 h-6" />
                        ) : link.type === 'DOCS' ? (
                          <FileText className="w-6 h-6" />
                        ) : (
                          <LinkIcon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-teal transition-colors">
                          {link.label}
                        </h4>
                        {link.description && (
                          <p className="text-sm text-gray-600">{link.description}</p>
                        )}
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-teal transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technology Stack */}
            {techStack.length > 0 && (
              <motion.section
                className="glass-card rounded-xl p-8 border border-stone-200"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Technology Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech.id}
                      className="px-3 py-2 bg-teal/10 text-teal rounded-lg text-sm font-medium"
                    >
                      {tech.technology}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Metrics & Impact */}
            {(product.usersReached || product.problemsSolved || product.geographicReach) && (
              <motion.section
                className="glass-card rounded-xl p-8 border border-stone-200"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-4">Impact & Reach</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {product.usersReached && (
                    <div className="bg-teal/5 rounded-lg p-4">
                      <div className="text-3xl font-bold text-teal mb-1">
                        {product.usersReached.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Users Reached</div>
                    </div>
                  )}
                  {product.problemsSolved && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {product.problemsSolved.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Problems Solved</div>
                    </div>
                  )}
                  {product.geographicReach && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-semibold">Geographic Reach</span>
                      </div>
                      <div className="text-sm text-gray-600">{product.geographicReach}</div>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Impression Summary */}
            <ImpressionSummary impressions={impressions} />

            {/* Impression Form */}
            <ImpressionForm productId={product.id} onSubmit={handleImpressionSubmit} />

            {/* Product Journey / Changelog */}
            <ChangelogTimeline changelog={changelog} />

            {/* Team Section */}
            <TeamSection team={product.team} owner={product.owner} />

            {/* Share & Export */}
            <motion.section
              className="glass-card rounded-xl p-6 border border-stone-200"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <ShareButtons product={product} />
                <PDFExport product={product} />
              </div>
            </motion.section>

            {/* Related Products */}
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            {product.productUrl && (
              <motion.a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-teal text-white text-center py-4 px-6 rounded-xl font-semibold hover:bg-teal-dark transition-colors flex items-center justify-center gap-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                {product.ctaLabel || 'Visit Site'}
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}

            {/* Status & Timeline */}
            <motion.div
              className="glass-card rounded-xl p-6 border border-stone-200"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3 className="font-bold text-primary mb-4">Status & Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Started</div>
                    <div className="font-medium">{formatDate(product.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Last Updated</div>
                    <div className="font-medium">
                      {formatDate(product.lastUpdated)} ({daysSinceUpdate} days ago)
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team */}
            <motion.div
              className="glass-card rounded-xl p-6 border border-stone-200"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team
              </h3>
              <div className="space-y-4">
                {product.team ? (
                  product.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-100"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{member.name}</div>
                        <div className="text-xs text-teal font-medium uppercase tracking-wider">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3">
                    {product.owner.avatarUrl && (
                      <img
                        src={product.owner.avatarUrl}
                        alt={product.owner.name}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{product.owner.name}</div>
                      <div className="text-sm text-gray-500">Product Lead</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
