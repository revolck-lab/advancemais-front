'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Styles from './calendar-view.module.css'

type CalendarEvent = {
  id: string
  date: Date
  type: 'inicio' | 'fim' | 'avaliacao'
  title: string
}

interface CalendarViewProps {
  month?: Date
  events?: CalendarEvent[]
  className?: string
}

export function CalendarView({
  month = new Date(),
  events = [],
  className,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month)

  // Navegar para o mês anterior
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  // Navegar para o próximo mês
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
  }

  // Obter o nome do mês em português
  const monthName = currentMonth.toLocaleString('pt-BR', { month: 'long' })

  // Obter o ano
  const year = currentMonth.getFullYear()

  // Obter o primeiro dia do mês
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  )

  // Obter o último dia do mês
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  )

  // Obter o dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Obter o número de dias no mês
  const daysInMonth = lastDayOfMonth.getDate()

  // Criar array com os dias do mês
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Preencher com dias vazios no início para alinhar com o dia da semana correto
  const emptyDaysStart = Array.from({ length: firstDayOfWeek }, () => null)

  // Combinar dias vazios e dias do mês
  const allDays = [...emptyDaysStart, ...days]

  // Calcular o número de semanas (linhas) necessárias
  const weeks = Math.ceil(allDays.length / 7)

  // Preencher com dias vazios no final para completar a última semana
  const emptyDaysEnd = Array.from(
    { length: weeks * 7 - allDays.length },
    () => null
  )

  // Combinar todos os dias
  const calendarDays = [...allDays, ...emptyDaysEnd]

  // Função para verificar se um dia tem eventos
  const getEventsForDay = (day: number | null) => {
    if (day === null) return []

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Função para obter a classe CSS do evento baseado no tipo
  const getEventClass = (type: string) => {
    switch (type) {
      case 'inicio':
        return Styles.inicioEvent
      case 'fim':
        return Styles.fimEvent
      case 'avaliacao':
        return Styles.avaliacaoEvent
      default:
        return ''
    }
  }

  // Função para obter o texto abreviado do evento
  const getEventText = (type: string) => {
    switch (type) {
      case 'inicio':
        return 'Início...'
      case 'fim':
        return 'Fim...'
      case 'avaliacao':
        return 'Avalia...'
      default:
        return 'Evento'
    }
  }

  // Verificar se um dia é o dia atual
  const isCurrentDay = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className={`${Styles.calendarContainer} ${className || ''}`}>
      <div className={Styles.calendarHeader}>
        <h2 className={Styles.calendarTitle}>
          <span className={Styles.calendarSubtitle}>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)} de {year}
          </span>
        </h2>
        <div className={Styles.navigationButtons}>
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={Styles.calendarGrid}>
        {/* Cabeçalho dos dias da semana */}
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
          <div key={i} className={Styles.weekdayHeader}>
            {day}
          </div>
        ))}

        {/* Dias do calendário */}
        {calendarDays.map((day, i) => {
          const dayEvents = getEventsForDay(day)
          const dayClasses = [
            Styles.calendarDay,
            day === null ? Styles.emptyDay : '',
            day !== null && isCurrentDay(day) ? Styles.currentDay : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div key={i} className={dayClasses}>
              {day !== null && (
                <>
                  <div className={Styles.dayNumber}>{day}</div>
                  <div className={Styles.eventsContainer}>
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`${Styles.eventBadge} ${getEventClass(event.type)}`}
                        title={event.title}
                      >
                        {getEventText(event.type)}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Legenda */}
      <div className={Styles.legendContainer}>
        <div className={Styles.legendItem}>
          <div
            className={`${Styles.legendDot} ${Styles.legendDotInicio}`}
          ></div>
          <span className={Styles.legendText}>Início de Curso</span>
        </div>
        <div className={Styles.legendItem}>
          <div className={`${Styles.legendDot} ${Styles.legendDotFim}`}></div>
          <span className={Styles.legendText}>Fim de Curso</span>
        </div>
        <div className={Styles.legendItem}>
          <div
            className={`${Styles.legendDot} ${Styles.legendDotAvaliacao}`}
          ></div>
          <span className={Styles.legendText}>Avaliação</span>
        </div>
      </div>
    </div>
  )
}
