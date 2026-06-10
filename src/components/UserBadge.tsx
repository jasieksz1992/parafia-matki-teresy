'use client'

import { useAuth } from './AuthProvider'

export default function UserBadge() {
  const { member } = useAuth()

  if (!member) {
    return <span className='badge'>Gość</span>
  }

  return <span className='badge'>{member.displayName} · {member.role}</span>
}
