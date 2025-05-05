'use client'

import { useState } from 'react'
import { PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog/dialog'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Textarea } from '@/components/ui/textarea/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Checkbox } from '@/components/ui/checkbox'

interface Job {
  id?: number
  position: string
  type: string
  workMode: string
  description: string
  postedDate: string
  lastDateToApply: string
  pcdEligible: boolean
  highlighted: boolean
}

interface JobFormModalProps {
  job?: Job
  buttonVariant?: 'icon' | 'default'
  isNew?: boolean
  onSave?: (job: Job) => void
}

// Tipos de trabalho
const jobTypes = [
  { value: 'clt', label: 'CLT' },
  { value: 'pj', label: 'PJ (Pessoa Jurídica)' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'temporario', label: 'Temporário' },
  { value: 'aprendiz', label: 'Jovem Aprendiz' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'trainee', label: 'Trainee' },
  { value: 'voluntario', label: 'Voluntário' },
  { value: 'cooperado', label: 'Cooperado' },
]

// Modalidades de trabalho
const workModes = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'homeoffice', label: 'Home Office' },
  { value: 'flexivel', label: 'Flexível' },
  { value: 'escala', label: 'Por Escala' },
  { value: 'turnos', label: 'Por Turnos' },
  { value: 'viagem', label: 'Com Viagens' },
]

export function JobFormModal({
  job,
  buttonVariant = 'icon',
  isNew = false,
  onSave,
}: JobFormModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Estado do formulário
  const [formData, setFormData] = useState<Job>({
    position: '',
    type: '',
    workMode: '',
    description: '',
    postedDate: new Date().toISOString().split('T')[0],
    lastDateToApply: '',
    pcdEligible: false,
    highlighted: false,
    ...job,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Aqui você implementaria a lógica de salvar
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSave?.(formData)
      setOpen(false)
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof Job, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <>
      {buttonVariant === 'icon' ? (
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setOpen(true)}
        >
          <PenLine className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="default"
          className="bg-secondary-500 hover:bg-secondary-600 text-white px-3 py-2"
          onClick={() => setOpen(true)}
        >
          <span className="mr-1">+</span> Adicionar Nova Vaga
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isNew ? 'Criar Nova Vaga' : 'Editar Vaga'}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[calc(90vh-10rem)] overflow-y-auto pr-4">
            <div className="space-y-6 py-4">
              {/* Nome da vaga */}
              <div className="space-y-2">
                <Label htmlFor="position">
                  Nome da vaga <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  placeholder="Ex: Desenvolvedor Full Stack"
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                />
              </div>

              {/* Tipo da vaga */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Tipo da vaga <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Modalidade de trabalho */}
              <div className="space-y-2">
                <Label htmlFor="workMode">
                  Modalidade de trabalho <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.workMode}
                  onValueChange={(value) => handleChange('workMode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {workModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Descrição da vaga */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Descrição da vaga <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga..."
                  className="min-h-[150px] resize-y"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>

              {/* Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postedDate">
                    Data de publicação <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="postedDate"
                    type="date"
                    value={formData.postedDate}
                    onChange={(e) => handleChange('postedDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastDateToApply">
                    Data de despublicação{' '}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastDateToApply"
                    type="date"
                    value={formData.lastDateToApply}
                    onChange={(e) =>
                      handleChange('lastDateToApply', e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pcdEligible"
                    checked={formData.pcdEligible}
                    onCheckedChange={(checked) =>
                      handleChange('pcdEligible', checked)
                    }
                  />
                  <Label
                    htmlFor="pcdEligible"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vaga elegível a PCD?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highlighted"
                    checked={formData.highlighted}
                    onCheckedChange={(checked) =>
                      handleChange('highlighted', checked)
                    }
                  />
                  <Label
                    htmlFor="highlighted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Destacar vaga (usuários premium)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-secondary-500 hover:bg-secondary-600"
            >
              {loading ? 'Salvando...' : 'Salvar Vaga'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
