import CompanyAbout from '@/components/website/company/companyAbout'
import CompanyResults from '@/components/website/company/companyResults'
import ListServicesCompany from '@/components/website/company/list-services-company'
import FormSelection from '@/components/website/form/formSelection'
import HeaderPages from '@/components/website/headerPages/headerPages'
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
          title="A capacitação da sua equipe impulsiona o crescimento da sua empresa!"
          subtitle="Treinamento In Company"
          description="Converse com nossa equipe e conheça nossos treinamentos
          personalizados."
          buttonText="Fale com nossos especialistas"
          buttonUrl="https://www.exemplo.com/contato"
          imageUrl="https://via.placeholder.com/810x360"
        />
      </div>

      <CompanyResults />

      <CompanyAbout />

      <div className="mb-10">
        <ListServicesCompany />
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
