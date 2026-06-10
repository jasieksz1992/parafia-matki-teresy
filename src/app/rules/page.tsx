'use client'

import Link from 'next/link'
import { acceptRules } from '@/lib/firestore'
import { useAuth } from '@/components/AuthProvider'

export default function RulesPage() {
  const { user, member } = useAuth()

  return (
    <section className='stack readable'>
      <h1>Regulamin wspólnoty</h1>
      <ol>
        <li>Piszemy z szacunkiem do każdej osoby.</li>
        <li>Nie publikujemy treści obraźliwych, reklam, danych prywatnych ani spamu.</li>
        <li>Moderatorzy mogą usuwać wiadomości, zamykać pokoje i blokować konta naruszające zasady.</li>
        <li>Zgłaszamy wiadomości, które wymagają reakcji moderatora.</li>
        <li>Aplikacja służy komunikacji parafialnej i wzajemnej pomocy.</li>
      </ol>
      {user ? (
        <button className='button' onClick={() => acceptRules(user.uid)} disabled={!!member?.acceptedRulesAt}>
          {member?.acceptedRulesAt ? 'Regulamin zaakceptowany' : 'Akceptuję regulamin'}
        </button>
      ) : (
        <Link className='button' href='/login'>Zaloguj się, aby zaakceptować</Link>
      )}
    </section>
  )
}
