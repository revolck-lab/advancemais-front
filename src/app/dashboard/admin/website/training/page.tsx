'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import styles from './page.module.css'
import HeaderPagesAPI from '@/components/dashboard/config/header-page/header-page'
import { headerConfig } from '@/config/dashboard/website/header-config'
import PlatformAdvantages from '@/components/dashboard/config/platform-advantages/platform-advantages'
import RecruitmentService from '@/components/dashboard/config/recruitment-service/recruitment-service'
import InCompanyTraining from '@/components/dashboard/config/in-company/in-company'
import StrongConnectionSection from '@/components/dashboard/config/connection-strong/connection-strong'
import { recruitmentConfig } from '@/config/dashboard/website/recruitmentservice'

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
            value="in-company"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            TREINAMENTO IN COMPANY
          </TabsTrigger>
          <TabsTrigger
            value="connection"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Conexão Forte
          </TabsTrigger>
          <TabsTrigger
            value="vantagens"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Vantagens
          </TabsTrigger>
          <TabsTrigger
            value="recrutamento"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Recrutamento & Seleção
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="slider">
          <HeaderPagesAPI {...headerConfig.training} />
        </TabsContent>
        <TabsContent value="in-company">
          <InCompanyTraining />
        </TabsContent>
        <TabsContent value="connection">
          <StrongConnectionSection />
        </TabsContent>
        <TabsContent value="vantagens">
          <PlatformAdvantages />
        </TabsContent>
        <TabsContent value="recrutamento">
          <RecruitmentService {...recruitmentConfig.training} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
