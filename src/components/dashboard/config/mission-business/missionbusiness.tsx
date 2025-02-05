import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import ReactPlayer from 'react-player'

export default function MissionBusiness() {
  const [historyDescription, setHistoryDescription] = useState<string>(
    'A Advance+ foi fundada com o compromisso de transformar carreiras e negócios por meio da educação e inovação...'
  )

  const [missionDescription, setMissionDescription] = useState<string>(
    'Capacitar profissionais e empresas, promovendo desenvolvimento e oportunidades no mercado...'
  )

  const [visionDescription, setVisionDescription] = useState<string>(
    'Ser referência em soluções educacionais e empresariais, impulsionando crescimento sustentável e inovação...'
  )

  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  )

  const handleSave = () => {
    if (
      !historyDescription ||
      !missionDescription ||
      !visionDescription ||
      !youtubeUrl
    ) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    console.log('Salvando...', {
      historyDescription,
      missionDescription,
      visionDescription,
      youtubeUrl,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Informações Institucionais
      </h1>

      <div className="flex flex-col space-y-6">
        {/* Nossa História */}
        <div>
          <Label
            htmlFor="historyDescription"
            className="text-lg font-medium text-gray-700 mt-4"
          >
            Descrição - Nossa História
          </Label>
          <textarea
            id="historyDescription"
            placeholder="Digite a descrição"
            value={historyDescription}
            onChange={(e) => setHistoryDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-28 mt-2"
          />
        </div>

        {/* Missão */}
        <div>
          <Label
            htmlFor="missionDescription"
            className="text-lg font-medium text-gray-700 mt-4"
          >
            Descrição - Missão
          </Label>
          <textarea
            id="missionDescription"
            placeholder="Digite a descrição"
            value={missionDescription}
            onChange={(e) => setMissionDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-28 mt-2"
          />
        </div>

        {/* Visão */}
        <div>
          <Label
            htmlFor="visionDescription"
            className="text-lg font-medium text-gray-700 mt-4"
          >
            Descrição - Visão
          </Label>
          <textarea
            id="visionDescription"
            placeholder="Digite a descrição"
            value={visionDescription}
            onChange={(e) => setVisionDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-28 mt-2"
          />
        </div>

        {/* URL do Vídeo */}
        <div>
          <Label
            htmlFor="youtubeUrl"
            className="text-lg font-medium text-gray-700"
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
        </div>

        {/* Preview do Vídeo */}
        <div className="mt-4 flex justify-center">
          {ReactPlayer.canPlay(youtubeUrl) ? (
            <ReactPlayer
              url={youtubeUrl}
              controls
              width="100%"
              height="300px"
            />
          ) : (
            <p className="text-red-500">
              URL inválida. Insira um link válido do YouTube.
            </p>
          )}
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end mt-6">
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
