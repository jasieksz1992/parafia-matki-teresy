import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = {
  title: 'Parafia Matki Teresy',
  description: 'Aplikacja wspólnoty parafialnej Kościoła pw. św. Matki Teresy z Kalkuty',
  manifest: '/manifest.webmanifest'
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='pl'>
      <body>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
