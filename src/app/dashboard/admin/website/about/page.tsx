'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { headerConfig } from '@/config/dashboard/website/header-config'

import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const { HeaderPagesAPI, MissionBusiness, WhyChooseUs, AboutBusiness } =
  DynamicComponents

export default function ConfigAboutPage() {
  const tabs = [
    {
      key: 'titleHeader',
      label: 'Título do header',
      component: <HeaderPagesAPI {...headerConfig.about} />,
    },
    {
      key: 'businessInfo',
      label: 'Informações do negócio',
      component: <MissionBusiness />,
    },
    {
      key: 'BannersSlot',
      label: 'Escolha Advance+',
      component: <WhyChooseUs />,
    },
    {
      key: 'BusinessGroup',
      label: 'Sobre',
      component: <AboutBusiness />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="titleHeader" />
    </section>
  )
}
