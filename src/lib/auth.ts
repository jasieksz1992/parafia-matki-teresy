'use client'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { parishId } from './constants'
import type { Member } from './types'

const provider = new GoogleAuthProvider()

export function loginWithGoogle() {
  return signInWithPopup(auth, provider)
}

export function logout() {
  return signOut(auth)
}

export function observeUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export function memberRef(uid: string) {
  return doc(db, 'parishes', parishId, 'members', uid)
}

export async function ensureMember(user: User) {
  const ref = memberRef(user.uid)
  const snap = await getDoc(ref)
  const base = {
    uid: user.uid,
    parishId,
    displayName: user.displayName || 'Parafianin',
    email: user.email || '',
    photoURL: user.photoURL || '',
    isBanned: false,
    updatedAt: serverTimestamp()
  }

  if (!snap.exists()) {
    await setDoc(ref, {
      ...base,
      role: 'user',
      createdAt: serverTimestamp()
    })
    return
  }

  await setDoc(ref, base, { merge: true })
}

export function observeMember(uid: string, callback: (member: Member | null) => void) {
  return onSnapshot(memberRef(uid), snapshot => callback(snapshot.exists() ? snapshot.data() as Member : null))
}
