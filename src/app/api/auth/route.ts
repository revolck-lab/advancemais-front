// src/app/api/auth/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserRole } from '@/config/roles'

/**
 * Exemplo de "login" usando POST /api/auth
 * Recebe { login, password }, checa no "banco" e retorna cookie com JWT
 */
export async function POST(request: Request) {
  try {
    const { login, password } = await request.json()

    // Exemplo: checa no "banco" (simples stub)
    if (login === 'joao' && password === '123456') {
      // Exemplo: joao é ADMINISTRADOR (role=4)
      const token = jwt.sign(
        {
          id: 1,
          name: 'João da Silva',
          role: UserRole.ADMINISTRADOR,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1d',
        }
      )

      // Monta o Set-Cookie
      const response = NextResponse.json({ message: 'Logged in!' })
      response.cookies.set('authToken', token, {
        httpOnly: true, // + segurança
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
      })
      return response
    }

    // Se não bateu credencial
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
