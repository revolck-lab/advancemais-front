'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const { CourseHeader, StatsSection } = DynamicComponents

export default function ConfigCoursePage() {
  const tabs = [
    {
      key: 'titleHeader',
      label: 'Título do header',
      component: <CourseHeader />,
    },
    {
      key: 'businessInfo',
      label: 'Mercado de trabalho',
      component: <StatsSection />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="titleHeader" />
    </section>
  )
}
