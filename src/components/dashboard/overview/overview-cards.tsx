'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { AnimatedNumber } from './animated-number'
import { Progress } from '@/components/ui/progress/progress'

interface OverviewCardProps {
  title: string
  value: number
  description?: string
  stats: Array<{
    label: string
    value: number
    color: string
  }>
}

export function OverviewCard({
  title,
  value,
  description,
  stats,
}: OverviewCardProps) {
  const total = stats.reduce((acc, stat) => acc + stat.value, 0)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <motion.span
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatedNumber value={value} />
          </motion.span>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
        <div className="space-y-2">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">{stat.label}</span>
                <span>{stat.value}</span>
              </div>
              <Progress
                value={(stat.value / total) * 100}
                className="h-2"
                indicatorClassName={stat.color}
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
