'use client'

import Link from 'next/link'
import { logout } from '@/lib/auth'
import { useAuth } from './AuthProvider'

export default function LoginButton() {
  const { user } = useAuth()

  if (user) {
    return <button className='button secondary' onClick={() => logout()}>Wyloguj</button>
  }

  return <Link className='button' href='/login'>Zaloguj / Rejestracja</Link>
}
