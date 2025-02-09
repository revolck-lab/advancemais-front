'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { SliderTab } from '@/components/dashboard/config/slider-tab/slider-tab'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'
const { BusinessInfo, BannersSlot, BusinessGroup } = DynamicComponents

export default function ConfigHomePage() {
  const tabs = [
    { key: 'Slider', label: 'Slider Header', component: <SliderTab /> },
    {
      key: 'businessInfo',
      label: 'Informações do negócio',
      component: <BusinessInfo />,
    },
    {
      key: 'BannersSlot',
      label: 'Banners',
      component: <BannersSlot />,
    },
    {
      key: 'BusinessGroup',
      label: 'Informações de negócios - Grupos',
      component: <BusinessGroup />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-gray-50 border border-[#ececec] rounded-lg">
      <TabsDashboard tabs={tabs} defaultValue="Slider" />
    </section>
  )
}
