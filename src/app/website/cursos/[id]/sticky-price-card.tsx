'use client'

import { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import {
  Clock,
  Calendar,
  Users,
  Clock3,
  CheckCircle2,
  Wifi,
  ChevronRight,
} from 'lucide-react'
import { CountdownTimer } from './countdown-timer'

export function StickyPriceCard() {
  const [isSticky, setIsSticky] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardHeight, setCardHeight] = useState(0)

  useEffect(() => {
    // Medir a altura do card quando ele for renderizado
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight)
    }

    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')

      if (heroSection) {
        // Calcular quando o card deve se tornar sticky
        // Queremos que ele se torne sticky quando a parte inferior do hero section
        // estiver acima da parte superior da viewport + um pequeno offset
        const heroBottom = heroSection.getBoundingClientRect().bottom
        const offset = 100 // ajuste conforme necessário
        setIsSticky(heroBottom < offset)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    // Chamar uma vez para definir o estado inicial
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Espaço reservado para o card quando ele se torna sticky */}
      {isSticky && (
        <div style={{ height: cardHeight }} className="hidden lg:block" />
      )}

      {/* O card real */}
      <div
        ref={cardRef}
        className={`${
          isSticky
            ? 'fixed top-6 right-4 lg:right-[calc((100vw-1280px)/2+1rem)] z-50 w-full max-w-sm'
            : 'relative'
        } transition-all duration-300`}
      >
        <Card className="bg-white border-none shadow-md">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-1">
              <p className="text-gray-600 font-medium">DESCONTO SELECIONADO:</p>
              <h3 className="text-2xl font-bold">Combo Futuro 2 em 1</h3>
              <p className="text-red-600">Últimas vagas com este preço</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 space-y-2">
              <p className="text-red-700 flex items-center gap-2">
                <Clock className="h-4 w-4" /> ESSAS OFERTAS ACABAM EM:
              </p>
              <CountdownTimer hours={11} minutes={8} seconds={6} />
            </div>

            <div className="space-y-1">
              <p className="text-gray-500 line-through">
                De R$ 249,90/mês por a partir de
              </p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-gray-800">
                  R$ 99,89
                </span>
                <span className="text-gray-600 mb-1">/mês</span>
              </div>
              <p className="text-xs text-gray-500">
                Preço fixo durante todo o período letivo, desde que o discente
                não se torne inadimplente e/ou tranque o curso.
              </p>
            </div>

            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg">
              Fazer Inscrição <ChevronRight className="h-5 w-5 ml-1" />
            </Button>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Início imediato</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">
                  Professores mestres e doutores
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Duração de 5 semestres</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Autorizado pelo MEC</span>
              </div>
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">EaD</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 pt-1">
              <p className="font-semibold">Atenção:</p>
              <p>
                Caso seja menor de idade, é necessário que seu responsável legal
                realize o processo de matrícula junto a você, sob pena de
                nulidade da inscrição.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
