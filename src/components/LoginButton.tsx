'use client'

import { loginWithGoogle, logout } from '@/lib/auth'
import { useAuth } from './AuthProvider'

export default function LoginButton() {
  const { user } = useAuth()

  if (user) {
    return <button className='button secondary' onClick={() => logout()}>Wyloguj</button>
  }

  return <button className='button' onClick={() => loginWithGoogle()}>Zaloguj</button>
}
