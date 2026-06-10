'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginButton from './LoginButton'
import UserBadge from './UserBadge'

const links = [
  ['/', 'Home'],
  ['/announcements', 'Ogłoszenia'],
  ['/events', 'Wydarzenia'],
  ['/community', 'Wspólnota'],
  ['/#kontakt', 'Kontakt'],
  ['/admin', 'Panel']
]

export default function AppHeader() {
  const pathname = usePathname()

  return (
    <header className='site-header'>
      <Link className='brand' href='/'>
        <span>Parafia</span>
        <strong>Matki Teresy</strong>
      </Link>
      <nav aria-label='Główna nawigacja'>
        {links.map(([href, label]) => (
          <Link key={href} className={pathname === href ? 'active' : ''} href={href}>{label}</Link>
        ))}
      </nav>
      <div className='header-actions'>
        <UserBadge />
        <LoginButton />
      </div>
    </header>
  )
}
