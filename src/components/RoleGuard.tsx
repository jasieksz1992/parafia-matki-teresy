'use client'

import type { ReactNode } from 'react'
import type { MemberRole } from '@/lib/types'
import { useAuth } from './AuthProvider'

const rank: Record<MemberRole, number> = {
  user: 1,
  moderator: 2,
  admin: 3,
  superadmin: 4
}

export function canModerate(role?: MemberRole) {
  return !!role && rank[role] >= rank.moderator
}

export function canManageContent(role?: MemberRole) {
  return role === 'admin' || role === 'superadmin'
}

export default function RoleGuard({ minRole, children, fallback = null }: { minRole: MemberRole, children: ReactNode, fallback?: ReactNode }) {
  const { member } = useAuth()

  if (!member || rank[member.role] < rank[minRole]) {
    return fallback
  }

  return children
}
