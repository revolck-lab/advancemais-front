'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'

interface TableItem {
  id: number
  nome: string
  valor: number | string
}

const DashboardPage: React.FC = () => {
  // Estados para filtros
  const [period, setPeriod] = useState<'diario' | 'mensal' | 'anual'>('diario')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // Estados para indicadores (dados fictícios para demonstração)
  const [indicators, setIndicators] = useState({
    totalVisitasMes: 0,
    novosCadastrosSemana: 0,
    vendasRealizadas: 0,
    fluxoCaixa: 0,
  })

  // Dados da tabela (dummy)
  const [tableData] = useState<TableItem[]>([
    { id: 1, nome: 'Alunos Cadastrados', valor: 120 },
    { id: 2, nome: 'Empresas Cadastradas', valor: 45 },
    { id: 3, nome: 'Vendas Realizadas', valor: 78 },
    { id: 4, nome: 'Fluxo de Caixa', valor: '$12,345' },
  ])

  // Atualiza os indicadores conforme o período selecionado (simulação)
  useEffect(() => {
    if (period === 'diario') {
      setIndicators({
        totalVisitasMes: 1000,
        novosCadastrosSemana: 5,
        vendasRealizadas: 10,
        fluxoCaixa: 500,
      })
    } else if (period === 'mensal') {
      setIndicators({
        totalVisitasMes: 30000,
        novosCadastrosSemana: 20,
        vendasRealizadas: 80,
        fluxoCaixa: 15000,
      })
    } else if (period === 'anual') {
      setIndicators({
        totalVisitasMes: 360000,
        novosCadastrosSemana: 100,
        vendasRealizadas: 500,
        fluxoCaixa: 180000,
      })
    }
  }, [period])

  // Manipula a alteração dos inputs de data
  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'start' | 'end'
  ) => {
    setDateRange({ ...dateRange, [field]: e.target.value })
  }

  return (
    <div className="p-6 space-y-8 bg-white border rounded-lg">
      <h1 className="text-4xl font-bold text-center text-primary">
        Painel de Estatísticas
      </h1>

      {/* Card de Filtros */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-lg text-secondary">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="period" className="text-sm text-gray-700">
                Período
              </Label>
              <Select
                value={period}
                onValueChange={(value) =>
                  setPeriod(value as 'diario' | 'mensal' | 'anual')
                }
              >
                <SelectTrigger className="mt-1 w-full border-gray-300">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diário</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate" className="text-sm text-gray-700">
                Data Início
              </Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange(e, 'start')}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-sm text-gray-700">
                Data Fim
              </Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange(e, 'end')}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-secondary">
              Visitas no Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {indicators.totalVisitasMes}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-secondary">
              Novos Cadastros (Última Semana)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {indicators.novosCadastrosSemana}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-secondary">
              Vendas Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {indicators.vendasRealizadas}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-secondary">
              Fluxo de Caixa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {indicators.fluxoCaixa}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Interativos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-secondary">
            Gráficos Interativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diario" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="diario" onClick={() => setPeriod('diario')}>
                Diário
              </TabsTrigger>
              <TabsTrigger value="mensal" onClick={() => setPeriod('mensal')}>
                Mensal
              </TabsTrigger>
              <TabsTrigger value="anual" onClick={() => setPeriod('anual')}>
                Anual
              </TabsTrigger>
            </TabsList>
            <TabsContent value="diario">
              <div className="h-64 flex items-center justify-center text-gray-500">
                Gráfico de Visualizações Diárias
              </div>
            </TabsContent>
            <TabsContent value="mensal">
              <div className="h-64 flex items-center justify-center text-gray-500">
                Gráfico de Visualizações Mensais
              </div>
            </TabsContent>
            <TabsContent value="anual">
              <div className="h-64 flex items-center justify-center text-gray-500">
                Gráfico de Visualizações Anuais
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tabela de Métricas Detalhadas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-secondary">
            Métricas Detalhadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2 text-sm font-medium text-gray-600">
                    Métrica
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {item.nome}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {item.valor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
