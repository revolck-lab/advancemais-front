'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea/textarea'
import { Code, Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ScriptManagementPage() {
  const [headerScripts, setHeaderScripts] = useState<string>('')
  const [footerScripts, setFooterScripts] = useState<string>('')
  const { toast } = useToast()

  const handleSaveScripts = () => {
    console.log('Scripts do Cabeçalho:', headerScripts)
    console.log('Scripts do Rodapé:', footerScripts)

    toast({
      title: 'Sucesso!',
      description: 'Scripts salvos com sucesso (simulação).',
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Scripts</h1>
          <p className="text-muted-foreground">
            Insira códigos personalizados para o cabeçalho e rodapé do site.
          </p>
        </div>
        <Button onClick={handleSaveScripts}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Scripts
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Scripts do Cabeçalho (Header)
          </CardTitle>
          <CardDescription>
            Códigos que serão inseridos antes do fechamento da tag
            `&lt;/head&gt;`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={`Ex: <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`}
            rows={10}
            value={headerScripts}
            onChange={(e) => setHeaderScripts(e.target.value)}
            className="font-mono"
          />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Scripts do Rodapé (Footer)
          </CardTitle>
          <CardDescription>
            Códigos que serão inseridos antes do fechamento da tag
            `&lt;/body&gt;`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={`Ex: <script>fbq('track', 'PageView');</script>`}
            rows={10}
            value={footerScripts}
            onChange={(e) => setFooterScripts(e.target.value)}
            className="font-mono"
          />
        </CardContent>
      </Card>
    </div>
  )
}
