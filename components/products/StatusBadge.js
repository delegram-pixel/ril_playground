export default function StatusBadge({ status }) {
  const statusConfig = {
    EXPLORING: {
      label: 'Exploring',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    IN_DEVELOPMENT: {
      label: 'In Development',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    MVP: {
      label: 'MVP',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    LIVE: {
      label: 'Live',
      color: 'bg-green-100 text-green-700 border-green-200',
    },
    PAUSED: {
      label: 'Paused',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    ARCHIVED: {
      label: 'Archived',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
    },
  }

  const config = statusConfig[status] || statusConfig.EXPLORING

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  )
}
