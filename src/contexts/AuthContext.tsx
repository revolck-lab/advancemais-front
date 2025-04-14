//src\contexts\AuthContext.tsx
'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  email: string
  companyName?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('advanceUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate authentication - in a real app, this would call an API
    if (email === 'empresa@advancemais.com.br' && password === '123456') {
      const user = {
        email,
        companyName: 'Advance Mais Empresa',
      }
      setUser(user)
      localStorage.setItem('advanceUser', JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('advanceUser')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
