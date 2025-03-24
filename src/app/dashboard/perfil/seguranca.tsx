import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function DadosPessoais() {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>
          Gerencie sua senha e configurações de segurança
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-slate-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Alterar senha</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <Input id="new-password" type="password" />
                <p className="text-xs text-slate-500 mt-1">
                  A senha deve ter pelo menos 8 caracteres, incluir uma letra
                  maiúscula, um número e um caractere especial.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button
                variant="default"
                className="py-3 px-3 bg-primary text-white"
              >
                Atualizar senha
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
