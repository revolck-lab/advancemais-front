import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { useToast } from '@/hooks/use-toast'

interface SocialNetwork {
  id: string
  name: string
  url: string
}

const GlobalConfig: React.FC = () => {
  const { toast } = useToast()

  // Estados para as configurações globais
  const [siteTitle, setSiteTitle] = useState<string>('')
  const [faviconUrl, setFaviconUrl] = useState<string>('')

  // Estados para gerenciar redes sociais
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([])
  const [newNetworkName, setNewNetworkName] = useState<string>('')
  const [newNetworkUrl, setNewNetworkUrl] = useState<string>('')

  // Adiciona nova rede social
  const handleAddSocialNetwork = () => {
    if (!newNetworkName || !newNetworkUrl) {
      toast({
        title: 'Erro',
        description: 'Preencha os campos de nome e URL da rede social.',
        variant: 'danger',
      })
      return
    }
    const newNetwork: SocialNetwork = {
      id: Date.now().toString(),
      name: newNetworkName,
      url: newNetworkUrl,
    }
    setSocialNetworks((prev) => [...prev, newNetwork])
    setNewNetworkName('')
    setNewNetworkUrl('')
  }

  // Remove rede social pelo id
  const handleRemoveSocialNetwork = (id: string) => {
    setSocialNetworks((prev) => prev.filter((network) => network.id !== id))
  }

  // Salva as configurações globais (pode ser adaptado para enviar para uma API)
  const handleSaveGlobalConfig = () => {
    const globalConfig = {
      siteTitle,
      faviconUrl,
      socialNetworks,
    }
    console.log('Global Config:', globalConfig)
    toast({
      title: 'Configurações Salvas',
      description: 'As configurações globais foram salvas com sucesso!',
      variant: 'success',
    })
  }

  return (
    <div className="p-4">
      <form className="space-y-8">
        {/* Seção: Identidade do Site */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            Identidade do Site
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="siteTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Título do Site
              </Label>
              <Input
                id="siteTitle"
                name="siteTitle"
                type="text"
                placeholder="Digite o título do site"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="faviconUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Favicon URL
              </Label>
              <Input
                id="faviconUrl"
                name="faviconUrl"
                type="text"
                placeholder="Digite a URL do favicon"
                value={faviconUrl}
                onChange={(e) => setFaviconUrl(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </section>

        {/* Seção: Redes Sociais */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            Redes Sociais
          </h3>
          <div className="space-y-4">
            {/* Formulário para adicionar nova rede social */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="newNetworkName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome da Rede
                </Label>
                <Input
                  id="newNetworkName"
                  name="newNetworkName"
                  type="text"
                  placeholder="Ex: Facebook"
                  value={newNetworkName}
                  onChange={(e) => setNewNetworkName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="newNetworkUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL da Rede
                </Label>
                <Input
                  id="newNetworkUrl"
                  name="newNetworkUrl"
                  type="text"
                  placeholder="Ex: https://facebook.com/suaPagina"
                  value={newNetworkUrl}
                  onChange={(e) => setNewNetworkUrl(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleAddSocialNetwork}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Adicionar Rede Social
              </Button>
            </div>

            {/* Lista de redes sociais adicionadas */}
            {socialNetworks.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">
                  Redes Adicionadas
                </h4>
                <ul className="space-y-2">
                  {socialNetworks.map((network) => (
                    <li
                      key={network.id}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
                    >
                      <div>
                        <p className="font-medium">{network.name}</p>
                        <p className="text-sm text-gray-600">{network.url}</p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleRemoveSocialNetwork(network.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      >
                        Remover
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSaveGlobalConfig}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GlobalConfig
