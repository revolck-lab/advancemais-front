import CounterInformation from '@/components/website/counter/counterInformation'
import HeaderPages from '@/components/website/headerPages/headerPages'
import Testimonials from '@/components/website/testimonials/testimonials'
import AccordionSection from '@/components/website/accordion/accordion'
import About from '@/components/website/about/about'
import { Users, Lightbulb, Shield, Heart } from 'lucide-react'
import LogoEnterprises from '@/components/website/logoEnterprises/logoEnterprises'

export const generateMetadata = (): { title: string; description: string } => {
  return {
    title: 'Sobre a Advance+',
    description: 'Saiba mais sobre a história e os valores da Advance+',
  }
}

export default function SobrePage(): JSX.Element {
  return (
    <>
      {/* Titulo da Página */}
      <div className="bg-neutral-100">
        <HeaderPages
          title="Capacitar hoje para transformar o amanhã, honrando nossa trajetória."
          subtitle="Sobre Advance+"
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
      <AccordionSection
        title="Transformamos desafios em oportunidades únicas"
        description="Na Advance RH, acreditamos que cada talento é singular e cada empresa tem um potencial ilimitado. Conectamos histórias para criar um futuro mais inovador, inclusivo e promissor."
        videoUrl="https://www.youtube.com/watch?v=9XBAvup2jEc&ab_channel=Advance%2B-CursoseTreinamentos"
        items={[
          {
            value: 'item-1',
            trigger: 'Nossa História',
            content:
              'A AdvanceMais surgiu com o objetivo de conectar talentos e empresas...',
          },
          {
            value: 'item-2',
            trigger: 'Missão',
            content: 'Capacitar profissionais e impulsionar empresas...',
          },
          {
            value: 'item-3',
            trigger: 'Valores',
            content: 'Ética, inovação, inclusão e excelência...',
          },
        ]}
      />

      {/* Porque escolher advancedMais */}
      <About
        aboutText={{
          title: 'Sobre a AdvanceMais',
          paragraphs: [
            'A AdvanceMais é uma empresa líder em soluções para educação e desenvolvimento corporativo. Oferecemos serviços inovadores que transformam desafios em oportunidades e capacitam profissionais para atender às demandas do mercado.',
            'Desde 2020, já impactamos mais de 500 empresas e auxiliamos milhares de profissionais na construção de carreiras sólidas, promovendo a transformação do ambiente de trabalho.',
            'Nosso compromisso é continuar crescendo e fornecendo soluções personalizadas que impulsionam o sucesso de nossos clientes.',
          ],
        }}
        aboutImage={{
          src: '/images/sobre/banner_about.webp',
          alt: 'Imagem ilustrativa',
        }}
        whyChooseText={{
          title: 'Por que escolher a AdvanceMais?',
          description:
            'Descubra os motivos pelos quais somos a escolha certa para conectar talentos, impulsionar empresas e promover soluções que transformam o mercado.',
          buttonText: 'Quero um diagnóstico',
          buttonUrl: '#',
        }}
        whyChooseCards={[
          {
            icon: <Users className="text-white w-6 h-6" />,
            title: 'Talentos e Empresas',
            description:
              'Unindo profissionais qualificados a empresas que compartilham valores e objetivos, promovendo crescimento e realizações mútuas.',
          },
          {
            icon: <Heart className="text-white w-6 h-6" />,
            title: 'Desenvolver Potenciais',
            description:
              'Oferecemos treinamentos e consultorias personalizadas que preparam profissionais e empresas para superar desafios, crescer e alcançar seus sonhos.',
          },
          {
            icon: <Lightbulb className="text-white w-6 h-6" />,
            title: 'Fomentar Inovação',
            description:
              'Apoiamos a criação de soluções inovadoras que tornam empresas mais competitivas e preparadas para enfrentar os desafios de um mundo em constante transformação.',
          },
          {
            icon: <Shield className="text-white w-6 h-6" />,
            title: 'Compromisso',
            description:
              'Trabalhamos com ética e dedicação para garantir que empresas e profissionais atinjam resultados extraordinários, construindo um futuro sólido e promissor.',
          },
        ]}
      />

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
