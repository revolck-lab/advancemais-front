import React from 'react'
import { Briefcase, Crown, Rocket, Trophy } from 'lucide-react'
import Plano from './PricingBox'
import Styles from './pricing.module.css'

const TabelaPrecos = () => {
  return (
    <div className={`${Styles.pxResponsive} container w-full mx-auto py-24`}>
      <div className="text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-neutral mb-0">
          Escolha seu plano
        </h2>
        <p className="text-[1rem] text-neutral-400 leading-relaxed mb-8">
          Você pode mudar de plano a qualquer momento.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <Plano
          titulo="Inicial"
          icone={<Briefcase className="w-5 h-5 text-neutral" />}
          preco="49,99"
          descricao="Comece a recrutar com eficiência"
          recursos={[
            '3 vagas ativas',
            '30 dias de divulgação',
            'Acesso a candidatos qualificados',
            'Painel de controle básico',
          ]}
        />
        <Plano
          titulo="Intermediario"
          icone={<Trophy className="w-5 h-5 text-neutral" />}
          preco="74,99"
          descricao="Amplie seu alcance de recrutamento"
          recursos={[
            '10 vagas ativas',
            '30 dias de divulgação',
            'Acesso a candidatos qualificados',
            'Painel de controle básico',
          ]}
        />
        <Plano
          titulo="Avançado"
          icone={<Crown className="w-5 h-5 text-secondary" />}
          preco="99,99"
          descricao="Solução completa para grandes equipes"
          recursos={[
            '20 vagas ativas',
            '30 dias de divulgação',
            'Acesso a candidatos qualificados',
            'Painel de controle básico',
          ]}
          isPopular
        />
        <Plano
          titulo="Destaque"
          icone={<Rocket className="w-5 h-5 text-neutral" />}
          preco="199,99"
          descricao="Recrutamento sem limites"
          recursos={[
            'Vagas ilimitadas',
            '30 dias de divulgação',
            'Acesso a candidatos qualificados',
            'Painel de controle avançado',
            '1 vaga em destaque',
          ]}
        />
      </div>
    </div>
  )
}

export default TabelaPrecos
