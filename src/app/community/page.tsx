'use client'

import Link from 'next/link'
import RoomList from '@/components/RoomList'
import { useAuth } from '@/components/AuthProvider'

export default function CommunityPage() {
  const { user, member } = useAuth()

  return (
    <section className='stack'>
      <div className='hero small'>
        <h1>Wspólnota</h1>
        <p>Rozmawiajmy spokojnie, z szacunkiem i odpowiedzialnością.</p>
        {user && !member?.acceptedRulesAt && <Link className='button' href='/rules'>Zaakceptuj regulamin</Link>}
      </div>
      <RoomList />
    </section>
  )
}
