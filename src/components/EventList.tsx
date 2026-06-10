'use client'

import { useEffect, useState } from 'react'
import { observeEvents } from '@/lib/firestore'
import { fallbackEvents, officialSiteUrl } from '@/lib/parish-data'
import type { ParishEvent } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function EventList() {
  const [items, setItems] = useState<ParishEvent[]>(fallbackEvents)
  const [usesFallback, setUsesFallback] = useState(true)

  useEffect(() => observeEvents(itemsFromFirestore => {
    if (itemsFromFirestore.length) {
      setItems(itemsFromFirestore)
      setUsesFallback(false)
    } else {
      setItems(fallbackEvents)
      setUsesFallback(true)
    }
  }, true, () => {
    setItems(fallbackEvents)
    setUsesFallback(true)
  }), [])

  if (!items.length) {
    return <p className='empty'>Brak opublikowanych wydarzeń.</p>
  }

  return (
    <div className='list-with-note'>
      {usesFallback && (
        <p className='source-note'>
          Kalendarz startowy na podstawie oficjalnych komunikatów parafii. Aktualizacje: {' '}
          <a href={officialSiteUrl} target='_blank' rel='noreferrer'>strona parafii</a>.
        </p>
      )}
      <div className='cards'>
        {items.map(item => (
          <article className='card event-card' key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Miejsce:</strong> {item.location}</p>
            <time>{formatDate(item.startAt)} – {formatDate(item.endAt)}</time>
          </article>
        ))}
      </div>
    </div>
  )
}
