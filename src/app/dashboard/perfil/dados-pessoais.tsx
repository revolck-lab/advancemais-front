import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Separator } from '@/components/ui/separator/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Trash2, Upload } from 'lucide-react'

export default function DadosPessoais() {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Dados pessoais</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais e de contato
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Foto de perfil"
              />
              <AvatarFallback className="text-2xl border-1">MS</AvatarFallback>
            </Avatar>
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm" className="h-9">
                <Upload className="h-4 w-4 mr-2" />
                Subir foto
              </Button>
              <Button variant="ghost" size="sm" className="h-9 text-slate-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-6">
              Editar informações pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Nome
                </Label>
                <Input id="firstName" defaultValue="Filipe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Sobrenome
                </Label>
                <Input id="lastName" defaultValue="Reis" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> CPF
                </Label>
                <Input id="username" defaultValue="123.456.178-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="filipeteste@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Cidade
                </Label>
                <Select defaultValue="brasil">
                  <SelectTrigger id="country" className="w-full">
                    <SelectValue placeholder="Selecione um país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brasil">
                      <div className="flex items-center gap-2">
                        <span>Maceió</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="portugal">
                      <div className="flex items-center gap-2">
                        <span>Arapiraca</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Número de
                  telefone
                </Label>
                <Input id="phone" defaultValue="+55 11 98765-4321" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t p-6">
        <Button
          variant="default"
          size="sm"
          className="bg-primary h-9 w-28 text-white"
        >
          Salvar
        </Button>
      </CardFooter>
    </Card>
  )
}
