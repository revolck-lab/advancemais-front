'use client'

import { useRef } from 'react'
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
import { useParams } from 'next/navigation'

// Definir tipos para preços dos cursos
type CourseId =
  | 'people-analytics'
  | 'indicadores-recrutamento-selecao'
  | 'oratoria-persuasao-lideres'
  | 'gestao-tempo'

interface CoursePrice {
  regularPrice: number
  discountPrice: number
  discountName: string
  fixedPriceNote: string
  duration: string
  modality: string
}

// Dados de preços dos cursos
const coursePrices: Record<CourseId, CoursePrice> = {
  'people-analytics': {
    regularPrice: 249.9,
    discountPrice: 99.89,
    discountName: 'Combo Futuro 2 em 1',
    fixedPriceNote:
      'Preço fixo durante todo o período letivo, desde que o discente não se torne inadimplente e/ou tranque o curso.',
    duration: '5 semestres',
    modality: 'EaD',
  },
  'indicadores-recrutamento-selecao': {
    regularPrice: 499.9,
    discountPrice: 199.89,
    discountName: 'Combo Carreiras RH',
    fixedPriceNote:
      'Preço promocional válido até o término das vagas disponíveis para esta turma.',
    duration: '6 meses',
    modality: 'EaD',
  },
  'oratoria-persuasao-lideres': {
    regularPrice: 399.9,
    discountPrice: 249.9,
    discountName: 'Combo Comunicação Eficaz',
    fixedPriceNote: 'Preço promocional por tempo limitado. Aproveite!',
    duration: '3 meses',
    modality: 'Presencial/Online',
  },
  'gestao-tempo': {
    regularPrice: 299.9,
    discountPrice: 149.9,
    discountName: 'Combo Produtividade',
    fixedPriceNote:
      'Preço promocional por tempo limitado. Início imediato após a confirmação da matrícula.',
    duration: '2 meses',
    modality: 'Online',
  },
}

export function StickyPriceCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const courseId = params.id as string

  // Obtém os dados de preço específicos do curso ou usa dados padrão
  const priceData = (coursePrices as Record<string, CoursePrice>)[courseId] || {
    regularPrice: 249.9,
    discountPrice: 99.89,
    discountName: 'Combo Futuro 2 em 1',
    fixedPriceNote: 'Preço fixo durante todo o período letivo.',
    duration: '5 semestres',
    modality: 'EaD',
  }

  return (
    <div ref={cardRef} className="sticky-card-container">
      <Card className="bg-white border-none shadow-lg">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-gray-600 font-medium">DESCONTO SELECIONADO:</p>
            <h3 className="text-2xl font-bold">{priceData.discountName}</h3>
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
              De R$ {priceData.regularPrice.toFixed(2).replace('.', ',')}/mês
              por a partir de
            </p>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-gray-800">
                R$ {priceData.discountPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-gray-600 mb-1">/mês</span>
            </div>
            <p className="text-xs text-gray-500">{priceData.fixedPriceNote}</p>
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
              <span className="text-gray-700">
                Duração de {priceData.duration}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Autorizado pelo MEC</span>
            </div>
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">{priceData.modality}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-1">
            <p className="font-semibold">Atenção:</p>
            <p>
              Caso seja menor de idade, é necessário que seu responsável legal
              realize o processo de matrícula junto a você, sob pena de nulidade
              da inscrição.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CSS inline para sticky */}
      <style jsx>{`
        .sticky-card-container {
          position: sticky;
          top: 20px;
          align-self: flex-start;
          width: 100%;
          max-width: 380px;
          z-index: 50;
          transition: top 0.3s ease;
          transform: translateZ(0); /* Hardware acceleration */
          will-change: position, top; /* Hint to browser */
        }

        @media (max-width: 1024px) {
          .sticky-card-container {
            position: relative;
            top: 0;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
