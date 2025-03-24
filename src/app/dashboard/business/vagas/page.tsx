import Link from 'next/link'
import { Eye, PenLine, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import { Badge } from '@/components/ui/badge/badge'

export default function JobListPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-end mb-6">
        <div className="flex gap-2">
          <Link href="/dashboard/business/vagas/register">
            <Button
              variant="default"
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-3 py-2"
            >
              <span className="mr-1">+</span> Adicionar Nova Vaga
            </Button>
          </Link>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white p-6 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Nº
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Cargo
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Data de Publicação
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Prazo para Inscrição
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id} className="border-b">
                  <td className="px-4 py-4 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-4 text-gray-700">{job.position}</td>
                  <td className="px-4 py-4 text-gray-700">{job.type}</td>
                  <td className="px-4 py-4 text-gray-700">{job.postedDate}</td>
                  <td className="px-4 py-4 text-gray-700">
                    {job.lastDateToApply}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className={
                        job.status === 'Ativo'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
          <div className="text-sm text-gray-700">
            Mostrando 1 a 10 de 14 registros
          </div>
          <div className="flex gap-1">
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              «
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary text-white"
            >
              1
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              2
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              »
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dados de exemplo
const jobs = [
  {
    id: 1,
    position: 'Engenheiro de Redes',
    type: 'Tempo Integral',
    postedDate: '12-01-2024',
    lastDateToApply: '24-01-2024',
    status: 'Ativo',
  },
  {
    id: 2,
    position: 'Desenvolvedor de Software Júnior',
    type: 'Meio Período',
    postedDate: '13-01-2024',
    lastDateToApply: '25-01-2024',
    status: 'Ativo',
  },
  {
    id: 3,
    position: 'Desenvolvedor Java',
    type: 'Tempo Integral',
    postedDate: '13-01-2024',
    lastDateToApply: '26-01-2024',
    status: 'Inativo',
  },
]
