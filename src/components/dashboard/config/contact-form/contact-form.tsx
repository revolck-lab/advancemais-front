import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function ContactPage() {
  const [title, setTitle] = useState<string>('Entre em Contato')
  const [description, setDescription] = useState<string>(
    'Envie um e-mail, ligue ou preencha o formulário abaixo para saber como podemos ajudar.'
  )
  const [supportInfo, setSupportInfo] = useState<string>(
    'Suporte ao Cliente: Nosso time está disponível para ajudar.'
  )
  const [email, setEmail] = useState<string>('suporte@advancemais.com.br')
  const [phone, setPhone] = useState<string>('+55 82 xxxx-xxxx')

  const handleSave = () => {
    if (!title || !description || !supportInfo || !email || !phone) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    console.log('Salvando informações de contato...', {
      title,
      description,
      supportInfo,
      email,
      phone,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Página de Contato
      </h1>

      <div className="space-y-6">
        {/* Título */}
        <div>
          <Label htmlFor="title" className="text-lg font-medium text-gray-700">
            Título
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título da página"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Descrição */}
        <div>
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Descrição
          </Label>
          <textarea
            id="description"
            placeholder="Digite a descrição da página"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-20"
          />
        </div>

        {/* Informações de Suporte */}
        <div>
          <Label
            htmlFor="supportInfo"
            className="text-lg font-medium text-gray-700"
          >
            Informações de Suporte
          </Label>
          <Input
            id="supportInfo"
            type="text"
            placeholder="Digite as informações de suporte"
            value={supportInfo}
            onChange={(e) => setSupportInfo(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-lg font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Digite o email de contato"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Telefone */}
        <div>
          <Label htmlFor="phone" className="text-lg font-medium text-gray-700">
            Telefone
          </Label>
          <Input
            id="phone"
            type="text"
            placeholder="Digite o telefone de contato"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
