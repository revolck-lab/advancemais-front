'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { headerConfig } from '@/config/dashboard/website/header-config'
import { recruitmentConfig } from '@/config/dashboard/website/recruitmentservice'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const {
  HeaderPagesAPI,
  InCompanyTraining,
  StrongConnectionSection,
  RecruitmentService,
} = DynamicComponents

export default function ConfigTrainingPage() {
  const tabs = [
    {
      key: 'titleHeader',
      label: 'Título do header',
      component: <HeaderPagesAPI {...headerConfig.training} />,
    },
    {
      key: 'information',
      label: 'In company',
      component: <InCompanyTraining />,
    },
    {
      key: 'conections',
      label: 'Conexão forte',
      component: <StrongConnectionSection />,
    },
    {
      key: 'recruitment',
      label: 'Recrutamento & Seleção',
      component: <RecruitmentService {...recruitmentConfig.training} />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="titleHeader" />
    </section>
  )
}
