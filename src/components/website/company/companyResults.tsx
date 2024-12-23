'use client'

import React from 'react'
import {
  Settings,
  FileText,
  PieChart,
  BarChart,
  TrendingUp,
} from 'lucide-react'

const CompanyResults: React.FC = () => {
  const results = [
    {
      icon: <Settings size={40} className="text-red-600" />,
      title: 'Enxergar novas oportunidades nos processos',
    },
    {
      icon: <FileText size={40} className="text-red-600" />,
      title: 'Repensar como o trabalho atual é feito',
    },
    {
      icon: <PieChart size={40} className="text-red-600" />,
      title: 'Aprender como resolver problemas',
    },
    {
      icon: <BarChart size={40} className="text-red-600" />,
      title: 'Aplicar conhecimento em um caso real da empresa',
    },
    {
      icon: <TrendingUp size={40} className="text-red-600" />,
      title: 'Desafiar os resultados da empresa',
    },
  ]

  return (
    <section className="container mx-auto py-16 text-center">
      <h2 className="text-4xl font-extrabold text-neutral-800 mb-12">
        O TREINAMENTO <span className="text-red-600">IN COMPANY</span> É IDEAL
        PARA
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {results.map((result, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="mb-4">{result.icon}</div>
            <p className="text-lg text-neutral-700 font-medium leading-snug">
              {result.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CompanyResults
