'use client'

import React, { useState } from 'react'
import { Grid, List, MapPin, Clock, Calendar, Eye } from 'lucide-react'
import { Button, Pagination, Checkbox } from '@nextui-org/react'
import Image from 'next/image'
import Styles from './coursesCarousel.module.css'

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }
  return date
    .toLocaleDateString('pt-BR', options)
    .replace(' de ', '/')
    .replace(' de ', '/')
}

const calculateRemainingDays = (date: Date): number => {
  const today = new Date()
  const diffInTime = date.getTime() - today.getTime()
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24))
  return diffInDays > 0 ? diffInDays : 0
}

const courses = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x400.png?text=People+Analytics',
    category: 'Negócios',
    title: 'People Analytics',
    description:
      'Saiba como utilizar dados na gestão de pessoas neste curso de People Analytics, com estratégias práticas para tomada de decisões assertivas.',
    instructor: 'Kerly Calixto',
    location: 'Online',
    registrationDeadline: new Date('2024-12-31'),
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x400.png?text=Indicadores',
    category: 'Atração de talentos',
    title: 'Indicadores de Recrutamento e Seleção',
    description:
      'Aprenda a usar indicadores estratégicos no recrutamento e seleção e contrate os melhores talentos para sua empresa!',
    instructor: 'Natália Nascimento',
    location: 'Presencial',
    registrationDeadline: new Date('2024-11-15'),
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300x400.png?text=Oratória',
    category: 'Liderança',
    title: 'Curso de oratória e persuasão para líderes',
    description:
      'Como melhorar a oratória e persuasão? Aprenda técnicas de comunicação e persuasão para falar com clareza e confiança.',
    instructor: 'Octávio Alves Jr',
    location: 'Presencial',
    registrationDeadline: new Date('2024-10-05'),
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300x400.png?text=Gestão+de+Tempo',
    category: 'Desenvolvimento e Performance',
    title: 'Curso de Gestão de Tempo',
    description:
      'Descubra como organizar tarefas e melhorar sua produtividade com técnicas de gestão de tempo.',
    instructor: 'Andréia Pereira',
    location: 'Online',
    registrationDeadline: new Date('2024-09-30'),
  },
]

const ITEMS_PER_PAGE = 9

