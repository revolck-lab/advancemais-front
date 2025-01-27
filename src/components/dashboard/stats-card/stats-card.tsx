interface StatsCardProps {
  title: string
  value: string | number
  change: string
  color: 'orange' | 'blue' | 'red' | 'green'
}

const colorVariants = {
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
}

export function StatsCard({ title, value, change, color }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold">{value}</span>
        <span className="text-sm text-gray-500">{change}</span>
      </div>
      <div className={`mt-4 h-1 w-full rounded ${colorVariants[color]}`} />
    </div>
  )
}
