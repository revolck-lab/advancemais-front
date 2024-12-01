// src/components/dashboard/header/header.tsx
import React from 'react'
import Image from 'next/image'

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-10">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo_branco.webp"
            alt="Logo"
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold text-gray-800">
            AdvanceMais12121
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 text-sm bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src=""
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="text-sm">
              <p className="text-gray-800 font-medium">Nome</p>
              <p className="text-gray-500">Empresa</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
