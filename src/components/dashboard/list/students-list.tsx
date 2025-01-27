import { MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'

const students = [
  {
    name: 'Angelica Ramos',
    coach: 'Ashton Cox',
    date: '12 August 2022',
    time: '10:15',
  },
  {
    name: 'Bradley Greer',
    coach: 'Brenden Wagner',
    date: '11 July 2022',
    time: '10:00',
  },
  {
    name: 'Cedric Kelly',
    coach: 'Brielle Williamson',
    date: '10 May 2022',
    time: '09:45',
  },
]

export function StudentsList() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Student List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Assigned Coach</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.coach}</TableCell>
              <TableCell>{student.date}</TableCell>
              <TableCell>{student.time}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
