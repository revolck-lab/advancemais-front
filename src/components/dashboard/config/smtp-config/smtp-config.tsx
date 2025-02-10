import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { useToast } from '@/hooks/use-toast'

const SMTPConfig: React.FC = () => {
  const { toast } = useToast()

  // Estados para os campos de configuração de SMTP
  const [host, setHost] = useState<string>('')
  const [port, setPort] = useState<string>('')
  const [senderEmail, setSenderEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [protocol, setProtocol] = useState<string>('SSL') // Opções: SSL, TLS, Nenhum
  const [authRequired, setAuthRequired] = useState<boolean>(true)
  const [loadingTest, setLoadingTest] = useState<boolean>(false)

  // Função para enviar um e-mail de teste
  const handleTestEmail = async () => {
    // Validação dos campos obrigatórios
    if (!host || !port || !senderEmail || (authRequired && !password)) {
      toast({
        title: 'Erro',
        description:
          'Preencha todos os campos obrigatórios para enviar o e-mail de teste.',
        variant: 'danger',
      })
      return
    }

    setLoadingTest(true)
    // Simulação de chamada à API para envio de e-mail de teste (substitua com sua lógica real)
    setTimeout(() => {
      setLoadingTest(false)
      toast({
        title: 'E-mail de teste enviado!',
        description:
          'Verifique sua caixa de entrada para confirmar o recebimento.',
        variant: 'success',
      })
    }, 2000)
  }

  // Função para salvar as configurações de SMTP
  const handleSaveConfig = () => {
    const config = {
      host,
      port,
      senderEmail,
      password,
      protocol,
      authRequired,
    }
    console.log('SMTP Config:', config)
    // Aqui você pode integrar com a API ou salvar no estado global
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de SMTP foram salvas com sucesso!',
      variant: 'success',
    })
  }

  return (
    <div className="p-4">
      <form className="space-y-6">
        {/* SMTP Host */}
        <div>
          <Label
            htmlFor="host"
            className="block text-sm font-medium text-gray-700"
          >
            SMTP Host
          </Label>
          <Input
            id="host"
            type="text"
            placeholder="Ex: smtp.seudominio.com"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Informe o endereço do servidor SMTP.
          </p>
        </div>

        {/* SMTP Port */}
        <div>
          <Label
            htmlFor="port"
            className="block text-sm font-medium text-gray-700"
          >
            SMTP Port
          </Label>
          <Input
            id="port"
            type="number"
            placeholder="Ex: 465"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Informe a porta utilizada pelo servidor SMTP.
          </p>
        </div>

        {/* E-mail Remetente */}
        <div>
          <Label
            htmlFor="senderEmail"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail Remetente
          </Label>
          <Input
            id="senderEmail"
            type="email"
            placeholder="Ex: no-reply@seudominio.com"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Este será o endereço de e-mail utilizado para envio.
          </p>
        </div>

        {/* Autenticação Necessária */}
        <div>
          <Label
            htmlFor="authRequired"
            className="block text-sm font-medium text-gray-700"
          >
            Autenticação Necessária
          </Label>
          <div className="flex items-center mt-1">
            <input
              id="authRequired"
              type="checkbox"
              checked={authRequired}
              onChange={(e) => setAuthRequired(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Sim</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Marque se o servidor SMTP requer autenticação.
          </p>
        </div>

        {/* Senha (apenas se autenticação estiver habilitada) */}
        {authRequired && (
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite a senha do e-mail remetente"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Informe a senha para autenticação no servidor SMTP.
            </p>
          </div>
        )}

        {/* Protocolo de Segurança */}
        <div>
          <Label
            htmlFor="protocol"
            className="block text-sm font-medium text-gray-700"
          >
            Protocolo de Segurança
          </Label>
          <select
            id="protocol"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="SSL">SSL</option>
            <option value="TLS">TLS</option>
            <option value="none">Nenhum</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Selecione o protocolo de segurança para conexão SMTP.
          </p>
        </div>

        {/* Botões para Teste e Salvar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            onClick={handleTestEmail}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            disabled={loadingTest}
          >
            {loadingTest ? 'Enviando...' : 'Enviar E-mail de Teste'}
          </Button>
          <Button
            type="button"
            onClick={handleSaveConfig}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SMTPConfig
