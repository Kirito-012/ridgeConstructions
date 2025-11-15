'use client'

import { usePathname } from 'next/navigation'
import Navbar from './header'
import Footer from './footer'

const ADMIN_PATH_PREFIXES = ['/adminuser']

export default function AppChrome({ children }) {
  const pathname = usePathname()
  const shouldHideChrome = ADMIN_PATH_PREFIXES.some((prefix) => pathname?.startsWith(prefix))

  if (shouldHideChrome) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-background text-foreground">{children}</main>
      <Footer />
    </>
  )
}
