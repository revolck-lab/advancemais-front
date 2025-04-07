'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import { CalendarIcon, Plus, CheckCircle } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export default function AddTeacherModal() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    salary: '',
  })

  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    email: '',
    subject: '',
    hireDate: null,
    salary: '',
    status: 'active', // Definindo 'active' como padrão para melhor UX
  })
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleReset = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      subject: '',
      hireDate: null,
      salary: '',
      status: 'active',
    })
    setDate(undefined)
    setErrors({
      name: '',
      email: '',
      subject: '',
      salary: '',
    })
    setSuccess(false)
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      salary: '',
    }

    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
      isValid = false
    }

    if (!formData.subject) {
      newErrors.subject = 'Selecione uma disciplina'
      isValid = false
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salário é obrigatório'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  interface FormData {
    id: string
    name: string
    email: string
    subject: string
    hireDate: string | null
    salary: string
    status: 'active' | 'suspend'
  }

  interface FormErrors {
    name: string
    email: string
    subject: string
    salary: string
  }

  const handleChange = (
    field: keyof FormData,
    value: FormData[keyof FormData]
  ) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value,
    }))

    // Limpa o erro do campo quando o usuário digita
    if (errors[field as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  interface TeacherSubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void
  }

  interface SubmitError {
    message: string
  }

  const handleSubmit = async (e: TeacherSubmitEvent): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulando uma requisição
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Aqui você adicionaria a lógica para salvar o novo professor
      console.log('Novo professor:', formData)

      // Exibe feedback de sucesso
      setSuccess(true)

      // Fecha o modal após 1.5 segundos
      setTimeout(() => {
        setOpen(false)
        // Reset acontece após fechar para evitar flash de conteúdo
        setTimeout(handleReset, 300)
      }, 1500)
    } catch (error: unknown) {
      const submitError = error as SubmitError
      console.error('Erro ao salvar professor:', submitError)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Formata o valor do salário para o formato de moeda brasileira
  interface CurrencyFormatter {
    (value: string): string
  }

  const formatCurrency: CurrencyFormatter = (value) => {
    if (!value) return ''

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '')

    // Converte para número e divide por 100 para obter o valor em reais
    const numValue = parseFloat(value) / 100

    // Formata com R$ e vírgula para separador decimal
    return numValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  interface CurrencyChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement
  }

  const handleCurrencyChange = (e: CurrencyChangeEvent): void => {
    const value: string = e.target.value
    const numericValue: string = value.replace(/\D/g, '')

    handleChange('salary', formatCurrency(numericValue))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          // Reset quando o modal é fechado
          setTimeout(handleReset, 300)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Adicionar Professor</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white">
        {success ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-xl font-semibold text-center">
              Professor cadastrado com sucesso!
            </h2>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Professor</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para cadastrar um novo professor no
                sistema.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Nome do professor"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com.br"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Disciplina</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleChange('subject', value)}
                  >
                    <SelectTrigger
                      id="subject"
                      className={errors.subject ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Matemática">Matemática</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="História">História</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                      <SelectItem value="Biologia">Biologia</SelectItem>
                      <SelectItem value="Inglês">Inglês</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="suspend">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Data de Contratação</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date
                          ? format(date, 'dd/MM/yyyy')
                          : 'Selecione uma data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setDate(selectedDate)
                            handleChange(
                              'hireDate',
                              format(selectedDate, 'dd/MM/yyyy')
                            )
                            // Fecha o popover após um pequeno atraso para garantir que o estado seja atualizado
                            setTimeout(() => setCalendarOpen(false), 100)
                          }
                        }}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salário</Label>
                  <Input
                    id="salary"
                    placeholder="R$ 0,00"
                    value={formData.salary}
                    onChange={handleCurrencyChange}
                    className={errors.salary ? 'border-red-500' : ''}
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                  )}
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Professor'}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
