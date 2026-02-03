'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  ExternalLink,
  Clock,
  Loader2,
  Share2,
  Info,
  TrendingUp,
  FolderOpen,
  CheckCircle2,
  Circle,
  FileText,
  Github,
  Link as LinkIcon,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import StatusBadge from '@/components/products/StatusBadge'
import CategoryBadge from '@/components/products/CategoryBadge'
import ImpressionForm from '@/components/products/ImpressionForm'
import ImpressionSummary from '@/components/products/ImpressionSummary'
import VoteButtons from '@/components/products/VoteButtons'
import MediaGallery from '@/components/gallery/MediaGallery'
import ShareButtons from '@/components/share/ShareButtons'
import PDFExport from '@/components/share/PDFExport'

export default function ProductProfilePage({ params }) {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [impressions, setImpressions] = useState([])
  const [media, setMedia] = useState([])
  const [links, setLinks] = useState([])
  const [changelog, setChangelog] = useState([])
  const [techStack, setTechStack] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [userImpressions, setUserImpressions] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const transformProduct = (data) => {
    if (!data) return null
    return {
      id: data.id,
      name: data.name,
      codename: data.codename,
      tagline: data.tagline,
      category: data.category,
      problemStatement: data.problem_statement,
      targetUsers: data.target_users,
      localContext: data.local_context,
      solutionOverview: data.solution_overview,
      keyDifferentiators: data.key_differentiators,
      systemLogic: data.system_logic,
      status: data.status,
      startDate: data.start_date || data.created_at,
      lastUpdated: data.last_updated || data.updated_at || data.created_at,
      createdAt: data.created_at,
      heroImageUrl: data.hero_image_url,
      productUrl: data.product_url,
      ctaLabel: data.cta_label,
      usersReached: data.users_reached,
      problemsSolved: data.problems_solved,
      geographicReach: data.geographic_reach,
      owner: data.owner ? {
        id: data.owner.id,
        name: data.owner.name,
        email: data.owner.email,
        avatarUrl: data.owner.avatar_url,
      } : null,
      team: data.team,
    }
  }

  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          owner:users!owner_id(id, name, email, avatar_url)
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error
      setProduct(transformProduct(data))

      if (data) {
        const [mediaRes, linksRes, techRes, teamRes] = await Promise.all([
          supabase.from('product_media').select('*').eq('product_id', params.id).order('display_order'),
          supabase.from('product_links').select('*').eq('product_id', params.id),
          supabase.from('product_tech_stack').select('*').eq('product_id', params.id),
          supabase.from('team_members').select(`
            id,
            role,
            user:users(id, name, email, avatar_url)
          `).eq('product_id', params.id),
        ])

        setMedia(mediaRes.data || [])
        setLinks(linksRes.data || [])
        setTechStack(techRes.data || [])

        if (teamRes.data) {
          const transformedTeam = teamRes.data.map(tm => ({
            id: tm.id,
            name: tm.user?.name,
            email: tm.user?.email,
            avatarUrl: tm.user?.avatar_url,
            role: tm.role,
          }))
          setProduct(prev => prev ? { ...prev, team: transformedTeam } : null)
        }
      }
    } catch (err) {
      console.error('Error fetching product:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-12 h-12 text-teal animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">Product Not Found</h1>
          <Link href="/" className="text-teal hover:underline">
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(impression),
      })
      if (response.ok) {
        setUserImpressions([...userImpressions, impression])
        alert('Thank you for your impression!')
      }
    } catch (error) {
      console.error('Error submitting impression:', error)
    }
  }

  const getCategoryImage = (category) => {
    const images = {
      CIVIC_TECH: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
      HEALTH_TECH: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
      AI_INFRASTRUCTURE: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
      FINTECH: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
      EDTECH: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
      AGRITECH: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
      CLIMATE_TECH: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=400&q=80',
      OTHER: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    }
    return images[category] || images.OTHER
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const daysSinceUpdate = Math.floor(
    (new Date() - new Date(product.lastUpdated)) / (1000 * 60 * 60 * 24)
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'timeline', label: 'Timeline', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-teal transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/" className="text-gray-500 hover:text-teal transition-colors">
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image/Icon */}
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 rounded-xl bg-cover bg-center border border-stone-200"
                style={{
                  backgroundImage: `url(${product.heroImageUrl || getCategoryImage(product.category)})`,
                }}
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <StatusBadge status={product.status} />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Status: {product.status.replace('_', ' ')} / {product.category.replace('_', ' ')}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Last updated {daysSinceUpdate} days ago</span>
                    {product.owner && (
                      <>
                        <span>by</span>
                        <span className="text-teal">{product.owner.name}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {product.productUrl && (
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg text-gray-700 font-medium hover:bg-stone-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  )}
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-t border-stone-100 pt-4">
            <nav className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal text-teal'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Problem & Solution */}
                <motion.section
                  className="bg-white rounded-xl p-6 border border-stone-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
                    <div className="w-2 h-2 bg-teal rounded-full" />
                    Problem & Solution
                  </h2>

                  {/* The Problem */}
                  <div className="mb-6">
                    <h3 className="text-teal font-semibold mb-2">The Problem</h3>
                    <div className="pl-4 border-l-2 border-teal/30">
                      <p className="text-gray-600">{product.problemStatement}</p>
                    </div>
                  </div>

                  {/* Our Solution */}
                  <div className="mb-6">
                    <h3 className="text-gray-800 font-semibold mb-2">Our Solution</h3>
                    <p className="text-gray-600">{product.solutionOverview}</p>
                  </div>

                  {/* Key Differentiators */}
                  {product.keyDifferentiators && (
                    <div className="mb-6">
                      <h3 className="text-gray-800 font-semibold mb-2">Key Differentiators</h3>
                      <p className="text-gray-600">{product.keyDifferentiators}</p>
                    </div>
                  )}

                  {/* Target Users */}
                  {product.targetUsers && (
                    <div>
                      <h3 className="text-gray-800 font-semibold mb-2">Target Users</h3>
                      <p className="text-gray-600">{product.targetUsers}</p>
                    </div>
                  )}
                </motion.section>

                {/* Project Timeline */}
                <motion.section
                  className="bg-white rounded-xl p-6 border border-stone-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
                    <div className="w-2 h-2 bg-teal rounded-full" />
                    Project Timeline
                  </h2>

                  <div className="space-y-4">
                    {/* Timeline Items */}
                    <TimelineItem
                      title="Project Started"
                      date={formatDate(product.startDate)}
                      completed={true}
                    />
                    <TimelineItem
                      title="Development Phase"
                      date={product.status === 'IN_DEVELOPMENT' ? 'In Progress' : 'Completed'}
                      completed={product.status !== 'EXPLORING'}
                      active={product.status === 'IN_DEVELOPMENT'}
                    />
                    <TimelineItem
                      title="MVP Release"
                      date={product.status === 'MVP' ? 'Current Phase' : product.status === 'LIVE' ? 'Completed' : 'Upcoming'}
                      completed={product.status === 'MVP' || product.status === 'LIVE'}
                      active={product.status === 'MVP'}
                    />
                    <TimelineItem
                      title="Full Deployment"
                      date={product.status === 'LIVE' ? 'Live Now' : 'Planned'}
                      completed={product.status === 'LIVE'}
                      active={product.status === 'LIVE'}
                    />
                  </div>
                </motion.section>

                {/* Media Gallery */}
                {media.length > 0 && <MediaGallery media={media} />}

                {/* Impressions */}
                <ImpressionSummary impressions={impressions} />
                <ImpressionForm productId={product.id} onSubmit={handleImpressionSubmit} />
              </>
            )}

            {activeTab === 'team' && (
              <motion.section
                className="bg-white rounded-xl p-6 border border-stone-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Team Members</h2>
                <div className="space-y-4">
                  {product.team && product.team.length > 0 ? (
                    product.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                        <img
                          src={member.avatarUrl || `https://ui-avatars.com/api/?name=${member.name}`}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">{member.name}</div>
                          <div className="text-sm text-teal">{member.role}</div>
                        </div>
                      </div>
                    ))
                  ) : product.owner ? (
                    <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                      <img
                        src={product.owner.avatarUrl || `https://ui-avatars.com/api/?name=${product.owner.name}`}
                        alt={product.owner.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{product.owner.name}</div>
                        <div className="text-sm text-teal">Product Lead</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No team members assigned yet.</p>
                  )}
                </div>
              </motion.section>
            )}

            {activeTab === 'timeline' && (
              <motion.section
                className="bg-white rounded-xl p-6 border border-stone-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Full Timeline</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal rounded-full mt-1.5" />
                    <div>
                      <div className="font-semibold text-gray-800">Project Created</div>
                      <div className="text-sm text-gray-500">{formatDate(product.createdAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal rounded-full mt-1.5" />
                    <div>
                      <div className="font-semibold text-gray-800">Last Updated</div>
                      <div className="text-sm text-gray-500">{formatDate(product.lastUpdated)}</div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'resources' && (
              <motion.section
                className="bg-white rounded-xl p-6 border border-stone-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Resources & Links</h2>
                {links.length > 0 ? (
                  <div className="space-y-3">
                    {links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center text-teal">
                          {link.type === 'GITHUB' ? (
                            <Github className="w-5 h-5" />
                          ) : link.type === 'DOCS' ? (
                            <FileText className="w-5 h-5" />
                          ) : (
                            <LinkIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 group-hover:text-teal transition-colors">
                            {link.label}
                          </div>
                          {link.description && (
                            <div className="text-sm text-gray-500">{link.description}</div>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No resources available yet.</p>
                )}

                {/* Tech Stack */}
                {techStack.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-gray-800 mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span
                          key={tech.id}
                          className="px-3 py-1.5 bg-teal/10 text-teal rounded-full text-sm font-medium"
                        >
                          {tech.technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Project Leads */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-stone-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-bold text-gray-900 mb-4">Project Leads</h3>
              <div className="space-y-4">
                {product.team && product.team.filter(m => m.role?.toLowerCase().includes('lead')).length > 0 ? (
                  product.team.filter(m => m.role?.toLowerCase().includes('lead')).map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl || `https://ui-avatars.com/api/?name=${member.name}`}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  ))
                ) : product.owner ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={product.owner.avatarUrl || `https://ui-avatars.com/api/?name=${product.owner.name}`}
                      alt={product.owner.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{product.owner.name}</div>
                      <div className="text-xs text-gray-500">Product Lead</div>
                    </div>
                  </div>
                ) : null}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-teal font-medium border border-teal/30 rounded-lg hover:bg-teal/5 transition-colors">
                View Full Team
              </button>
            </motion.div>

            {/* Key Links */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-stone-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold text-gray-900 mb-4">Key Links</h3>
              <div className="space-y-3">
                {product.productUrl && (
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                  >
                    <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Product Website</span>
                  </a>
                )}
                {links.slice(0, 3).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                  >
                    <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center">
                      {link.type === 'GITHUB' ? (
                        <Github className="w-4 h-4" />
                      ) : link.type === 'DOCS' ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <LinkIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Project Health */}
            <motion.div
              className="bg-teal rounded-xl p-6 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold mb-4">Project Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-teal-100">Progress</span>
                    <span>
                      {product.status === 'LIVE' ? '100' : product.status === 'MVP' ? '75' : product.status === 'IN_DEVELOPMENT' ? '50' : '25'}%
                    </span>
                  </div>
                  <div className="h-2 bg-teal-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width: product.status === 'LIVE' ? '100%' : product.status === 'MVP' ? '75%' : product.status === 'IN_DEVELOPMENT' ? '50%' : '25%',
                      }}
                    />
                  </div>
                </div>
                {product.usersReached && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-teal-100">Users Reached</span>
                      <span>{product.usersReached.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Vote Buttons */}
            <VoteButtons productId={product.id} />

            {/* Share & Export */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="flex flex-col gap-3">
                <ShareButtons product={product} />
                <PDFExport product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2024 Renaissance HAVEN Innovation Lab. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-teal transition-colors">Privacy Policy</Link>
              <Link href="/about" className="hover:text-teal transition-colors">Terms of Service</Link>
              <Link href="/sponsors" className="hover:text-teal transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Timeline Item Component
function TimelineItem({ title, date, completed, active }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        {completed ? (
          <CheckCircle2 className={`w-5 h-5 ${active ? 'text-teal' : 'text-green-500'}`} />
        ) : (
          <Circle className="w-5 h-5 text-gray-300" />
        )}
        <div className="w-px h-8 bg-stone-200 last:hidden" />
      </div>
      <div className="flex-1 flex items-center justify-between pb-4">
        <div>
          <div className={`font-medium ${active ? 'text-teal' : completed ? 'text-gray-800' : 'text-gray-400'}`}>
            {title}
          </div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
        {active && (
          <span className="px-2 py-1 bg-teal/10 text-teal text-xs font-semibold rounded">
            LIVE NOW
          </span>
        )}
      </div>
    </div>
  )
}
