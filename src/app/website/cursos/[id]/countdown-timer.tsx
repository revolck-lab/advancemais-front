'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({
  hours,
  minutes,
  seconds,
}: CountdownTimerProps) {
  const [time, setTime] = useState({
    hours,
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds - 1

        if (newSeconds >= 0) {
          return { ...prevTime, seconds: newSeconds }
        }

        const newMinutes = prevTime.minutes - 1

        if (newMinutes >= 0) {
          return { ...prevTime, minutes: newMinutes, seconds: 59 }
        }

        const newHours = prevTime.hours - 1

        if (newHours >= 0) {
          return { hours: newHours, minutes: 59, seconds: 59 }
        }

        clearInterval(timer)
        return prevTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center items-center gap-1 text-center">
      <div className="flex flex-col items-center">
        <motion.div
          className="text-4xl font-bold text-red-700"
          key={time.hours}
          initial={{ opacity: 0.5, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(time.hours).padStart(2, '0')}
        </motion.div>
        <div className="text-xs text-red-700">HORAS</div>
      </div>

      <div className="text-4xl font-bold text-red-700">:</div>

      <div className="flex flex-col items-center">
        <motion.div
          className="text-4xl font-bold text-red-700"
          key={time.minutes}
          initial={{ opacity: 0.5, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(time.minutes).padStart(2, '0')}
        </motion.div>
        <div className="text-xs text-red-700">MIN</div>
      </div>

      <div className="text-4xl font-bold text-red-700">:</div>

      <div className="flex flex-col items-center">
        <motion.div
          className="text-4xl font-bold text-red-700"
          key={time.seconds}
          initial={{ opacity: 0.5, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(time.seconds).padStart(2, '0')}
        </motion.div>
        <div className="text-xs text-red-700">SEG</div>
      </div>
    </div>
  )
}
