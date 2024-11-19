import React, { useState } from 'react'
import styles from './checkbox.module.css'

interface CheckboxProps {
  id: string
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(checked || false)

  const handleChange = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    onChange?.(newCheckedState)
  }

  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <input
        type="checkbox"
        id={id}
        className={styles.hiddenCheckbox}
        checked={checked ?? isChecked}
        onChange={handleChange}
      />
      {label && (
        <label htmlFor={id} className={styles.checkboxLabel}>
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
