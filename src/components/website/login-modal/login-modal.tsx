'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert/alert'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Hard-coded credentials check for the prototype
      if (email === 'empresa@advancemais.com.br' && password === '123456') {
        setSuccess(true)
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)

        // Simulate successful login delay
        setTimeout(() => {
          setLoading(false)
          onSuccess()
        }, 1000)
      } else {
        setLoading(false)
        setError('Email ou senha inválidos. Tente novamente.')
      }
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Login</DialogTitle>
          <DialogDescription>
            Faça login para continuar com o pagamento
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Login realizado com sucesso! Redirecionando...
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="empresa@advancemais.com.br"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-secondary text-white"
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Entrar'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
