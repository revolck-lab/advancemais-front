import ListServices from '@/components/website/services/list-services'
import CompanyInformation from '@/components/website/counter/counterCompanyInformation'
import HeaderPages from '@/components/website/headerPages/headerPages'
import LogoEnterprises from '@/components/website/logoEnterprises/logoEnterprises'
import FormSelection from '@/components/website/form/formSelection'
import InfoServices from '@/components/website/services/infoServices'
import InfoAbout from '@/components/website/services/infoAbout'
import ProcessAbout from '@/components/website/services/processAbout'
import Pricing from '@/components/website/pricing'

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
          title="A qualidade da sua equipe determina o sucesso da sua empresa!"
          subtitle="Recrutamento & Seleção"
          description="Com a gente, seu negócio cresce sem limites!"
          buttonText="Fale com nossos especialistas"
          buttonUrl="https://www.exemplo.com/contato"
          imageUrl="https://via.placeholder.com/810x360"
        />
      </div>

      <CompanyInformation />

      <InfoServices />

      <InfoAbout />

      <div className="mb-10">
        <ListServices />
      </div>

      <div className="mb-10">
        <ProcessAbout />
      </div>

      <div className="mb-10">
        <Pricing />
      </div>

      <div className="mb-10">
        <LogoEnterprises />
      </div>

      <div className="mb-10">
        <FormSelection />
      </div>
    </>
  )
}
