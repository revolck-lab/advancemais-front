import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'

/**
 * Aplica máscara no telefone.
 *
 * - Remove todos os caracteres não numéricos.
 * - Se o número iniciar com "55", remove-o (considera-se o código do país).
 * - Limita o número a 11 dígitos (2 para DDD e até 9 para o telefone).
 * - Formata o telefone conforme:
 *    - Se a parte do telefone tiver 8 dígitos ou menos: formata em 4-4.
 *    - Se tiver 9 dígitos ou mais: formata em 5-4.
 */
const applyPhoneMask = (raw: string): string => {
  // Remove tudo que não for dígito.
  let numeric = raw.replace(/\D/g, '')

  // Se o número iniciar com "55", remove-o (código do país)
  if (numeric.startsWith('55')) {
    numeric = numeric.substring(2)
  }

  // Limita o número a 11 dígitos (2 para DDD e até 9 para o telefone)
  numeric = numeric.substring(0, 11)

  // Separa o DDD (2 dígitos) e a parte do telefone.
  const area = numeric.substring(0, 2)
  const phonePart = numeric.substring(2)

  // Constrói a string com o prefixo fixo "+55"
  let masked = '+55'
  if (area) {
    masked += ` ${area}`
  }
  if (phonePart) {
    masked += ' '
    if (phonePart.length <= 8) {
      // Para telefone fixo (8 dígitos ou menos)
      masked += phonePart.replace(/(\d{0,4})(\d{0,4})/, (_, g1, g2) =>
        g2 ? `${g1}-${g2}` : g1
      )
    } else {
      // Para celular (9 dígitos)
      masked += phonePart.replace(/(\d{0,5})(\d{0,4})/, (_, g1, g2) =>
        g2 ? `${g1}-${g2}` : g1
      )
    }
  }
  return masked
}

export default function ContactComponent() {
  const { toast } = useToast()
  const [title, settitle] = useState<string>('Entre em Contato')
  const [description, setDescription] = useState<string>(
    'Envie um e-mail, ligue ou preencha o formulário abaixo para saber como podemos ajudar.'
  )
  const [supportInfo, setSupportInfo] = useState<string>(
    'Suporte ao Cliente: Nosso time está disponível para ajudar.'
  )
  const [email, setEmail] = useState<string>('suporte@advancemais.com.br')
  const [phone, setPhone] = useState<string>('+55 82 0000-0000')

  const handleSave = () => {
    if (!title || !description || !supportInfo || !email || !phone) {
      toast({
        title: 'Erro ao salvar!',
        description:
          'Preencha os campos de Título e Subtítulo antes de salvar.',
        variant: 'danger',
      })
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      title,
      description,
      supportInfo,
      email,
      phone,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="p-4 mx-auto">
      {/* Seção de Título e Subtítulo na mesma linha */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          {/* Título */}
          <div className="w-full">
            <Label
              htmlFor="title"
              className="text-base font-normal text-neutral required"
            >
              Título
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Digite o título"
              value={title}
              onChange={(e) => settitle(e.target.value.substring(0, 100))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={100}
            />
          </div>
          {/* Informações de Suporte */}
          <div className="w-full">
            <Label
              htmlFor="informationSup"
              className="text-base font-normal text-neutral required"
            >
              Informações de Suporte
            </Label>
            <Input
              id="informationSup"
              type="text"
              placeholder="Digite as informações de Suporte"
              value={supportInfo}
              onChange={(e) => setSupportInfo(e.target.value.substring(0, 100))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={100}
            />
          </div>
          {/* E-mail */}
          <div className="w-full">
            <Label
              htmlFor="email"
              className="text-base font-normal text-neutral required"
            >
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value.substring(0, 100))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={100}
            />
          </div>
          {/* Telefone */}
          <div className="w-full">
            <Label
              htmlFor="phone"
              className="text-base font-normal text-neutral required"
            >
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(applyPhoneMask(e.target.value))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Label
          htmlFor="description"
          className="text-base font-normal text-neutral required"
        >
          Descrição
        </Label>
        <TextareaDashboard
          id="description"
          value={description}
          onChange={(value: string) => setDescription(value.substring(0, 500))}
          placeholder="Digite a descrição"
        />
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-5">
        <Button
          onClick={handleSave}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
