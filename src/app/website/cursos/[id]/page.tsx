import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Share2,
  FileText,
  Users,
  GraduationCap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion'
import { StickyPriceCard } from './sticky-price-card'

export const metadata: Metadata = {
  title: 'Análise e Desenvolvimento de Sistemas | AdvanceMais',
  description: 'Curso de Análise e Desenvolvimento de Sistemas da AdvanceMais',
}

export default function CursoDetalhes({}: { params: { id: string } }) {
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
            <span className="text-white">
              Curso de Análise e Desenvolvimento de Sistemas
            </span>
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
              Tecnólogo
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
                Análise e Desenvolvimento de Sistemas
              </h1>

              <p className="text-white/80 text-base max-w-3xl">
                O curso de Análise e Desenvolvimento de Sistemas da AdvanceMais
                tem como objetivo geral formar profissionais competentes, tanto
                do ponto de vista ético quanto técnico, e aptos para atuar no
                mercado, no planejamento e desenvolvimento de programas
                computacionais.
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
      <div className="container mx-auto px-4 pt-64 lg:pt-16 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Why Start Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Por que começar sua jornada em Análise e Desenvolvimento de
                Sistemas?
              </h2>
              <p className="text-gray-700 mb-4">
                O curso de Análise e Desenvolvimento de Sistemas é uma excelente
                opção para quem deseja atuar no mercado tech — um dos mais
                promissores e atrativos dos últimos tempos.
              </p>
              <p className="text-gray-700 mb-4">
                A formação oferecida pela AdvanceMais proporciona não apenas um
                avançado método de ensino, como também tecnologias úteis para o
                aprendizado e conteúdos em dia com as práticas do mercado.
              </p>
              <p className="text-gray-700">
                Assim, formamos analistas e desenvolvedores com perfil
                multifacetado, capazes de explorar sistemas, de desenvolver
                softwares e de programar códigos e colocá-los em prática, além
                de aprimorar outras habilidades técnicas e comportamentais
                essenciais para o mercado de trabalho.
              </p>
            </div>

            {/* Career Path Section */}
            <div className="mb-10">
              <p className="text-gray-700 mb-4">
                Durante a graduação, nós te guiamos por uma trilha geral, com
                todos os conhecimentos necessários para a carreira. Ao longo
                dessa trilha, você poderá escolher uma área de ênfase por meio
                de matérias e atividades complementares, se quiser. Confira as
                ênfases para o curso de Análise e Desenvolvimento de Sistemas a
                seguir:
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Full-Stack Developer
                </h3>
                <p className="text-gray-700">
                  A ênfase em Full-Stack Developer promoverá no aluno a formação
                  completa para que atue nas mais diversas atividades
                  relacionadas ao desenvolvimento tanto do Front-End como do
                  Back-End. É um profissional muito valorizado no mercado com
                  conhecimento em diferentes linguagens e tecnologias.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Mobile Developer
                </h3>
                <p className="text-gray-700">
                  A ênfase em Mobile Developer promoverá no aluno o conhecimento
                  e domínio necessário para se tornar um desenvolvedor de
                  aplicações e sistemas para dispositivos móveis. É um mercado
                  em grande expansão.
                </p>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-10">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=480&width=854"
                  alt="Vídeo do curso"
                  width={854}
                  height={480}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Job Market Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Como é o mercado de trabalho de Análise e Desenvolvimento de
                Sistemas?
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <FileText className="h-12 w-12 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg">
                    Salários de R$ 6.000 a R$ 15.110
                  </h3>
                  <p className="text-gray-600 text-sm">Fonte: salario.com.br</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Na prática, o mercado tem grande demanda, mas exige
                profissionais qualificados e com repertório diverso.
              </p>
              <p className="text-gray-700">
                Em termos de remuneração, o salário de analista de sistemas
                chega a, em média, de R$ 6.000 por mês, segundo a GlassDoor. O
                ponto positivo é que essa remuneração representa profissionais
                juniores, com altas oportunidades de crescimento na carreira e
                especialização no futuro, com salários acima de R$ 15.110.
              </p>
            </div>

            {/* Coordinator Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coordenador
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Prof. Mestre Miguel Carvalho"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Prof. Mestre Miguel Carvalho
                    </h3>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Currículo Lattes
                    </Link>
                  </div>
                  <p className="text-gray-700">
                    Cientista da Computação (2008) e Mestre em Informática
                    (2011) pela Universidade Federal do Rio de Janeiro. Também
                    possui graduações em Direito e Matemática e diversas
                    especializações aplicando TI em diferentes áreas do
                    conhecimento. Há 12 anos atua como Professor Universitário,
                    consultor de TI e palestrante de diversos eventos. Tem
                    experiência na área de Tecnologia da Informação, com ênfase
                    em Engenharia de Software, Gestão da TI, Desenvolvimento de
                    Sistemas, Tecnologia de Web Services, Engenharia de Sistemas
                    IoT, Cultura Maker e Educação STEAM.
                  </p>
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <FileText className="h-12 w-12 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900">
                    Ebook do curso
                  </h3>
                  <p className="text-gray-600 text-center">
                    Quer mais informações sobre este curso? Reunimos neste ebook
                    tudo que você precisa saber! Clique para baixar.
                  </p>
                  <Button variant="link" className="w-full text-blue-600">
                    Baixar Ebook do curso{' '}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <GraduationCap className="h-12 w-12 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900">
                    Formas de ingresso
                  </h3>
                  <p className="text-gray-600 text-center">
                    Conheça todas as maneiras de entrar para o seu curso dos
                    sonhos na AdvanceMais! Estamos te esperando!
                  </p>
                  <Button variant="link" className="w-full text-blue-600">
                    Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <Users className="h-12 w-12 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900">
                    Como funciona
                  </h3>
                  <p className="text-gray-600 text-center">
                    Ainda tem dúvidas? Separamos algumas perguntas frequentes
                    que podem te ajudar! Clique para ver nosso FAQ.
                  </p>
                  <Button variant="link" className="w-full text-blue-600">
                    Ir para o FAQ <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Quer saber mais sobre o que te espera na{' '}
                <span className="text-red-500">AdvanceMais?</span>
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Quer saber mais sobre o que te espera na AdvanceMais?
              </p>

              <Accordion type="single" collapsible className="text-gray-900">
                <AccordionItem value="item-1" className="border-gray-200">
                  <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                    O que se estuda no curso de Análise e Desenvolvimento de
                    Sistemas?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <p className="mb-4">
                      A grade curricular do curso de Análise de Sistemas se
                      baseia em dois critérios: desenvolver pensamento lógico e
                      aprimorar as habilidades na área. Ou seja, o aluno deve
                      concluir o curso não apenas com as competências técnicas,
                      mas sim com o modo de pensar de um analista de sistemas.
                    </p>
                    <p className="mb-2">
                      Entre as disciplinas vistas nos cursos, estão:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Banco de Dados;</li>
                      <li>Criação de Algoritmos;</li>
                      <li>Desenvolvimento Mobile;</li>
                      <li>Linguagens de Programação;</li>
                      <li>Aplicativos Web;</li>
                      <li>Pensamento Computacional;</li>
                      <li>Matemática e Estatística;</li>
                      <li>Manipulação de Datasets;</li>
                      <li>Engenharia de Software;</li>
                      <li>Segurança Digital.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-200">
                  <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                    O que faz um profissional de análise de sistemas?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    O analista de sistemas é responsável por projetar,
                    desenvolver e implementar sistemas de informação. Ele
                    analisa as necessidades dos usuários, cria soluções
                    tecnológicas e garante que os sistemas funcionem
                    corretamente. Também pode trabalhar com manutenção e
                    atualização de sistemas existentes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-200">
                  <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                    Quais são as áreas de atuação na análise e desenvolvimento
                    de sistemas?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Os profissionais podem atuar em diversas áreas como
                    desenvolvimento de software, análise de requisitos, gestão
                    de projetos de TI, banco de dados, segurança da informação,
                    desenvolvimento web e mobile, inteligência artificial, entre
                    outras especialidades do mercado tecnológico.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-200">
                  <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                    Quais são as competências que um bom analista de sistemas
                    deve ter?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Um bom analista deve ter pensamento lógico, conhecimento
                    técnico em programação, capacidade de resolução de
                    problemas, boa comunicação, trabalho em equipe,
                    adaptabilidade às novas tecnologias, e habilidade para
                    entender as necessidades dos clientes e transformá-las em
                    soluções tecnológicas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-200">
                  <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                    Qual é o salário de um analista e desenvolvedor de sistemas?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    O salário inicial médio é de R$ 6.000, podendo chegar a mais
                    de R$ 15.110 para profissionais experientes e
                    especializados. A remuneração varia conforme a região, o
                    porte da empresa, a especialização do profissional e o nível
                    de experiência.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border-gray-200">
                  <AccordionTrigger className="text-gray-900 hover:no-underline hover:text-gray-700">
                    Têm muitas vagas de trabalho para analista de sistemas?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Sim, o mercado de TI está em constante crescimento e há uma
                    grande demanda por profissionais qualificados. Segundo
                    estudos recentes, existe um déficit de profissionais na
                    área, o que torna o momento ideal para ingressar nessa
                    carreira.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Column - Empty space for sticky card */}
          <div className="hidden lg:block lg:w-1/3"></div>
        </div>
      </div>
    </div>
  )
}