const CourseListGrid: React.FC = (): JSX.Element => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [allTracksSelected, setAllTracksSelected] = useState(false)
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCourses = courses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE)

  const handleAllTracksChange = (isChecked: boolean) => {
    setAllTracksSelected(isChecked)
    if (isChecked) {
      setSelectedTracks([]) // Desmarca todas as outras opções
    }
  }

  const handleTrackChange = (track: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTracks((prev) => [...prev, track])
    } else {
      setSelectedTracks((prev) => prev.filter((t) => t !== track))
    }
  }

  const truncateDescription = (
    description: string,
    maxLength: number
  ): string => {
    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description
  }

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-primary">Todos os cursos</h2>
          <div className="flex items-center gap-4">
            <button
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-800'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-800'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="border border-secondary border-opacity-30 rounded-lg overflow-hidden">
              <div className="bg-primary">
                <h3 className="text-lg p-4 pl-6 font-bold text-white">
                  Filtrar por:
                </h3>
              </div>
              <div className="p-6 pt-1 bg-white">
                <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                  TRILHAS
                </h4>
                <div className="flex flex-col gap-3">
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                    isSelected={allTracksSelected}
                    onChange={(e) => handleAllTracksChange(e.target.checked)}
                  >
                    Todas as trilhas
                  </Checkbox>

                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                    isDisabled={allTracksSelected}
                    isSelected={selectedTracks.includes('Atração de talentos')}
                    onChange={(e) =>
                      handleTrackChange('Atração de talentos', e.target.checked)
                    }
                  >
                    Atração de talentos
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                    isDisabled={allTracksSelected}
                    isSelected={selectedTracks.includes('Consultoria')}
                    onChange={(e) =>
                      handleTrackChange('Consultoria', e.target.checked)
                    }
                  >
                    Consultoria
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                    isDisabled={allTracksSelected}
                    isSelected={selectedTracks.includes(
                      'Desenvolvimento e Performance'
                    )}
                    onChange={(e) =>
                      handleTrackChange(
                        'Desenvolvimento e Performance',
                        e.target.checked
                      )
                    }
                  >
                    Desenvolvimento e Performance
                  </Checkbox>
                </div>

                {/* Divisor */}
                <div className="border-t border-secondary border-opacity-10 mt-4"></div>

                <h4 className="text-sm font-semibold text-neutral-700 mb-3 mt-5">
                  PREÇO
                </h4>
                <div className="flex flex-col gap-3">
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                  >
                    Gratuito
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                  >
                    R$299,00
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                  >
                    R$399,00
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    size="md"
                    className="flex items-center"
                  >
                    R$1.499,00
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="relative bg-white rounded-lg border-1 border-secondary border-opacity-10 hover:border-opacity-100 overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-md">
                      {course.category}
                    </div>
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={192}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    {/* <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    /> */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
                        <div className="flex items-center text-primary text-sm bg-primary-50 border border-primary-200 rounded-md p-2">
                          <Clock className="w-4 h-4 mr-1 text-neutral" />
                          <span className="text-neutral">
                            Faltam{' '}
                            {calculateRemainingDays(
                              course.registrationDeadline
                            )}{' '}
                            dias
                          </span>
                        </div>
                        <div className="flex items-center text-sm bg-secondary-50 border border-secondary-200 rounded-md p-2 ml-2">
                          <span className="mr-1">{course.location}</span>
                          <MapPin className="w-4 h-4 text-neutral" />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mt-2 mb-4 text-neutral-800">
                        {course.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-4">
                        {course.description}
                      </p>
                      <p className="text-sm font-medium text-neutral-800">
                        por {course.instructor}
                      </p>
                      <div className="mt-4 space-y-2">
                        <Button
                          className="w-full flex items-center justify-center gap-2 text-sm py-2"
                          variant="solid"
                          size="md"
                          color="secondary"
                          href="#"
                        >
                          <Calendar className="w-4 h-4" />
                          Inscreva-se até{' '}
                          {formatDate(course.registrationDeadline)}
                        </Button>
                        <Button
                          className="w-full flex items-center justify-center gap-2 text-sm py-2"
                          variant="solid"
                          size="md"
                          color="primary"
                          href="#"
                        >
                          <Eye className="w-4 h-4" />
                          Visualizar informações
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex bg-white rounded-lg border-1 border-secondary border-opacity-10 hover:border-opacity-100 overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="relative w-1/4">
                      <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-md">
                        {course.category}
                      </div>
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={192}
                        height={192}
                        className={`w-full h-full object-cover ${Styles.ImagemGrid}`}
                      />
                      {/* <img
                        src={course.image}
                        alt={course.title}
                        className={`w-full h-full object-cover ${Styles.ImagemGrid}`}
                      /> */}
                    </div>
                    <div className="p-6 flex flex-col justify-between w-3/4">
                      <div>
                        <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
                          <div className="flex items-center text-primary text-sm bg-primary-50 border border-primary-200 rounded-md p-2">
                            <Clock className="w-4 h-4 mr-1 text-neutral" />
                            <span className="text-neutral">
                              Faltam{' '}
                              {calculateRemainingDays(
                                course.registrationDeadline
                              )}{' '}
                              dias
                            </span>
                          </div>
                          <div className="flex items-center text-sm bg-secondary-50 border border-secondary-200 rounded-md p-2 ml-2">
                            <span className="mr-1">{course.location}</span>
                            <MapPin className="w-4 h-4 text-neutral" />
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mt-2 mb-4 text-neutral-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-4">
                          {truncateDescription(course.description, 100)}
                        </p>
                        <p className="text-sm font-medium text-neutral-800">
                          por {course.instructor}
                        </p>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <Button
                          className="flex-1 flex items-center justify-center gap-2 text-sm py-2"
                          variant="solid"
                          size="md"
                          color="secondary"
                          href="#"
                        >
                          <Calendar className="w-4 h-4" />
                          Inscreva-se até{' '}
                          {formatDate(course.registrationDeadline)}
                        </Button>
                        <Button
                          className="flex-1 flex items-center justify-center gap-2 text-sm py-2"
                          variant="solid"
                          size="md"
                          color="primary"
                          href="#"
                        >
                          <Eye className="w-4 h-4" />
                          Visualizar informações
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Pagination
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={(page) => setCurrentPage(page)}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseListGrid
