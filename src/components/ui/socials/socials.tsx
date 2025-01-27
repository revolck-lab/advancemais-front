'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const SocialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
}

interface SocialProps {
  name: string
  url: string
  active: boolean
}

interface SocialsComponentProps {
  socials: SocialProps[]
}

const Socials: React.FC<SocialsComponentProps> = ({ socials }): JSX.Element => {
  return (
    <div className="flex gap-4 mt-2">
      {socials
        .filter((social) => social.active)
        .map((social) => {
          const Icon = SocialIcons[social.name as keyof typeof SocialIcons]
          if (!Icon) {
            console.warn(`Icon for ${social.name} is not defined.`)
            return null
          }
          return (
            <Link
              key={social.name}
              href={social.url}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="text-red-600 hover:text-white" size={24} />
            </Link>
          )
        })}
    </div>
  )
}

export default Socials
