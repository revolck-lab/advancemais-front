'use client'

import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
}

export function AnimatedNumber({ value, duration = 1 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const previousValue = useRef(0)

  useEffect(() => {
    const controls = animate(previousValue.current, value, {
      duration,
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })

    previousValue.current = value
    return () => controls.stop()
  }, [value, duration])

  return <>{displayValue}</>
}
