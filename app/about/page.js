'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Zap, Users, Shield, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Systems-First Thinking',
      description: 'We build solutions that address root causes, not symptoms.',
    },
    {
      icon: Shield,
      title: 'Transparency & Governance',
      description: 'Every product is tracked, every decision is documented.',
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'We listen to signals from users, sponsors, and stakeholders.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation with Purpose',
      description: 'Technology as a tool for social impact and systemic change.',
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">About Renaissance HAVEN</h1>
          <p className="text-xl text-stone-100 max-w-2xl mx-auto">
            Building a living registry of systems, signals, and solutions
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a transparent, accountable, and intelligent registry of innovation that serves
                as institutional memory, decision-making infrastructure, and public record of our lab's work.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-teal" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Our Vision</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where innovation is documented, signals are heard, and every product built serves
                as a stepping stone toward systemic change and lasting impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Renaissance HAVEN is not a marketing website. It's an intelligence layer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-xl p-8 border border-stone-200 card-hover"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="w-14 h-14 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary mb-4">What Makes Us Different</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-primary mb-2">Structured Signals, Not Comments</h3>
              <p className="text-gray-600">
                We capture meaningful impressions that inform strategy, not social media noise.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-primary mb-2">Public-Private Balance</h3>
              <p className="text-gray-600">
                Transparency for discovery, privacy for governance. The right information to the right people.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-primary mb-2">Intelligence, Not Analytics</h3>
              <p className="text-gray-600">
                We don't just count clicks. We identify patterns, predict funding signals, and inform decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Lab */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-10 h-10" />
              <h2 className="text-4xl font-bold">The Innovation Lab</h2>
            </div>
            <p className="text-xl text-stone-100 max-w-3xl mx-auto mb-8">
              We build solutions for systemic challenges, with a focus on Nigerian realities and
              scalable impact across Africa and beyond.
            </p>
            <p className="text-stone-200 max-w-2xl mx-auto">
              Every product in Renaissance HAVEN represents hours of research, iteration, and lived
              experience. This is our institutional memory, our commitment to transparency, and our
              invitation to collaborate.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
