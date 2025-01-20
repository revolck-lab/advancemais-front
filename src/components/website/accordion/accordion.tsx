'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion/accordion'
import Player from '@/components/ui/videos/videos'
import Styles from './accordion.module.css'

interface AccordionSectionProps {
  title: string
  description: string
  videoUrl: string
  items: {
    value: string
    trigger: string
    content: string
  }[]
}

export default function AccordionSection({
  title,
  description,
  videoUrl,
  items,
}: AccordionSectionProps): JSX.Element {
  return (
    <section className={`${Styles.pxResponsive} py-16 text-neutral lg:mt-6`}>
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Texto e Accordion */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-neutral mb-4">{title}</h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-8">
            {description}
          </p>

          <Accordion
            type="single"
            collapsible
            defaultValue={items[0]?.value || ''}
            className="w-full space-y-4"
          >
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-lg font-medium">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Player de vídeo */}
        <div className={`${Styles.playerVideo} lg:w-1/2`}>
          <div className="rounded-lg overflow-hidden border relative">
            <Player url={videoUrl} controls />
          </div>
        </div>
      </div>
    </section>
  )
}
