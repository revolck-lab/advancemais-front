'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { headerConfig } from '@/config/dashboard/website/header-config'
import { recruitmentConfig } from '@/config/dashboard/website/recruitmentservice'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const {
  HeaderPagesAPI,
  RecruitmentChallenges,
  PlatformAdvantages,
  RecruitmentService,
  HowItWorks,
} = DynamicComponents

export default function ConfigRecruitmentPage() {
  const tabs = [
    {
      key: 'titleHeader',
      label: 'Título do header',
      component: <HeaderPagesAPI {...headerConfig.recruitment} />,
    },
    {
      key: 'information',
      label: 'Lista de informações',
      component: <RecruitmentChallenges />,
    },
    {
      key: 'advantages',
      label: 'Vantagens',
      component: <PlatformAdvantages />,
    },
    {
      key: 'recruitment',
      label: 'Recrutamento & Seleção',
      component: <RecruitmentService {...recruitmentConfig.recruitment} />,
    },
    {
      key: 'aboutInfo',
      label: 'Como funciona?',
      component: <HowItWorks />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="titleHeader" />
    </section>
  )
}
