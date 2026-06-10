'use client'

import { useRouter } from 'next/navigation'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useAuth } from '@/components/AppShell'
import { db, parishId } from '@/lib/firebase'

const rules = [
  'pisz z szacunkiem',
  'nie publikuj danych prywatnych innych osób',
  'nie spamuj',
  'zgłaszaj niepokojące treści',
  'moderatorzy mogą usuwać treści i blokować konto'
]

export default function RulesPage() {
  const { user } = useAuth()
  const router = useRouter()

  const acceptRules = async () => {
    if (!user) {
      return
    }
    await setDoc(doc(db, 'parishes', parishId, 'users', user.uid), { acceptedRulesAt: serverTimestamp() }, { merge: true })
    router.replace('/community')
  }

  return (
    <section className="panel">
      <h1>Zasady wspólnoty</h1>
      <p>Przed wejściem do rozmów parafialnych zaakceptuj proste zasady bezpieczeństwa.</p>
      <ul>
        {rules.map(rule => <li key={rule}>{rule}</li>)}
      </ul>
      <button className="primary" onClick={acceptRules} disabled={!user}>Akceptuję zasady</button>
    </section>
  )
}
