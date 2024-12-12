import HeaderPagesCourses from '@/components/website/headerPages/headerPagesCourses'
import CounterCourseInformation from '@/components/website/counter/counterCourseInformation'
import CourseListGrid from '@/components/website/courses/courseListGrid'

export const generateMetadata = (): { title: string; description: string } => {
  return {
    title: 'Cursos da AdvanceMais',
    description:
      'Conheça nossos cursos e capacite-se para o mercado de trabalho.',
  }
}

export default function CursosPage(): JSX.Element {
  return (
    <>
      {/* Título da Página */}
      <div className="bg-neutral-100">
        <HeaderPagesCourses
          title="CURSOS"
          subtitle="Conheça nossos"
          description="Sua carreira merece o melhor. Encontre os cursos e especializações ideais para você e vá ainda mais longe!"
          buttonText="Ver todos os cursos"
          buttonUrl="/cursos/lista"
        />
      </div>

      <CounterCourseInformation />

      <CourseListGrid />
    </>
  )
}
