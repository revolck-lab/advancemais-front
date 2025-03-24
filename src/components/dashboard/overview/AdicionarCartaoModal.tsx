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
import { CreditCard } from 'lucide-react'

export function AdicionarCartaoModal({ onAddCard }: { onAddCard: (cardData: { id: number, type: string, lastFour: string, expiry: string, isPrimary: boolean }) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    isPrimary: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddCard({
      id: Date.now(),
      type: formData.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      lastFour: formData.cardNumber.slice(-4),
      expiry: formData.expiryDate,
      isPrimary: formData.isPrimary,
    })
    setIsOpen(false)
    setFormData({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      isPrimary: false,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-primary text-white py-3 px-3">
          <CreditCard className="mr-2 h-4 w-4" />
          Adicionar novo cartão
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cartão</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do seu cartão de pagamento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div>
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <Input
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="Nome Completo"
              required
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Label htmlFor="expiryDate">Data de Expiração</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
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
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
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
