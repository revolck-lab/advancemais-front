import {
  ArrowUp,
  ArrowDown,
  Users,
  Briefcase,
  Calendar,
  CheckSquare,
} from 'lucide-react'

export default function RecruitmentDashboard() {
  return (
    <div className="w-full py-7">
      <div className="container mx-auto justify-between">
        {/* Resumo do Plano */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Seu Plano
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Plano Atual: <span className="font-medium">Inicial</span>
              </p>
              <p className="text-sm text-gray-600">
                Vagas Publicadas: <span className="font-medium">2 de 3</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Renovação em: <span className="font-medium">26 dias</span>
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Atualizar Plano
              </button>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: '66%' }}
            ></div>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Total de Candidatos"
            value={24}
            change={15}
            icon={<Users className="h-6 w-6 text-blue-600" />}
          />
          <MetricCard
            title="Vagas Ativas"
            value={2}
            change={2}
            icon={<Briefcase className="h-6 w-6 text-green-600" />}
          />
          <MetricCard
            title="Entrevistas Realizadas"
            value={10}
            change={-5}
            icon={<CheckSquare className="h-6 w-6 text-purple-600" />}
          />
          <MetricCard
            title="Candidatos por Vaga"
            value={68.8}
            suffix="%"
            change={0}
            icon={<Users className="h-6 w-6 text-orange-600" />}
          />
        </div>

        {/* Próximas Entrevistas e Novos Candidatos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Próximas Entrevistas
            </h2>
            <ul className="space-y-4">
              <InterviewItem
                date="03 Jan"
                name="Ana Silva"
                position="Desenvolvedor Full Stack"
                time="14:00 - 15:00"
              />
              <InterviewItem
                date="04 Jan"
                name="Carlos Oliveira"
                position="Designer UX/UI"
                time="10:00 - 11:00"
              />
              <InterviewItem
                date="05 Jan"
                name="Mariana Santos"
                position="Gerente de Produto"
                time="16:00 - 17:00"
              />
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Novos Candidatos
            </h2>
            <ul className="space-y-4">
              <CandidateItem
                name="Pedro Almeida"
                position="Analista de Dados"
                appliedDate="Hoje"
              />
              <CandidateItem
                name="Juliana Costa"
                position="Desenvolvedor Back-end"
                appliedDate="Ontem"
              />
              <CandidateItem
                name="Rafael Mendes"
                position="Especialista em Marketing Digital"
                appliedDate="2 dias atrás"
              />
            </ul>
          </div>
        </div>

        {/* Vagas em Destaque */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Vagas em Destaque
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cargo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidatos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <JobRow
                  title="Desenvolvedor Full Stack"
                  department="Tecnologia"
                  candidates="10"
                  status="Ativa"
                />
                <JobRow
                  title="Designer UX/UI"
                  department="Design"
                  candidates="14"
                  status="Ativa"
                />
                <JobRow
                  title="Gerente de Produto"
                  department="Produto"
                  candidates="0"
                  status="Em Revisão"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
function MetricCard({
  title,
  value,
  change,
  icon,
  suffix = '',
}: {
  title: string
  value: number
  change: number
  icon: React.ReactNode
  suffix?: string
}) {
  const isPositive = change > 0
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-800">
        {value}
        {suffix}
      </p>
      <p
        className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}
      >
        {isPositive ? (
          <ArrowUp className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 mr-1" />
        )}
        {Math.abs(change)}%
      </p>
    </div>
  )
}

function InterviewItem({
  date,
  name,
  position,
  time,
}: {
  date: string
  name: string
  position: string
  time: string
}) {
  return (
    <li className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Calendar className="h-10 w-10 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate mb-0">
          {name}
        </p>
        <p className="text-sm text-gray-500 truncate mb-0">{position}</p>
      </div>
      <div className="flex-shrink-0 text-sm text-gray-500">
        {date}, {time}
      </div>
    </li>
  )
}
function CandidateItem({
  name,
  position,
  appliedDate,
}: {
  name: string
  position: string
  appliedDate: string
}) {
  return (
    <li className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Users className="h-6 w-6 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate mb-0">
          {name}
        </p>
        <p className="text-sm text-gray-500 truncate mb-0">{position}</p>
      </div>
      <div className="flex-shrink-0 text-sm text-gray-500">{appliedDate}</div>
    </li>
  )
}

function JobRow({
  title,
  department,
  candidates,
  status,
}: {
  title: string
  department: string
  candidates: string
  status: string
}) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{candidates}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            status === 'Ativa'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  )
}
