'use client'

import { softDeleteMessage } from '@/lib/firestore'
import { canModerate } from './RoleGuard'
import { useAuth } from './AuthProvider'

export default function MessageActions({ roomId, messageId }: { roomId: string, messageId: string }) {
  const { user, member } = useAuth()

  if (!user || !canModerate(member?.role)) {
    return null
  }

  return <button className='link-button danger' onClick={() => softDeleteMessage(roomId, messageId, user.uid)}>Usuń</button>
}
