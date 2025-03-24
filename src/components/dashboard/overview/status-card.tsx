import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusCardProps {
  title: string
  value: string
  className?: string
}

export function StatusCard({ title, value, className }: StatusCardProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-1 text-sm text-muted-foreground uppercase">
        {title} <Info className="h-4 w-4" />
      </div>
      <div className="inline-flex">
        <span
          className={cn(
            'px-2 py-1 text-xs font-medium rounded-md border',
            value.toLowerCase() === 'ativo' || value.toLowerCase() === 'ativa'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : value.toLowerCase() === 'inicial'
                ? 'bg-sky-50 text-sky-700 border-sky-200'
                : 'bg-gray-50 text-gray-700 border-gray-200'
          )}
        >
          {value}
        </span>
      </div>
    </div>
  )
}
