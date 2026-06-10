'use client'

import { FormEvent, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { saveEvent } from '@/lib/firestore'
import { toInputDate } from '@/lib/format'
import { useAuth } from './AuthProvider'

export default function EventForm() {
  const { user } = useAuth()
  const now = toInputDate(new Date())
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('Kościół parafialny')
  const [startAt, setStartAt] = useState(now)
  const [endAt, setEndAt] = useState(now)
  const [isPublished, setPublished] = useState(true)

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!user || !title.trim() || !description.trim()) {
      return
    }
    await saveEvent({
      title,
      description,
      location,
      startAt: Timestamp.fromDate(new Date(startAt)),
      endAt: Timestamp.fromDate(new Date(endAt)),
      isPublished
    }, user.uid)
    setTitle('')
    setDescription('')
  }

  return (
    <form className='form' onSubmit={submit}>
      <label>Tytuł<input value={title} onChange={event => setTitle(event.target.value)} required /></label>
      <label>Opis<textarea value={description} onChange={event => setDescription(event.target.value)} required /></label>
      <label>Miejsce<input value={location} onChange={event => setLocation(event.target.value)} required /></label>
      <label>Początek<input type='datetime-local' value={startAt} onChange={event => setStartAt(event.target.value)} required /></label>
      <label>Koniec<input type='datetime-local' value={endAt} onChange={event => setEndAt(event.target.value)} required /></label>
      <label className='check'><input type='checkbox' checked={isPublished} onChange={event => setPublished(event.target.checked)} /> Opublikuj</label>
      <button className='button' type='submit'>Dodaj wydarzenie</button>
    </form>
  )
}
