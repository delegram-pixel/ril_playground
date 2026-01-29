'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail, MapPin, Briefcase } from 'lucide-react'

export default function TeamMemberCard({ member, isLead = false }) {
  return (
    <motion.div
      className={`bg-white rounded-xl border ${
        isLead ? 'border-teal shadow-lg' : 'border-stone-200'
      } p-6 hover:shadow-md transition-shadow`}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={member.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D9488&color=fff`}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-stone-100"
          />
          {isLead && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal rounded-full flex items-center justify-center text-white text-xs font-bold">
              ★
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>

          {member.title && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Briefcase className="w-4 h-4" />
              {member.title}
            </div>
          )}

          <div className="text-xs font-semibold text-teal uppercase tracking-wider mt-2">
            {member.role || 'Team Member'}
          </div>

          {member.bio && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-3">{member.bio}</p>
          )}

          {member.contribution && (
            <div className="mt-3 bg-stone-50 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Contribution
              </div>
              <p className="text-sm text-gray-700">{member.contribution}</p>
            </div>
          )}

          {member.expertise && member.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {member.expertise.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-teal/10 text-teal text-xs font-medium rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-3 mt-4">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-gray-400 hover:text-teal transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {member.location && (
              <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                <MapPin className="w-4 h-4" />
                {member.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
