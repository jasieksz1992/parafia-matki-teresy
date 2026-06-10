'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createMessage } from '@/lib/firestore'
import { useAuth } from './AuthProvider'

export default function MessageComposer({ roomId, isActive = true }: { roomId: string, isActive?: boolean }) {
  const { user, member } = useAuth()
  const [text, setText] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!user || !member || !text.trim() || text.length > 1000 || member.isBanned || !isActive) {
      return
    }
    await createMessage(roomId, text, user.uid, member.displayName)
    setText('')
  }

  if (!user) {
    return <p className='notice'>Zaloguj się, aby pisać we wspólnocie.</p>
  }

  if (!member?.acceptedRulesAt) {
    return <p className='notice'>Przed wejściem do wspólnoty zaakceptuj <Link href='/rules'>regulamin</Link>.</p>
  }

  if (member.isBanned) {
    return <p className='notice'>Twoje konto nie może dodawać wiadomości.</p>
  }

  if (!isActive) {
    return <p className='notice'>Ten pokój jest zamknięty.</p>
  }

  return (
    <form className='composer' onSubmit={submit}>
      <label htmlFor='message'>Wiadomość</label>
      <textarea id='message' maxLength={1000} value={text} onChange={event => setText(event.target.value)} placeholder='Napisz wiadomość...' />
      <div className='composer-row'>
        <span>{text.length}/1000</span>
        <button className='button' type='submit' disabled={!text.trim()}>Wyślij</button>
      </div>
    </form>
  )
}
