'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Textarea } from '@/components/ui/textarea/textarea'
import { Switch } from '@/components/ui/switch/switch'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import { Calendar } from '@/components/ui/calendar/calendar'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export default function AddJobPage() {
  const router = useRouter()
  const [endDate, setEndDate] = useState<Date>()

  // Data atual para preenchimento automático
  const currentDate = new Date()
  const formattedCurrentDate = format(currentDate, 'dd-MM-yyyy')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar a vaga
    router.push('/')
  }

  return (
    <div className="w-full">
      <Card className="w-full py-7 container mx-auto justify-between shadow-none bg-white border-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastrar Nova Vaga</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para cadastrar uma nova vaga de emprego.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobName">Nome da vaga</Label>
                <Input
                  id="jobName"
                  placeholder="Ex: Desenvolvedor Full Stack"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Lugar da vaga (Estado)</Label>
                <Select required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac">Acre</SelectItem>
                    <SelectItem value="al">Alagoas</SelectItem>
                    <SelectItem value="ap">Amapá</SelectItem>
                    <SelectItem value="am">Amazonas</SelectItem>
                    <SelectItem value="ba">Bahia</SelectItem>
                    <SelectItem value="ce">Ceará</SelectItem>
                    <SelectItem value="df">Distrito Federal</SelectItem>
                    <SelectItem value="es">Espírito Santo</SelectItem>
                    <SelectItem value="go">Goiás</SelectItem>
                    <SelectItem value="ma">Maranhão</SelectItem>
                    <SelectItem value="mt">Mato Grosso</SelectItem>
                    <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                    <SelectItem value="pa">Pará</SelectItem>
                    <SelectItem value="pb">Paraíba</SelectItem>
                    <SelectItem value="pr">Paraná</SelectItem>
                    <SelectItem value="pe">Pernambuco</SelectItem>
                    <SelectItem value="pi">Piauí</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                    <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                    <SelectItem value="ro">Rondônia</SelectItem>
                    <SelectItem value="rr">Roraima</SelectItem>
                    <SelectItem value="sc">Santa Catarina</SelectItem>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="se">Sergipe</SelectItem>
                    <SelectItem value="to">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="jobType">Tipo da vaga</Label>
                <Select required>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="Selecione o tipo de contratação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clt">CLT</SelectItem>
                    <SelectItem value="pj">PJ</SelectItem>
                    <SelectItem value="estagio">Estágio</SelectItem>
                    <SelectItem value="temporario">Temporário</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="workMode">Modalidade de trabalho</Label>
                <Select required>
                  <SelectTrigger id="workMode">
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remoto">Remoto</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descrição da vaga</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva os detalhes da vaga, requisitos, responsabilidades, etc."
                  className="min-h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publishDate">Data de publicação</Label>
                  <Input
                    id="publishDate"
                    value={formattedCurrentDate}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Preenchido automaticamente com a data atual
                  </p>
                </div>

                <div>
                  <Label htmlFor="endDate">Data de finalização</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="endDate"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate
                          ? format(endDate, 'dd/MM/yyyy')
                          : 'Selecione uma data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        locale={pt}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-gray-500 mt-1">
                    Data em que a vaga será despublicada automaticamente
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="pcd" />
                <Label htmlFor="pcd">Vaga elegível a PCD?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="premium" />
                <Label htmlFor="premium">
                  Destacar vaga (usuários premium)
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push('/')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Salvar Vaga
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
