'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  DollarSign,
  TrendingUp,
  Users,
  CalendarDays,
  Download,
  BarChart2,
} from 'lucide-react'

// Dados mockados de relatórios financeiros
const mockFinancialData = {
  totalRevenue: 125890.75,
  mrr: 15200.5, // Monthly Recurring Revenue
  newSubscriptions: 45,
  churnRate: '2.5%',
  revenueByCourse: [
    { course: 'Programação Avançada', revenue: 35000.0 },
    { course: 'Marketing Digital Essencial', revenue: 28000.0 },
    { course: 'Design UX para Iniciantes', revenue: 22000.0 },
    { course: 'Finanças Pessoais', revenue: 18000.0 },
    { course: 'Idiomas para Negócios', revenue: 15000.0 },
  ],
  revenueByPlan: [
    { plan: 'Plano Premium Aluno', revenue: 40000.0 },
    { plan: 'Plano Empresa Pro', revenue: 55000.0 },
    { plan: 'Plano Básico Aluno', revenue: 20000.0 },
    { plan: 'Plano Empresa Essencial', revenue: 10000.0 },
  ],
  recentTransactions: Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    type: ['Compra de Curso', 'Assinatura', 'Renovação'][
      Math.floor(Math.random() * 3)
    ],
    description: `Transação ${i + 1}`,
    amount: (Math.random() * 300 + 20).toFixed(2),
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toLocaleDateString('pt-BR'),
    status: ['Concluída', 'Pendente', 'Falha'][Math.floor(Math.random() * 3)],
  })),
}

export default function RelatoriosFinanceirosPage() {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [reportType, setReportType] = useState('mensal') // diário, semanal, mensal, anual

  const handleExportReport = () => {
    alert(
      `Exportando relatório ${reportType} de ${startDate} a ${endDate}... (Simulação)`
    )
    // Lógica para exportar o relatório (PDF, CSV)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">
            Visão geral e detalhada das finanças da plataforma.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diario">Diário</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockFinancialData.totalRevenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              +10% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Recorrente Mensal (MRR)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockFinancialData.mrr.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">+5% este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novas Assinaturas
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFinancialData.newSubscriptions}
            </div>
            <p className="text-xs text-muted-foreground">Total no período</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Churn</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFinancialData.churnRate}
            </div>
            <p className="text-xs text-muted-foreground">Média mensal</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtro de Período */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Filtrar por Período
          </CardTitle>
          <CardDescription>
            Selecione um intervalo de datas para os relatórios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              placeholder="Data Início"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Data Fim"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Receita por Curso */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Receita por Curso</CardTitle>
          <CardDescription>
            Distribuição da receita entre os cursos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead className="text-right">Receita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFinancialData.revenueByCourse.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.course}</TableCell>
                    <TableCell className="text-right">
                      R$ {item.revenue.toLocaleString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Receita por Plano */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Receita por Plano de Assinatura</CardTitle>
          <CardDescription>
            Distribuição da receita entre os planos de assinatura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plano</TableHead>
                  <TableHead className="text-right">Receita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFinancialData.revenueByPlan.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.plan}</TableCell>
                    <TableCell className="text-right">
                      R$ {item.revenue.toLocaleString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transações Recentes */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>
            Últimas transações financeiras na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFinancialData.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.type}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      R${' '}
                      {parseFloat(transaction.amount).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
