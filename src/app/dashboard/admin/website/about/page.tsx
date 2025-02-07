'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import styles from './page.module.css'
import { headerConfig } from '@/config/dashboard/website/header-config'

import { DynamicComponents } from '@/components/dashboard/DynamicComponents'

const { HeaderPagesAPI, MissionBusiness, WhyChooseUs, AboutBusiness } =
  DynamicComponents

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="slider" className="space-y-4">
        <TabsList className={`flex space-x-4 border-b ${styles.tabsList}`}>
          <TabsTrigger
            value="slider"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Header Page
          </TabsTrigger>
          <TabsTrigger
            value="business-info"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Missão, visão e valores
          </TabsTrigger>
          <TabsTrigger
            value="banners"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Porque Advance+?
          </TabsTrigger>
          <TabsTrigger
            value="business-group"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Sobre a empresa
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="slider">
          <HeaderPagesAPI {...headerConfig.about} />
        </TabsContent>
        <TabsContent value="business-info">
          <MissionBusiness />
        </TabsContent>
        <TabsContent value="banners">
          <WhyChooseUs />
        </TabsContent>
        <TabsContent value="business-group">
          <AboutBusiness />
        </TabsContent>
      </Tabs>
    </div>
  )
}
