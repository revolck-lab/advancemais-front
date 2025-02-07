// src/utils/dynamicImport.tsx
'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import LoadingChildren from '@/components/dashboard/layout/loading-children/loading-children'

// Define um parâmetro genérico P, com padrão {}.
export function createDynamicComponent<
  P extends object = Record<string, unknown>,
>(importer: () => Promise<{ default: React.ComponentType<P> }>) {
  return dynamic(importer, {
    loading: () => <LoadingChildren />,
    ssr: false,
  })
}
