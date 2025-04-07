'use client'

import { useState } from 'react'

interface CustomSwitchProps {
  id: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  variant?: 'purple' | 'default'
}

const CustomSwitch = ({
  id,
  checked = false,
  onChange = () => {},
  variant = 'default',
}: CustomSwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    setIsChecked(!isChecked)
    onChange(!isChecked)
  }

  const bgColor = variant === 'purple' ? 'bg-primary' : 'bg-secondary'

  return (
    <div
      onClick={handleChange}
      className={`relative flex items-center w-20 h-8 rounded-full cursor-pointer transition-colors duration-300 ${isChecked ? bgColor : 'bg-gray-300'}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => {}}
        className="sr-only"
      />
      <span
        className={`absolute text-xs font-medium ${isChecked ? 'left-3 text-white' : 'right-3 text-gray-600'}`}
      >
        {isChecked ? 'SIM' : 'NÃO'}
      </span>
      <span
        className={`absolute h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ${isChecked ? 'right-1' : 'left-1'}`}
      />
    </div>
  )
}

export default CustomSwitch
