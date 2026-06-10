import type { ReactNode } from 'react'
import AppHeader from './AppHeader'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className='container'>{children}</main>
    </>
  )
}
