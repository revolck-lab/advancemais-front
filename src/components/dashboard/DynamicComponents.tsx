// src/components/dashboard/DynamicComponents.tsx
'use client'

import { createDynamicComponent } from '@/utils/dynamicImport'

export const DynamicComponents = {
  HeaderPagesAPI: createDynamicComponent(
    () => import('@/components/dashboard/config/header-page/header-page')
  ),
  StatsSection: createDynamicComponent(
    () =>
      import('@/components/dashboard/config/status-business/status-business')
  ),
  RecruitmentChallenges: createDynamicComponent(
    () =>
      import(
        '@/components/dashboard/config/recruitment-challenges/recruitment-challenges'
      )
  ),
  PlatformAdvantages: createDynamicComponent(
    () =>
      import(
        '@/components/dashboard/config/platform-advantages/platform-advantages'
      )
  ),
  RecruitmentService: createDynamicComponent(
    () =>
      import(
        '@/components/dashboard/config/recruitment-service/recruitment-service'
      )
  ),
  HowItWorks: createDynamicComponent(
    () => import('@/components/dashboard/config/how-works/how-works')
  ),
  MissionBusiness: createDynamicComponent(
    () =>
      import('@/components/dashboard/config/mission-business/missionbusiness')
  ),
  WhyChooseUs: createDynamicComponent(
    () => import('@/components/dashboard/config/what-business/what-business')
  ),
  AboutBusiness: createDynamicComponent(
    () => import('@/components/dashboard/config/about-business/about-business')
  ),
  ContactPage: createDynamicComponent(
    () => import('@/components/dashboard/config/contact-form/contact-form')
  ),
  CourseHeader: createDynamicComponent(
    () => import('@/components/dashboard/config/course-header/course-header')
  ),
  BusinessInfo: createDynamicComponent(
    () => import('@/components/dashboard/config/business-info/business-info')
  ),
  BannersSlot: createDynamicComponent(
    () => import('@/components/dashboard/config/banners-slot/banners-slot')
  ),
  BusinessGroup: createDynamicComponent(
    () => import('@/components/dashboard/config/business-group/business-group')
  ),
  InCompanyTraining: createDynamicComponent(
    () => import('@/components/dashboard/config/in-company/in-company')
  ),
  StrongConnectionSection: createDynamicComponent(
    () =>
      import(
        '@/components/dashboard/config/connection-strong/connection-strong'
      )
  ),
  SEOPage: createDynamicComponent(
    () => import('@/components/dashboard/config/seo/seo')
  ),
  GlobalConfig: createDynamicComponent(
    () => import('@/components/dashboard/config/global-config/globalConfig')
  ),
  SmtpConfig: createDynamicComponent(
    () => import('@/components/dashboard/config/smtp-config/smtp-config')
  ),
}
