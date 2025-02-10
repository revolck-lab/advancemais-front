// src/components/dashboard/config/business-info/business-info.tsx
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import ReactPlayer from 'react-player'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'
import LoaderArchives from '@/components/ui/loader/loader-archives'

export default function MissionBusiness() {
  const { toast } = useToast()

  // Estados para as descrições
  const [historyDescription, setHistoryDescription] = useState<string>(
    'A Advance+ foi fundada com o compromisso de transformar carreiras e negócios por meio da educação e inovação...'
  )
  const [missionDescription, setMissionDescription] = useState<string>(
    'Capacitar profissionais e empresas, promovendo desenvolvimento e oportunidades no mercado...'
  )
  const [visionDescription, setVisionDescription] = useState<string>(
    'Ser referência em soluções educacionais e empresariais, impulsionando crescimento sustentável e inovação...'
  )

  // Estado para o vídeo (URL)
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  )

  // Estado para controlar se o vídeo já foi carregado
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false)

  // Sempre que a URL mudar, reseta o estado de carregamento do vídeo
  useEffect(() => {
    setVideoLoaded(false)
  }, [youtubeUrl])

  const handleSave = () => {
    if (
      !historyDescription ||
      !missionDescription ||
      !visionDescription ||
      !youtubeUrl
    ) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos antes de salvar.',
        variant: 'danger',
      })
      return
    }

    console.log('Salvando...', {
      historyDescription,
      missionDescription,
      visionDescription,
      youtubeUrl,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="p-4 mx-auto">
      {/* Seção do Vídeo */}
      <div className="mt-0">
        <Label
          htmlFor="youtubeUrl"
          className="text-base font-normal text-neutral required"
        >
          URL do Vídeo do YouTube
        </Label>
        <Input
          id="youtubeUrl"
          type="text"
          placeholder="Digite a URL do vídeo"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
        />
        <div className="mt-4">
          {ReactPlayer.canPlay(youtubeUrl) ? (
            <div className="relative" style={{ height: '600px' }}>
              {/* Loader centralizado enquanto o vídeo carrega */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoaderArchives />
                </div>
              )}
              <div style={{ visibility: videoLoaded ? 'visible' : 'hidden' }}>
                <ReactPlayer
                  url={youtubeUrl}
                  controls
                  width="100%"
                  height="600px"
                  onReady={() => setVideoLoaded(true)}
                />
              </div>
            </div>
          ) : (
            <p className="text-red-500">
              URL inválida. Insira um link válido do YouTube.
            </p>
          )}
        </div>
      </div>

      {/* Grid com as três descrições */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
        <div>
          <Label
            htmlFor="historyDescription"
            className="text-base font-normal text-neutral required"
          >
            Nossa História
          </Label>
          <TextareaDashboard
            value={historyDescription}
            onChange={(value) => setHistoryDescription(value.substring(0, 500))}
            placeholder="Digite a descrição da nossa história"
          />
        </div>
        <div>
          <Label
            htmlFor="missionDescription"
            className="text-base font-normal text-neutral required"
          >
            Missão
          </Label>
          <TextareaDashboard
            value={missionDescription}
            onChange={(value) => setMissionDescription(value.substring(0, 500))}
            placeholder="Digite a descrição da missão"
          />
        </div>
        <div>
          <Label
            htmlFor="visionDescription"
            className="text-base font-normal text-neutral required"
          >
            Visão
          </Label>
          <TextareaDashboard
            value={visionDescription}
            onChange={(value) => setVisionDescription(value.substring(0, 500))}
            placeholder="Digite a descrição da visão"
          />
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-8">
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
