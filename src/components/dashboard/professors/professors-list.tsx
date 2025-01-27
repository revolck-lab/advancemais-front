import { MoreVertical } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'

const professors = [
  {
    name: 'Theodore Handle',
    degree: 'B.Com',
    status: 'Available',
    avatar: '/placeholder.svg', // Removi o query string desnecessário
  },
  {
    name: 'Bess Willis',
    degree: 'M.Com',
    status: 'Not Available',
    avatar: '/placeholder.svg',
  },
  {
    name: 'James Jones',
    degree: 'M.Tech',
    status: 'Available',
    avatar: '/placeholder.svg',
  },
]

export function ProfessorsList() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Professors List</h2>
      <div className="space-y-4">
        {professors.map((professor, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Substituí o <img> pelo <Image /> */}
              <Image
                src={professor.avatar || '/placeholder.svg'}
                alt={professor.name}
                width={40} // Dimensão exata da imagem
                height={40} // Dimensão exata da imagem
                className="h-10 w-10 rounded-full" // Estilização mantida
              />
              <div>
                <p className="font-medium">{professor.name}</p>
                <p className="text-sm text-gray-500">{professor.degree}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${
                  professor.status === 'Available'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {professor.status}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-4 w-full">
        View All
      </Button>
    </div>
  )
}
