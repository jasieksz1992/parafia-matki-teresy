'use client'

import { canManageContent } from './RoleGuard'
import { useAuth } from './AuthProvider'
import EventForm from './EventForm'

export default function AdminEventsPanel() {
  const { member } = useAuth()

  if (!canManageContent(member?.role)) {
    return null
  }

  return <section className='panel'><h2>Wydarzenia</h2><EventForm /></section>
}
