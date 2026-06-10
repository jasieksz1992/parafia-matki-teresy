'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { observeRooms } from '@/lib/firestore'
import type { Room } from '@/lib/types'

export default function RoomList() {
  const [items, setItems] = useState<Room[]>([])

  useEffect(() => observeRooms(setItems), [])

  if (!items.length) {
    return <p className='empty'>Nie ma jeszcze aktywnych pokoi. Poproś moderatora o utworzenie pierwszych pokoi.</p>
  }

  return (
    <div className='cards'>
      {items.map(item => (
        <article className='card' key={item.id}>
          {item.isOfficial && <span className='badge'>Oficjalny</span>}
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <Link className='button' href={`/community/${item.id}`}>Wejdź do pokoju</Link>
        </article>
      ))}
    </div>
  )
}
