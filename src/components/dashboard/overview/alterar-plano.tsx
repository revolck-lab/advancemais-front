import { Button } from '@/components/ui/button/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import { Label } from '@/components/ui/label/label'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group/radio-group'
import { Check, RefreshCcw, PenLine } from 'lucide-react'
import { useId, useState } from 'react'
import { Badge } from '@/components/ui/badge/badge'

function Component() {
  const id = useId()
  const [selectedPlan, setSelectedPlan] = useState('inicial') // Estado para rastrear o plano selecionado

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-primary text-white py-3 px-3">
          <PenLine className="mr-2 h-4 w-4" /> Alterar meu plano
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <RefreshCcw className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Alterar seu plano</DialogTitle>
            <DialogDescription className="text-left">
              Escolha um dos seguintes planos.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <RadioGroup
            className="gap-2"
            defaultValue="inicial"
            onValueChange={setSelectedPlan} // Atualiza o estado ao selecionar um plano
          >
            {/* Plano Inicial */}
            <div
              className={`relative flex w-full items-center gap-2 rounded-lg border px-4 py-3 shadow-sm shadow-black/5 ${
                selectedPlan === 'inicial'
                  ? 'border-primary bg-primary text-white'
                  : 'border-input'
              }`}
            >
              <RadioGroupItem
                value="inicial"
                id={`${id}-inicial`}
                aria-describedby={`${id}-inicial-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label
                  htmlFor={`${id}-inicial`}
                  className={selectedPlan === 'inicial' ? 'text-white' : ''}
                >
                  Inicial
                </Label>
                <p
                  id={`${id}-inicial-description`}
                  className={`text-xs ${
                    selectedPlan === 'inicial'
                      ? 'text-white'
                      : 'text-muted-foreground'
                  }`}
                >
                  R$ 49,99/mês
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span>PLANO</span>
                <Badge variant="secondary">ATIVO</Badge>
              </div>
            </div>

            {/* Plano Intermediário */}
            <div
              className={`relative flex w-full items-center gap-2 rounded-lg border px-4 py-3 shadow-sm shadow-black/5 ${
                selectedPlan === 'intermediario'
                  ? 'border-primary bg-primary text-white'
                  : 'border-input'
              }`}
            >
              <RadioGroupItem
                value="intermediario"
                id={`${id}-intermediario`}
                aria-describedby={`${id}-intermediario-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label
                  htmlFor={`${id}-intermediario`}
                  className={
                    selectedPlan === 'intermediario' ? 'text-white' : ''
                  }
                >
                  Intermediário
                </Label>
                <p
                  id={`${id}-intermediario-description`}
                  className={`text-xs ${
                    selectedPlan === 'intermediario'
                      ? 'text-white'
                      : 'text-muted-foreground'
                  }`}
                >
                  R$ 74,99/mês
                </p>
              </div>
            </div>

            {/* Plano Avançado */}
            <div
              className={`relative flex w-full items-center gap-2 rounded-lg border px-4 py-3 shadow-sm shadow-black/5 ${
                selectedPlan === 'avancado'
                  ? 'border-primary bg-primary text-white'
                  : 'border-input'
              }`}
            >
              <RadioGroupItem
                value="avancado"
                id={`${id}-avancado`}
                aria-describedby={`${id}-avancado-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label
                  htmlFor={`${id}-avancado`}
                  className={selectedPlan === 'avancado' ? 'text-white' : ''}
                >
                  Avançado
                </Label>
                <p
                  id={`${id}-avancado-description`}
                  className={`text-xs ${
                    selectedPlan === 'avancado'
                      ? 'text-white'
                      : 'text-muted-foreground'
                  }`}
                >
                  R$ 99,99/mês
                </p>
              </div>
            </div>

            {/* Plano Destaque */}
            <div
              className={`relative flex w-full items-center gap-2 rounded-lg border px-4 py-3 shadow-sm shadow-black/5 ${
                selectedPlan === 'destaque'
                  ? 'border-primary bg-primary text-white'
                  : 'border-input'
              }`}
            >
              <RadioGroupItem
                value="destaque"
                id={`${id}-destaque`}
                aria-describedby={`${id}-destaque-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label
                  htmlFor={`${id}-destaque`}
                  className={selectedPlan === 'destaque' ? 'text-white' : ''}
                >
                  Destaque
                </Label>
                <p
                  id={`${id}-destaque-description`}
                  className={`text-xs ${
                    selectedPlan === 'destaque'
                      ? 'text-white'
                      : 'text-muted-foreground'
                  }`}
                >
                  R$ 199,99/mês
                </p>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-3">
            <p>
              <strong className="text-sm font-medium">Recursos incluem:</strong>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {selectedPlan === 'inicial' && (
                <>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    3 vagas ativas
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    30 dias de divulgação
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Acesso a candidatos qualificados
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Painel de controle básico
                  </li>
                </>
              )}
              {selectedPlan === 'intermediario' && (
                <>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    10 vagas ativas
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    30 dias de divulgação
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Acesso a candidatos qualificados
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Painel de controle básico
                  </li>
                </>
              )}
              {selectedPlan === 'avancado' && (
                <>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    20 vagas ativas
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    30 dias de divulgação
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Acesso a candidatos qualificados
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Painel de controle básico
                  </li>
                </>
              )}
              {selectedPlan === 'destaque' && (
                <>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Vagas ilimitadas
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    30 dias de divulgação
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Acesso a candidatos qualificados
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    Painel de controle avançado
                  </li>
                  <li className="flex gap-2">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    1 vaga em destaque
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="grid gap-2">
            <Button
              type="button"
              variant="default"
              className="w-full bg-primary px-3 py-3 text-white"
            >
              Alterar plano
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                className="w-full bg-secondary-50 px-3 py-3 text-secondary-200"
              >
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { Component }
