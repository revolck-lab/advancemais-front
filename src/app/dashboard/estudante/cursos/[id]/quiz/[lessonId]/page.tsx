'use client'

import { ArrowLeft, CheckCircle, X, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const quizData = {
  5: {
    title: 'Avaliação do Módulo 1',
    moduleTitle: 'Módulo 1: Fundamentos da Farmácia',
    questions: [
      {
        id: 1,
        question: 'Qual é o principal objetivo da farmacologia?',
        options: [
          'Estudar apenas os efeitos colaterais dos medicamentos',
          'Compreender como os medicamentos interagem com o organismo',
          'Fabricar novos medicamentos',
          'Vender medicamentos',
          'Armazenar medicamentos',
        ],
        correctAnswer: 1,
        explanation:
          'A farmacologia estuda como os medicamentos interagem com o organismo, incluindo absorção, distribuição, metabolismo e excreção.',
      },
      {
        id: 2,
        question: 'O que significa farmacocinética?',
        options: [
          'Efeito do medicamento no organismo',
          'O que o organismo faz com o medicamento',
          'Interação entre medicamentos',
          'Dosagem do medicamento',
          'Fabricação do medicamento',
        ],
        correctAnswer: 1,
        explanation:
          'Farmacocinética é o estudo do que o organismo faz com o medicamento: absorção, distribuição, metabolismo e excreção.',
      },
      {
        id: 3,
        question:
          'Qual órgão é responsável pela metabolização da maioria dos medicamentos?',
        options: ['Coração', 'Pulmões', 'Fígado', 'Rins', 'Estômago'],
        correctAnswer: 2,
        explanation:
          'O fígado é o principal órgão responsável pela metabolização dos medicamentos através das enzimas hepáticas.',
      },
    ],
  },
  10: {
    title: 'Avaliação Final',
    moduleTitle: 'Módulo 2: Prática e Atendimento',
    questions: [
      {
        id: 1,
        question: 'Na dispensação de medicamentos controlados, é obrigatório:',
        options: [
          'Apenas verificar a receita',
          'Reter a receita e registrar no livro de controle',
          'Solicitar apenas o RG do cliente',
          'Dispensar sem receita em casos especiais',
          'Cobrar taxa adicional',
        ],
        correctAnswer: 1,
        explanation:
          'Para medicamentos controlados, é obrigatório reter a receita e fazer o registro no livro de controle especial.',
      },
      {
        id: 2,
        question:
          'Qual a temperatura ideal para armazenamento da maioria dos medicamentos?',
        options: [
          'Abaixo de 0°C',
          'Entre 15°C e 30°C',
          'Acima de 40°C',
          'Não importa a temperatura',
          'Sempre refrigerado',
        ],
        correctAnswer: 1,
        explanation:
          'A maioria dos medicamentos deve ser armazenada em temperatura ambiente, entre 15°C e 30°C.',
      },
      {
        id: 3,
        question: 'O que fazer quando um cliente reclama de um medicamento?',
        options: [
          'Ignorar a reclamação',
          'Trocar imediatamente sem verificar',
          'Ouvir atentamente e encaminhar ao farmacêutico',
          'Culpar o laboratório',
          'Pedir para voltar outro dia',
        ],
        correctAnswer: 2,
        explanation:
          'Sempre ouvir o cliente atentamente e encaminhar a situação ao farmacêutico responsável para avaliação adequada.',
      },
      {
        id: 4,
        question:
          'Qual sistema é usado para controle de medicamentos psicotrópicos?',
        options: ['SNGPC', 'SUS', 'ANVISA', 'CFF', 'SINAN'],
        correctAnswer: 0,
        explanation:
          'O SNGPC (Sistema Nacional de Gerenciamento de Produtos Controlados) é usado para controle de medicamentos psicotrópicos.',
      },
      {
        id: 5,
        question: 'Em caso de dúvida sobre uma prescrição, o auxiliar deve:',
        options: [
          'Dispensar mesmo assim',
          'Recusar o atendimento',
          'Consultar o farmacêutico responsável',
          'Alterar a prescrição',
          'Pedir opinião de outro cliente',
        ],
        correctAnswer: 2,
        explanation:
          'Sempre que houver dúvida sobre uma prescrição, deve-se consultar o farmacêutico responsável antes de dispensar.',
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const courseId = params.id as string
  const lessonId = Number.parseInt(params.lessonId as string)

  const quiz = quizData[lessonId as keyof typeof quizData]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number
  }>({})
  const [confirmedAnswers, setConfirmedAnswers] = useState<{
    [key: number]: boolean
  }>({})
  const [showExplanation, setShowExplanation] = useState<{
    [key: number]: boolean
  }>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!quiz) {
    return <div>Avaliação não encontrada</div>
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (confirmedAnswers[questionId]) return // Não permite alterar resposta confirmada

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleConfirmAnswer = (questionId: number) => {
    if (selectedAnswers[questionId] === undefined) return

    setConfirmedAnswers((prev) => ({
      ...prev,
      [questionId]: true,
    }))

    setShowExplanation((prev) => ({
      ...prev,
      [questionId]: true,
    }))
  }

  const getAnswerStatus = (questionId: number, answerIndex: number) => {
    const question = quiz.questions.find((q) => q.id === questionId)
    if (!question || !confirmedAnswers[questionId]) return 'default'

    const selectedAnswer = selectedAnswers[questionId]
    const correctAnswer = question.correctAnswer

    if (answerIndex === correctAnswer) return 'correct'
    if (answerIndex === selectedAnswer && answerIndex !== correctAnswer)
      return 'incorrect'
    return 'default'
  }

  const getQuestionStatus = (questionId: number) => {
    if (!confirmedAnswers[questionId]) return 'unanswered'

    const question = quiz.questions.find((q) => q.id === questionId)
    const selectedAnswer = selectedAnswers[questionId]

    return selectedAnswer === question?.correctAnswer ? 'correct' : 'incorrect'
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return { correct, total: quiz.questions.length }
  }

  const allQuestionsAnswered = quiz.questions.every(
    (q) => confirmedAnswers[q.id]
  )

  const finishQuiz = () => {
    setQuizCompleted(true)
  }

  if (quizCompleted) {
    const score = calculateScore()
    const percentage = Math.round((score.correct / score.total) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Avaliação Concluída!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl mb-4">
                  {percentage >= 70 ? '🎉' : '📚'}
                </div>

                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {score.correct}/{score.total}
                  </div>
                  <div className="text-xl text-gray-600 mb-4">
                    {percentage}% de aproveitamento
                  </div>

                  <Badge
                    className={percentage >= 70 ? 'bg-green-500' : 'bg-red-500'}
                  >
                    {percentage >= 70 ? 'APROVADO' : 'REPROVADO'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Link href={`/dashboard/estudante/cursos/${courseId}`}>
                    <Button className="w-full">Voltar ao Curso</Button>
                  </Link>

                  {lessonId === 5 && percentage >= 70 && (
                    <Link
                      href={`/dashboard/estudante/cursos/${courseId}/aula/6`}
                    >
                      <Button variant="outline" className="w-full">
                        Continuar para Módulo 2
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/dashboard/estudante/cursos/${courseId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Curso
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {quiz.title}
                </h1>
                <p className="text-sm text-gray-600">{quiz.moduleTitle}</p>
              </div>
            </div>
            <Badge className="bg-purple-500 text-white px-3 py-1">
              AVALIAÇÃO
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {quiz.questions.map((question) => {
              const status = getQuestionStatus(question.id)
              return (
                <div
                  key={question.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    status === 'correct'
                      ? 'bg-green-500'
                      : status === 'incorrect'
                        ? 'bg-red-500'
                        : 'bg-gray-300'
                  }`}
                >
                  {status === 'correct' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : status === 'incorrect' ? (
                    <X className="w-5 h-5" />
                  ) : (
                    question.id
                  )}
                </div>
              )
            })}
          </div>

          {/* Current Question */}
          <Card className="shadow-lg border-0 bg-white mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm">
                  Questão {quiz.questions[currentQuestion].id}
                </Badge>
                {confirmedAnswers[quiz.questions[currentQuestion].id] && (
                  <Badge className="bg-green-500 text-white">
                    Boa! Atividade entregue dentro do prazo.
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {quiz.questions[currentQuestion].question}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Marque a alternativa que define o uso dos dados.
                  </p>
                </div>

                <div className="space-y-3">
                  {quiz.questions[currentQuestion].options.map(
                    (option, index) => {
                      const status = getAnswerStatus(
                        quiz.questions[currentQuestion].id,
                        index
                      )
                      const isSelected =
                        selectedAnswers[quiz.questions[currentQuestion].id] ===
                        index
                      const isConfirmed =
                        confirmedAnswers[quiz.questions[currentQuestion].id]

                      return (
                        <div
                          key={index}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            status === 'correct'
                              ? 'border-green-500 bg-green-50'
                              : status === 'incorrect'
                                ? 'border-red-500 bg-red-50'
                                : isSelected
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                          } ${isConfirmed ? 'cursor-not-allowed' : ''}`}
                          onClick={() =>
                            handleAnswerSelect(
                              quiz.questions[currentQuestion].id,
                              index
                            )
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                status === 'correct'
                                  ? 'bg-green-500 text-white'
                                  : status === 'incorrect'
                                    ? 'bg-red-500 text-white'
                                    : isSelected
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-200'
                              }`}
                            >
                              {status === 'correct' ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : status === 'incorrect' ? (
                                <X className="w-4 h-4" />
                              ) : (
                                String.fromCharCode(97 + index) // a, b, c, d, e
                              )}
                            </div>
                            <span className="text-gray-900">{option}</span>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>

                {/* Explanation */}
                {showExplanation[quiz.questions[currentQuestion].id] && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Explicação:
                        </h4>
                        <p className="text-blue-800 text-sm">
                          {quiz.questions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentQuestion(Math.max(0, currentQuestion - 1))
                      }
                      disabled={currentQuestion === 0}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentQuestion(
                          Math.min(
                            quiz.questions.length - 1,
                            currentQuestion + 1
                          )
                        )
                      }
                      disabled={currentQuestion === quiz.questions.length - 1}
                    >
                      Próxima
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    {!confirmedAnswers[quiz.questions[currentQuestion].id] ? (
                      <Button
                        onClick={() =>
                          handleConfirmAnswer(
                            quiz.questions[currentQuestion].id
                          )
                        }
                        disabled={
                          selectedAnswers[
                            quiz.questions[currentQuestion].id
                          ] === undefined
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Confirmar Resposta
                      </Button>
                    ) : allQuestionsAnswered ? (
                      <Button
                        onClick={finishQuiz}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Finalizar Avaliação
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
