import { Button } from '@/components/ui/button/button'
import Image from 'next/image'

interface ContentSectionProps {
  title: string
  description: string
  buttonLabel: string
  imageUrl: string
  imageAlt: string
  reverse?: boolean
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  buttonLabel,
  imageUrl,
  imageAlt,
  reverse = false,
}) => {
  return (
    <section
      className={`container mx-auto py-16 px-4 flex flex-col lg:flex-row items-center gap-8 ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Lado da imagem */}
      <div className="w-full lg:w-1/2">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full h-auto"
        />
      </div>

      {/* Lado do texto */}
      <div className="w-full lg:w-1/2 lg:text-left">
        <h2 className="text-3xl font-bold mb-4 text-neutral-800">{title}</h2>
        <p className="text-neutral-600 mb-6 leading-relaxed text-justify">
          {description}
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-red-600 text-white py-3 px-6 rounded-lg"
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  )
}

const BusinessGroupInformation: React.FC = () => {
  return (
    <>
      <ContentSection
        title="Conheça nosso serviço de Consultoria Empresarial"
        description="O segredo para uma empresa de sucesso está em decisões estratégicas bem fundamentadas. A Advance+ oferece consultoria personalizada para auxiliar no crescimento sustentável e inovação do seu negócio."
        buttonLabel="Saiba mais"
        imageUrl="https://via.placeholder.com/600x400.png?text=Consultoria+Empresarial"
        imageAlt="Imagem representando Consultoria Empresarial"
        reverse={false}
      />
      <ContentSection
        title="Conheça nosso serviço de Recrutamento & Seleção"
        description="O segredo para uma empresa de sucesso está em decisões estratégicas bem fundamentadas. A Advance+ oferece consultoria personalizada para auxiliar no crescimento sustentável e inovação do seu negócio."
        buttonLabel="Saiba mais"
        imageUrl="https://via.placeholder.com/600x400.png?text=Recrutamento+%26+Seleção"
        imageAlt="Imagem representando Recrutamento e Seleção"
        reverse={true}
      />
    </>
  )
}

export default BusinessGroupInformation
