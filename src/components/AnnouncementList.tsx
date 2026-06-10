'use client'

import { useEffect, useState } from 'react'
import { observeAnnouncements } from '@/lib/firestore'
import type { Announcement } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function AnnouncementList() {
  const [items, setItems] = useState<Announcement[]>([])

  useEffect(() => observeAnnouncements(setItems), [])

  if (!items.length) {
    return <p className='empty'>Brak opublikowanych ogłoszeń.</p>
  }

  return (
    <div className='cards'>
      {items.map(item => (
        <article className='card' key={item.id}>
          {item.isPinned && <span className='badge'>Przypięte</span>}
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <time>{formatDate(item.createdAt)}</time>
        </article>
      ))}
    </div>
  )
}
