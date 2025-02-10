'use client'

import { TabsDashboard } from '@/components/ui/tabs/tabs-dashboard'
import { SliderTab } from '@/components/dashboard/config/slider-tab/slider-tab'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'
const { BusinessInfo, BannersSlot, BusinessGroup } = DynamicComponents

export default function ConfigHomePage() {
  const tabs = [
    { key: 'Slider', label: 'Slider', component: <SliderTab /> },
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
      label: 'Informações de serviços',
      component: <BusinessGroup />,
    },
  ]

  return (
    <section className="p-6 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <TabsDashboard tabs={tabs} defaultValue="Slider" />
    </section>
  )
}
