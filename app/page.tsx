import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GarageMark } from '@/components/garage-mark'

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6">
      <div className="flex max-w-lg flex-col items-center gap-8 text-center">
        <GarageMark className="h-24 w-auto" />
        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            The Garage
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            Track the market value of your exotic car collection like a stock portfolio. Porsche, Ferrari, Lamborghini, McLaren, Aston Martin — see where your investments stand and how the market is moving.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="border-border text-foreground hover:bg-accent px-8 bg-transparent">
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground font-mono">6</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Brands</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground font-mono">1948+</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Years Covered</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary font-mono">Daily</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Market Updates</p>
          </div>
        </div>
      </div>
    </main>
  )
}
