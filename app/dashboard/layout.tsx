import React from "react"
import { DashboardHeader } from '@/components/dashboard-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
    </div>
  )
}
