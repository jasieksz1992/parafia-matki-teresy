'use client'

import { FormEvent, useState } from 'react'
import { saveAnnouncement } from '@/lib/firestore'
import { useAuth } from './AuthProvider'

export default function AnnouncementForm() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPinned, setPinned] = useState(false)
  const [isPublished, setPublished] = useState(true)

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!user || !title.trim() || !content.trim()) {
      return
    }
    await saveAnnouncement({ title, content, isPinned, isPublished }, user.uid)
    setTitle('')
    setContent('')
    setPinned(false)
    setPublished(true)
  }

  return (
    <form className='form' onSubmit={submit}>
      <label>Tytuł<input value={title} onChange={event => setTitle(event.target.value)} required /></label>
      <label>Treść<textarea value={content} onChange={event => setContent(event.target.value)} required /></label>
      <label className='check'><input type='checkbox' checked={isPinned} onChange={event => setPinned(event.target.checked)} /> Przypnij</label>
      <label className='check'><input type='checkbox' checked={isPublished} onChange={event => setPublished(event.target.checked)} /> Opublikuj</label>
      <button className='button' type='submit'>Dodaj ogłoszenie</button>
    </form>
  )
}
