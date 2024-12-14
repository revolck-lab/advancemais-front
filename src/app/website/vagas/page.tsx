import JobsCareer from '@/components/website/jobs/jobsCareer'

export const generateMetadata = (): { title: string; description: string } => {
  return {
    title: 'Cursos da AdvanceMais',
    description:
      'Conheça nossos cursos e capacite-se para o mercado de trabalho.',
  }
}

export default function Vagas(): JSX.Element {
  return (
    <>
      {/* Titulo da Página */}
      <JobsCareer />
    </>
  )
}
