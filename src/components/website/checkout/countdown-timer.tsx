'use client'

import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3 opacity-100">
      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
        <Timer className="w-5 h-5 text-yellow-700" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-yellow-800 mb-0">
          Sua sessão expira em{' '}
          <span className="font-bold">
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </span>
        </p>
        <p className="text-xs text-yellow-700 mb-0">
          Complete sua compra antes que o tempo acabe
        </p>
      </div>
    </div>
  )
}

export default CountdownTimer
