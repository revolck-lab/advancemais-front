import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export function EditarCartaoModal({
  cartao,
  onEditCard,
}: {
  cartao: {
    lastFour?: string
    expiry: string
    cvv?: string
    isPrimary: boolean
  }
  onEditCard: (formData: {
    lastFour?: string
    expiry: string
    cvv?: string
    isPrimary: boolean
  }) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(cartao)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onEditCard(formData)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cartão</DialogTitle>
          <DialogDescription>
            Atualize os detalhes do seu cartão de pagamento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={
                formData.lastFour ? `•••• •••• •••• ${formData.lastFour}` : ''
              }
              disabled
            />
          </div>
          <div>
            <Label htmlFor="expiry">Data de Expiração</Label>
            <Input
              id="expiry"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/AA"
              required
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              value={formData.cvv || ''}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrimary"
              name="isPrimary"
              checked={formData.isPrimary}
              onChange={handleChange}
            />
            <Label htmlFor="isPrimary">Definir como cartão principal</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-primary text-white"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
