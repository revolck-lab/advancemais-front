import Image from 'next/image'
import Player from '@/components/ui/videos/videos'
import CounterInformation from '@/components/website/counter/counterInformation'
import HeaderPages from '@/components/website/headerPages/headerPages'
import Testimonials from '@/components/website/testimonials/testimonials'
import { Button } from '@nextui-org/react'
import { Users, Lightbulb, Shield, Heart } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion/accordion'
import LogoEnterprises from '@/components/website/logoEnterprises/logoEnterprises'

export const generateMetadata = (): { title: string; description: string } => {
  return {
    title: 'Sobre a AdvanceMais',
    description: 'Saiba mais sobre a história e os valores da AdvanceMais.',
  }
}

export default function SobrePage(): JSX.Element {
  return (
    <>
      {/* Titulo da Página */}
      <div className="bg-neutral-100">
        <HeaderPages
          title="Capacitar hoje para transformar o amanhã, honrando nossa trajetória."
          subtitle="Sobre AdvanceMais"
          description="Com excelência, a Advance transforma desafios em oportunidades, impulsionando talentos e empresas por meio de educação, recrutamento e soluções inovadoras para o crescimento no mercado alagoano."
          buttonText="Fale com nossos especialistas"
          buttonUrl="https://www.exemplo.com/contato"
          imageUrl="/images/sobre/bannerHeader.webp"
          imageAlt="Capacitar hoje para transformar o amanhã, honrando nossa trajetória"
        />
      </div>

      {/* Contador Número de Resultados */}
      <CounterInformation />

      {/* Accordion missão, visão e valores */}
      <section className="py-16 text-neutral mt-10">
        <div className="container mx-auto flex flex-col lg:flex-row items-start gap-12">
          {/* Texto e Accordion */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-neutral mb-4">
              Transformamos desafios em oportunidades únicas
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Na Advance RH, acreditamos que cada talento é singular e cada
              empresa tem um potencial ilimitado. Conectamos histórias para
              criar um futuro mais inovador, inclusivo e promissor.
            </p>

            <Accordion
              type="single"
              collapsible
              defaultValue="item-1" // Define o estado inicial consistente
              className="w-full space-y-4"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Nossa História
                </AccordionTrigger>
                <AccordionContent>
                  A AdvanceMais surgiu com o objetivo de conectar talentos e
                  empresas...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Missão
                </AccordionTrigger>
                <AccordionContent>
                  Capacitar profissionais e impulsionar empresas...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Valores
                </AccordionTrigger>
                <AccordionContent>
                  Ética, inovação, inclusão e excelência...
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Player de vídeo */}
          <div className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden border relative">
              <Player
                url="https://www.youtube.com/watch?v=kPhiIuNiqyg&ab_channel=AdvanceRH"
                controls
              />
            </div>
          </div>
        </div>
      </section>

      {/* Porque escolher advancedMais */}
      <section className="py-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-24">
          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-primary text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative mb-4">
                <div className="bg-secondary p-4 rounded-full flex items-center justify-center w-16 h-16">
                  <Users className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                Talentos e Empresas
              </h3>
              <p className="text-neutral-200 text-center text-sm">
                Unindo profissionais qualificados a empresas que compartilham
                valores e objetivos, promovendo crescimento e realizações
                mútuas.
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center bg-primary text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative mb-4">
                <div className="bg-secondary p-4 rounded-full flex items-center justify-center w-16 h-16">
                  <Heart className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                Desenvolver Potenciais
              </h3>
              <p className="text-neutral-200 text-center text-sm">
                Oferecemos treinamentos e consultorias personalizadas que
                preparam profissionais e empresas para superar desafios, crescer
                e alcançar seus sonhos.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center bg-primary text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative mb-4">
                <div className="bg-secondary p-4 rounded-full flex items-center justify-center w-16 h-16">
                  <Lightbulb className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                Fomentar Inovação
              </h3>
              <p className="text-neutral-200 text-center text-sm">
                Apoiamos a criação de soluções inovadoras que tornam empresas
                mais competitivas e preparadas para enfrentar os desafios de um
                mundo em constante transformação.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center bg-primary text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative mb-4">
                <div className="bg-secondary p-4 rounded-full flex items-center justify-center w-16 h-16">
                  <Shield className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                Compromisso
              </h3>
              <p className="text-neutral-200 text-center text-sm">
                Trabalhamos com ética e dedicação para garantir que empresas e
                profissionais atinjam resultados extraordinários, construindo um
                futuro sólido e promissor.
              </p>
            </div>
          </div>

          {/* Lado direito com texto */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-neutral mb-6">
              Por que escolher a AdvanceMais?
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              Descubra os motivos pelos quais somos a escolha certa para
              conectar talentos, impulsionar empresas e promover soluções que
              transformam o mercado.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button
                className="mt-2 bg-secondary-600 text-neutral-50"
                size="lg"
              >
                Quero um diagnóstico
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Sobre advanced */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado esquerdo com os cards */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-neutral">
                Sobre a AdvanceMais
              </h2>
              <div className="text-justify mr-10">
                <p className="text-lg text-neutral-400 leading-relaxed max-w-4xl mx-auto">
                  A AdvanceMais é uma empresa líder em soluções para educação e
                  desenvolvimento corporativo. Oferecemos serviços inovadores
                  que transformam desafios em oportunidades e capacitam
                  profissionais para atender às demandas do mercado.
                </p>
                <p className=" text-lg text-neutral-400 leading-relaxed max-w-4xl mx-auto">
                  Desde 2020, já impactamos mais de 500 empresas e auxiliamos
                  milhares de profissionais na construção de carreiras sólidas,
                  promovendo a transformação do ambiente de trabalho.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed max-w-4xl mx-auto">
                  Nosso compromisso é continuar crescendo e fornecendo soluções
                  personalizadas que impulsionam o sucesso de nossos clientes.
                </p>
              </div>
            </div>

            {/* Lado direito com imagem, texto e botão */}
            <div className="w-full lg:w-1/2 h-auto">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-full">
                <Image
                  src="https://via.placeholder.com/530x360"
                  alt="Imagem ilustrativa"
                  width={530}
                  height={360}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-14">
                  {/* Título e Subtítulo no canto superior direito */}
                  <div className="self-end text-right">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Transformamos desafios em oportunidades reais.
                    </h2>
                    <p className="text-sm text-gray-200 mb-6 ml-44 mt-5">
                      Descubra como podemos conectar talentos, transformar
                      desafios em oportunidades e criar soluções que impulsionam
                      resultados.
                    </p>
                  </div>
                  {/* Botão no canto inferior direito */}
                  <div className="self-end">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Button
                        className="mt-2 bg-secondary text-neutral-50"
                        size="lg"
                      >
                        Solicitar Consultoria
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo de Empresas */}
      <div className="mb-10">
        <LogoEnterprises />
      </div>

      {/* Depoimentos */}
      <div className="mb-32">
        <Testimonials />
      </div>
    </>
  )
}
