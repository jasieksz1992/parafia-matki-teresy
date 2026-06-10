'use client'

import { useEffect, useState } from 'react'
import { observeEvents } from '@/lib/firestore'
import type { ParishEvent } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function EventList() {
  const [items, setItems] = useState<ParishEvent[]>([])

  useEffect(() => observeEvents(setItems), [])

  if (!items.length) {
    return <p className='empty'>Brak opublikowanych wydarzeń.</p>
  }

  return (
    <div className='cards'>
      {items.map(item => (
        <article className='card' key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><strong>Miejsce:</strong> {item.location}</p>
          <time>{formatDate(item.startAt)} – {formatDate(item.endAt)}</time>
        </article>
      ))}
    </div>
  )
}
