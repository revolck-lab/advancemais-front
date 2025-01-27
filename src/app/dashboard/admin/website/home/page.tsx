'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import { SliderTab } from '@/components/dashboard/slider-tab/slider-tab'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import styles from './page.module.css'

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
            Slider
          </TabsTrigger>
          <TabsTrigger
            value="business-info"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Business Info
          </TabsTrigger>
          <TabsTrigger
            value="banners"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Banners
          </TabsTrigger>
          <TabsTrigger
            value="business-group"
            className="pb-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent focus:border-blue-500 focus:text-gray-900 dark:focus:text-gray-100 transition"
          >
            Business Group
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="slider">
          <SliderTab />
        </TabsContent>
        <TabsContent value="business-info">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="banners">
          <Card>
            <CardHeader>
              <CardTitle>Banners Group</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business-group">
          <Card>
            <CardHeader>
              <CardTitle>Business Group Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
