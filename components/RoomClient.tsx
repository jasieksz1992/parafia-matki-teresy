'use client'

import { addDoc, collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/components/AppShell'
import { db, parishId } from '@/lib/firebase'
import { Message, Reaction, ReactionEmoji, reactionEmojis, Room, Profile } from '@/lib/types'

type Member = Pick<Profile, 'uid' | 'displayName'>
type ReplyDraft = Pick<Message, 'id' | 'text' | 'authorName'>

const formatDate = (message: Message) => message.createdAt?.toDate().toLocaleString('pl-PL') || 'przed chwilą'

export function RoomClient({ roomId }: { roomId: string }) {
  const { user, profile } = useAuth()
  const [room, setRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [text, setText] = useState('')
  const [reply, setReply] = useState<ReplyDraft | null>(null)
  const [error, setError] = useState('')
  const [lastSentAt, setLastSentAt] = useState(0)
  const [lastSentText, setLastSentText] = useState('')
  const [reactions, setReactions] = useState<Record<string, Reaction[]>>({})

  useEffect(() => {
    return onSnapshot(doc(db, 'parishes', parishId, 'rooms', roomId), snapshot => {
      setRoom(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Room) : null)
    })
  }, [roomId])

  useEffect(() => {
    const messagesQuery = query(collection(db, 'parishes', parishId, 'rooms', roomId, 'messages'), orderBy('createdAt'), limit(100))
    return onSnapshot(messagesQuery, snapshot => {
      setMessages(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Message))
    })
  }, [roomId])

  useEffect(() => {
    const usersQuery = query(collection(db, 'parishes', parishId, 'users'), limit(50))
    return onSnapshot(usersQuery, snapshot => {
      setMembers(snapshot.docs.map(item => item.data() as Member))
    })
  }, [])

  useEffect(() => {
    return onSnapshot(collection(db, 'parishes', parishId, 'rooms', roomId, 'messages'), snapshot => {
      snapshot.docs.forEach(messageDoc => {
        onSnapshot(collection(db, 'parishes', parishId, 'rooms', roomId, 'messages', messageDoc.id, 'reactions'), reactionSnapshot => {
          setReactions(current => ({ ...current, [messageDoc.id]: reactionSnapshot.docs.map(item => item.data() as Reaction) }))
        })
      })
    })
  }, [roomId])

  const mentionQuery = useMemo(() => {
    const match = text.match(/@([^\s@]*)$/)
    return match?.[1].toLowerCase() ?? null
  }, [text])

  const suggestions = useMemo(() => {
    if (mentionQuery === null) {
      return []
    }
    return members.filter(member => member.displayName.toLowerCase().includes(mentionQuery)).slice(0, 5)
  }, [members, mentionQuery])

  const insertMention = (member: Member) => {
    setText(current => current.replace(/@([^\s@]*)$/, `@${member.displayName} `))
  }

  const getMentions = () => members.filter(member => text.includes(`@${member.displayName}`)).map(member => member.uid)

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const cleanText = text.trim()
    if (!user || !profile) {
      setError('Zaloguj się, aby pisać wiadomości.')
      return
    }
    if (profile.banned) {
      setError('Twoje konto jest zablokowane.')
      return
    }
    if (room?.closed) {
      setError('Ten pokój jest zamknięty.')
      return
    }
    if (cleanText.length < 1 || cleanText.length > 1000) {
      setError('Wiadomość musi mieć od 1 do 1000 znaków.')
      return
    }
    if (Date.now() - lastSentAt < 5000) {
      setError('Poczekaj 5 sekund przed wysłaniem kolejnej wiadomości.')
      return
    }
    if (cleanText === lastSentText) {
      setError('Nie wysyłaj ponownie tej samej wiadomości w tym pokoju.')
      return
    }
    await addDoc(collection(db, 'parishes', parishId, 'rooms', roomId, 'messages'), {
      uid: user.uid,
      authorName: profile.displayName,
      text: cleanText,
      createdAt: serverTimestamp(),
      deleted: false,
      mentions: getMentions(),
      ...(reply ? { replyToMessageId: reply.id, replyToText: reply.text.slice(0, 160), replyToAuthorName: reply.authorName } : {})
    })
    await updateDoc(doc(db, 'parishes', parishId, 'rooms', roomId), {
      lastMessageText: cleanText.slice(0, 160),
      lastMessageAuthorName: profile.displayName,
      lastMessageAt: serverTimestamp()
    })
    setLastSentAt(Date.now())
    setLastSentText(cleanText)
    setText('')
    setReply(null)
  }

  const toggleReaction = async (message: Message, emoji: ReactionEmoji) => {
    if (!user || profile?.banned || message.deleted) {
      return
    }
    const reactionRef = doc(db, 'parishes', parishId, 'rooms', roomId, 'messages', message.id, 'reactions', user.uid)
    const current = reactions[message.id]?.find(item => item.uid === user.uid)
    if (current?.emoji === emoji) {
      await deleteDoc(reactionRef)
      return
    }
    await setDoc(reactionRef, { uid: user.uid, emoji, createdAt: serverTimestamp() })
  }

  const reportMessage = async (message: Message) => {
    if (!user || !profile) {
      return
    }
    await addDoc(collection(db, 'parishes', parishId, 'reports'), {
      roomId,
      messageId: message.id,
      messageText: message.text,
      authorUid: message.uid,
      authorName: message.authorName,
      reporterUid: user.uid,
      reason: 'Zgłoszenie użytkownika',
      status: 'pending',
      createdAt: serverTimestamp()
    })
  }

  const counts = (messageId: string) => reactionEmojis.map(emoji => ({
    emoji,
    count: (reactions[messageId] || []).filter(item => item.emoji === emoji).length,
    active: (reactions[messageId] || []).some(item => item.uid === user?.uid && item.emoji === emoji)
  }))

  return (
    <section className="panel">
      <Link className="secondary" href="/community">← Wróć do wspólnoty</Link>
      <h1>{room?.name || 'Pokój'}</h1>
      <p className="muted">{room?.description}</p>
      {room?.official ? <span className="badge">Oficjalny</span> : null} {room?.closed ? <span className="badge closed">Zamknięty</span> : null}
      <div className="list" style={{ marginTop: 18 }}>
        {messages.map(message => (
          <article className="message" key={message.id}>
            <div className="message-meta">
              <strong>{message.authorName}</strong>
              <span className="muted">{formatDate(message)}</span>
            </div>
            {message.replyToMessageId ? <div className="reply-preview"><strong>{message.replyToAuthorName}</strong><br />{message.replyToText}</div> : null}
            <p>{message.deleted ? 'Wiadomość usunięta przez moderatora.' : message.text}</p>
            {!message.deleted ? (
              <div className="reactions">
                {counts(message.id).map(item => <button className={item.active ? 'active' : ''} key={item.emoji} onClick={() => toggleReaction(message, item.emoji)}>{item.emoji} {item.count}</button>)}
              </div>
            ) : null}
            {!message.deleted ? (
              <div className="actions">
                <button className="secondary" onClick={() => setReply(message)}>Odpowiedz</button>
                <button className="danger" onClick={() => reportMessage(message)}>Zgłoś</button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <form className="composer list" onSubmit={sendMessage}>
        {reply ? <div className="reply-preview"><button className="danger" type="button" onClick={() => setReply(null)}>Anuluj</button><br /><strong>Odpowiedź do {reply.authorName}</strong><br />{reply.text}</div> : null}
        {suggestions.length ? <div className="suggestions">{suggestions.map(member => <button type="button" key={member.uid} onClick={() => insertMention(member)}>{member.displayName}</button>)}</div> : null}
        <textarea value={text} onChange={event => setText(event.target.value)} placeholder="Napisz wiadomość. Użyj @, aby wspomnieć osobę." maxLength={1000} disabled={room?.closed || profile?.banned} />
        {error ? <p className="danger">{error}</p> : null}
        <button className="primary" disabled={room?.closed || profile?.banned}>Wyślij</button>
      </form>
    </section>
  )
}
