'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { headerConfig } from '@/config/dashboard/website/header-config'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const { HeaderPagesAPI, ContactPage } = DynamicComponents

export default function ConfigContactPage() {
  const tabs = [
    {
      key: 'titleHeader',
      label: 'Título do header',
      component: <HeaderPagesAPI {...headerConfig.contact} />,
    },
    {
      key: 'contact',
      label: 'Informações de contato',
      component: <ContactPage />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="titleHeader" />
    </section>
  )
}
