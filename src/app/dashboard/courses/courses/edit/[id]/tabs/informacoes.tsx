'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Label } from '@/components/ui/label/label'
import { Input } from '@/components/ui/input/input'
import { Trash2, HelpCircle, Copy } from 'lucide-react'
import CustomSwitch from '@/components/dashboard/config/custom-switch/CustomSwitch'

export default function Informacoes() {
  return (
    <div className="space-y-8">
      {/* Main Content Section */}
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Informações</h2>
        <p className="text-gray-600 mb-4">
          Defina a estrutura principal do curso.
        </p>

        <hr className="border-gray-200 mb-8" />

        {/* Status Section */}
        <div className="mb-6">
          <Label className="flex items-center mb-3">
            <span className="text-red-500 mr-1">*</span> Status
          </Label>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-primary text-white rounded-md">
              Rascunho
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md">
              Publicado
            </button>
          </div>
        </div>

        {/* Course Free Section */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Label>Curso livre?</Label>
            <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
          </div>
          <CustomSwitch id="cursoLivre" variant="default" />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Course Title */}
          <div>
            <Label className="flex items-center mb-2">
              <span className="text-red-500 mr-1">*</span> Título do curso
            </Label>
            <Input
              placeholder="Nome do curso"
              defaultValue="João de Barro"
              className="w-full border border-gray-200 rounded-md"
            />
          </div>

          {/* Coordinator */}
          <div>
            <Label className="flex items-center mb-2">
              <span className="text-red-500 mr-1">*</span> Coordenador
              <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
            </Label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-md p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Roberto Monteiro</option>
                <option>Ana Silva</option>
                <option>Carlos Oliveira</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Category */}
          <div>
            <Label className="flex items-center mb-2">
              <span className="text-red-500 mr-1">*</span> Categoria
            </Label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-md p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Inbound</option>
                <option>Marketing</option>
                <option>Vendas</option>
                <option>Tecnologia</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <Label className="flex items-center mb-2">
              <span className="text-red-500 mr-1">*</span> Início das aulas
            </Label>
            <Input
              type="text"
              defaultValue="07/04/2025 17:47"
              className="w-full border border-gray-200 rounded-md"
            />
          </div>

          {/* Workload and Order */}
          <div className="grid grid-cols-2 gap-4">
            {/* Workload */}
            <div>
              <Label className="block mb-2">Carga horária</Label>
              <Input
                type="text"
                defaultValue="1111:11"
                className="w-full border border-gray-200 rounded-md"
              />
            </div>

            {/* Order */}
            <div>
              <Label className="flex items-center mb-2">
                <span className="text-red-500 mr-1">*</span> Ordem
              </Label>
              <Input
                type="text"
                defaultValue="2"
                className="w-full border border-gray-200 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Access Configuration Section */}
        <h3 className="text-gray-800 text-lg font-medium mb-6">
          Configuração de acesso
        </h3>

        {/* Lifetime Access */}
        <div className="flex items-center justify-between mb-6">
          <Label className="text-gray-700">Acesso vitalício</Label>
          <CustomSwitch id="acessoVitalicio" variant="default" />
        </div>

        {/* Access Period */}
        <div className="mb-6">
          <Label className="flex items-center mb-2">
            <span className="text-red-500 mr-1">*</span> Período de acesso
            <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
          </Label>
          <div className="relative">
            <select className="w-full border border-gray-200 rounded-md p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>3 meses</option>
              <option>6 meses</option>
              <option>1 ano</option>
              <option>2 anos</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Enable Support */}
        <div className="flex items-center justify-between mb-6">
          <Label className="text-gray-700">Habilitar suporte</Label>
          <CustomSwitch id="habilitarSuporte" checked={true} variant="purple" />
        </div>

        {/* Support Period */}
        <div className="mb-8">
          <Label className="flex items-center mb-2">
            <span className="text-red-500 mr-1">*</span> Período de suporte
          </Label>
          <div className="relative">
            <select className="w-full border border-gray-200 rounded-md p-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>3 meses</option>
              <option>6 meses</option>
              <option>1 ano</option>
              <option>2 anos</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Configuration */}
      <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-white border-b border-gray-100 pb-4">
          <CardTitle className="text-lg font-medium text-gray-800">
            Configuração de certificados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="showPdf" className="text-gray-700 text-sm">
              Exibir PDF do certificado ao consultar no site?
            </Label>
            <CustomSwitch id="showPdf" variant="purple" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="randomCode" className="text-gray-700 text-sm">
              Código de autenticidade aleatório no certificado?
            </Label>
            <CustomSwitch id="randomCode" variant="purple" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allowDownload" className="text-gray-700 text-sm">
              Permitir download do certificado?
            </Label>
            <CustomSwitch id="allowDownload" checked={true} variant="purple" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showQrCode" className="text-gray-700 text-sm">
              Incluir QR Code para validação?
            </Label>
            <CustomSwitch id="showQrCode" checked={true} variant="purple" />
          </div>
        </CardContent>
      </Card>

      {/* Theme and Course Cover */}
      <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-white border-b border-gray-100 pb-4">
          <CardTitle className="text-lg font-medium text-gray-800">
            Tema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <Label className="block mb-2">Capa do curso</Label>
            <p className="text-sm text-gray-500 mb-4">
              * Enviar imagem.png transparente, jpg ou gif na medida de 991x592.
            </p>

            <div className="relative w-full max-w-md h-64 bg-gray-100 border border-gray-200 rounded-md">
              <div className="absolute inset-0 flex items-center justify-center"></div>
              <button className="absolute top-2 right-2 h-10 w-10 bg-red-500 text-white rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Duplicate and Delete Course */}
      <div className="space-y-6">
        {/* Duplicate Course */}
        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-gray-800 text-lg font-medium mb-2">
            Duplicar curso
          </h3>
          <p className="text-gray-600 mb-4">
            Faça uma cópia do curso com as mesmas configurações, módulos, aulas
            e provas.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition-colors">
            <Copy className="h-4 w-4" />
            DUPLICAR
          </button>
        </div>

        {/* Delete Course */}
        <div className="border border-red-200 bg-red-50 rounded-lg p-6">
          <h3 className="text-gray-800 text-lg font-medium mb-2">
            Excluir curso
          </h3>
          <p className="text-gray-600 mb-4">
            Você pode alterar seu status para rascunho para desativá-lo. Ao
            excluir, curso será movido para a lixeira e removido permanentemente
            após 90 dias.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            <Trash2 className="h-4 w-4" />
            EXCLUIR
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-purple-800 transition-colors">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          SALVAR
        </button>
      </div>
    </div>
  )
}
