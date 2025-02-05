import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out!' })
  response.cookies.set('authToken', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
  })
  return response
}
