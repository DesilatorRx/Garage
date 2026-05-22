'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function DashboardHeader() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/30">
          <span className="text-sm font-bold text-primary font-serif">P</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-wide text-foreground">PORSCHE GARAGE</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Collection Tracker</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span className="sr-only md:not-sr-only">Sign Out</span>
      </Button>
    </header>
  )
}
