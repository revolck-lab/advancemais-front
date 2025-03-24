'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button1'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible/collapsible'
import { useSidebar } from '@/components/dashboard/layout/sidebar/sidebar-context'
import Styles from './sidebar.module.css'
import dashboardRoutes from '@/config/routes/dashboard-routes' // Importando as rotas

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-primary text-white transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div
        className={`${Styles.borderSection} flex h-16 items-center justify-center bg-primary px-6`}
      >
        {isCollapsed ? (
          <Image
            src="/images/logo_simplev2.webp"
            alt="Logo Collapsed"
            layout="fixed"
            width={100}
            height={100}
            className={cn(Styles.logoCollapse)}
          />
        ) : (
          <Image
            src="/images/logo_branco.webp"
            alt="Logo Expandido"
            layout="intrinsic"
            width={100}
            height={100}
            className={cn(Styles.logo)}
          />
        )}
      </div>

      {/* Categorias */}
      <div className="p-5 space-y-6">
        {dashboardRoutes.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {/* Título da Categoria */}
            {!isCollapsed && (
              <p className="mb-4 text-xs font-semibold uppercase text-gray-400">
                {category.category}
              </p>
            )}

            {/* Itens da Categoria */}
            <div className="space-y-2">
              {category.items.map((item, itemIndex) =>
                isCollapsed ? (
                  <div key={itemIndex} className="group relative">
                    <Button
                      variant="ghost"
                      className="flex items-center justify-center px-2 hover:bg-white/10"
                    >
                      <item.icon className="h-4 w-4" />
                    </Button>
                    {'submenu' in item && item.submenu && (
                      <div
                        className={cn(
                          'absolute left-full top-0 z-50 w-56 p-4 bg-[#1E1E2E] text-white shadow-lg rounded-md',
                          'hidden group-hover:block'
                        )}
                      >
                        <h3 className="mb-2 text-sm font-semibold">
                          {item.title}
                        </h3>
                        <div className="space-y-2">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.href}
                              href={subitem.href}
                              className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700',
                                pathname === subitem.href && 'bg-gray-800'
                              )}
                            >
                              {subitem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={itemIndex}>
                    {'submenu' in item && item.submenu ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start gap-2 hover:bg-white/10'
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            {!isCollapsed && (
                              <>
                                <span className="flex-1 text-left">
                                  {item.title}
                                </span>
                                <ChevronDown className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 pl-6">
                          {item.submenu.map((subitem, subindex) => (
                            <Link key={subindex} href={subitem.href}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  'w-full justify-start hover:bg-white/10',
                                  pathname === subitem.href && 'bg-white/10'
                                )}
                              >
                                {subitem.title}
                              </Button>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link href={'href' in item ? item.href : '#'}>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-start gap-2 hover:bg-white/10',
                            'href' in item && pathname === item.href && 'bg-white/10'
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </Button>
                      </Link>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
