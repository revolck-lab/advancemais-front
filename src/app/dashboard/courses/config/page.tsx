'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Label } from '@/components/ui/label/label'
import { Input } from '@/components/ui/input/input'
import { Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

// Custom Switch component with SIM/NÃO labels as shown in the image
interface CustomSwitchProps {
  id: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const CustomSwitch = ({
  id,
  checked = false,
  onChange = () => {},
}: CustomSwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    setIsChecked(!isChecked)
    onChange(!isChecked)
  }

  return (
    <div
      onClick={handleChange}
      className={`relative flex items-center w-20 h-8 rounded-full cursor-pointer transition-colors duration-300 ${isChecked ? 'bg-secondary' : 'bg-gray-300'}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => {}}
        className="sr-only"
      />
      <span
        className={`absolute text-xs font-medium ${isChecked ? 'left-3 text-white' : 'right-3 text-gray-600'}`}
      >
        {isChecked ? 'SIM' : 'NÃO'}
      </span>
      <span
        className={`absolute h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ${isChecked ? 'right-1' : 'left-1'}`}
      />
    </div>
  )
}

// Checkbox component
const Checkbox = ({
  id,
  checked,
  onChange,
}: {
  id: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
    />
  )
}

// Sample periods data
const allPeriods = [
  { id: 1, days: 30, label: '1 mês' },
  { id: 2, days: 90, label: '3 meses' },
  { id: 3, days: 180, label: '6 meses' },
  { id: 4, days: 365, label: '1 ano' },
  { id: 5, days: 730, label: '2 anos' },
  { id: 6, days: 1095, label: '3 anos' },
  { id: 7, days: 1460, label: '4 anos' },
  { id: 8, days: 1825, label: '5 anos' },
  { id: 9, days: 2190, label: '6 anos' },
  { id: 10, days: 2555, label: '7 anos' },
  { id: 11, days: 2920, label: '8 anos' },
  { id: 12, days: 3285, label: '9 anos' },
]

export default function CourseSettingsSidebarTabs() {
  const [activeTab, setActiveTab] = useState('certificados')
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const periodsPerPage = 10

  // Pagination logic
  const indexOfLastPeriod = currentPage * periodsPerPage
  const indexOfFirstPeriod = indexOfLastPeriod - periodsPerPage
  const currentPeriods = allPeriods.slice(indexOfFirstPeriod, indexOfLastPeriod)
  const totalPages = Math.ceil(allPeriods.length / periodsPerPage)

  // Handle checkbox selection
  const togglePeriodSelection = (periodId: number): void => {
    setSelectedPeriods((prev: number[]) =>
      prev.includes(periodId)
        ? prev.filter((id: number) => id !== periodId)
        : [...prev, periodId]
    )
  }

  // Handle bulk delete
  const handleDeleteSelected = () => {
    // In a real app, you would delete the selected periods
    console.log('Deleting periods:', selectedPeriods)
    setSelectedPeriods([])
  }

  // Handle pagination
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="flex gap-6 p-6 min-h-screen">
      {/* Sidebar with tabs */}
      <div className="w-1/5">
        <div className="flex flex-col space-y-1 bg-white rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('certificados')}
            className={`p-4 text-left text-sm font-medium transition-colors rounded-t-xl
              ${
                activeTab === 'certificados'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            Certificados
          </button>
          <button
            onClick={() => setActiveTab('periodos')}
            className={`p-4 text-left text-sm font-medium transition-colors
              ${
                activeTab === 'periodos'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            Períodos
          </button>
          <button
            onClick={() => setActiveTab('depoimentos')}
            className={`p-4 text-left text-sm font-medium transition-colors rounded-b-xl
              ${
                activeTab === 'depoimentos'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            Depoimentos
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1">
        {activeTab === 'certificados' && (
          <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-medium text-gray-800">
                Configurações de Certificado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="showPdf" className="text-gray-700 text-sm">
                  Exibir PDF do certificado ao consultar no site?
                </Label>
                <CustomSwitch id="showPdf" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="randomCode" className="text-gray-700 text-sm">
                  Código de autenticidade aleatório no certificado?
                </Label>
                <CustomSwitch id="randomCode" />
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'periodos' && (
          <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white">
            <CardHeader className="bg-white border-b border-gray-100 pb-4 flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-medium text-gray-800">
                Períodos
              </CardTitle>
              <div className="flex gap-2">
                {selectedPeriods.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir
                  </button>
                )}
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-purple-700 rounded-md hover:bg-purple-800 transition-colors">
                  <Plus className="h-3.5 w-3.5" />
                  Adicionar Novo
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Input
                  placeholder="Pesquisar por períodos..."
                  className="border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
              <div className="overflow-hidden border border-gray-100 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="py-3 px-4 font-medium text-gray-500 text-xs uppercase">
                        <Checkbox
                          id="select-all"
                          checked={
                            selectedPeriods.length === currentPeriods.length &&
                            currentPeriods.length > 0
                          }
                          onChange={() => {
                            if (
                              selectedPeriods.length === currentPeriods.length
                            ) {
                              setSelectedPeriods([])
                            } else {
                              setSelectedPeriods(
                                currentPeriods.map((p) => p.id)
                              )
                            }
                          }}
                        />
                      </th>
                      <th className="py-3 px-4 font-medium text-gray-500 text-xs uppercase">
                        ID
                      </th>
                      <th className="py-3 px-4 font-medium text-gray-500 text-xs uppercase">
                        Dias
                      </th>
                      <th className="py-3 px-4 font-medium text-gray-500 text-xs uppercase">
                        Período
                      </th>
                      <th className="py-3 px-4 text-center font-medium text-gray-500 text-xs uppercase">
                        Excluir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPeriods.map((p) => (
                      <tr
                        key={p.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <Checkbox
                            id={`period-${p.id}`}
                            checked={selectedPeriods.includes(p.id)}
                            onChange={() => togglePeriodSelection(p.id)}
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-700">{p.id}</td>
                        <td className="py-3 px-4 text-gray-700">{p.days}</td>
                        <td className="py-3 px-4 text-gray-700">{p.label}</td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="mx-auto h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 px-1">
                <div className="text-sm text-gray-500">
                  Exibindo {indexOfFirstPeriod + 1}-
                  {Math.min(indexOfLastPeriod, allPeriods.length)} de{' '}
                  {allPeriods.length} registros
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center h-8 w-8 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center h-8 w-8 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'depoimentos' && (
          <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white">
            <CardHeader className="bg-white border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-medium text-gray-800">
                Configurações de Depoimentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="allowTestimonial"
                  className="text-gray-700 text-sm"
                >
                  Permitir depoimento?
                </Label>
                <CustomSwitch id="allowTestimonial" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="requireText" className="text-gray-700 text-sm">
                  Deseja tornar requisito o envio do texto do depoimento?
                </Label>
                <CustomSwitch id="requireText" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
