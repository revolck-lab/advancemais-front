'use client'

import { useState } from 'react'
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  FileText,
  Users,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Calendar } from '@/components/ui/calendar/calendar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AgendaPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [filterType, setFilterType] = useState<string>('all')

  // Função para formatar a data
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Função para navegar entre datas
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(date)

    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    }

    setDate(newDate)
  }

  // Filtrar eventos
  const filteredEvents = events.filter((event) => {
    if (filterType === 'all') return true
    return event.type === filterType
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Agenda Acadêmica
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas aulas, compromissos e prazos
          </p>
        </div>
      </div>

      {/* Controles de navegação e filtros */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium">
                {view === 'day' && formatDate(date)}
                {view === 'week' && (
                  <>
                    {new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() - date.getDay() + 1
                    ).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                    {' - '}
                    {new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() - date.getDay() + 7
                    ).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </>
                )}
                {view === 'month' &&
                  date.toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                  })}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => setDate(new Date())}>
                Hoje
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os eventos</SelectItem>
                  <SelectItem value="class">Aulas</SelectItem>
                  <SelectItem value="assignment">Tarefas</SelectItem>
                  <SelectItem value="exam">Provas</SelectItem>
                  <SelectItem value="meeting">Reuniões</SelectItem>
                </SelectContent>
              </Select>
              <Tabs
                value={view}
                onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}
              >
                <TabsList className="grid grid-cols-3 w-[200px]">
                  <TabsTrigger value="day">Dia</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mês</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualização do calendário */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Calendário do mês */}
        <Card className="bg-white md:row-span-2">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>Visão mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
              initialFocus
            />
            <div className="mt-6 space-y-2">
              <h3 className="font-medium text-sm">Legenda</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Aulas</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Provas</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Tarefas</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs">Reuniões</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eventos do dia */}
        <Card className="bg-white md:col-span-2">
          <CardHeader>
            <CardTitle>
              {view === 'day' && 'Eventos do dia'}
              {view === 'week' && 'Eventos da semana'}
              {view === 'month' && 'Eventos do mês'}
            </CardTitle>
            <CardDescription>
              {view === 'day' && formatDate(date)}
              {view === 'week' && (
                <>
                  {new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() - date.getDay() + 1
                  ).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                  })}
                  {' - '}
                  {new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() - date.getDay() + 7
                  ).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </>
              )}
              {view === 'month' &&
                date.toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {view === 'day' && (
                <div className="space-y-4">
                  {filteredEvents
                    .filter((event) => {
                      const eventDate = new Date(event.date)
                      return (
                        eventDate.getDate() === date.getDate() &&
                        eventDate.getMonth() === date.getMonth() &&
                        eventDate.getFullYear() === date.getFullYear()
                      )
                    })
                    .sort((a, b) => {
                      return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                      )
                    })
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-medium">
                            {new Date(event.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {event.duration}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                event.type === 'class'
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  : event.type === 'exam'
                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                    : event.type === 'assignment'
                                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              }
                            >
                              {event.type === 'class'
                                ? 'Aula'
                                : event.type === 'exam'
                                  ? 'Prova'
                                  : event.type === 'assignment'
                                    ? 'Tarefa'
                                    : 'Reunião'}
                            </Badge>
                            <h3 className="font-medium">{event.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                          {event.location && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    ))}
                </div>
              )}

              {view === 'week' && (
                <div className="rounded-lg border">
                  <div className="grid grid-cols-8 border-b">
                    <div className="p-3 text-center font-medium">Horário</div>
                    <div className="p-3 text-center font-medium">Segunda</div>
                    <div className="p-3 text-center font-medium">Terça</div>
                    <div className="p-3 text-center font-medium">Quarta</div>
                    <div className="p-3 text-center font-medium">Quinta</div>
                    <div className="p-3 text-center font-medium">Sexta</div>
                    <div className="p-3 text-center font-medium">Sábado</div>
                    <div className="p-3 text-center font-medium">Domingo</div>
                  </div>

                  {scheduleHours.map((hour, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-8 border-b last:border-0"
                    >
                      <div className="border-r p-3 text-center text-sm font-medium">
                        {hour}
                      </div>
                      {[1, 2, 3, 4, 5, 6, 0].map((day) => {
                        const eventsForCell = filteredEvents.filter((event) => {
                          const eventDate = new Date(event.date)
                          const eventHour =
                            eventDate.getHours().toString().padStart(2, '0') +
                            ':00'
                          return (
                            eventDate.getDay() === day && eventHour === hour
                          )
                        })

                        return (
                          <div
                            key={`${day}-${hour}`}
                            className="p-1 min-h-[60px] border-r last:border-r-0"
                          >
                            {eventsForCell.map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 mb-1 rounded overflow-hidden ${
                                  event.type === 'class'
                                    ? 'bg-blue-100 text-blue-800'
                                    : event.type === 'exam'
                                      ? 'bg-red-100 text-red-800'
                                      : event.type === 'assignment'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                <div className="font-medium truncate">
                                  {event.title}
                                </div>
                                <div className="truncate">{event.location}</div>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}

              {view === 'month' && (
                <div className="space-y-4">
                  {filteredEvents
                    .filter((event) => {
                      const eventDate = new Date(event.date)
                      return (
                        eventDate.getMonth() === date.getMonth() &&
                        eventDate.getFullYear() === date.getFullYear()
                      )
                    })
                    .sort((a, b) => {
                      return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                      )
                    })
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-medium">
                            {new Date(event.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                event.type === 'class'
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  : event.type === 'exam'
                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                    : event.type === 'assignment'
                                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              }
                            >
                              {event.type === 'class'
                                ? 'Aula'
                                : event.type === 'exam'
                                  ? 'Prova'
                                  : event.type === 'assignment'
                                    ? 'Tarefa'
                                    : 'Reunião'}
                            </Badge>
                            <h3 className="font-medium">{event.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                          {event.location && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Próximos eventos */}
        <Card className="bg-white md:col-span-2">
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>
              Eventos importantes nos próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents
                .filter((event) => {
                  const eventDate = new Date(event.date)
                  const today = new Date()
                  return eventDate >= today
                })
                .sort((a, b) => {
                  return new Date(a.date).getTime() - new Date(b.date).getTime()
                })
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          event.type === 'class'
                            ? 'bg-blue-100 text-blue-800'
                            : event.type === 'exam'
                              ? 'bg-red-100 text-red-800'
                              : event.type === 'assignment'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {event.type === 'class' ? (
                          <CalendarIcon className="h-5 w-5" />
                        ) : event.type === 'exam' ? (
                          <FileText className="h-5 w-5" />
                        ) : event.type === 'assignment' ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <Users className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(event.date).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Lembrete
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Dados de exemplo
const scheduleHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']

const events = [
  {
    id: 1,
    title: 'Aula de Cálculo III',
    description: 'Derivadas parciais e aplicações',
    date: '2024-05-27T08:00:00',
    duration: '2h',
    location: 'Sala 201',
    type: 'class',
  },
  {
    id: 2,
    title: 'Aula de Programação Web',
    description: 'Introdução ao React',
    date: '2024-05-27T10:00:00',
    duration: '2h',
    location: 'Lab 3',
    type: 'class',
  },
  {
    id: 3,
    title: 'Entrega de Relatório',
    description: 'Relatório de Laboratório de Física',
    date: '2024-05-27T23:59:00',
    duration: 'Prazo final',
    location: '',
    type: 'assignment',
  },
  {
    id: 4,
    title: 'Aula de Engenharia de Software',
    description: 'Metodologias ágeis',
    date: '2024-05-28T14:00:00',
    duration: '2h',
    location: 'Sala 305',
    type: 'class',
  },
  {
    id: 5,
    title: 'Prova de Cálculo III',
    description: 'Avaliação sobre integrais múltiplas',
    date: '2024-05-29T10:00:00',
    duration: '3h',
    location: 'Sala 201',
    type: 'exam',
  },
  {
    id: 6,
    title: 'Aula de Cálculo III',
    description: 'Integrais múltiplas',
    date: '2024-05-29T08:00:00',
    duration: '2h',
    location: 'Sala 201',
    type: 'class',
  },
  {
    id: 7,
    title: 'Aula de Física Experimental',
    description: 'Experimento de óptica',
    date: '2024-05-29T16:00:00',
    duration: '2h',
    location: 'Lab Física',
    type: 'class',
  },
  {
    id: 8,
    title: 'Reunião de Grupo',
    description: 'Projeto final de Engenharia de Software',
    date: '2024-05-30T14:00:00',
    duration: '1h',
    location: 'Sala de Estudos 2',
    type: 'meeting',
  },
  {
    id: 9,
    title: 'Aula de Programação Web',
    description: 'Hooks no React',
    date: '2024-05-30T10:00:00',
    duration: '2h',
    location: 'Lab 3',
    type: 'class',
  },
  {
    id: 10,
    title: 'Entrega de Projeto',
    description: 'Projeto final de Programação Web',
    date: '2024-05-31T23:59:00',
    duration: 'Prazo final',
    location: '',
    type: 'assignment',
  },
]
