'use client'

import { useState } from 'react'
import { reportMessage } from '@/lib/firestore'
import { useAuth } from './AuthProvider'

export default function ReportMessageButton({ roomId, messageId }: { roomId: string, messageId: string }) {
  const { user } = useAuth()
  const [sent, setSent] = useState(false)

  if (!user || sent) {
    return sent ? <span className='muted'>Zgłoszono</span> : null
  }

  return (
    <button className='link-button' onClick={async () => {
      const reason = window.prompt('Podaj powód zgłoszenia') || 'Naruszenie regulaminu'
      await reportMessage(roomId, messageId, reason, user.uid)
      setSent(true)
    }}>Zgłoś</button>
  )
}
