'use client'

import { useEffect, useState } from 'react'
import { observeRooms, closeRoom } from '@/lib/firestore'
import type { Room } from '@/lib/types'
import { canModerate } from './RoleGuard'
import { useAuth } from './AuthProvider'
import RoomForm from './RoomForm'

export default function AdminRoomsPanel() {
  const { member } = useAuth()
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => observeRooms(setRooms), [])

  if (!canModerate(member?.role)) {
    return null
  }

  return (
    <section className='panel'>
      <h2>Pokoje</h2>
      <RoomForm />
      <div className='table-list'>
        {rooms.map(room => (
          <div className='table-row' key={room.id}>
            <span><strong>{room.name}</strong><small>{room.description}</small></span>
            {room.id && <button className='button secondary' onClick={() => closeRoom(room.id!)}>Zamknij</button>}
          </div>
        ))}
      </div>
    </section>
  )
}
