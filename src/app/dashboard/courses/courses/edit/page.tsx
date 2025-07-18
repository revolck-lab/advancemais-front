'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
import { Calendar } from '@/components/ui/calendar/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const coordenadores = [
  { id: '1', nome: 'Prof. Carlos Silva' },
  { id: '2', nome: 'Profa. Ana Souza' },
  { id: '3', nome: 'Prof. Pedro Oliveira' },
]

const categorias = [
  'Programação',
  'Design',
  'Marketing',
  'Negócios',
  'Ciência de Dados',
]

const periodosAcesso = [
  '1 mês',
  '3 meses',
  '6 meses',
  '1 ano',
  'Acesso vitalício',
]

export default function CreateCoursePage() {
  const { toast } = useToast()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const [formData, setFormData] = useState({
    titulo: '',
    coordenador: '',
    categoria: '',
    cargaHoraria: '',
    dataInicio: undefined as Date | undefined,
    periodoAcesso: '',
    suporte: false,
    periodoSupote: '',
    capa: null as File | null,
    capaUrl: '',
  })

  const handleFinalize = () => {
    // Show success toast notification
    toast({
      title: 'Curso criado com sucesso!',
      description: 'Você criou um novo curso',
      variant: 'success',
    })

    // Navigate to the course creation page with a placeholder ID
    router.push(`/dashboard/courses/courses/create/[id]`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setFormData({ ...formData, capa: file, capaUrl: url })
    } else {
      setFormData({ ...formData, capa: null, capaUrl: '' })
    }
  }

  const handleCargaHorariaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')

    if (value.length > 2) {
      const horas = value.slice(0, value.length - 2)
      const minutos = value.slice(-2)
      value = `${horas}:${minutos}`
    }

    setFormData({ ...formData, cargaHoraria: value })
  }

  const validateStep = () => {
    if (step === 1) {
      return (
        formData.titulo &&
        formData.coordenador &&
        formData.categoria &&
        formData.cargaHoraria
      )
    }

    if (step === 2) {
      return (
        formData.dataInicio &&
        formData.periodoAcesso &&
        (!formData.suporte || formData.periodoSupote)
      )
    }

    return true
  }

  const moveToNextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  return (
    <div className="container mx-auto w-full my-8 py-8 px-10 rounded-lg max-w-6xl bg-white">
      {/* Etapas */}
      <div className="flex justify-between mb-8">
        {['Informações', 'Acesso', 'Tema'].map((label, index) => {
          const current = index + 1
          const active = step >= current
          return (
            <div
              key={label}
              className={`flex items-center ${active ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-muted'}`}
              >
                {current}
              </div>
              <span className="ml-2">{label}</span>
            </div>
          )
        })}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label>Título do curso</Label>
              <Input
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                placeholder="Digite o título do curso"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Coordenador</Label>
                <Select
                  value={formData.coordenador}
                  onValueChange={(value) =>
                    setFormData({ ...formData, coordenador: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um coordenador" />
                  </SelectTrigger>
                  <SelectContent>
                    {coordenadores.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Categoria</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoria: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Carga horária</Label>
                <Input
                  value={formData.cargaHoraria}
                  onChange={handleCargaHorariaChange}
                  placeholder="Ex: 120:00"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Iniciar as aulas em</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !formData.dataInicio && 'text-muted-foreground'
                      )}
                      onClick={() => setCalendarOpen(true)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dataInicio ? (
                        format(formData.dataInicio, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={formData.dataInicio}
                      onSelect={(date) => {
                        setFormData({ ...formData, dataInicio: date })
                        setCalendarOpen(false)
                      }}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Período de acesso</Label>
                <Select
                  value={formData.periodoAcesso}
                  onValueChange={(value) =>
                    setFormData({ ...formData, periodoAcesso: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um período" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodosAcesso.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={formData.suporte}
                  onChange={(e) =>
                    setFormData({ ...formData, suporte: e.target.checked })
                  }
                  className="h-4 w-4 mr-2"
                />
                <Label>Definir período de suporte</Label>
              </div>

              {formData.suporte && (
                <div className="mt-4">
                  <Label>Período de suporte</Label>
                  <Select
                    value={formData.periodoSupote}
                    onValueChange={(value) =>
                      setFormData({ ...formData, periodoSupote: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período de suporte" />
                    </SelectTrigger>
                    <SelectContent>
                      {periodosAcesso.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <Label>Capa do curso</Label>
            <div className="relative flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg bg-muted/50">
              {formData.capaUrl ? (
                <>
                  <Image
                    src={formData.capaUrl}
                    alt="Preview"
                    className="object-contain h-full"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => handleImageUpload(null)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <label
                  htmlFor="capaCurso"
                  className="flex flex-col items-center justify-center text-muted-foreground cursor-pointer text-center w-full h-full"
                >
                  <Input
                    type="file"
                    id="capaCurso"
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e.target.files?.[0] || null)
                    }
                  />
                  <div>
                    <p>Clique para adicionar uma imagem</p>
                    <p className="text-xs">
                      PNG, JPG ou GIF (Recomendado: 990x592px)
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        )}

        {/* Navegação */}
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button
              variant="ghost"
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
          )}

          <div>
            {step < 3 ? (
              <Button type="button" onClick={moveToNextStep}>
                Próximo
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button type="button" onClick={handleFinalize}>
                Finalizar
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
