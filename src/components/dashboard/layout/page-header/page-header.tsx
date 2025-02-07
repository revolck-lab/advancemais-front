'use client'

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb/breadcrumb'

interface PageHeaderProps {
  title: string
  breadcrumbs: { label: string; href?: string }[]
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4 px-4 border-b border-gray-200">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {breadcrumb.href ? (
                  <BreadcrumbLink
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                ) : (
                  <span className="text-gray-800 font-medium">
                    {breadcrumb.label}
                  </span>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <li aria-hidden="true">/</li>}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
