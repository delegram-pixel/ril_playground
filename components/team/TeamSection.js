'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import TeamMemberCard from './TeamMemberCard'

export default function TeamSection({ team = [], owner }) {
  if ((!team || team.length === 0) && !owner) {
    return null
  }

  // Separate featured members and regular members
  const featuredMembers = team.filter((m) => m.isFeatured)
  const regularMembers = team.filter((m) => !m.isFeatured)

  return (
    <motion.section
      className="glass-card rounded-xl p-8 border border-stone-200"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-teal" />
        <h2 className="text-2xl font-bold text-primary">Team</h2>
      </div>

      <div className="space-y-6">
        {/* Product Lead/Owner */}
        {owner && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Product Lead
            </h3>
            <TeamMemberCard member={owner} isLead={true} />
          </div>
        )}

        {/* Featured Members */}
        {featuredMembers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Core Team
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {featuredMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Members */}
        {regularMembers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Contributors
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {regularMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
