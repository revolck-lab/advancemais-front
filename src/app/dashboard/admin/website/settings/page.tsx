'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const { SEOPage, GlobalConfig, SmtpConfig } = DynamicComponents

export default function ConfigSettingsPage() {
  const tabs = [
    {
      key: 'seo',
      label: 'SEO',
      component: <SEOPage />,
    },
    {
      key: 'global',
      label: 'Global',
      component: <GlobalConfig />,
    },
    {
      key: 'smtp',
      label: 'SMTP',
      component: <SmtpConfig />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="seo" />
    </section>
  )
}
