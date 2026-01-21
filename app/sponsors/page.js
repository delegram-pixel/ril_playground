'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, MessageSquare, Eye, Lock, CheckCircle, ArrowRight } from 'lucide-react'

export default function SponsorsPage() {
  const benefits = [
    {
      icon: Eye,
      title: 'Extended Product Visibility',
      description: 'Access detailed roadmaps, milestones, and progress reports beyond public view.',
    },
    {
      icon: TrendingUp,
      title: 'Signal Intelligence',
      description: 'See which products are gaining traction and community interest in real-time.',
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Request briefings and communicate directly with product leads.',
    },
    {
      icon: CheckCircle,
      title: 'Portfolio Tracking',
      description: 'Build and monitor your portfolio of products you\'re considering for funding.',
    },
  ]

  const process = [
    {
      step: '1',
      title: 'Explore the Registry',
      description: 'Browse products publicly to understand our portfolio and approach.',
    },
    {
      step: '2',
      title: 'Request Access',
      description: 'Contact us to set up your sponsor account with extended privileges.',
    },
    {
      step: '3',
      title: 'Signal Interest',
      description: 'Request briefings, ask questions, and signal funding interest.',
    },
    {
      step: '4',
      title: 'Partner & Fund',
      description: 'Work directly with product teams to structure partnerships.',
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partner with Innovation
          </h1>
          <p className="text-xl md:text-2xl text-stone-100 mb-8">
            Renaissance HAVEN provides sponsors and investors with transparent access to our
            product portfolio, signal intelligence, and direct communication channels.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brown hover:bg-brown-dark text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-2xl hover:scale-105"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-medium transition-all">
              Request Sponsor Access
              <Lock className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Why Partner With Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We build solutions for systemic challenges, backed by research, local context, and
              proven impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  className="bg-stone-50 rounded-xl p-8 border border-stone-200 card-hover"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="w-14 h-14 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Sponsorship Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From discovery to partnership in four clear steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="bg-white rounded-xl p-6 border border-stone-200 h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                {/* Arrow between steps */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-brown" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors (Placeholder) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We're proud to work with organizations that believe in systems-first innovation
            </p>

            <div className="grid md:grid-cols-4 gap-8 items-center">
              {['Impact Ventures', 'EU Democracy Fund', 'Green Climate Fund', 'AgTech Ventures'].map(
                (partner, index) => (
                  <motion.div
                    key={partner}
                    className="bg-stone-50 rounded-xl p-8 border border-stone-200 card-hover"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-primary">{partner}</div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Partner?</h2>
            <p className="text-xl text-stone-100 mb-8">
              Request sponsor access to unlock extended product visibility, signal intelligence,
              and direct communication with our team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center gap-2 bg-brown hover:bg-brown-dark text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-2xl hover:scale-105">
                Request Sponsor Access
                <Lock className="w-5 h-5" />
              </button>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-medium transition-all"
              >
                Browse Products First
                <Eye className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
