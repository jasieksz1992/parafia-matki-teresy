'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, db, parishId } from '@/lib/firebase'
import type { Profile } from '@/lib/types'

type AuthContextValue = {
  user: User | null
  profile: Profile | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, profile: null, loading: true })

export function useAuth() {
  return useContext(AuthContext)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser)
      if (!currentUser) {
        setProfile(null)
        setLoading(false)
        return
      }
      const profileRef = doc(db, 'parishes', parishId, 'users', currentUser.uid)
      const snapshot = await getDoc(profileRef)
      if (!snapshot.exists()) {
        await setDoc(profileRef, {
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'Parafianin',
          role: 'member',
          banned: false,
          createdAt: serverTimestamp()
        }, { merge: true })
      }
      const fresh = await getDoc(profileRef)
      setProfile(fresh.data() as Profile)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (loading || !user) {
      return
    }
    if (!profile?.acceptedRulesAt && pathname !== '/rules') {
      router.replace('/rules')
    }
    if (profile?.acceptedRulesAt && pathname === '/rules') {
      router.replace('/community')
    }
  }, [loading, pathname, profile?.acceptedRulesAt, router, user])

  const value = useMemo(() => ({ user, profile, loading }), [user, profile, loading])

  const signIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  return (
    <AuthContext.Provider value={value}>
      <div className="shell">
        <header className="header">
          <Link href="/" className="brand">Parafia św. Matki Teresy</Link>
          <nav className="nav">
            <Link href="/community">Wspólnota</Link>
            <Link href="/community/mentions">Wzmianki</Link>
            <Link href="/#kontakt">Kontakt</Link>
            {user ? <button onClick={() => signOut(auth)}>Wyloguj</button> : <button onClick={signIn}>Zaloguj</button>}
          </nav>
        </header>
        <main className="main">{children}</main>
      </div>
    </AuthContext.Provider>
  )
}
