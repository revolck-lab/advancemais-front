import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Share2, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StickyPriceCard } from './sticky-price-card'
import { notFound } from 'next/navigation'

// Definir tipos para nossos dados
type CourseId =
  | 'auxiliar-farmacia'
  | 'operador-empilhadeira'
  | 'oratoria-persuasao-lideres'
  | 'gestao-tempo'

interface CareerPath {
  title: string
  description: string
}

interface JobMarket {
  salaryRange: string
  source: string
  description: string
}

interface Coordinator {
  name: string
  image: string
  curriculum: string
  bio: string
}

interface FaqItem {
  question: string
  answer: string
}

interface CourseData {
  id: string
  title: string
  type: string
  description: string
  // whyStart: string
  careerPaths: CareerPath[]
  jobMarket: JobMarket
  coordinator: Coordinator
  faq: FaqItem[]
}

// Dados fictícios dos cursos
const coursesData: Record<CourseId, CourseData> = {
  'auxiliar-farmacia': {
    id: 'auxiliar-farmacia',
    title: 'Auxiliar de farmácia',
    type: 'Presencial',
    description:
      'O curso tem como objetivo capacitar profissionais para atuar em farmácias e drogarias, sob a supervisão de um farmacêutico. O conteúdo aborda conceitos básicos do setor farmacêutico, como a diferença entre farmácia e drogaria, tipos de medicamentos (referência, genérico e similar), formas farmacêuticas, armazenamento e descarte de medicamentos, além de normas e procedimentos para medicamentos controlados. O curso também enfatiza a importância da ética, postura profissional, técnicas de atendimento ao cliente e o combate à automedicação, preparando o auxiliar para atuar com responsabilidade e segurança no ambiente farmacêutico.',
    careerPaths: [
      {
        title: 'Auxiliar de farmácia',
        description:
          'O profissional terá as competências necessárias para analisar dados sobre colaboradores e fornecer insights relevantes para tomada de decisão em áreas como recrutamento, retenção e desenvolvimento de talentos.',
      },
    ],
    jobMarket: {
      salaryRange: 'R$ 6.500 a R$ 15.000',
      source: 'salario.com.br',
      description:
        'O mercado de People Analytics está em expansão, com grande demanda por profissionais qualificados e com visão analítica. Em termos de remuneração, o salário inicial médio é de R$ 6.500 por mês, com altas oportunidades de crescimento na carreira e especialização, podendo chegar a salários acima de R$ 15.000.',
    },
    coordinator: {
      name: 'Profa. Doutora Melissa Santos',
      image: '/placeholder.svg?height=192&width=192',
      curriculum: 'http://lattes.cnpq.br',
      bio: 'Doutora em Administração com especialização em Gestão de Pessoas pela USP (2012) e Mestre em Ciência de Dados pela UNICAMP (2008). Possui mais de 15 anos de experiência acadêmica e como consultora em empresas de tecnologia. Coordena pesquisas sobre a aplicação de inteligência artificial em processos de RH e é autora de diversos artigos científicos na área.',
    },
    faq: [
      {
        question: 'O que se estuda no curso de People Analytics?',
        answer:
          'O curso aborda análise de dados aplicada à gestão de pessoas, incluindo disciplinas como: Estatística, Big Data, Machine Learning aplicado a RH, Visualização de Dados, Interpretação de Métricas, Recrutamento e Seleção baseados em dados, dentre outros temas.',
      },
      {
        question: 'O que faz um profissional de People Analytics?',
        answer:
          'O profissional de People Analytics utiliza dados para otimizar processos de recursos humanos, como recrutamento, gestão de talentos, engajamento e desempenho. Ele coleta, analisa e interpreta dados para embasar decisões estratégicas na área de gestão de pessoas.',
      },
      {
        question: 'Quais são as ferramentas utilizadas em People Analytics?',
        answer:
          'O curso aborda ferramentas como Excel avançado, PowerBI, Tableau, R, Python e outros softwares específicos para análise de dados em RH.',
      },
    ],
  },
  'operador-empilhadeira': {
    id: 'operador-empilhadeira',
    title: 'Indicadores de Recrutamento e Seleção',
    type: 'Curso Livre',
    description:
      'O curso de Indicadores de Recrutamento e Seleção da AdvanceMais prepara profissionais para mensurar, analisar e otimizar processos seletivos utilizando métricas e KPIs específicos para a área de atração de talentos.',
    careerPaths: [
      {
        title: 'Analista de Recrutamento e Seleção',
        description:
          'O profissional será capaz de estruturar processos seletivos eficientes e mensurar seus resultados através de indicadores específicos.',
      },
      {
        title: 'Consultor de Métricas de RH',
        description:
          'Desenvolverá habilidades para atuar como consultor especializado em métricas de recrutamento para diferentes organizações.',
      },
    ],
    jobMarket: {
      salaryRange: 'R$ 4.200 a R$ 9.500',
      source: 'salario.com.br',
      description:
        'Profissionais que dominam indicadores de recrutamento e seleção têm alta empregabilidade em empresas de médio e grande porte. A remuneração inicial média é de R$ 4.200, podendo chegar a R$ 9.500 em posições mais estratégicas.',
    },
    coordinator: {
      name: 'Profa. Mestre Natália Nascimento',
      image: '/placeholder.svg?height=192&width=192',
      curriculum: 'http://lattes.cnpq.br',
      bio: 'Mestre em Gestão de Pessoas (2015) com especialização em Recrutamento e Seleção pela FGV. Possui certificação em HR Analytics e mais de 10 anos de experiência como Gerente de Recrutamento em grandes empresas. Autora do livro "Métricas que Transformam o RH" e palestrante internacional em eventos sobre aquisição de talentos.',
    },
    faq: [
      {
        question: 'Quais indicadores são abordados no curso?',
        answer:
          'O curso aborda indicadores como time-to-hire, cost-per-hire, taxa de turnover, qualidade da contratação, diversidade, sourcing efficiency, taxa de rejeição de ofertas, entre outros KPIs essenciais para medir a eficiência do recrutamento.',
      },
      {
        question: 'É necessário conhecimento prévio em RH para fazer o curso?',
        answer:
          'É recomendável que o aluno tenha conhecimentos básicos em recrutamento e seleção, mas não é obrigatório. O curso foi estruturado para ser compreensível mesmo para iniciantes na área.',
      },
      {
        question: 'Como os indicadores ajudam a melhorar o processo seletivo?',
        answer:
          'Os indicadores permitem identificar gargalos, reduzir custos, melhorar a qualidade das contratações, aumentar a retenção e tomar decisões baseadas em dados, não apenas em intuição.',
      },
    ],
  },
  'oratoria-persuasao-lideres': {
    id: 'oratoria-persuasao-lideres',
    title: 'Curso de oratória e persuasão para líderes',
    type: 'Curso Livre',
    description:
      'O curso de Oratória e Persuasão para Líderes da AdvanceMais desenvolve habilidades de comunicação eficaz e técnicas de influência para líderes que desejam aprimorar sua capacidade de transmitir ideias e inspirar equipes.',
    careerPaths: [
      {
        title: 'Líder Comunicador',
        description:
          'Desenvolvimento de habilidades para comunicação clara e persuasiva com equipes, clientes e stakeholders.',
      },
      {
        title: 'Apresentador Executivo',
        description:
          'Aprimoramento da capacidade de realizar apresentações de alto impacto em reuniões estratégicas e eventos corporativos.',
      },
    ],
    jobMarket: {
      salaryRange: 'Adicional de 15% a 30% em cargos de liderança',
      source: 'pesquisa interna',
      description:
        'Profissionais com habilidades avançadas de comunicação e persuasão são mais bem avaliados em processos de promoção e tendem a receber entre 15% e 30% a mais em comparação com pares que não dominam essas competências.',
    },
    coordinator: {
      name: 'Prof. Mestre Octávio Alves Jr',
      image: '/placeholder.svg?height=192&width=192',
      curriculum: 'http://lattes.cnpq.br',
      bio: 'Mestre em Comunicação Corporativa pela UFRJ e especialista em Programação Neurolinguística. Com mais de 20 anos de experiência como consultor de comunicação executiva para grandes empresas. É palestrante internacional e autor de três livros sobre oratória e persuasão no ambiente corporativo.',
    },
    faq: [
      {
        question: 'Quais técnicas são ensinadas no curso?',
        answer:
          'O curso aborda storytelling, linguagem corporal, estruturação de discursos persuasivos, técnicas de argumentação, domínio de nervosismo, apresentações visuais impactantes, entre outras habilidades essenciais.',
      },
      {
        question: 'O curso inclui exercícios práticos?',
        answer:
          'Sim, cerca de 70% do curso é composto por exercícios práticos e simulações de situações reais, com feedback individualizado do instrutor para cada participante.',
      },
      {
        question: 'Quem pode se beneficiar deste curso?',
        answer:
          'Líderes de todos os níveis hierárquicos, empreendedores, profissionais que realizam apresentações frequentes, e qualquer pessoa que deseje melhorar sua capacidade de influência e comunicação.',
      },
    ],
  },
  'gestao-tempo': {
    id: 'gestao-tempo',
    title: 'Curso de Gestão de Tempo',
    type: 'Curso Livre',
    description:
      'O curso de Gestão de Tempo da AdvanceMais oferece técnicas e ferramentas práticas para otimização da produtividade pessoal e profissional, ajudando os participantes a priorizar tarefas, eliminar procrastinação e criar rotinas eficientes.',
    careerPaths: [
      {
        title: 'Profissional de Alta Performance',
        description:
          'Desenvolvimento de habilidades para maximizar resultados em menos tempo, equilibrando vida pessoal e profissional.',
      },
      {
        title: 'Líder de Equipes Ágeis',
        description:
          'Capacitação para implementar metodologias de produtividade em equipes, aumentando a eficiência coletiva.',
      },
    ],
    jobMarket: {
      salaryRange: 'Aumento de produtividade em até 40%',
      source: 'estudo interno',
      description:
        'Profissionais que dominam técnicas avançadas de gestão de tempo relatam um aumento de produtividade de até 40%, o que se traduz em melhor desempenho, avaliações superiores e maior potencial de crescimento na carreira.',
    },
    coordinator: {
      name: 'Profa. Mestre Andréia Pereira',
      image: '/placeholder.svg?height=192&width=192',
      curriculum: 'http://lattes.cnpq.br',
      bio: 'Mestre em Psicologia Organizacional com especialização em Produtividade e Bem-estar no Trabalho. Certificada em metodologias de produtividade como GTD, Pomodoro e Time Blocking. Atua há 12 anos como consultora de produtividade para executivos C-level e é criadora do método "Tempo Inteligente", adotado por diversas empresas do setor de tecnologia.',
    },
    faq: [
      {
        question: 'Quais metodologias são abordadas no curso?',
        answer:
          'O curso aborda as principais metodologias de gestão de tempo, como GTD (Getting Things Done), Matriz de Eisenhower, Pomodoro, Time Blocking, entre outras, adaptando-as para diferentes perfis profissionais.',
      },
      {
        question: 'O curso ensina a usar ferramentas digitais?',
        answer:
          'Sim, o programa inclui módulos sobre as principais ferramentas e aplicativos para gestão de tempo e produtividade, como Todoist, Notion, Trello, Google Calendar e Microsoft To Do.',
      },
      {
        question: 'Como o curso ajuda a combater a procrastinação?',
        answer:
          'O curso apresenta técnicas psicológicas específicas para identificar e superar padrões de procrastinação, além de métodos práticos para criar novos hábitos de produtividade e foco.',
      },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>  // ✅ MUDANÇA: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params  // ✅ MUDANÇA: await params
  const courseData = coursesData[id as CourseId]

  if (!courseData) {
    return {
      title: 'Curso não encontrado | AdvanceMais',
      description: 'O curso que você está procurando não foi encontrado.',
    }
  }

  return {
    title: `${courseData.title} | AdvanceMais`,
    description: courseData.description,
  }
}

export default async function CursoDetalhes({ params }: { params: Promise<{ id: string }> }) {  // ✅ MUDANÇA: async + Promise<{ id: string }>
  const { id } = await params  // ✅ MUDANÇA: await params
  const courseData = coursesData[id as CourseId]

  // Se o curso não existir, redirecionar para 404
  if (!courseData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#1a1046] text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-white/70 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/cursos" className="hover:text-white">
              Nossos Cursos
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">{courseData.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#1a1046] text-white relative" id="hero-section">
        <div className="container mx-auto px-4 pt-4 pb-16">
          <div className="flex items-center gap-4 mb-4">
            <Badge
              variant="outline"
              className="bg-white/10 text-white border-none px-3 py-1 uppercase"
            >
              {courseData.type || 'Curso'}
            </Badge>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/30 text-white h-8 w-8"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {courseData.title}
              </h1>

              <p className="text-white/80 text-base max-w-3xl">
                {courseData.description}
              </p>
            </div>

            {/* Espaço para o card na versão desktop */}
            <div className="hidden lg:block lg:w-1/3"></div>
          </div>
        </div>
      </div>

      {/* Container para o card de preço */}
      <div className="container mx-auto px-4 relative">
        <div className="absolute right-4 lg:right-0 -top-32 lg:-top-48 w-full max-w-sm">
          <StickyPriceCard />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-64 lg:pt-16 pb-10 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Why Start Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Por que começar sua jornada em {courseData.title}?
              </h2>
            </div>

            {/* Career Path Section */}
            <div className="mb-10">
              <p className="text-gray-700 mb-4">
                Durante a formação, nós te guiamos por uma trilha específica,
                com todos os conhecimentos necessários para a carreira. Ao longo
                dessa trilha, você poderá escolher uma área de ênfase por meio
                de matérias e atividades complementares. Confira as ênfases para
                o curso de {courseData.title} a seguir:
              </p>

              {courseData.careerPaths.map((path: CareerPath, index: number) => (
                <div className="mb-6" key={index}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-700">{path.description}</p>
                </div>
              ))}
            </div>

            {/* Video Section */}
            <div className="mb-10">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/3_9arm0tE_Y"
                  title="YouTube video"
                  width="854"
                  height="480"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Job Market Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Como é o mercado de trabalho para {courseData.title}?
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <FileText className="h-12 w-12 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg">
                    Salários de {courseData.jobMarket.salaryRange}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fonte: {courseData.jobMarket.source}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                {courseData.jobMarket.description}
              </p>
            </div>
          </div>

          {/* Right Column - Empty space for sticky card */}
          <div className="hidden lg:block lg:w-1/3"></div>
        </div>
      </div>
    </div>
  )
}