'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react'
import PortfolioStats from '@/components/home/PortfolioStats'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <motion.section
        className="relative h-[600px] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Renaissance HAVEN
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-stone-100 mb-8 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A Living Registry of Systems, Signals, and Solutions
          </motion.p>

          <motion.p
            className="text-lg text-stone-200 mb-12 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            A public–private directory of software products built by the Innovation Lab,
            tracking what exists, what's emerging, and what we've learned.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brown hover:bg-brown-dark text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-2xl hover:scale-105"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Snapshot */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 text-primary">
              Portfolio Snapshot
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Real-time overview of our innovation pipeline and active systems
            </p>
            <PortfolioStats />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 text-primary">
              Featured & Recently Updated
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover our most active and impactful products
            </p>
            <FeaturedProducts />
          </motion.div>
        </div>
      </section>

      {/* How to Engage Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            How to Engage
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-stone-50 p-8 rounded-xl border border-stone-200 card-hover"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Public Visitors</h3>
              <p className="text-gray-600 mb-6">
                Explore products and leave structured impressions. Your signals help us understand
                what resonates and what needs attention.
              </p>
              <Link
                href="/products"
                className="text-teal font-medium hover:text-teal-dark flex items-center gap-2"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-stone-50 p-8 rounded-xl border border-stone-200 card-hover"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-brown/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-brown" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Sponsors & Investors</h3>
              <p className="text-gray-600 mb-6">
                Request briefings, signal interest, and track the products you're considering
                for partnership or funding.
              </p>
              <Link
                href="/sponsors"
                className="text-brown font-medium hover:text-brown-dark flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-stone-50 p-8 rounded-xl border border-stone-200 card-hover"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Internal Team</h3>
              <p className="text-gray-600 mb-6">
                Govern and evolve the portfolio. Maintain institutional memory and ensure
                nothing falls through the cracks.
              </p>
              <Link
                href="/governance"
                className="text-primary font-medium hover:text-primary-dark flex items-center gap-2"
              >
                Access Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
