'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'

export default function ProvaFinal() {
  return (
    <Card className="shadow-sm border-0 rounded-xl overflow-hidden bg-white">
      <CardHeader className="bg-white border-b border-gray-100 pb-4">
        <CardTitle className="text-lg font-medium text-gray-800">
          Prova final
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <p className="text-gray-700">Conteúdo da aba Prova final</p>
      </CardContent>
    </Card>
  )
}
