'use client'

import { useEffect, useState } from 'react'
import { observeAnnouncements } from '@/lib/firestore'
import { fallbackAnnouncements, officialSiteUrl } from '@/lib/parish-data'
import type { Announcement } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function AnnouncementList() {
  const [items, setItems] = useState<Announcement[]>(fallbackAnnouncements)
  const [usesFallback, setUsesFallback] = useState(true)

  useEffect(() => observeAnnouncements(itemsFromFirestore => {
    if (itemsFromFirestore.length) {
      setItems(itemsFromFirestore)
      setUsesFallback(false)
    } else {
      setItems(fallbackAnnouncements)
      setUsesFallback(true)
    }
  }, true, () => {
    setItems(fallbackAnnouncements)
    setUsesFallback(true)
  }), [])

  if (!items.length) {
    return <p className='empty'>Brak opublikowanych ogłoszeń.</p>
  }

  return (
    <div className='list-with-note'>
      {usesFallback && (
        <p className='source-note'>
          Podgląd najnowszych informacji z oficjalnej strony parafii. Pełną treść znajdziesz na{' '}
          <a href={officialSiteUrl} target='_blank' rel='noreferrer'>parafiamatkiteresyzkalkuty.pl</a>.
        </p>
      )}
      <div className='cards'>
        {items.map(item => (
          <article className='card announcement-card' key={item.id}>
            {item.isPinned && <span className='badge'>Ważne</span>}
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <time>{formatDate(item.createdAt)}</time>
          </article>
        ))}
      </div>
    </div>
  )
}
