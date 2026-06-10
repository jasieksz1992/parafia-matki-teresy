'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { ensureMember, observeMember, observeUser } from '@/lib/auth'
import type { Member } from '@/lib/types'

type AuthContextValue = {
  user: User | null
  member: Member | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, member: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let stopMember: (() => void) | undefined
    const stopUser = observeUser(async nextUser => {
      stopMember?.()
      setUser(nextUser)
      setMember(null)
      if (!nextUser) {
        setLoading(false)
        return
      }
      setLoading(true)
      await ensureMember(nextUser)
      stopMember = observeMember(nextUser.uid, nextMember => {
        setMember(nextMember)
        setLoading(false)
      })
    })

    return () => {
      stopMember?.()
      stopUser()
    }
  }, [])

  const value = useMemo(() => ({ user, member, loading }), [user, member, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
