'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { RoomClient } from '@/components/RoomClient'

function RoomSearchPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')

  if (!roomId) {
    return (
      <section className="panel">
        <h1>Pokój</h1>
        <p>Nie wybrano pokoju.</p>
        <Link className="secondary" href="/community">Wróć do wspólnoty</Link>
      </section>
    )
  }

  return <RoomClient roomId={roomId} />
}

export default function RoomPage() {
  return <Suspense fallback={<section className="panel"><p>Ładowanie pokoju...</p></section>}><RoomSearchPage /></Suspense>
}
