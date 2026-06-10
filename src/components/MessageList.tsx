'use client'

import { useEffect, useState } from 'react'
import { observeMessages } from '@/lib/firestore'
import type { Message } from '@/lib/types'
import { formatDate } from '@/lib/format'
import MessageActions from './MessageActions'
import ReportMessageButton from './ReportMessageButton'

export default function MessageList({ roomId }: { roomId: string }) {
  const [items, setItems] = useState<Message[]>([])

  useEffect(() => observeMessages(roomId, setItems), [roomId])

  if (!items.length) {
    return <p className='empty'>Brak wiadomości. Napisz pierwszą wiadomość z życzliwością.</p>
  }

  return (
    <div className='messages' aria-live='polite'>
      {items.map(item => (
        <article className='message' key={item.id}>
          <header>
            <strong>{item.authorName}</strong>
            <time>{formatDate(item.createdAt)}</time>
          </header>
          <p className={item.isDeleted ? 'deleted' : ''}>{item.isDeleted ? 'Wiadomość usunięta przez moderatora' : item.text}</p>
          {!item.isDeleted && item.id && <div className='message-tools'><ReportMessageButton roomId={roomId} messageId={item.id} /><MessageActions roomId={roomId} messageId={item.id} /></div>}
        </article>
      ))}
    </div>
  )
}
