import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'

interface SEOData {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  metaRobots: string
  canonicalUrl: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
}

const SEOPage: React.FC = () => {
  const { toast } = useToast()

  const [seoData, setSeoData] = useState<SEOData>({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaRobots: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
  })

  // Função genérica para inputs (exceto os Textareas)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSeoData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Função para atualizar os campos de TextareaDashboard (que possuem onChange com assinatura diferente)
  const handleTextareaChange = (name: keyof SEOData, value: string) => {
    setSeoData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Aqui você pode adicionar validações ou enviar os dados para uma API
    console.log('SEO Data:', seoData)
    toast({
      title: 'SEO Configurado',
      description: 'As configurações de SEO foram salvas com sucesso!',
      variant: 'success',
    })
  }

  return (
    <div className="p-4">
      <form className="space-y-8">
        {/* Seção: SEO Metadata */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            SEO Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="metaTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Meta Título
              </Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                type="text"
                placeholder="Digite o título para SEO"
                value={seoData.metaTitle}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="metaKeywords"
                className="block text-sm font-medium text-gray-700"
              >
                Meta Keywords
              </Label>
              <Input
                id="metaKeywords"
                name="metaKeywords"
                type="text"
                placeholder="Digite as palavras-chave, separadas por vírgula"
                value={seoData.metaKeywords}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="metaRobots"
                className="block text-sm font-medium text-gray-700"
              >
                Meta Robots
              </Label>
              <Input
                id="metaRobots"
                name="metaRobots"
                type="text"
                placeholder="Ex: index, follow"
                value={seoData.metaRobots}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="canonicalUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Canonical URL
              </Label>
              <Input
                id="canonicalUrl"
                name="canonicalUrl"
                type="url"
                placeholder="Digite a URL canônica"
                value={seoData.canonicalUrl}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label
                htmlFor="metaDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Meta Description
              </Label>
              <TextareaDashboard
                id="metaDescription"
                placeholder="Digite a descrição para SEO"
                value={seoData.metaDescription}
                onChange={(value: string) =>
                  handleTextareaChange('metaDescription', value)
                }
              />
            </div>
          </div>
        </section>

        {/* Seção: Social Metadata */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            Social Metadata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Open Graph */}
            <div className="md:col-span-2">
              <h4 className="text-xl font-medium mb-2">Open Graph</h4>
            </div>
            <div>
              <Label
                htmlFor="ogTitle"
                className="block text-sm font-medium text-gray-700"
              >
                OG Title
              </Label>
              <Input
                id="ogTitle"
                name="ogTitle"
                type="text"
                placeholder="Digite o título para Open Graph"
                value={seoData.ogTitle}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="ogImage"
                className="block text-sm font-medium text-gray-700"
              >
                OG Image URL
              </Label>
              <Input
                id="ogImage"
                name="ogImage"
                type="url"
                placeholder="Digite a URL da imagem para Open Graph"
                value={seoData.ogImage}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label
                htmlFor="ogDescription"
                className="block text-sm font-medium text-gray-700"
              >
                OG Description
              </Label>
              <TextareaDashboard
                id="ogDescription"
                placeholder="Digite a descrição para Open Graph"
                value={seoData.ogDescription}
                onChange={(value: string) =>
                  handleTextareaChange('ogDescription', value)
                }
              />
            </div>

            {/* Twitter Card */}
            <div className="md:col-span-2">
              <h4 className="text-xl font-medium mb-2">Twitter Card</h4>
            </div>
            <div>
              <Label
                htmlFor="twitterTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter Title
              </Label>
              <Input
                id="twitterTitle"
                name="twitterTitle"
                type="text"
                placeholder="Digite o título para Twitter"
                value={seoData.twitterTitle}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="twitterImage"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter Image URL
              </Label>
              <Input
                id="twitterImage"
                name="twitterImage"
                type="url"
                placeholder="Digite a URL da imagem para Twitter"
                value={seoData.twitterImage}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label
                htmlFor="twitterDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter Description
              </Label>
              <TextareaDashboard
                id="twitterDescription"
                placeholder="Digite a descrição para Twitter"
                value={seoData.twitterDescription}
                onChange={(value: string) =>
                  handleTextareaChange('twitterDescription', value)
                }
              />
            </div>
          </div>
        </section>

        {/* Seção: Pré-visualização do Snippet SEO */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
            SEO Preview
          </h3>
          <div className="border p-4 rounded-md bg-gray-50">
            <p className="text-sm text-green-700">
              {seoData.canonicalUrl || 'https://www.seusite.com/exemplo'}
            </p>
            <h4 className="text-blue-600 text-lg font-semibold mt-1">
              {seoData.metaTitle || 'Título de exemplo para SEO'}
            </h4>
            <p className="text-gray-700 mt-1">
              {seoData.metaDescription ||
                'Esta é uma descrição de exemplo que será exibida no snippet do Google. Utilize uma descrição atrativa e que contenha as palavras-chave mais importantes.'}
            </p>
          </div>
        </section>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SEOPage
