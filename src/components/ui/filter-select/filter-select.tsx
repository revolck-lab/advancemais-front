// src/components/ui/filter-select/filter-select.tsx
'use client'

import * as React from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select/select'
import { Button } from '@/components/ui/button/button'
import { CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

export interface FilterSelectItem {
  label: string
  value: string
}

export interface FilterSelectProps {
  items: FilterSelectItem[]
  multiple?: boolean
  initialValue?: string
  initialValues?: string[]
  onSave: (selected: string | string[]) => void
  onCancel: () => void
  placeholder?: string
}

export function FilterSelect({
  items,
  multiple = false,
  initialValue,
  initialValues,
  onSave,
  onCancel,
  placeholder = 'Selecionar',
}: FilterSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [tempSelected, setTempSelected] = React.useState<string | string[]>(
    multiple ? initialValues || [] : initialValue || ''
  )

  React.useEffect(() => {
    if (open) {
      setTempSelected(multiple ? initialValues || [] : initialValue || '')
    }
  }, [open, initialValue, initialValues, multiple])

  const handleItemClick = (value: string) => {
    if (multiple) {
      setTempSelected((prev) => {
        const arr = Array.isArray(prev) ? [...prev] : []
        return arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value]
      })
    } else {
      setTempSelected(value)
    }
  }

  // Retorna SEMPRE uma string para o value do Select
  const renderValue = (): string => {
    if (multiple) {
      const count = Array.isArray(tempSelected) ? tempSelected.length : 0
      return count > 0
        ? `${count} ${count === 1 ? 'selecionado' : 'selecionados'}`
        : placeholder
    }
    return (
      items.find((item) => item.value === tempSelected)?.label || placeholder
    )
  }

  return (
    <Select open={open} onOpenChange={setOpen} value={renderValue()}>
      <SelectTrigger className="w-56">
        <span className="text-sm">{renderValue()}</span>
      </SelectTrigger>

      <SelectContent className="p-0">
        <div className="flex justify-end p-2 border-b border-neutral-50">
          <button
            className="text-xs text-neutral-400 hover:text-primary-500 hover:font-medium"
            onClick={() => setTempSelected(multiple ? [] : '')}
          >
            Limpar
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {items.map((item) => {
            const isSelected = multiple
              ? tempSelected.includes(item.value)
              : tempSelected === item.value

            return (
              <div
                key={item.value}
                onClick={() => handleItemClick(item.value)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 cursor-pointer',
                  'hover:bg-gray-50 border-b border-neutral-50 last:border-b-0'
                )}
              >
                <span className="text-sm">{item.label}</span>
                {isSelected && <CheckIcon className="h-4 w-4 text-secondary" />}
              </div>
            )
          })}
        </div>

        <div className="flex justify-end gap-2 p-2 border-t border-neutral-50">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs py-2 px-4 bg-neutral-50 text-neutral"
            onClick={() => {
              onCancel()
              setOpen(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            className="text-xs py-2 px-4 bg-primary text-white hover:bg-primary-800"
            onClick={() => {
              onSave(tempSelected)
              setOpen(false)
            }}
          >
            Salvar
          </Button>
        </div>
      </SelectContent>
    </Select>
  )
}
