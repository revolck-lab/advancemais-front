'use client'

import { Clock, MapPin, Calendar, Play, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'Auxiliar de Farmácia',
    description:
      'Curso completo para formação profissional em auxiliar de farmácia com certificação reconhecida',
    duration: '30h',
    startDate: 'Qua • 4 de Junho',
    endDate: '26 de Junho de 2025',
    type: 'online',
    gradient: 'from-blue-500 via-purple-600 to-pink-500',
    icon: '💊',
    modules: 2,
    lessons: 10,
  },
  {
    id: 2,
    title: 'Auxiliar Administrativo',
    description:
      'Formação completa em rotinas administrativas, atendimento ao cliente e organização empresarial',
    duration: '40h',
    startDate: 'Seg • 7 de Julho',
    endDate: '28 de Julho de 2025',
    type: 'presencial',
    gradient: 'from-green-500 via-teal-600 to-blue-500',
    icon: '📋',
    modules: 3,
    lessons: 15,
    location: 'Av. Juca Sampaio, 2247 - Sala 30 - Feitosa, Maceió - AL',
  },
]

export default function CursosPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Cursos</h1>
          <p className="text-gray-600">
            Gerencie seus cursos e acompanhe seu progresso
          </p>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Gradient Icon Section */}
                  <div
                    className={`md:w-72 h-64 md:h-auto bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 relative`}
                  >
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">{course.icon}</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                            {course.title}
                          </h2>
                          <Badge
                            className={
                              course.type === 'online'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            }
                          >
                            {course.type === 'online' ? 'ONLINE' : 'PRESENCIAL'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 ml-4 flex-shrink-0">
                        {course.startDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.modules} módulos • {course.lessons} aulas
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Até {course.endDate.split(' ')[0]} de{' '}
                        {course.endDate.split(' ')[2]}
                      </span>
                    </div>

                    {course.type === 'presencial' && (
                      <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Local das aulas:
                          </p>
                          <p className="text-sm text-blue-700">
                            {course.location}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Link href={`/dashboard/estudante/cursos/${course.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Acessar Curso
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
