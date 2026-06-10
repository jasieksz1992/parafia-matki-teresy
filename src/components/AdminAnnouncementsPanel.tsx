'use client'

import { canManageContent } from './RoleGuard'
import { useAuth } from './AuthProvider'
import AnnouncementForm from './AnnouncementForm'

export default function AdminAnnouncementsPanel() {
  const { member } = useAuth()

  if (!canManageContent(member?.role)) {
    return null
  }

  return <section className='panel'><h2>Ogłoszenia</h2><AnnouncementForm /></section>
}
