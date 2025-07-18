import CounterInformation from '@/components/website/counter/counterInformation'
import HeaderPages from '@/components/website/headerPages/headerPages'
import Testimonials from '@/components/website/testimonials/testimonials'
import AccordionSection from '@/components/website/accordion/accordion'
import About from '@/components/website/about/about'
import LogoEnterprises from '@/components/website/logoEnterprises/logoEnterprises'
import { Users, Lightbulb, Shield, Heart } from 'lucide-react'

export const generateMetadata = (): { title: string; description: string } => {
  return {
    title: 'Sobre a Advance+',
    description: 'Saiba mais sobre a história e os valores da Advance+',
  }
}

// --- NOVA SEÇÃO EQUIPE ---
function EquipeAdvance() {
  const equipe = [
    { nome: 'Jorge', cargo: 'Direção', foto: '/images/equipe/jorge.jpg' },
    { nome: 'Victor', cargo: 'Direção', foto: '/images/equipe/victor.jpg' },
    { nome: 'Danillo', cargo: 'Gerencial', foto: '/images/equipe/danillo.jpg' },
    { nome: 'Pessoa 2', cargo: 'Pedagógico', foto: '/images/equipe/luiz.jpg' },
    {
      nome: 'Pessoa 3',
      cargo: 'Setor de Vagas',
      foto: '/images/equipe/arychele.jpg',
    },
    {
      nome: 'Pessoa 4',
      cargo: 'Setor de Vagas',
      foto: '/images/equipe/arychele.jpg',
    },
    {
      nome: 'Pessoa 5',
      cargo: 'Setor de Vagas',
      foto: '/images/equipe/arychele.jpg',
    },
    {
      nome: 'Pessoa 6',
      cargo: 'Setor de Vagas',
      foto: '/images/equipe/arychele.jpg',
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-0 text-blue-900">
          Nossa Equipe
        </h2>
        <p className="text-center text-gray-700 mb-10 mx-auto">
          Conheça os responsáveis por transformar talentos, empresas e
          carreiras.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {equipe.map((membro, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={membro.foto}
                alt={membro.nome}
                className="w-full h-72 object-cover filter grayscale group-hover:grayscale-0 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 bg-white bg-opacity-90 px-4 py-3 w-full">
                <h3 className="text-md font-semibold text-gray-900">
                  {membro.nome}
                </h3>
                <p className="text-sm text-gray-600">{membro.cargo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- FIM DA NOVA SEÇÃO ---

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

      {/* --- Seção da Equipe --- */}
      <EquipeAdvance />

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
