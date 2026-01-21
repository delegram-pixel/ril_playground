export default function CategoryBadge({ category }) {
  const categoryConfig = {
    CIVIC_TECH: {
      label: 'CivicTech',
      color: 'bg-teal-100 text-teal-800',
    },
    HEALTH_TECH: {
      label: 'HealthTech',
      color: 'bg-red-100 text-red-800',
    },
    AI_INFRASTRUCTURE: {
      label: 'AI Infrastructure',
      color: 'bg-indigo-100 text-indigo-800',
    },
    FINTECH: {
      label: 'FinTech',
      color: 'bg-green-100 text-green-800',
    },
    EDTECH: {
      label: 'EdTech',
      color: 'bg-blue-100 text-blue-800',
    },
    AGRITECH: {
      label: 'AgriTech',
      color: 'bg-lime-100 text-lime-800',
    },
    CLIMATE_TECH: {
      label: 'ClimateTech',
      color: 'bg-emerald-100 text-emerald-800',
    },
    OTHER: {
      label: 'Other',
      color: 'bg-gray-100 text-gray-800',
    },
  }

  const config = categoryConfig[category] || categoryConfig.OTHER

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.label}
    </span>
  )
}
