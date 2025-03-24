'use client'

import { useState } from 'react'
import { Download, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import { Badge } from '@/components/ui/badge/badge'
import Image from 'next/image'
export default function CandidateList() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  return (
    <div className="container mx-auto p-4 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <Tabs defaultValue="all">
        <TabsList className="mb-6 border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Todos os candidatos
            <Badge className="ml-2 bg-muted text-muted-foreground">24</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="shortlisted"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Pré-selecionados
            <Badge className="ml-2 bg-muted text-muted-foreground">8</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="interviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Entrevistas
            <Badge className="ml-2 bg-muted text-muted-foreground">5</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="flex justify-between mb-4">
            <div className="relative w-72">
              <Input placeholder="Buscar candidato" className="pl-8" />
            </div>
            <Button variant="default" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>

          <div className="rounded-md border bg-background">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort('id')}
                      >
                        ID {renderSortIcon('id')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort('candidate')}
                      >
                        Candidato {renderSortIcon('candidate')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort('date')}
                      >
                        Data de inscrição {renderSortIcon('date')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort('experience')}
                      >
                        Experiência {renderSortIcon('experience')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status da candidatura
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">C10045</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          {/* <Image
                            src="/placeholder.svg"
                            alt="Foto do candidato"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          /> */}
                        </div>
                        <div>
                          <div className="font-medium">Ana Silva</div>
                          <div className="text-sm text-muted-foreground">
                            Desenvolvedor Front-end
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">15 Julho 2023</td>
                    <td className="px-4 py-3 text-sm">4 Anos</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Aprovado
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2"></div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">C10046</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg"
                            alt="Foto do candidato"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Carlos Mendes</div>
                          <div className="text-sm text-muted-foreground">
                            Desenvolvedor Back-end
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">18 Julho 2023</td>
                    <td className="px-4 py-3 text-sm">6 Anos</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        Rejeitado
                      </Badge>
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">C10047</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg"
                            alt="Foto do candidato"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Mariana Costa</div>
                          <div className="text-sm text-muted-foreground">
                            UX/UI Designer
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">20 Julho 2023</td>
                    <td className="px-4 py-3 text-sm">3 Anos</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Novo
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-secondary text-white py-1 px-2"
                        >
                          Entrevistar
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">C10048</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg"
                            alt="Foto do candidato"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Pedro Alves</div>
                          <div className="text-sm text-muted-foreground">
                            Desenvolvedor Full-stack
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">22 Julho 2023</td>
                    <td className="px-4 py-3 text-sm">5 Anos</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Entrevista marcada
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-[15px]">
                        LINK DA REUNIÃO
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">C10049</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg"
                            alt="Foto do candidato"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Juliana Santos</div>
                          <div className="text-sm text-muted-foreground">
                            Product Manager
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">25 Julho 2023</td>
                    <td className="px-4 py-3 text-sm">7 Anos</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Aprovado
                      </Badge>
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shortlisted" className="mt-0">
          <div className="p-8 text-center text-muted-foreground">
            Conteúdo dos candidatos pré-selecionados será exibido aqui.
          </div>
        </TabsContent>

        <TabsContent value="interviews" className="mt-0">
          <div className="p-8 text-center text-muted-foreground">
            Conteúdo das entrevistas será exibido aqui.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
