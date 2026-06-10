'use client'

import AdminAnnouncementsPanel from '@/components/AdminAnnouncementsPanel'
import AdminEventsPanel from '@/components/AdminEventsPanel'
import AdminMembersPanel from '@/components/AdminMembersPanel'
import AdminRoomsPanel from '@/components/AdminRoomsPanel'
import { useAuth } from '@/components/AuthProvider'
import { canModerate } from '@/components/RoleGuard'

export default function AdminPage() {
  const { user, member, loading } = useAuth()

  if (loading) {
    return <p className='notice'>Ładowanie panelu...</p>
  }

  if (!user || !canModerate(member?.role)) {
    return <p className='notice'>Panel jest dostępny dla moderatorów, administratorów i superadministratora.</p>
  }

  return (
    <section className='stack'>
      <h1>Panel parafii</h1>
      <AdminRoomsPanel />
      <AdminMembersPanel />
      <AdminAnnouncementsPanel />
      <AdminEventsPanel />
    </section>
  )
}
