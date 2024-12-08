'use client'

import React from 'react'

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Dashboard</div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <a href="/dashboard">Home</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <a href="/dashboard/settings">Settings</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <a href="/dashboard/profile">Profile</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">Header</div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          Footer © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout
