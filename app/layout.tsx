import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppShell } from '@/components/AppShell'

export const metadata: Metadata = {
  title: 'Parafia św. Matki Teresy z Kalkuty',
  description: 'Parafialna aplikacja wspólnotowa',
  manifest: '/manifest.json'
}

export const viewport: Viewport = {
  themeColor: '#365314'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
