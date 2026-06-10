'use client'

import { FormEvent, useState } from 'react'
import { createRoom } from '@/lib/firestore'
import { useAuth } from './AuthProvider'

export default function RoomForm() {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!user || !name.trim()) {
      return
    }
    await createRoom(name, description, user.uid)
    setName('')
    setDescription('')
  }

  return (
    <form className='form' onSubmit={submit}>
      <label>Nazwa pokoju<input value={name} onChange={event => setName(event.target.value)} required /></label>
      <label>Opis<textarea value={description} onChange={event => setDescription(event.target.value)} /></label>
      <button className='button' type='submit'>Utwórz pokój</button>
    </form>
  )
}
