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
import { CalendarIcon, Plus } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export default function AddTeacherModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    id: '',
    name: '',
    email: '',
    subject: '',
    hireDate: null,
    salary: '',
    status: 'pending',
  })
  const [date, setDate] = useState<Date | undefined>(undefined)

interface FormDataType {
    id: string
    name: string
    email: string
    subject: string
    hireDate: string | null
    salary: string
    status: 'active' | 'suspend' | 'pending'
}

const handleChange = (
    field: keyof FormDataType,
    value: FormDataType[keyof FormDataType]
): void => {
    setFormData((prev: FormDataType) => ({
        ...prev,
        [field]: value,
    }))
}

interface TeacherFormSubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
}

const handleSubmit = (e: TeacherFormSubmitEvent): void => {
    e.preventDefault()

    // Aqui você adicionaria a lógica para salvar o novo professor
    console.log('Novo professor:', formData)

    // Fecha o modal e reseta o formulário
    setOpen(false)
    setFormData({
        id: '',
        name: '',
        email: '',
        subject: '',
        hireDate: null,
        salary: '',
        status: 'pending',
    })
    setDate(undefined)
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Adicionar Professor</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Professor</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar um novo professor no
            sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                placeholder="T12345"
                value={formData.id}
                onChange={(e) => handleChange('id', e.target.value)}
                required
              />
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
                  <SelectItem value="pending">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Nome do professor"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com.br"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Disciplina</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleChange('subject', value)}
              >
                <SelectTrigger id="subject">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="hireDate">Data de Contratação</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd/MM/yyyy') : 'Selecione uma data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date)
                      handleChange(
                        'hireDate',
                        date ? format(date, 'dd/MM/yyyy') : null
                      )
                    }}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salário</Label>
            <Input
              id="salary"
              placeholder="R$ 0,00"
              value={formData.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar Professor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
