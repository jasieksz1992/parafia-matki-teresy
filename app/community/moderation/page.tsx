'use client'

import Link from 'next/link'
import { collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AppShell'
import { db, parishId } from '@/lib/firebase'
import { Report, Room, Profile } from '@/lib/types'

const moderatorRoles = ['moderator', 'admin', 'superadmin']

export default function ModerationPage() {
  const { user, profile } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [bannedUsers, setBannedUsers] = useState<Profile[]>([])
  const [closedRooms, setClosedRooms] = useState<Room[]>([])

  useEffect(() => {
    if (!profile || !moderatorRoles.includes(profile.role)) {
      return
    }
    const reportsQuery = query(collection(db, 'parishes', parishId, 'reports'), where('status', '==', 'pending'))
    const usersQuery = query(collection(db, 'parishes', parishId, 'users'), where('banned', '==', true))
    const roomsQuery = query(collection(db, 'parishes', parishId, 'rooms'), where('closed', '==', true))
    const unsubReports = onSnapshot(reportsQuery, snapshot => setReports(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Report)))
    const unsubUsers = onSnapshot(usersQuery, snapshot => setBannedUsers(snapshot.docs.map(item => item.data() as Profile)))
    const unsubRooms = onSnapshot(roomsQuery, snapshot => setClosedRooms(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as Room)))
    return () => {
      unsubReports()
      unsubUsers()
      unsubRooms()
    }
  }, [profile])

  if (!profile || !moderatorRoles.includes(profile.role)) {
    return <section className="panel"><h1>Kolejka moderacji</h1><p>Brak uprawnień.</p></section>
  }

  const review = async (report: Report) => {
    if (!user) {
      return
    }
    await updateDoc(doc(db, 'parishes', parishId, 'reports', report.id), {
      status: 'reviewed',
      reviewedBy: user.uid,
      reviewedAt: serverTimestamp()
    })
  }

  const deleteMessage = async (report: Report) => {
    await updateDoc(doc(db, 'parishes', parishId, 'rooms', report.roomId, 'messages', report.messageId), {
      deleted: true,
      text: ''
    })
    await review(report)
  }

  const banAuthor = async (report: Report) => {
    await updateDoc(doc(db, 'parishes', parishId, 'users', report.authorUid), {
      banned: true
    })
    await review(report)
  }

  return (
    <section className="panel">
      <div className="row">
        <h1>Kolejka moderacji</h1>
        <Link className="secondary" href="/community">Wspólnota</Link>
      </div>
      <h2>Zgłoszone wiadomości</h2>
      <div className="list">
        {reports.map(report => (
          <article className="report-row" key={report.id}>
            <strong>{report.authorName}</strong>
            <p>{report.messageText}</p>
            <p className="muted">Powód: {report.reason}</p>
            <div className="actions">
              <button className="secondary" onClick={() => review(report)}>Oznacz jako sprawdzone</button>
              <button className="danger" onClick={() => deleteMessage(report)}>Usuń wiadomość</button>
              <button className="danger" onClick={() => banAuthor(report)}>Zablokuj autora</button>
            </div>
          </article>
        ))}
        {!reports.length ? <p className="muted">Brak oczekujących zgłoszeń.</p> : null}
      </div>
      <div className="grid" style={{ marginTop: 18 }}>
        <section className="card">
          <h2>Zablokowani użytkownicy</h2>
          {bannedUsers.map(item => <p key={item.uid}>{item.displayName}</p>)}
          {!bannedUsers.length ? <p className="muted">Brak blokad.</p> : null}
        </section>
        <section className="card">
          <h2>Zamknięte pokoje</h2>
          {closedRooms.map(item => <p key={item.id}>{item.name}</p>)}
          {!closedRooms.length ? <p className="muted">Brak zamkniętych pokoi.</p> : null}
        </section>
      </div>
    </section>
  )
}
