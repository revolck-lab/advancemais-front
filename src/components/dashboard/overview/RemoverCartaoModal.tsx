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

export function RemoverCartaoModal({
  cartao,
  onRemoveCard,
}: {
  cartao: { id: number; type: string; lastFour: string } // Mudança de id: string para id: number
  onRemoveCard: (id: number) => void // Mudança de id: string para id: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleRemove = () => {
    onRemoveCard(cartao.id)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          Remover
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Cartão</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja remover o cartão {cartao.type} ••••{' '}
            {cartao.lastFour}? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemove}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Remover
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
