'use client'

import Link from 'next/link'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/components/AppShell'
import { db, parishId } from '@/lib/firebase'
import { Room, RoomCategory, roomCategories } from '@/lib/types'

const categories = Object.keys(roomCategories) as RoomCategory[]
const canCreate = ['moderator', 'admin', 'superadmin']
const canCreateOfficial = ['admin', 'superadmin']

export default function CommunityPage() {
  const { user, profile } = useAuth()
  const [rooms, setRooms] = useState<Room[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<RoomCategory>('casual')

  useEffect(() => {
    const roomsQuery = query(collection(db, 'parishes', parishId, 'rooms'), orderBy('name'))
    return onSnapshot(roomsQuery, snapshot => {
      setRooms(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Room))
    })
  }, [])

  const groupedRooms = useMemo(() => {
    return categories.map(item => ({ category: item, rooms: rooms.filter(room => room.category === item) }))
  }, [rooms])

  const createRoom = async (event: FormEvent) => {
    event.preventDefault()
    if (!user || !profile || !canCreate.includes(profile.role)) {
      return
    }
    const finalCategory = category === 'official' && !canCreateOfficial.includes(profile.role) ? 'casual' : category
    await addDoc(collection(db, 'parishes', parishId, 'rooms'), {
      name: name.trim(),
      description: description.trim(),
      category: finalCategory,
      official: finalCategory === 'official',
      closed: false,
      memberCount: 1,
      createdBy: user.uid,
      createdAt: serverTimestamp()
    })
    setName('')
    setDescription('')
    setCategory('casual')
  }

  return (
    <div className="grid">
      <section className="panel">
        <div className="row">
          <div>
            <h1>Wspólnota</h1>
            <p className="muted">Rozmowy parafialne, modlitwa, pomoc i grupy.</p>
          </div>
          <Link className="secondary" href="/community/mentions">Wzmianki</Link>
        </div>
        <div className="list">
          {groupedRooms.map(group => (
            <section key={group.category}>
              <h2>{roomCategories[group.category]}</h2>
              <div className="list">
                {group.rooms.map(room => (
                  <Link className="room-row" href={`/community/rooms?roomId=${room.id}`} key={room.id}>
                    <div className="row">
                      <strong>{room.name}</strong>
                      <span>
                        {room.official ? <span className="badge">Oficjalny</span> : null}{' '}
                        {room.closed ? <span className="badge closed">Zamknięty</span> : null}
                      </span>
                    </div>
                    <p>{room.description}</p>
                    <p className="muted">{room.lastMessageText ? `${room.lastMessageAuthorName}: ${room.lastMessageText}` : 'Brak wiadomości'}</p>
                    <p className="muted">{room.memberCount || 0} osób</p>
                  </Link>
                ))}
                {!group.rooms.length ? <p className="muted">Brak pokoi w tej kategorii.</p> : null}
              </div>
            </section>
          ))}
        </div>
      </section>
      <aside className="panel">
        <h2>Nowy pokój</h2>
        {profile && canCreate.includes(profile.role) ? (
          <form className="list" onSubmit={createRoom}>
            <input value={name} onChange={event => setName(event.target.value)} placeholder="Nazwa pokoju" minLength={3} maxLength={80} required />
            <textarea value={description} onChange={event => setDescription(event.target.value)} placeholder="Krótki opis" maxLength={200} required />
            <select value={category} onChange={event => setCategory(event.target.value as RoomCategory)}>
              {categories.map(item => <option value={item} key={item} disabled={item === 'official' && !canCreateOfficial.includes(profile.role)}>{roomCategories[item]}</option>)}
            </select>
            <button className="primary">Utwórz pokój</button>
          </form>
        ) : <p className="muted">Pokoje mogą tworzyć tylko moderatorzy i administratorzy.</p>}
        {profile && ['moderator', 'admin', 'superadmin'].includes(profile.role) ? <Link className="secondary" href="/community/moderation">Kolejka moderacji</Link> : null}
      </aside>
    </div>
  )
}
