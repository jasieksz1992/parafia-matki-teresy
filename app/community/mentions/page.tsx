'use client'

import Link from 'next/link'
import { collectionGroup, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AppShell'
import { db } from '@/lib/firebase'
import { Message } from '@/lib/types'

type MentionResult = Message & {
  roomId: string
  roomName: string
}

export default function MentionsPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<MentionResult[]>([])

  useEffect(() => {
    if (!user) {
      return
    }
    const mentionsQuery = query(collectionGroup(db, 'messages'), where('mentions', 'array-contains', user.uid))
    return onSnapshot(mentionsQuery, snapshot => {
      setMessages(snapshot.docs.map(item => {
        const roomRef = item.ref.parent.parent
        return {
          id: item.id,
          roomId: roomRef?.id || '',
          roomName: roomRef?.id || 'Pokój',
          ...item.data()
        } as MentionResult
      }))
    })
  }, [user])

  return (
    <section className="panel">
      <div className="row">
        <h1>Wzmianki</h1>
        <Link className="secondary" href="/community">Wspólnota</Link>
      </div>
      {!user ? <p>Zaloguj się, aby zobaczyć wzmianki.</p> : null}
      <div className="list">
        {messages.map(message => (
          <article className="message" key={message.id}>
            <div className="message-meta">
              <strong>{message.authorName}</strong>
              <span className="muted">{message.createdAt?.toDate().toLocaleString('pl-PL') || 'przed chwilą'}</span>
            </div>
            <p className="muted">Pokój: {message.roomName}</p>
            <p>{message.deleted ? 'Wiadomość usunięta przez moderatora.' : message.text}</p>
            <Link className="primary" href={`/community/rooms?roomId=${message.roomId}`}>Przejdź do pokoju</Link>
          </article>
        ))}
        {user && !messages.length ? <p className="muted">Nie masz jeszcze wzmianek.</p> : null}
      </div>
    </section>
  )
}
