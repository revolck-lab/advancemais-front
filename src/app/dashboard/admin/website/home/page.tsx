'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

import { SliderTab } from '@/components/dashboard/config/slider-tab/slider-tab'
import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const { BusinessInfo, BannersSlot, BusinessGroup } =
  DynamicComponents

const tabs = [
  { key: 'slider', label: 'Slider', component: <SliderTab /> },
  { key: 'business-info', label: 'Business Info', component: <BusinessInfo /> },
  { key: 'banners', label: 'Banners', component: <BannersSlot /> },
  {
    key: 'business-group',
    label: 'Business Group',
    component: <BusinessGroup />,
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('slider')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6">
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'cursor-pointer py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all',
                activeTab === tab.key && 'bg-gray-100 text-blue-500'
              )}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        <div className="rounded-lg shadow-md p-6 bg-gray-100">
          {tabs.find((tab) => tab.key === activeTab)?.component}
        </div>
      </main>
    </div>
  )
}
